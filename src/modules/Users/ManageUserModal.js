// src/modules/Users/ManageUserModal.js
import React, { useState } from 'react';
import styles from './Users.module.css';

const ManageUserModal = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    // Lógica para buscar al usuario en el backend usando `searchTerm`
    console.log('Buscando usuario con:', searchTerm);
    setUserData({ name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' }); // Ejemplo de datos encontrados
  };

  const handleSaveChanges = () => {
    // Lógica para actualizar el usuario en el backend
    console.log('Usuario actualizado:', userData);
    closeModal();
  };

  const handleDeleteUser = () => {
    // Lógica para eliminar el usuario en el backend
    console.log('Usuario eliminado:', userData);
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>X</button>
        <h2>Gestionar Usuario</h2>
        <input
          type="text"
          placeholder="Buscar por ID o Nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
        
        {userData && (
          <form className={styles.form}>
            <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
            <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
            <input type="text" value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} required />
            <div className={styles.buttonContainer}>
              <button type="button" onClick={handleSaveChanges} className={styles.submitButton}>Editar</button>
              <button type="button" onClick={handleDeleteUser} className={styles.deleteButton}>Eliminar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageUserModal;
