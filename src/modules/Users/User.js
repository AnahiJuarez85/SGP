// src/modules/Users/Users.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Users.module.css';

const Users = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate('/'); // Redirige a la pantalla de Home

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
      </header>
      <div className={styles.container}>
        <h1 className={styles.title}>Gestión de Usuarios</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo" />
          <button type="submit">Agregar Usuario</button>
        </form>
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
    </>
  );
};

export default Users;
