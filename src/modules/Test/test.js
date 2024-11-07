// src/modules/Tests/Tests.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaVial, FaEdit, FaTrash } from 'react-icons/fa'; // Iconos adicionales para editar y eliminar
import styles from './Test.module.css';

const Tests = () => {
  const navigate = useNavigate();
  const [projectCode, setProjectCode] = useState('');
  const [plans, setPlans] = useState([
    {
      code: 'PR001',
      name: 'Plan de Prueba 1',
      status: 'En progreso',
      description: 'Pruebas de integración',
      responsible: 'Juan Pérez'
    },
    {
      code: 'PR002',
      name: 'Plan de Prueba 2',
      status: 'Finalizado',
      description: 'Pruebas unitarias',
      responsible: 'Maria Gómez'
    }
    // Puedes agregar más planes de prueba como ejemplos
  ]);

  const handleBack = () => navigate('/'); // Regresa a la pantalla anterior

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft /> Regresar
        </button>
       
      </header>

      <div className={styles.content}>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Buscar proyecto por código..." 
            value={projectCode} 
            onChange={(e) => setProjectCode(e.target.value)}
            className={styles.searchInput}
          />
          <FaSearch className={styles.searchIcon} />
        </div>

        <div className={styles.iconContainer}>
          <FaVial className={styles.testIcon} /> {/* Icono grande para pruebas */}
        </div>

        {projectCode && (
          <div className={styles.buttonsContainer}>
            <button className={styles.button}>
              Crear Plan de Prueba
            </button>
            <button className={styles.button}>
              Crear Caso
            </button>
          </div>
        )}

        {/* Título de la tabla */}
        <h2 className={styles.tableTitle}>Planes de Pruebas</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Responsable</th>
              <th>Acciones</th> {/* Nueva columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.code}</td>
                <td>{plan.name}</td>
                <td>{plan.status}</td>
                <td>{plan.description}</td>
                <td>{plan.responsible}</td>
                <td>
                  <button className={styles.editButton}><FaEdit /></button>
                  <button className={styles.deleteButton}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tests;
