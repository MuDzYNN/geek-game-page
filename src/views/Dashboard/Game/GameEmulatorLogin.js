import { useEffect, useState, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const GameEmulatorLogin = () => {
    const [message, setMessage] = useState("");
    const [code, setCode] = useState(null);
    const wsRef = useRef(null);

    useEffect(() => {
        return () => {
            wsRef?.current?.close();
        }
    }, []);

    useEffect(() => {
        if (wsRef?.current?.readyState === 1) {

        } else {

        }
    }, [wsRef]);

    const handleSubmit = () => {
        const ws = new ReconnectingWebSocket('ws://localhost:3001/v1/websocket');
        ws.onerror = err => console.error(err);

        ws.onopen = () => {
            console.log('Connected to websocket!');
            wsRef.current = ws;
            setTimeout(() => ws.send(JSON.stringify({ action: 'LOGIN_SYSTEM_CODE_CHECK', code })), 10);
        };

        ws.onclose = () => {
            wsRef.current = null;
            console.log('Closed connection with websocket');
        };

        ws.onmessage = message => {
            const payload = JSON.parse(message.data);

            switch (payload.action) {
                case 'LOGIN_SYSTEM_DISPLAY_MESSAGE':
                    setMessage(payload.message);
                    if (payload.error) return ws.close();
                    setTimeout(() => {
                        if (ws.readyState !== 1) return;
                        ws.close();
                        setMessage('Upłynął limit czasu!');
                    }, 60 * 1000);
                    break;
                case 'LOGIN_SYSTEM_CODE_FINALLY':
                    console.log(payload.data);
                    setMessage(payload.message);
                    ws.close();
                    break;
                default:
                    break;
            }
        };
    }

    return (
        <>
            <h1 className='dashboard-title'>Emulator logowania</h1>
            <div className='game_login'>
                <p className='game_login-time'>Wprowadź kod logowania</p>
                <input type="number" id="login-code" onInput={e => setCode(e.target.value)} style={{ marginTop: '1rem' }} />
                <p className='game_login-time'>{message}</p>
                <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Zaloguj</button>
            </div>
        </>
    );
};

export default GameEmulatorLogin;
