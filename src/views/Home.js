import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaDiscord } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { MdMail } from 'react-icons/md';
import { NavHashLink } from 'react-router-hash-link';
import './Home.sass';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const [isHamburgerActive, setHeaderActive] = useState(false);

    return (
        <div className="home">
            <Header />
            <div className="hero" data-aos="fade-up">
                <h1>A co to za gra?</h1>
                <h2>Nic szczególnego, ale możesz sprawdzić sam ;D</h2>
                <Link to="/auth"><div className="btn">Przejdź do panelu</div></Link>
            </div>
            <section id="game" data-aos="fade-up">
                <h1 className='title'>Kilka słów o grze</h1>
                <div className="game">
                    <img src="https://cdn.discordapp.com/attachments/1035612501078974474/1060970004394278992/uklad_1.png" alt="" data-aos="fade-right" />
                    <div className="game-wrapper" data-aos="fade-left">
                        <h2>Z czym to się je?</h2>
                        <FaGamepad />
                        <p>Sama gra jest formą Quizu w formie speedrun. Przemiarzasz bezdroże jednoczeście odpowiadając na pytania. To na prawde bajecznie proste!</p>
                        <Link to="/download"><div className="btn">POBIERAM!</div></Link>
                    </div>
                </div>
            </section>
            <section id="about" data-aos="fade-up">
                <h1 className='title'>O autorach</h1>
                <div className="about-wrapper">
                    <h2>Kim jesteśmy</h2>
                    <RiTeamFill />
                    <p>Jesteśmy uczniami Zespołu Szkół nr. 2 im. Bartosza Głowackiego w Krasnymstawie. Uczymy się na kierunku technik informatyk. Projekt gry tworzymy hobbistycznie. Jednocześnie cieszymy się, że możemy reprezentować szkołe w ogólnopolskim konkursie.</p>
                </div>
            </section>
            <section id="contact" data-aos="fade-up">
                <h1 className='title'>Kontakt</h1>
                <div className="contact-wrapper">
                    <h2>Tu nasz znajdziesz</h2>
                    <p>Jeśli masz jakieś pytania, propozycję. Pisz śmiało, odezwiemy się ;)</p>
                    <div className="inline">
                        <div data-aos="fade-right">
                            <FaDiscord />
                            <p>MuDzYn.#0420</p>
                        </div>
                        <div data-aos="fade-up">
                            <a href="mailto:kontakt@geek-game.pl">
                                <MdMail />
                                <p>kontakt@geek-game.pl</p>
                            </a>
                        </div>
                        <div data-aos="fade-left">
                            <FaDiscord />
                            <p>lkata#2186</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    )
};

export default Home;
