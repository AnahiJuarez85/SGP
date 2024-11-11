// src/modules/Users/ManageUserModal.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Users.module.css';

const API_URL = 'http://localhost:3001/api/usuarios/update';

const ManageUserModal = ({ user, closeModal, onUserUpdated }) => {
  // Estado inicial basado en los datos del usuario o valores predeterminados
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos actualizados al backend
      const response = await axios.put(`${API_URL}/${user.id}`, formData);
      onUserUpdated(response.data); // Notificar al componente padre con los datos actualizados
      closeModal(); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un error al actualizar el usuario.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>X</button>
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nombre <span className="required">*</span>
  </label>
          <input
            name="username"
            placeholder="Nombre"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Rol"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>Guardar</button>
            <button type="button" onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageUserModal;
