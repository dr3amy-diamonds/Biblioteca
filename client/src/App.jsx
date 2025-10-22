import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegistro from "./pages/LoginRegister";
import MainLibrary from "./pages/MainLibrary";
import Menu from "./pages/Menu";
import Panel from "./pages/Panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegistro />} />
        <Route path="/MainLibrary" element={<MainLibrary />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/categorias" element={<MainLibrary />} />
        <Route path="/libros" element={<MainLibrary />} />
        <Route path="/autores" element={<MainLibrary />} />
        <Route path="/categories" element={<MainLibrary />} />
        <Route path="/colecciones" element={<MainLibrary />} />
        <Route path="/recomendados" element={<MainLibrary />} />
        <Route path="/page/:pageNumber" element={<MainLibrary />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </Router>
  );
}

export default App;
