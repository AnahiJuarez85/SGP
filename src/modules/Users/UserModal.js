// src/modules/Users/UserModal.js
import React, { useState } from 'react';
import styles from './Users.module.css';

const UserModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario creado:', formData);
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>X</button>
        <h2>Crear Usuario</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre del usuario"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Correo</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Rol</label>
          <input
            type="text"
            name="role"
            placeholder="Rol del usuario"
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

export default UserModal;
