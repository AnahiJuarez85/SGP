import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./resultsPage.module.css";

const ResultsPage = () => {
  const { caseId } = useParams(); 
  const navigate = useNavigate();
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!caseId) {
          setError("El ID del caso no está definido en la URL.");
          setLoading(false);
          return;
        }

        console.log("Llamando al backend con caseId:", caseId);

        const response = await axios.get(
          `http://localhost:3001/api/test-result/results/testcase/${caseId}`
        );


        const actualResults = response.data[0];

        if (Array.isArray(actualResults) && actualResults.length > 0) {
          setResults(actualResults); 
        } else {

          setError("No se encontraron resultados.");
        }
      } catch (error) {

        setError("No se pudieron cargar los scripts.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [caseId]);

  if (loading) {
    return <p className={styles.loadingMessage}>Cargando resultados...</p>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.resultsPageContainer}>
      <header className={styles.resultsPageHeader}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Regresar
        </button>
      </header>

      <h1 className={styles.resultsPageTitle}>
        Resultados del Caso ID: {caseId}
      </h1>

      <div className={styles.resultsGrid}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={result.id} className={styles.resultCard}>
              <h3 className={styles.resultTitle}>Resultado #{index + 1}</h3>
              <p>
                <strong>Estado:</strong> {result.status || "No especificado"}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {result.created_at
                  ? new Date(result.created_at).toLocaleString()
                  : "Fecha no disponible"}
              </p>
              <p>
                <strong>Tiempo de ejecución:</strong>{" "}
                {result.execution_time
                  ? `${result.execution_time}s`
                  : "No especificado"}
              </p>
              <p>
                <strong>Mensaje de error:</strong>{" "}
                {result.error_message || "Sin errores"}
              </p>
              <p>
                <strong>Ejecutado por:</strong>{" "}
                {result.executed_by
                  ? `Usuario ID: ${result.executed_by}`
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.noResultsMessage}>
            No hay resultados disponibles para este caso.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
