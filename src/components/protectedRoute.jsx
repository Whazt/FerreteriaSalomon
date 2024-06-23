import { useUser } from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { user } = useUser();

  if (!user || user.type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;