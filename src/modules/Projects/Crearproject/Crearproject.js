// src/modules/Projects/CreateProject/CreateProject.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Importamos el componente DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importamos los estilos de DatePicker
import styles from './CreateProject.module.css';

const CreateProject = () => {
  const navigate = useNavigate(); // Para navegar entre rutas
  
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [stage, setStage] = useState('');
  const [resource, setResource] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar el proyecto en el estado global o enviarlo a la API
    alert('Proyecto guardado!');
    navigate('/projects'); // Redirige a la lista de proyectos después de guardar
  };

  const handleCancel = () => {
    navigate('/projects'); // Regresa a la lista de proyectos sin guardar nada
  };

  return (
    <div className={styles.container}>
      <h2>Crear Proyecto</h2>
      <form className={styles.form}>
        <label>Nombre</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nombre del proyecto"
        />

        <label>Prioridad</label>
        <input 
          type="text" 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          placeholder="Prioridad del proyecto"
        />

        <label>Etapa</label>
        <select 
          value={stage} 
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="">Selecciona una etapa</option>
          <option value="Nuevo">Nuevo</option>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Recurso</label>
        <select 
          value={resource} 
          onChange={(e) => setResource(e.target.value)}
        >
          <option value="">Selecciona un recurso</option>
          <option value="Asignar">Asignar</option>
          <option value="Pendiente">Pendiente</option>
        </select>

        <label>Fecha de Creación</label>
        <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
        />

        <label>Fecha Final</label>
        <DatePicker 
          selected={endDate} 
          onChange={(date) => setEndDate(date)} 
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
        />

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleSave} className={styles.saveButton}>
            Guardar
          </button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
