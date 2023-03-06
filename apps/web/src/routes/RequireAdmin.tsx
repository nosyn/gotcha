import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useUserStore } from '../store/user';

const RequireAdmin = () => {
  const [user] = useUserStore(({ user }) => [user]);
  const location = useLocation();

  if (!user || user.role !== 'ADMIN') {
    // Redirect them to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
