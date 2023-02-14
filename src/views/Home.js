import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.sass';

const Home = () => {
    const [isHamburgerActive, setHeaderActive] = useState(false);

    return (
        <div className="home">
            <header data-active={isHamburgerActive}>
                <a href="/"><h3>geek-game</h3></a>
                <div className="hamgurger" onClick={() => setHeaderActive(!isHamburgerActive)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav>
                    <Link to="/"><p>Gra</p></Link>
                    <Link to="/"><p>O autorach</p></Link>
                    <Link to="/"><p>Kontakt</p></Link>
                    <Link to="/dashboard"><p className='btn'>Panel</p></Link>
                </nav>
            </header>
            <div className="hero">
                <h1>A co to za gra?</h1>
                <h2>Nic szczególnego, ale możesz sprawdzić sam ;D</h2>
                <Link to="/auth"><div className="btn">Przejdź do panelu</div></Link>
            </div>
            <section id="game">
                <h1 className='title'>Kilka słów o grze</h1>
                <div className="game">
                    <img src="https://cdn.discordapp.com/attachments/1035612501078974474/1060970004394278992/uklad_1.png" alt="" />
                    <div className="game-wrapper">
                        <h1>Z czym to się je?</h1>
                        <p>Sama gra jest formą Quizu w formie speedrun. Przemiarzasz bezdroże jednoczeście odpowiadając na pytania. To na prawde bajecznie proste!</p>
                        <p>Nasza gra powstała jako forma zgłoszenia do konkursu.</p>
                        <Link to="/download"><div className="btn">POBIERAM!</div></Link>
                    </div>
                </div>
            </section>
            <section id=""></section>
        </div>
    )
};

export default Home;
