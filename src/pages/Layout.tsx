import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
export default function Layout() {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
