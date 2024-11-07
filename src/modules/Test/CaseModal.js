// src/modules/Tests/CaseModal.js
import React, { useState } from 'react';
import styles from './CaseModal.module.css';

const CaseModal = ({ onSave, onCancel }) => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    onSave({
      code,
      description,
      status
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Crear Caso de Prueba</h3>
        <label>Código del Plan de Prueba</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Estado</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Exitoso">Exitoso</option>
          <option value="Fallo">Fallo</option>
          <option value="En progreso">En progreso</option>
        </select>

        <div className={styles.buttons}>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
