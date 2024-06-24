import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ onClose, onRegister }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      email,
      password,
      phone,
      type: 'user', // Default type for new users
      nombre,
      apellido,
      direccion,
      ciudad,
      departamento,
    };

    let savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (savedUsers.some(user => user.email === email)) {
      setRegisterError('El correo ya está registrado. Intente con otro.');
      setRegisterSuccess('');
      return;
    }

    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    setRegisterSuccess('Registro exitoso. Ahora puede iniciar sesión.');
    setRegisterError('');

    if (onRegister) onRegister(newUser);
    // Limpiar campos después del registro exitoso
    setEmail('');
    setPassword('');
    setPhone('');
    setNombre('');
    setApellido('');
    setDireccion('');
    setCiudad('');
    setDepartamento('');
  };

  const closeModal = () => {
    setRegisterSuccess('');
    setRegisterError('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-96 max-h-[80vh] overflow-y-auto rounded-lg shadow-lg relative">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-xl font-bold">x</button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/salomonlogo.png" alt="Salomon Logo" className="mb-4" />
          <h2 className="text-orange-400 text-2xl font-bold uppercase">Registro</h2>
        </div>
        <form onSubmit={handleRegister} className="w-full">
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
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Teléfono:</label>
            <input
              type="text"
              placeholder="82345678"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Apellido:</label>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Dirección:</label>
            <input
              type="text"
              placeholder="123 Admin St"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Ciudad:</label>
            <input
              type="text"
              placeholder="Ciudad"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700 uppercase">Departamento:</label>
            <input
              type="text"
              placeholder="Departamento"
              className="w-full px-3 py-2 border-b-2 border-gray-700 focus:outline-none"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white w-full px-4 py-2 mt-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>
        {(registerError || registerSuccess) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
              <p className="text-gray-700">{registerError || registerSuccess}</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
