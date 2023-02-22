import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import './Login.sass';

const GameLogin = () => {
    const [code, setCode] = useState(null);
    const [codeTime, setCodeTime] = useState(null);
    const [wsState, setWsState] = useState(null);
    const [loginDetails, setLoginDetails] = useState(null);
    const navigate = useNavigate();
    const timeRef = useRef(null);

    useEffect(() => {
        const ws = new ReconnectingWebSocket(process.env.REACT_APP_API_WEBSOCKET_URL);
        ws.onerror = err => console.error(err);

        ws.onopen = () => {
            console.log('Connected to websocket!');
            setWsState(ws);
            setLoginDetails(null);
            setTimeout(() => ws.send(JSON.stringify({ action: 'LOGIN_SYSTEM_REGISTER' })), 10);
        };

        ws.onclose = () => {
            if (timeRef.current) clearInterval(timeRef.current);
            setWsState(null);
            console.log('Closed connection with websocket');
        };

        ws.onmessage = message => {
            const payload = JSON.parse(message.data);

            switch (payload.action) {
                case 'LOGIN_SYSTEM_UPDATE_CODE':
                    setCode(payload.code);
                    break;
                case 'LOGIN_SYSTEM_ASK_LOGIN':
                    setLoginDetails(payload.data);
                    break;
                default:
                    break;
            }
            console.log(payload);
        };

        return () => {
            if (timeRef.current) clearInterval(timeRef.current);
            ws.close();
            setWsState(null);
        }
    }, []);

    useEffect(() => {
        if (!code) return;
        if (timeRef.current) clearInterval(timeRef.current);

        const generateTime = new Date();

        timeRef.current = setInterval(() => {
            const timeLeft = 60 - Math.floor((new Date() - generateTime) / 1000);
            if (codeTime !== timeLeft) setCodeTime(timeLeft);
        }, 100);
    }, [code]);

    const handleLogin = (state) => {
        wsState?.send(JSON.stringify({ action: 'LOGIN_SYSTEM_CODE_RESPONSE', data: { state } }));
    }

    return (
        <>
            <h1 className='dashboard-title'>Kod logowania</h1>
            <div className='game_login'>
                {wsState?.readyState === 1 ? (
                    <>
                        <p className='game_login-code'>{code ? code : '...'}</p>
                        <progress className='progress' min="0" max="60" value={codeTime ? codeTime : '0'}></progress>
                        <p className='game_login-time'>{codeTime ? (
                            `0:${codeTime.toString().length > 1 ? codeTime : '0' + codeTime}`
                        ) : '0:00'}</p>
                    </>
                ) : loginDetails ? (
                    navigate('/dashboard')
                ) : <p>Brak połączenia z serwerem!</p>}
            </div>
            {loginDetails ? (
                <div className="game_login-ask-container">
                    <div className="game_login-ask">
                        <h1>Nowe logowanie</h1>
                        <p>Adres IP: {loginDetails?.ip ? loginDetails.ip : 'Nieznany'}</p>
                        <p>Lokalizacja: {loginDetails?.location ? loginDetails.location : 'Nieznana'}</p>
                        <div className="game_login-ask-buttons">
                            <button className='btn btn-green' onClick={() => handleLogin(true)}>Akceptuj</button>
                            <button className='btn btn-red' onClick={() => handleLogin(false)}>Odrzuć</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default GameLogin;
