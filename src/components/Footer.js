import './Footer.sass';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-wrapper">
                <p>geek-game.pl &copy; 2023-{new Date().getFullYear()}</p>
                <p>Wszelkie prawa zastrzeżone</p>
            </div>
        </footer>
    );
};

export default Footer;
