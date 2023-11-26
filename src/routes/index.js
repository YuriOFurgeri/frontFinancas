import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CalendarioMetas from "../pages/CalendarioMetas";
//import Login from "../pages/Login2";
import Register from "../pages/Register";
//import Registro from "../pages/Registro";
import Login from "../pages/Login";
//import Detalhes from "../pages/Detalhes";
import Perfil from "../pages/Perfil";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/movimentacoes" element={<MainPage />} />
                <Route path="/metas" element={<CalendarioMetas />}/>
                {/*<Route path="/login" element={<Login />} />*/}
                
                <Route path="/registro" element={<Register />} />

                <Route path="/" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
            
            </Routes>

        </BrowserRouter>
    );
}

export default RoutesApp;