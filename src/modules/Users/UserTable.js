import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './Users.module.css';

const UserTable = ({ users = [], onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      onDelete(id);
    }
  };

  return (
    <div>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => onEdit(user)}
                    className={styles.editButton}
                    aria-label="Editar usuario"
                    title="Editar usuario"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={styles.deleteButton}
                    aria-label="Eliminar usuario"
                    title="Eliminar usuario"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No hay usuarios disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
