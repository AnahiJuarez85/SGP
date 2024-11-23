import React, { useState, useEffect } from 'react';
import styles from './Plan.module.css';

const PlanModal = ({ projectId, onSave, onCancel, editingPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    responsible: '',
  });
  const [testers, setTesters] = useState([]); // Lista de usuarios con rol Tester

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/usuarios');
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const users = await response.json();
        const filteredTesters = users.filter((user) => user.role === 'tester');
        setTesters(filteredTesters);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        name: editingPlan.name || '',
        description: editingPlan.description || '',
        responsible: editingPlan.createdBy || '',
      });
    }
  }, [editingPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.responsible) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSave({ ...formData, projectId });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onCancel} className={styles.closeButton}>X</button>
        <h2>{editingPlan ? 'Editar Plan de Prueba' : 'Crear Plan de Prueba'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>ID Proyecto</label>
          <input type="text" value={projectId} readOnly className={styles.input} />

          <label>Nombre</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className={styles.textarea}
          />

          <label>Responsable</label>
          <select
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Selecciona un responsable</option>
            {testers.map((tester) => (
              <option key={tester.id} value={tester.id}>
                {tester.username}
              </option>
            ))}
          </select>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>Guardar</button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
