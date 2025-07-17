import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/Contact";
import NoFound from "./pages/NoFound";
import BlogList from "./pages/blogs/BlogList";
import BlogPost from "./pages/blogs/BlogPost";
import BlogCategory from "./pages/blogs/BlogCategory";
import CartApp from "./pages/CartApp";
import AllCategories from "./pages/AllCategories";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="blogs"
            element={
                <Blogs />
            }
          >
            <Route index element={<BlogList />} />
            <Route path=":id" element={<BlogPost />} />
            <Route path="category/:category" element={<BlogCategory />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<CartApp />} />
          <Route path="/cart/category/:category" element={<AllCategories />} />
          <Route path="*" element={<NoFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
