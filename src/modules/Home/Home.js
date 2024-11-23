import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptionCard from './OptionCard';
import styles from './Home.module.css';

const Home = ({ onLogout }) => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    onLogout(); // Llama a la función de logout pasada desde el componente App
    navigate('/Login'); // Redirige al usuario al login
  };

  // Navegación entre diferentes rutas
  const handleProjectNavigation = () => navigate('/projects');
  const handleUserNavigation = () => navigate('/users');
  const handleTestNavigate = () => navigate('/test');

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
            onClick={handleProjectNavigation}
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
