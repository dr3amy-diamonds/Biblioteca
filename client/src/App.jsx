import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegistro from "./pages/LoginRegister";
import MainLibrary from "./pages/MainLibrary";
import Menu from "./pages/Menu";
import Panel from "./pages/Panel";
import AvisoLegal from "./pages/AvisoLegal";
import Favoritos from "./pages/Favoritos";
import Evento from "./pages/Evento";

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
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/eventos" element={<Evento />} />
        {/* Rutas legales */}
        <Route path="/legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<AvisoLegal />} />
        <Route path="/terminos" element={<AvisoLegal />} />
        <Route path="/politicas" element={<AvisoLegal />} />
      </Routes>
    </Router>
  );
}

export default App;
