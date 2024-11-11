import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Users.module.css';

const API_URL = 'http://localhost:3001/api/usuarios';

const UserModal = ({
  closeModal,
  onUserCreated,
  onUserUpdated,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        const response = await axios.put(`${API_URL}/update/${initialData.id}`, formData);
        onUserUpdated(response.data);
      } else {
        const response = await axios.post(API_URL, formData);
        onUserCreated(response.data);
      }
      closeModal();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert('Hubo un error al guardar el usuario.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2>{initialData ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nombre <span className={styles.required}>*</span></label>
          <input
            type="text"
            name="username"
            placeholder="Nombre"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Correo <span className={styles.required}>*</span></label>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Contraseña <span className={styles.required}>*</span></label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Rol <span className={styles.required}>*</span></label>
          <input
            type="text"
            name="role"
            placeholder="Rol"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? 'Guardar Cambios' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
