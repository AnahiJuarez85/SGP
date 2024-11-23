import React, { useState } from 'react';
import styles from './CaseModal.module.css';
import axios from 'axios';


const CaseModal = ({ onSave, onCancel, planId }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    if (!description || !status || !file) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('testPlanId', planId);
    formData.append('description', description);
    formData.append('expectedResult', file); // Adjuntar archivo al payload

    try {
      const response = await axios.post('http://localhost:3001/api/test-cases', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.js')) {
      setFile(selectedFile);
    } else {
      alert('Por favor, selecciona un archivo con extensión .js.');
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

        <label>Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="">Selecciona un estado</option>
          <option value="Exitoso">Exitoso</option>
          <option value="Fallo">Fallo</option>
          <option value="En progreso">En progreso</option>
        </select>

        <label>Subir Archivo .js</label>
        <input
          type="file"
          accept=".js"
          onChange={handleFileChange}
          className={styles.fileInput}
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
