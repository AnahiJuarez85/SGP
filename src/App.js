// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/Home/Home';
import Users from './modules/Users/User';
import Projects from './modules/Projects/Projects'; 
import CreateProject from './modules/Projects/Crearproject/Crearproject'; 
import Test from './modules/Test/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/Test" element={<Test />} /> 
        <Route path="/projects/create" element={<CreateProject />} /> 
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
