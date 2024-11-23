import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseModal from './CaseModal'; // Formulario de creación de casos
import styles from './CasesPage.module.css';

const CasesPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del formulario

  // Cargar casos de prueba desde el backend
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/test-cases/testplan/${planId}`);
        if (!response.ok) {
          throw new Error('Error al cargar casos de prueba');
        }
        const casesData = await response.json();
        setCases(casesData);
        setFilteredCases(casesData); // Inicializa los casos filtrados
      } catch (error) {
        console.error('Error al cargar casos:', error);
      }
    };

    fetchCases();
  }, [planId]);

  // Filtrar los casos según el término de búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCases(cases);
    } else {
      const filtered = cases.filter((testCase) =>
        testCase.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCases(filtered);
    }
  }, [searchTerm, cases]);

  // Función para guardar un nuevo caso creado en CaseModal
  const handleCreateCase = (newCase) => {
    setCases((prevCases) => [...prevCases, newCase]); // Agrega el caso a la lista
    setFilteredCases((prevCases) => [...prevCases, newCase]); // Actualiza los casos filtrados
    setShowModal(false); // Cierra el modal
  };

  return (
    <div className={styles.casesPageContainer}>
      <header className={styles.casesPageHeader}>
        <button
          onClick={() => navigate('/test')}
          className={styles.casesPageBackButton}
        >
          Regresar
        </button>
      </header>

      <h1 className={styles.casesPageTitle}>Casos del Plan ID: {planId}</h1>

      <div className={styles.casesPageSearchContainer}>
        <input
          type="text"
          placeholder="Buscar caso de prueba..."
          className={styles.casesPageSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.casesPageSearchButton}>Buscar</button>
      </div>

      {/* Botón para abrir el formulario */}
      <button
        className={styles.casesPageCreateButton}
        onClick={() => setShowModal(true)} // Muestra el modal
      >
        Crear Caso
      </button>

      <div className={styles.casesCardsContainer}>
        {filteredCases.length > 0 ? (
          filteredCases.map((testCase) => (
            <div key={testCase.id} className={styles.card}>
              <h3 className={styles.cardTitle}>Caso ID: {testCase.id}</h3>
              <div className={styles.cardContent}>
                <p><strong>Descripción:</strong> {testCase.description}</p>
                <p><strong>Estado:</strong> {testCase.status}</p>
              </div>
              <table className={styles.cardTable}>
                <thead>
                  <tr>
                    <th>Archivo</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>archivo.txt</td>
                    <td>
                      <button className={styles.executeButton}>Ejecutar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className={styles.noCasesMessage}>No hay casos disponibles.</p>
        )}
      </div>

      {showModal && (
        <div className={styles.casesPageModal}>
          <div className={styles.casesPageModalContent}>
            <button
              onClick={() => setShowModal(false)} // Cierra el modal
              className={styles.casesPageModalCloseButton}
            >
              &times;
            </button>
            <CaseModal
              planId={planId} // Asocia el caso al plan actual
              onSave={handleCreateCase} // Llama a la función para agregar el nuevo caso
              onCancel={() => setShowModal(false)} // Cierra el modal al cancelar
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
