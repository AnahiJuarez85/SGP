import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CreateProjectModal.module.css';

const API_URL = 'http://localhost:3001/api/proyectos';

const CreateProjectModal = ({ project, onClose, users }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    created_by: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || '', // Asegúrate de que este valor coincide exactamente
        created_by: project.created_by || '',
        start_date: project.start_date ? new Date(project.start_date).toISOString().split('T')[0] : '',
        end_date: project.end_date ? new Date(project.end_date).toISOString().split('T')[0] : '',
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
        await axios.put(`${API_URL}/update/${project.id}`, formData);
        alert('Proyecto actualizado exitosamente');
      } else {
        await axios.post(API_URL, formData);
        alert('Proyecto creado exitosamente');
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      console.log('Datos enviados:', formData);
      alert('Hubo un error al guardar el proyecto.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
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
  value={formData.status} // Asegúrate de que este valor coincide con las opciones
  onChange={handleChange}
  required
>
  <option value="">Selecciona una etapa</option>
  <option value="Activo">Activo</option>
  <option value="En_progreso">En Progreso</option>
  <option value="Finalizado">Finalizado</option>


          </select>
          <label>Responsable</label>
          <select
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un responsable</option>
            {users.map((user) => (
              <option key={user.name} value={user.name}>
                {user.username}
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
            <button type="submit" className={styles.submitButton}>Guardar</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
