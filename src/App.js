import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './modules/Home/Home';
import Users from './modules/Users/User';
import Projects from './modules/Projects/Projects';
import CreateProject from './modules/Projects/Crearproject/CreateProjectModal';
import Test from './modules/Test/test';
import Login from './modules/Login/Login';
import Cases from './modules/Test/CasesPage'
import CasesPage from './modules/Test/CasesPage';

function App() {
  const [user, setUser] = useState(null); // Estado para verificar si el usuario está autenticado
  const [timer, setTimer] = useState(null); // Temporizador para controlar inactividad

  // Verificar si hay un usuario guardado en localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser); // Guardar al usuario autenticado
    localStorage.setItem('user', JSON.stringify(loggedInUser)); // Guardar en localStorage
    resetTimer(); // Inicia o reinicia el temporizador de inactividad
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null); // Limpiar el usuario del estado
    localStorage.removeItem('user'); // Eliminar del localStorage
    clearTimeout(timer); // Limpia el temporizador
  };

  // Función para resetear el temporizador de inactividad
  const resetTimer = useCallback(() => {
    if (timer) {
      clearTimeout(timer); // Limpia el temporizador anterior
    }
    const newTimer = setTimeout(() => {
      handleLogout(); // Cierra sesión automáticamente tras 3 minutos
    }, 180000); // 180,000 ms = 3 minutos
    setTimer(newTimer); // Actualiza el temporizador
  }, [timer]);

  // Agregar listeners para eventos de actividad del usuario
  useEffect(() => {
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    // Limpieza de listeners al desmontar el componente
    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timer); // Limpia el temporizador si está activo
    };
  }, [resetTimer, timer]);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Ruta del login */}
        <Route
          path="/Login"
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={user ? <Home onLogout={handleLogout} /> : <Navigate to="/Login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/Login" />}
        />
        <Route
          path="/projects"
          element={user ? <Projects /> : <Navigate to="/Login" />}
        />
        <Route
          path="/projects/create"
          element={user ? <CreateProject /> : <Navigate to="/Login" />}
        />
        <Route
          path="/test"
          element={user ? <Test /> : <Navigate to="/Login" />}
        />

         <Route 
          path="/cases/:planId" 
          element={user ? <CasesPage /> : <Navigate to="/Login" />} 
        />

        {/* Redirección de rutas no válidas */}
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
