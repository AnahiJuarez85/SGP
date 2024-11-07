// src/modules/Home/Home.js
import React from 'react';
import OptionCard from './OptionCard';
import styles from './Home.module.css';

const Home = () => {
  const handleCreateProject = () => {
    alert('Redirigiendo a Crear Proyecto...');
  };

  const handleCreateUser = () => {
    alert('Redirigiendo a Crear Usuario...');
  };

  const handleThirdOption = () => {
    alert('Opción aún no definida.');
  };

  return (
    <div className={styles.container}>
      <h1>Página de Inicio</h1>
      <div className={styles.grid}>
        <OptionCard title="Crear Proyecto" onClick={handleCreateProject} />
        <OptionCard title="Crear Usuario" onClick={handleCreateUser} />
        <OptionCard title="Opción por Definir" onClick={handleThirdOption} />
      </div>
    </div>
  );
};

export default Home;
