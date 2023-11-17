
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CalendarioMetas from "../pages/CalendarioMetas";
import Login from "../pages/Login";
import Register from "../pages/Register";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/metas" element={<CalendarioMetas />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </BrowserRouter>
    );
}

export default RoutesApp;