// src/modules/Home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  
  const handleProjectNavigation = () => navigate('/projects');
  const handleUserNavigation = () => navigate('/users');
  const handleTestNavigate = () => navigate('/Test');
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
            
            title="Gestión de Proyectos" 
            icon="FaFolderPlus" 
            colorClass="cardGreen" 
            onClick={handleProjectNavigation} // Llama a la función para ir a proyectos
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
            onClick={handleTestNavigate} 
          />
        </div>
      </div>
    </>
  );
};

export default Home;
