import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./views/Login";

// Stylesheets
import './stylesheets/input.sass';

const App = () => {
    const navigate = useNavigate();
    const isLoggedIn = false;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            console.log(123)
        }
    }, [isLoggedIn, navigate]);

    return (
        <Routes>
            <Route path="/">
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default App;
