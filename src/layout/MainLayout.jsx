import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router";
import Header from "../components/signUpHeader/Header";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>      
      <Footer />
    </div>
  );
}
export default MainLayout;