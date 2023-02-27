import { useEffect, useState } from 'react';
import useApi from '../../../hooks/useApi';
import './History.sass';

const GameHistory = () => {
    const Api = useApi();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        Api('game/fetchHistory', {
            method: 'POST',
        }).then(res => {
            if (res.error) throw new Error(res.message);
            setHistory(res.data);
        })
    }, []);

    return (
        <>
            <h1 className='dashboard-title'>Historia gier</h1>

            <div className="history">
                <h3>Twoje 10 ostatnich gier</h3>
                <table>
                    <thead>
                        <tr>
                            <td>-</td>
                            <td>Wynik</td>
                            <td>Czas (s)</td>
                            <td>Data</td>
                            <td>Tryb gry</td>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((game, idx) => (
                            <tr key={game.timestamp}>
                                <td>{idx + 1}</td>
                                <td>{game.score}</td>
                                <td>{game.duration}</td>
                                <td>{new Date(game.timestamp).toUTCString()}</td>
                                <td>{game.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GameHistory;
