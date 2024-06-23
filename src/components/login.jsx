import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { users } from '../mocks/users.json';
import { useUser } from '../hooks/useUser';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, login, logout } = useUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      login(user);
      setShowModal(false);
      if (user.type === 'admin') {
        navigate('/Admin-Panel');
      } else {
        alert('Sesión iniciada');
      }
    } else {
      setLoginError('El usuario o la contraseña son incorrectos. Verifique sus credenciales e inténtelo nuevamente.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleUserIconClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="flex justify-center items-center">
      {user ? (
        <div className="relative">
          <FaUser
            className="text-orange-400 text-2xl cursor-pointer"
            onClick={handleUserIconClick}
          />
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => { setShowModal(true); setShowUserMenu(false); }}
          className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white pt-2 p-6 w-[50vh] min-h-[50vh] rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCloseModal}
                className="text-xl font-bold"
              >
                x
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="/salomonlogo.png" alt="Salomon Logo" />
              <h2 className="text-orange-400 text-2xl font-bold uppercase">Inicio de Sesión</h2>
              {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
            </div>
            <form onSubmit={handleLogin}>
              <div className="my-6 mx-2">
                <label className="flex justify-start mt-3 text-gray-700 uppercase">Correo:</label>
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="w-full px-3 py-2 border-0 border-b-2 border-gray-700 focus:outline-none focus:border-none no-spinner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-6 mx-2 relative">
                <label className="flex justify-start text-gray-700 uppercase">Contraseña:</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="contraseña123"
                    className="w-full px-4 py-2 border-0 border-b-2 border-gray-700 focus:outline-none focus:border-none pr-10"
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
      )}
    </div>
  );
};

export default Login;