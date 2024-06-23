import { useUser } from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useUser();

  if (loading) {
    // Puedes mostrar un spinner o mensaje de carga mientras se carga el estado del usuario
    return <div>Loading...</div>;
  }

  if (!user || user.type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;