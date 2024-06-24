import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { users as initialUsers } from '../mocks/users.json';
import { useUser } from '../hooks/useUser';

const LoginCarrito = ({ onClose, onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login } = useUser();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (!savedUsers) {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    const user = savedUsers.find((user) => user.email === email && user.password === password);
    if (user) {
      login(user);
      if (onClose) onClose();
      if (onLogin) onLogin(user);
      alert('Sesión iniciada');
    } else {
      setLoginError('El usuario o la contraseña son incorrectos. Verifique sus credenciales e inténtelo nuevamente.');
    }
  };

  const handleCloseModal = () => {
    if (onClose) onClose();
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-96 min-h-[50vh] rounded-lg shadow-lg relative">
        <div className="flex justify-end mb-4">
          <button onClick={handleCloseModal} className="text-xl font-bold">x</button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/salomonlogo.png" alt="Salomon Logo" className="mb-4" />
          <h2 className="text-orange-400 text-2xl font-bold uppercase">Inicio de Sesión</h2>
          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </div>
        <form onSubmit={handleLogin} className="w-full">
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Correo:</label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4 relative">
            <label className="block text-gray-700 uppercase">Contraseña:</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="contraseña123"
                className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white w-full px-4 py-2 mt-2 rounded-lg"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4">
          <span>¿No tienes una cuenta? <a href="/registro" className="text-orange-500">Regístrate</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginCarrito;
