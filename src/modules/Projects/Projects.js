// src/modules/Projects/Projects.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaSearch, FaBars } from 'react-icons/fa';
import styles from './Projects.module.css';

const Projects = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleBack = () => navigate('/'); // Regresa a Home
  const toggleSidebar = () => setShowSidebar(!showSidebar); // Muestra/Oculta la barra lateral
  const toggleFilterOptions = () => setShowFilterOptions(!showFilterOptions); // Muestra/Oculta opciones de filtro

  // Cambiamos la ruta a la correcta
  const handleCreateProject = () => navigate('/projects/create'); // Redirige a la pantalla de Crear Proyecto

  const projectsData = [
    {
      id: 1,
      code: 'PR-001',
      name: 'Proyecto A',
      priority: 'Alta',
      stage: 'Desarrollo',
      responsible: 'Juan Perez',
      startDate: '2023-09-01',
      endDate: '2023-10-15',
    },
    {
      id: 2,
      code: 'PR-002',
      name: 'Proyecto B',
      priority: 'Media',
      stage: 'Pruebas',
      responsible: 'Maria Gomez',
      startDate: '2023-08-15',
      endDate: '2023-09-30',
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft /> Regresar
        </button>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          <FaBars />
        </button>
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>Gestión de Proyectos</h1>

        <div className={styles.searchBar}>
          <button className={styles.filterButton} onClick={toggleFilterOptions}>
            <FaFilter />
          </button>
          <input type="text" placeholder="Buscar proyecto..." className={styles.searchInput} />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>

        {showFilterOptions && (
          <div className={styles.filterOptions}>
            <button>Pendientes</button>
            <button>Finalizados</button>
            <button>En progreso</button>
          </div>
        )}

        {showSidebar && (
          <aside className={styles.sidebar}>
            <button onClick={handleCreateProject} className={styles.sidebarButton}>
              Crear Proyecto
            </button>
          </aside>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre del Proyecto</th>
              <th>Prioridad</th>
              <th>Etapa</th>
              <th>Responsable</th>
              <th>Fecha Inicio</th>
              <th>Fecha Culminación</th>
              <th>acciones </th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project) => (
              <tr key={project.id}>
                <td>{project.code}</td>
                <td>{project.name}</td>
                <td>{project.priority}</td>
                <td>{project.stage}</td>
                <td>{project.responsible}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
