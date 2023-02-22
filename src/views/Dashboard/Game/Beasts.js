import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userDashboard from '../../../atoms/dashboardUser'
import useApi from '../../../hooks/useApi';
import './Beasts.sass';

const Beasts = () => {
    const user = useRecoilValue(userDashboard);
    const [gamemodes, setGamemodes] = useState([]);
    const [selectedGamemode, setSelectedGamemode] = useState(null);
    const [beasts, setBeasts] = useState([]);
    const [myBeast, setMyBeast] = useState([]);
    const Api = useApi();

    useEffect(() => {
        // Fetch gamemodes
        Api('game/fetchGamemodes').then(res => {
            if (res.error) throw new Error(res.message);
            setGamemodes(res.data);
            handleGamemode(res.data[0].id);
        });
    }, []);

    useEffect(() => {
        if (!selectedGamemode) return;

        Api('game/fetchOneBest', {
            method: 'POST',
            body: JSON.stringify({
                userId: user.id,
                gamemode: selectedGamemode,
            })
        }).then(res => {
            if (res.error) throw new Error(res.message);
            setMyBeast(res.data?.score ?? 'Brak');
        });
    }, [selectedGamemode]);

    const handleGamemode = (gamemode) => {
        Api('game/fetchBest', {
            method: 'POST',
            body: JSON.stringify({
                gamemode,
            }),
        }).then(res => {
            if (res.error) throw new Error(res.message);
            setBeasts(res.data);
            setSelectedGamemode(gamemode);
        });
    };

    return (
        <>
            <h1 className='dashboard-title'>Rekordy</h1>
            <div className='beasts'>
                <header>
                    <p>Tryb rozgrywki</p>
                    <select name="gamemode" onChange={e => handleGamemode(e.target.value)}>
                        {gamemodes.map(gamemode => (
                            <option value={gamemode.id} key={gamemode.id}>{gamemode.name} - {gamemode.label}</option>
                        ))}
                    </select>
                </header>
                <table>
                    <thead>
                        <tr>
                            <td>-</td>
                            <td>Użytkownik</td>
                            <td>Wynik</td>
                            <td>Data</td>
                        </tr>
                    </thead>
                    <tbody>
                        {beasts.map((beast, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{beast.login}</td>
                                <td>{beast.score}</td>
                                <td>{new Date(beast.timestamp).toUTCString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Twój najlepszy wynik w trybie {gamemodes?.find(g => g.id === selectedGamemode)?.name}: {myBeast}</h3>
            </div>
        </>
    );
};

export default Beasts;
