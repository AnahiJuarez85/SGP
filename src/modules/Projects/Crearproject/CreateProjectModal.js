import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CreateProjectModal.module.css';

const URL = process.env.REACT_APP_API_URL;
 
const API_URL = `${URL}api/proyectos`;

const CreateProjectModal = ({ project, onClose, users }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    created_by: '',
    start_date: '',
    end_date: '',
  });

  const [testers, setTesters] = useState([]); // Lista de usuarios con rol de Tester

  // Filtrar usuarios con rol Tester
  useEffect(() => {
    if (users && users.length > 0) {
      const filteredTesters = users.filter((user) => user.role === 'tester');
      setTesters(filteredTesters);
    }
  }, [users]);

  // Cargar datos en caso de editar un proyecto
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || '',
        created_by: project.created_by || '',
        start_date: project.start_date
          ? new Date(project.start_date).toISOString().split('T')[0]
          : '',
        end_date: project.end_date
          ? new Date(project.end_date).toISOString().split('T')[0]
          : '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (project) {
        // Actualizar proyecto
        await axios.put(`${API_URL}/update/${project.id}`, formData);
        alert('Proyecto actualizado exitosamente');
      } else {
        // Crear proyecto
        await axios.post(API_URL, formData);
        alert('Proyecto creado exitosamente');
      }
      onClose(); // Cerrar modal
    } catch (error) {
      console.error('Error al guardar el proyecto:', error.response?.data || error.message);
      console.log('Datos enviados:', formData);
      alert('Hubo un error al guardar el proyecto.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <h2>{project ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nombre</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>Etapa</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una etapa</option>
            <option value="activo">Activo</option>
            <option value="en_progreso">En Progreso</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <label>Responsable</label>
          <select
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un responsable</option>
            {testers.map((tester) => (
              <option key={tester.id} value={tester.id}>
                {tester.username}
              </option>
            ))}
          </select>
          <label>Fecha de Inicio</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
          <label>Fecha de Fin</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
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

export default CreateProjectModal;
