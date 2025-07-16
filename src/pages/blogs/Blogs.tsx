// pages/Blogs.tsx
import { Outlet, Link } from "react-router-dom";

export default function Blogs() {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        <li><Link to="">All Posts</Link></li>
        <li><Link to="1">Post 1</Link></li>
        <li><Link to="2">Post 2</Link></li>
        <li><Link to="category/tech">Tech Blogs</Link></li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
