// src/modules/Users/Users.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import UserModal from './UserModal';
import ManageUserModal from './ManageUserModal';
import styles from './Users.module.css';

const Users = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false); // Controla la barra lateral
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); // Controla el modal de crear usuario
  const [showManageUserModal, setShowManageUserModal] = useState(false); // Controla el modal de gestionar usuario

  const handleBack = () => navigate('/'); // Redirige a la pantalla de Home
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const openCreateUserModal = () => {
    setShowCreateUserModal(true);
    setShowSidebar(false); // Cierra la barra lateral
  };

  const openManageUserModal = () => {
    setShowManageUserModal(true);
    setShowSidebar(false); // Cierra la barra lateral
  };

  const closeCreateUserModal = () => setShowCreateUserModal(false);
  const closeManageUserModal = () => setShowManageUserModal(false);

  const users = [
    { id: 1, name: 'Rosaline Grace', email: 'rosaline@example.com', status: 'available', project: 'Proyecto A' },
    { id: 2, name: 'Emmanuel Olega', email: 'emmanuel@example.com', status: 'busy', project: 'Proyecto B' },
    { id: 3, name: 'Charles Kegen', email: 'charles@example.com', status: 'available', project: 'Proyecto C' },
  ];

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          Regresar
        </button>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          <FaBars />
        </button>
      </header>

      {showSidebar && (
        <div className={styles.sidebar}>
          <button onClick={openCreateUserModal} className={styles.sidebarButton}>Crear Usuario</button>
          <button onClick={openManageUserModal} className={styles.sidebarButton}>Gestionar Usuario</button>
        </div>
      )}

      <div className={styles.container}>
        <h1 className={styles.title}>Gestión de Usuarios</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Proyecto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`${styles.statusIndicator} ${
                      user.status === 'available' ? styles.available : styles.busy
                    }`}
                  ></span>
                </td>
                <td>{user.project}</td>
                <td>
                  <button className={styles.editButton}>✏️</button>
                  <button className={styles.deleteButton}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateUserModal && <UserModal closeModal={closeCreateUserModal} />}
      {showManageUserModal && <ManageUserModal closeModal={closeManageUserModal} />}
    </>
  );
};

export default Users;
