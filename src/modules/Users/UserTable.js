// src/modules/Users/UserTable.js
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './Users.module.css';

const UserTable = ({ users, setEditingUser, deleteUser }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            <button onClick={() => setEditingUser(user)} className={styles.editButton}>
              <FaEdit />
            </button>
            <button onClick={() => deleteUser(user.id)} className={styles.deleteButton}>
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
