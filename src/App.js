// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './modules/Home/Home';
import Users from './modules/Users/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
