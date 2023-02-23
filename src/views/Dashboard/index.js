import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaHouseUser, FaClipboard, FaList, FaPlus, FaCaretUp, FaSignOutAlt, FaHistory, FaQuestion } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import userDashboard from '../../atoms/dashboardUser';
import useApi from '../../hooks/useApi';
import './index.sass';

// Components
import DashboardHome from './Home';
import QuestionList from './Questions/List';
import QuestionAdd from './Questions/Add';
import QuestionPropositions from './Questions/Propositions';
import GameLogin from './Game/Login';
import GameEmulatorLogin from './Game/GameEmulatorLogin';
import GameHistory from './Game/History';
import Beasts from './Game/Beasts';

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
        title: 'Gra',
        options: [
            {
                Icon: FaSignInAlt,
                label: 'Logowanie w grze',
                to: '/dashboard/game/login',
            },
            // {
            //     Icon: FaSignInAlt,
            //     label: 'Emulator logowania z gry',
            //     to: '/dashboard/game/game-login',
            // },
            {
                Icon: FaHistory,
                label: 'Historia gier',
                to: '/dashboard/game/history',
            },
            {
                Icon: BiStats,
                label: 'Rekordy',
                to: '/dashboard/game/beasts',
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
            {
                Icon: FaQuestion,
                label: 'Propozycje pytań',
                permission: 'questions-propositions',
                to: '/dashboard/questions/propositions',
            },
        ]
    },
];

const Dashboard = () => {
    const [user, setUser] = useRecoilState(userDashboard);
    const [isHamburgerAcitve, setHamburgerAcitve] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const navigate = useNavigate();
    const Api = useApi();

    useEffect(() => {
        Api('/fetchUser').then(res => {
            if (res.error) throw new Error(res.message ?? "Unkown error");
            setUser(res.data.user);
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
                                (!permission || user?.permissions?.includes(permission)) ? (
                                    <Link key={idx} to={to} className={`nav-section-option ${window.location.pathname === to ? 'active' : ''}`}>
                                        <Icon /> {label}
                                    </Link>
                                ) : (null)
                            )
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="dashboard-wrapper">
                <Routes>
                    <Route path="/">
                        <Route index element={<DashboardHome />} />
                        <Route path="questions">
                            <Route path='list' element={<QuestionList />} />
                            <Route path='add' element={<QuestionAdd apiUrl='questions/add' />} />
                            <Route path='Propositions' element={<QuestionPropositions />} />
                        </Route>
                        <Route path="game">
                            <Route path='login' element={<GameLogin />} />
                            <Route path='game-login' element={<GameEmulatorLogin />} />
                            <Route path='history' element={<GameHistory />} />
                            <Route path='beasts' element={<Beasts />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
