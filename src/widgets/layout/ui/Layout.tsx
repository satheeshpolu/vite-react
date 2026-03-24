import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

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
