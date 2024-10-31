// src/modules/Home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => alert('Redirigiendo a Crear Proyecto...');
  const handleUserNavigation = () => navigate('/users');
  const handleThirdOption = () => alert('Opción aún no definida.');
  const handleLogout = () => alert('Cerrando sesión...');

  return (
    <>
      <header className={styles.header}>
        <h1>Página de Inicio</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>
      <div className={styles.container}>
        <div className={styles.grid}>
          <OptionCard 
            title="Gestiona Proyecto" 
            icon="FaFolderPlus" 
            colorClass="cardGreen" 
            onClick={handleCreateProject} 
          />
          <OptionCard 
            title="Usuario" 
            icon="FaUserPlus" 
            colorClass="cardBlue" 
            onClick={handleUserNavigation} 
          />
          <OptionCard 
            title="Pruebas" 
            icon="FaQuestionCircle" 
            colorClass="cardOrange" 
            onClick={handleThirdOption} 
          />
        </div>
      </div>
    </>
  );
};

export default Home;
