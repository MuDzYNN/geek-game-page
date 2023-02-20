import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from 'aos';

// Components
import Home from "./views/Home";
import Download from "./views/Download";
import Tos from "./views/Tos";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

// Stylesheets
import 'aos/dist/aos.css';
import './stylesheets/btn.sass';
import './stylesheets/input.sass';
import './stylesheets/progress.sass';

const App = () => {
    const [isCookiesAccepted, setCookiesAccepted] = useState(localStorage.getItem('cookies') === 'true');

    const handleCookies = () => {
        setCookiesAccepted(true);
        localStorage.setItem('cookies', true);
    }

    useEffect(() => {
        AOS.init();
    });

    return (
        <>
            {!isCookiesAccepted ? (
                <div className="cookies" data-aos="fade-up">
                    <p>Ta strona korzysta z plików Cookies aby świadczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.</p>
                    <button className="btn" onClick={handleCookies}>Zgoda</button>
                </div>
            ) : null}
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/tos" element={<Tos />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
