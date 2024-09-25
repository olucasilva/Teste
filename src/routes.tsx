import { Route, Routes } from "react-router-dom";
// import Profile from "./pages/Profile";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AppContext } from "./components/Context/AppContext";
import { useContext } from "react";
import { Settings } from "./pages/Settings";

const MainRoutes = () => {
    const { token } = useContext(AppContext)
    return (
        <Routes>
            <Route path="/" element={token != "" ? <Dashboard /> : <Login />} />
            <Route path="/settings" element={token != "" ? <Settings /> : <NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;