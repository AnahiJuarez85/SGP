import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanModal from './PlanModal';
import styles from './Test.module.css';
import { FaEdit } from 'react-icons/fa';

const Tests = () => {
  const navigate = useNavigate();
  const [projectCode, setProjectCode] = useState('');
  const [plans, setPlans] = useState([]);
  const [testers, setTesters] = useState([]);
  const [projectExists, setProjectExists] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/usuarios');
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const users = await response.json();
        setTesters(users);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const projectResponse = await fetch(`http://localhost:3001/api/proyectos/${projectCode}`);
      if (!projectResponse.ok) {
        setProjectExists(false);
        return;
      }

      setProjectExists(true);

      const plansResponse = await fetch(`http://localhost:3001/api/test-plans/project/${projectCode}`);
      if (!plansResponse.ok) {
        setPlans([]);
        return;
      }

      const plansData = await plansResponse.json();

      const updatedPlans = plansData.map((plan) => {
        const responsibleUser = testers.find((tester) => tester.id === plan.createdBy);
        return {
          ...plan,
          responsibleName: responsibleUser ? responsibleUser.username : 'Desconocido',
        };
      });

      setPlans(updatedPlans);
    } catch (error) {
      console.error('Error al buscar los planes:', error);
    }
  };

  const handleSavePlan = async (newPlan) => {
    try {
      if (editingPlan) {
        const response = await fetch(`http://localhost:3001/api/test-plans/${editingPlan.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newPlan.name,
            description: newPlan.description,
            createdBy: newPlan.responsible,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el plan');
        }

        const updatedPlan = await response.json();

        const responsibleUser = testers.find((tester) => tester.id === updatedPlan.createdBy);
        const updatedPlanWithName = {
          ...updatedPlan,
          responsibleName: responsibleUser ? responsibleUser.username : 'Desconocido',
        };

        setPlans((prevPlans) =>
          prevPlans.map((plan) => (plan.id === updatedPlanWithName.id ? updatedPlanWithName : plan))
        );

        alert('Plan actualizado exitosamente');
      } else {
        const response = await fetch('http://localhost:3001/api/test-plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: newPlan.projectId,
            name: newPlan.name,
            description: newPlan.description,
            createdBy: newPlan.responsible,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al guardar el plan');
        }

        const savedPlan = await response.json();

        const responsibleUser = testers.find((tester) => tester.id === savedPlan.createdBy);
        const savedPlanWithName = {
          ...savedPlan,
          responsibleName: responsibleUser ? responsibleUser.username : 'Desconocido',
        };

        setPlans((prevPlans) => [...prevPlans, savedPlanWithName]);
        alert('Plan guardado exitosamente');
      }

      setShowPlanModal(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error al guardar el plan:', error);
      alert('Hubo un error al guardar el plan.');
    }
  };

  const handlePlanClick = (planId) => {
    navigate(`/cases/${planId}`); // Redirige a la página de casos
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setShowPlanModal(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Regresar
        </button>
      </header>

      <div className={styles.content}>
        <input
          type="text"
          placeholder="Buscar proyecto por código..."
          value={projectCode}
          onChange={(e) => setProjectCode(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Buscar
        </button>

        {projectExists && (
          <button className={styles.button} onClick={() => setShowPlanModal(true)}>
            Crear Plan de Prueba
          </button>
        )}

        {plans.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.id}</td>
                  <td
                    className={styles.planName}
                    onClick={() => handlePlanClick(plan.id)}
                  >
                    {plan.name}
                  </td>
                  <td>{plan.description}</td>
                  <td>{plan.responsibleName}</td>
                  <td>
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className={styles.editButton}
                      aria-label="Editar plan"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showPlanModal && (
          <PlanModal
            onSave={handleSavePlan}
            onCancel={() => {
              setShowPlanModal(false);
              setEditingPlan(null);
            }}
            projectId={projectCode}
            editingPlan={editingPlan}
          />
        )}
      </div>
    </div>
  );
};

export default Tests;
