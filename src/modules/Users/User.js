import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import axios from 'axios';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import UserTable from './UserTable';
import UserModal from './UserModal';
import styles from './Users.module.css';

const API_URL = 'http://localhost:3001/api/usuarios';

const Users = () => {
  const navigate = useNavigate(); // Instancia del hook useNavigate
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Hubo un error al cargar los usuarios.');
    }
  };

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Hubo un error al eliminar el usuario.');
      }
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleBack = () => {
    navigate('/'); // Navega a la ruta Home
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft /> Regresar
        </button>
        <button onClick={openCreateModal} className={styles.createButton}>
          <FaUserPlus />
        </button>
      </header>

      <h1 className={styles.title}>Gestión de Usuarios</h1>

      <UserTable
        users={users}
        onEdit={openEditModal}
        onDelete={handleDeleteUser}
      />

      {showModal && (
        <UserModal
          closeModal={() => setShowModal(false)}
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
          initialData={editingUser}
        />
      )}
    </div>
  );
};

export default Users;
