import React,{createContext, useState,useContext, useEffect} from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) =>{

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product)=>{
   setCartItems((prev) =>{
    const itemExists = prev.find(item => item.id === product.id);
    if(itemExists){
      return prev.map(item => item.id === product.id ? {...item, quantity : item.quantity + 1}: 
        item
      )
    }
    else{
      return [...prev, {...product, quantity : 1}]
    }

   })
  }

  const removeFromCart = (productId)=>{
    setCartItems((prev) => prev.filter(item => item.id != productId));
  }

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) =>{
     setCartItems((prev) =>
      prev
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCartCount,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );


}