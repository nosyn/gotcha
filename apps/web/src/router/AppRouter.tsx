import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';

// Hooks
import { useInitializeApp } from '../hooks/useInitializeApp';

// Pages
import DashboardPage from '../pages/DashboardPage';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';

// Routers
import RequireAdmin from './RequireAdmin';
import RequireAuth from './RequiredAuth';

export default function AppRouter() {
  const { appInitialized } = useInitializeApp();

  return (
    <BrowserRouter>
      {!appInitialized ? (
        <div className="">Initializing app</div>
      ) : (
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            {/* User role routes */}
            <Route element={<RequireAuth />}>
              <Route index path="/" element={<HomePage />} />
            </Route>

            {/* Admin role routes */}
            <Route element={<RequireAdmin />}>
              <Route index path="/dashboard" element={<DashboardPage />} />
            </Route>

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
