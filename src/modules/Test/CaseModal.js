import React, { useState } from 'react';
import styles from './CaseModal.module.css';
import axios from 'axios';

const CaseModal = ({ onSave, onCancel, planId }) => {
  const [description, setDescription] = useState('');
  const [expectedResult, setExpectedResult] = useState('');

  const handleSave = async () => {
    if (!description || !expectedResult) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear el payload con la estructura necesaria
    const payload = {
      testPlanId: planId,
      description,
      expectedResult,
    };

    try {
      const URL = process.env.REACT_APP_API_URL;   
      const response = await axios.post(`${URL}api/test-cases`, payload);

      if (response.status === 200) {
        alert('Caso guardado exitosamente');
        onSave(response.data);
      } else {
        alert('Hubo un error al guardar el caso.');
      }
    } catch (error) {
      console.error('Error al guardar el caso de prueba:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Error al guardar el caso.');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Crear Caso de Prueba</h3>

        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <label>Resultado Esperado</label>
        <textarea
          value={expectedResult}
          onChange={(e) => setExpectedResult(e.target.value)}
          className={styles.textarea}
        />

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Guardar
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
