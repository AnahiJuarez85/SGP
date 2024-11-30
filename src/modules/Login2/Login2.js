import React, { useState } from "react";
import styles from './Login2.module.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
 

    try {
      const response = await fetch(`${API_URL}api/usuarios/login`, { // Ruta ajustada para la API de login
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Datos enviados al servidor
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data); // Si es exitoso, llama al callback
      } else {
        setError(data.error || "Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error al intentar iniciar sesión. Por favor, intenta más tarde.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        {error && <div className={styles.error}>{error}</div>} {/* Muestra errores */}
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              className={styles.input}
              id="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              className={styles.input}
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
