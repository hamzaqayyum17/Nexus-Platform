import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: JSX.Element;
  allowedRoles?: Array<'investor' | 'entrepreneur'>;
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // ✅ If still loading from localStorage, show nothing (or loading spinner)
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
