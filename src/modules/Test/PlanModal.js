// src/modules/Tests/PlanModal.js
import React, { useState } from 'react';
import styles from './Plan.module.css';

const PlanModal = ({ onSave, onCancel }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');

  const handleSave = () => {
    onSave({
      code,
      name,
      status,
      description,
      responsible
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Crear Plan de Prueba</h3>
        <label>Código</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Estado</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Responsable</label>
        <input type="text" value={responsible} onChange={(e) => setResponsible(e.target.value)} />

        <div className={styles.buttons}>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
