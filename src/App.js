import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './modules/Home/Home';
import Users from './modules/Users/User';
import Projects from './modules/Projects/Projects';
import CreateProject from './modules/Projects/Crearproject/CreateProjectModal';
import Test from './modules/Test/test';
import Login from './modules/Login/Login';
import CasesPage from './modules/Test/CasesPage';
import ResultsPage from "./modules/Test/results/resultPage";

function App() {
  const [user, setUser] = useState(null); // Estado para verificar si el usuario está autenticado

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
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null); // Limpiar el usuario del estado
    localStorage.removeItem('user'); // Eliminar del localStorage
  };

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
        <Route path="/results/:caseId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
