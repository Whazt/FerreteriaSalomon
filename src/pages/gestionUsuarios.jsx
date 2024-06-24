import { useState, useEffect } from 'react';
import { users as initialUsers } from '../mocks/users.json';
import { TrashIcon, EditIcon, AddIcon } from '../components/icons';
import { useUser } from '../hooks/useUser';

const GestionarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', nombre: '', email: '', phone: '', password: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  // Cargar usuarios desde localStorage o inicializar con JSON
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers && savedUsers.length > 0) {
      setUsers(savedUsers);
    } else {
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }
  }, []);

  // Guardar usuarios en localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
    setUsers(users);
  };

  const handleAddUser = () => {
    const newId = users.length > 0 ? String(parseInt(users[users.length - 1].id) + 1) : '1';
    const userToAdd = { ...newUser, id: newId };
    const updatedUsers = [...users, userToAdd];
    saveUsers(updatedUsers);
    setNewUser({ id: '', nombre: '', email: '', phone: '', password: '', type: '' });
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (user.id === id && user.type === 'admin') {
      alert('No se puede eliminar el usuario administrador que está activo.');
      return;
    }
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsers(updatedUsers);
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setNewUser(userToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map(user => user.id === newUser.id ? newUser : user);
    saveUsers(updatedUsers);
    setNewUser({ id: '', nombre: '', email: '', phone: '', password: '', type: '' });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto overflow-y-auto p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2  bg-blue-500 text-white px-4 py-2 rounded"><AddIcon  /> Agregar</button>
        </div>
      </div>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.phone}</p>
              <p><strong>Tipo:</strong> {user.type}</p>
            </div>
            <div>
              <button onClick={() => handleEditUser(user.id)} className="btn btn-secondary bg-yellow-500 text-white px-4 py-2 rounded mr-2"><EditIcon /></button>
              <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded"><TrashIcon /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modificar Usuario' : 'Añadir Nuevo Usuario'}</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              />
              <select
                value={newUser.type}
                onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
              >
                <option value="">Seleccione el tipo</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
              <div className="flex justify-end">
                <button onClick={isEditing ? handleUpdateUser : handleAddUser} className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">
                  {isEditing ? 'Guardar Cambios' : 'Añadir Usuario'}
                </button>
                <button onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="btn btn-secondary ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarUsuarios;

