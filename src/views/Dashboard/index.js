import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaHouseUser, FaClipboard, FaList, FaPlus, FaCaretUp, FaSignOutAlt } from 'react-icons/fa';
import useApi from '../../hooks/useApi';
import './index.sass';

// Components
import Home from './Home';
import QuestionList from './Questions/List';
import QuestionAdd from './Questions/Add';

const navLinks = [
    {
        title: 'Główne',
        options: [
            {
                Icon: FaHouseUser,
                label: 'Strona główna',
                to: '/',
            },
            {
                Icon: FaClipboard,
                label: 'Panel',
                to: '/dashboard',
            },
        ]
    },
    {
        title: 'Pytania',
        permission: 'questions',
        options: [
            {
                Icon: FaList,
                label: 'Lista pytań',
                permission: 'questions-list',
                to: '/dashboard/questions/list',
            },
            {
                Icon: FaPlus,
                label: 'Dodaj pytanie',
                permission: 'questions-add',
                to: '/dashboard/questions/add',
            },
        ]
    },
];

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [isHamburgerAcitve, setHamburgerAcitve] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const navigate = useNavigate();
    const Api = useApi();

    useEffect(() => {
        Api('/fetchUser').then(res => {
            console.log(res)
            setUser(res);
        }).catch(err => {
            console.error(err);
            if (err === 'Unauthorized') navigate('/auth');
        });
    }, []);

    const handleLogout = () => {
        Api('/auth/logout', {
            method: 'POST'
        }).then(() => {
            navigate('/auth');
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div className={`dashboard ${isHamburgerAcitve ? 'hamburger-active' : ''}`}>
            <header className='dashboard-header'>
                <div className={`header-user ${isProfileActive ? 'header-user-active' : ''}`} onClick={() => setProfileActive(!isProfileActive)}>
                    <p className='header-user-name'>
                        {user?.login ? user?.login : "Nieznany"} <FaCaretUp />
                    </p>
                    <div className='header-user-dropdown'>
                        <div className="header-user-option" onClick={handleLogout}><FaSignOutAlt /> Wyloguj się</div>
                    </div>
                </div>
                <div className="dashboard-hamburger" onClick={() => setHamburgerAcitve(!isHamburgerAcitve)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
            <nav className="dashboard-nav">
                {navLinks.map((section, idx) => {
                    if (section.permission) {
                        const permissions = user?.permissions?.map(permission => permission.includes(section.permission));
                        if (permissions && permissions.length < 1) return null;
                    }
                    return (
                        <div className="nav-section" key={idx}>
                            <h1 className="nav-section-title">{section.title}</h1>
                            {section.options.map(({ to, permission, Icon, label }, idx) => (
                                !permission || user?.permissions?.includes(permission) ? (
                                    <Link key={idx} to={to} className={`nav-section-option ${window.location.pathname === to ? 'active' : ''}`}>
                                        <Icon /> {label}
                                    </Link>
                                ) : (null)
                            ))}
                        </div>
                    );
                })}
            </nav>
            <div className="dashboard-wrapper">
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="questions">
                            <Route path='list' element={<QuestionList />} />
                            <Route path='add' element={<QuestionAdd />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
