import { Routes, Route } from "react-router-dom";

import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

// Stylesheets
import './stylesheets/input.sass';

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default App;
