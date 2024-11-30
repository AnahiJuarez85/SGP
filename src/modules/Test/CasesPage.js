import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CaseModal from "./CaseModal";
import styles from "./CasesPage.module.css";
import axios from "axios";


const CasesPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({}); // Estado para los archivos subidos

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/test-cases/testplan/${planId}`
        );
        setCases(response.data);
        setFilteredCases(response.data);
      } catch (error) {
        console.error("Error al cargar casos de prueba:", error);
      }
    };

    fetchCases();
  }, [planId]);

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

  const [user, setUser] = useState(null); // Estado para verificar si el usuario está autenticado

  // Verificar si hay un usuario guardado en localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleUploadScript = async (file, testCaseId) => {
    if (!file) {
      alert("Por favor, selecciona un archivo antes de subir.");
      return;
    }

    const formData = new FormData();
    formData.append("script", file);
    formData.append("testCaseId", testCaseId);
    formData.append("uploadedBy", user.id); // ID de usuario fijo por ahora

    try {
      const response = await axios.post(
        "http://localhost:3001/api/automated/scripts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Script subido exitosamente.");
        // Actualiza el estado con el nombre del archivo subido
        setUploadedFiles((prev) => ({
          ...prev,
          [testCaseId]: file.name,
        }));
      } else {
        alert("Error al subir el script.");
      }
    } catch (error) {
      console.error("Error al subir el script:", error);
      alert("Error al subir el script.");
    }
  };

  const handleExecuteScript = async (testCaseId) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/automated/execute",
        {
          testCaseId: testCaseId,
          executedBy: user.id,
        }
      );

      if (response.status === 200) {
        alert("Script ejecutado exitosamente.");
      } else {
        alert("Error al ejecutar el script.");
      }
    } catch (error) {
      console.error("Error al ejecutar el script:", error);
      alert("Error al ejecutar el script.");
    }
  };

  const handleCreateCase = (newCase) => {
    setCases((prevCases) => [...prevCases, newCase]);
    setFilteredCases((prevCases) => [...prevCases, newCase]);
    setShowModal(false);
  };

  return (
    <div className={styles.casesPageContainer}>
      <header className={styles.casesPageHeader}>
        <button
          onClick={() => navigate("/test")}
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

      <button
        className={styles.casesPageCreateButton}
        onClick={() => setShowModal(true)}
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
                    <td>
                      {uploadedFiles[testCase.id] || "No se ha subido archivo"}
                    </td>
                    <td>
                      <button
                        className={styles.executeButton}
                        onClick={() => handleExecuteScript(testCase.id)}
                      >
                        Ejecutar
                      </button>
                      <button
                        className={styles.resultsButton}
                        onClick={() => navigate(`/results/${testCase.id}`)}
                      >
                        Ver Resultados
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.uploadScript}>
                <input
                  type="file"
                  accept=".js"
                  onChange={(e) =>
                    handleUploadScript(e.target.files[0], testCase.id)
                  }
                />
                <button
                  onClick={() =>
                    handleUploadScript(uploadedFiles[testCase.id], testCase.id)
                  }
                  className={styles.uploadButton}
                >
                  Subir Script
                </button>
              </div>
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
              onClick={() => setShowModal(false)}
              className={styles.casesPageModalCloseButton}
            >
              &times;
            </button>
            <CaseModal
              planId={planId}
              onSave={handleCreateCase}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
