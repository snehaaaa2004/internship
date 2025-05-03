import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check the role of the user from the token
  const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get the role
  if (decoded.role !== role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
