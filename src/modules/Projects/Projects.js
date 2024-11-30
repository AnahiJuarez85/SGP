import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaEdit, FaTrashAlt, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import styles from './Projects.module.css';
import CreateProjectModal from './Crearproject/CreateProjectModal';

const URL = process.env.REACT_APP_API_URL;
 

const API_URL = `${URL}api/proyectos`;
const USERS_API_URL = `${URL}api/usuarios`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setFilteredProjects(response.data); // Initialize with all projects
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      alert('Hubo un error al cargar los proyectos.');
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Hubo un error al cargar los usuarios.');
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // Open the modal to create a project
  const handleCreateProject = () => {
    setSelectedProject(null);
    setShowModal(true);
  };

  // Open the modal to edit a project
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Delete a project
  const handleDeleteProject = async (projectId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        await axios.delete(`${API_URL}/delete/${projectId}`);
        const updatedProjects = projects.filter((project) => project.id !== projectId);
        setProjects(updatedProjects);
        setFilteredProjects(updatedProjects);
        alert('Proyecto eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        alert('Hubo un error al eliminar el proyecto.');
      }
    }
  };

  // Filter projects by status
  const handleFilterByStatus = (status) => {
    if (status) {
      const filtered = projects.filter((project) => project.status.toLowerCase() === status.toLowerCase());
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects); // Reset to all projects if no status is selected
    }
    setShowFilterOptions(false); // Close filter options
  };

  // Search projects by name
  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const getUserNameById = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.username : 'N/A';
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchProjects();
  };

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft /> Regresar
        </button>
        <button onClick={handleCreateProject} className={styles.createButton} aria-label="Crear Proyecto">
          <FaPlus />
        </button>
      </header>

      <div className={styles.searchBar}>
        <button
          onClick={() => setShowFilterOptions((prev) => !prev)}
          className={styles.filterButton}
          aria-label="Abrir Filtros"
        >
          <FaFilter />
        </button>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar proyecto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className={styles.searchButton} aria-label="Buscar Proyecto">
          <FaSearch />
        </button>
      </div>

      {showFilterOptions && (
        <div className={styles.filterOptions}>
          <button onClick={() => handleFilterByStatus('Activo')}>Activo</button>
          <button onClick={() => handleFilterByStatus('En_progreso')}>En Progreso</button>
          <button onClick={() => handleFilterByStatus('Finalizado')}>Finalizado</button>
          <button onClick={() => handleFilterByStatus('Cancelado')}>Cancelado</button>
          <button onClick={() => handleFilterByStatus('')}>Todos</button>
        </div>
      )}

      <h1 className={styles.title}>Gestión de Proyectos</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Etapa</th>
            <th>Responsable</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>{getUserNameById(project.created_by)}</td>
                <td>{new Date(project.start_date).toLocaleDateString('en-CA')}</td>
                <td>{new Date(project.end_date).toLocaleDateString('en-CA')}</td>
                <td>
                  <button
                    onClick={() => handleEditProject(project)}
                    className={styles.editButton}
                    aria-label="Editar proyecto"
                  >
                    <FaEdit />
                  </button>
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay proyectos para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <CreateProjectModal
          project={selectedProject}
          onClose={handleModalClose}
          users={users}
        />
      )}
    </div>
  );
};

export default Projects;
