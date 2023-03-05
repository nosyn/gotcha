import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-700">
        <div className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
          <Outlet />
        </div>
      </div>
    </main>
  );
}
