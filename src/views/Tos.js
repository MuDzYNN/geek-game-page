import Header from '../components/Header';
import Footer from '../components/Footer';
import './Tos.sass';

const Tos = () => {
    return (
        <div className="tos">
            <Header />
            <div className="tos-wrapper">
                <ul>
                    <li>Korzystając ze strony akceptujesz regulamin.</li>
                    <li>Wszystkie dane osobowe są przechowywane na chronionym serwerze.</li>
                    <li>Dane gromadzone są tylko i wyłącznie w celu obsługi konta.</li>
                    <li>Dane nigdy nie zostaną wykorzystane w inny sposób.</li>
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default Tos;
