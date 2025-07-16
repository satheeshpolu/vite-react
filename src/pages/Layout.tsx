import { Outlet, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/blogs">Blogs</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
