import Footer from '../components/Footer';
import Header from '../components/Header';
import './Download.sass';

const Download = () => {
    return (
        <div className="download">
            <Header />
            <div className="download-wrapper">
                <h2>Rozpocznij pobieranie</h2>
                <a href="https://api.geek-game.pl/v1/download" target="_blank" rel='noreferrer'>
                    <button className="btn">Pobierz (Windows)</button>
                </a>
                <p>Twój antywirus, może uznać instalator za wirusa. Ale zaufaj na słowo, jesteś w 100% bezpieczny :)</p>
                <p>Mininalne wymagania sprzętowe: przysłowiony toster.</p>
                <p>Na słabszych komputerach może wystąpić problem z niezaliczaniem odpowiedzi, podczas przechodzenia przez bramkę. W takiej sytuacji lepiej jest nie przyśpieszać podczas przechodzenia przez nie. Lepsze komputery są bezpieczniejsze. Staramy się poprawić ten błąd.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Download;
