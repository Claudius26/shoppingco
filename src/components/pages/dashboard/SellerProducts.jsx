import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
    sku: "",
    tags: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/products/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `${API_BASE}/products/seller/${editingProduct.id}`
      : `${API_BASE}/products/seller`;

    const formData = new FormData();
    // Only append non-empty fields
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    if (imageFile) formData.append("file", imageFile); // must match backend req.file
    else if (form.imageUrl) formData.append("imageUrl", form.imageUrl);

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      await fetchProducts();
      setForm({
        title: "",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
        sku: "",
        tags: "",
        category: "",
      });
      setImageFile(null);
      setEditingProduct(null);
      setOpenForm(false);
      setSuccessMessage(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving product:", err);
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title || "",
      price: product.price || "",
      quantity: product.quantity || "",
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      sku: product.sku || "",
      tags: (product.tags || []).join(", "),
      category: product.category || "",
    });
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}/products/seller/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {successMessage && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Products</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({
              title: "",
              price: "",
              quantity: "",
              description: "",
              imageUrl: "",
              sku: "",
              tags: "",
              category: "",
            });
            setOpenForm(true);
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl shadow hover:shadow-lg transition p-4 bg-white"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <h3 className="text-lg font-bold mt-3">{p.title}</h3>
              <p className="text-gray-700 font-medium">${p.price}</p>
              <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
              <p className="text-xs text-gray-500">Category: {p.category}</p>
              <p className="text-sm mt-2 line-clamp-3">{p.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-end z-50"
            onClick={() => setOpenForm(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white h-full w-full max-w-lg shadow-xl relative p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Product Title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="sku"
                  placeholder="SKU (unique product code)"
                  value={form.sku}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Or paste Image URL"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerProducts;
