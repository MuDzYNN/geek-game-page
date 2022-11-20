import { Routes, Route } from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

// Stylesheets
import './stylesheets/input.sass';

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default App;
