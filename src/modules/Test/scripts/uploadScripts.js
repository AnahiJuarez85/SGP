import React, { useState } from 'react';
import axios from 'axios';
import styles from './uploadScript.module.css';

const UploadScript = ({ testCaseId, uploadedBy, onUploadSuccess }) => {
const [file, setFile] = useState(null);

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.js')) {
    setFile(selectedFile);
    } else {
    alert('Por favor, selecciona un archivo con extensión .js.');
    setFile(null);
    }
};

const handleUpload = async () => {
    if (!file) {
    alert('Selecciona un archivo antes de subirlo.');
    return;
    }

    const formData = new FormData();
    formData.append('script', file);
    formData.append('testCaseId', testCaseId); // Se pasa el ID del caso asociado
    formData.append('uploadedBy', uploadedBy); // Se pasa el ID del usuario que sube el archivo

    try {
    const response = await axios.post('http://localhost:3001/api/automated/scripts', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
        alert('Archivo subido exitosamente');
        onUploadSuccess(response.data); // Notifica el éxito al componente padre
    } else {
        alert('Error al subir el archivo.');
    }
    } catch (error) {
    console.error('Error al subir el archivo:', error);
    alert('Hubo un problema al subir el archivo.');
    }
};

return (
    <div className={styles.uploadContainer}>
    <h3>Subir Script Automatizado</h3>
    <input
        type="file"
        accept=".js"
        onChange={handleFileChange}
        className={styles.fileInput}
    />
    <button onClick={handleUpload} className={styles.uploadButton}>
        Subir Archivo
    </button>
    </div>
);
};

export default UploadScript;
