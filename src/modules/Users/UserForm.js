// src/modules/Users/UserForm.js
import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';

const UserForm = ({ addUser, updateUser, editingUser, setEditingUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(formData);
      setEditingUser(null);
    } else {
      addUser(formData);
    }
    setFormData({ name: '', email: '', password: '', role:'' });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="pass"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
        <input
        type="rol"
        name="role"
        placeholder="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <button type="submit" className={styles.submitButton}>
        {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
      </button>
    </form>
  );
};

export default UserForm;
