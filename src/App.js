import { Routes, Route } from "react-router-dom";

import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

// Stylesheets
import './stylesheets/btn.sass';
import './stylesheets/input.sass';
import './stylesheets/progress.sass';
import Home from "./views/Home";

const App = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default App;
