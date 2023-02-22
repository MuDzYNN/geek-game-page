import Footer from '../components/Footer';
import Header from '../components/Header';
import './Download.sass';

const Download = () => {
    return (
        <div className="download">
            <Header />
            <div className="download-wrapper">
                <h2>Tutaj rozpoczyna się twoja przygoda</h2>
                <a href="https://api.geek-game.pl/v1/download" target="_blank" rel='noreferrer'>
                    <button className="btn">Pobierz</button>
                </a>
            </div>
            <Footer />
        </div>
    );
};

export default Download;
