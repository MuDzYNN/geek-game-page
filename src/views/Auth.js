import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import './Auth.sass';

const Auth = () => {
    const [loginData, setLoginData] = useState({});
    const [loginError, setLoginError] = useState('');
    const [registerData, setRegisterData] = useState({});
    const [acceptedTos, setAcceptedTos] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const registerForm = useRef();
    const navigate = useNavigate();
    const Api = useApi();

    useEffect(() => {
        Api('/fetchUser').then(res => {
            if (res.error) throw new Error(res.message ?? "Unkown error");
            navigate('/dashboard');
        }).catch(() => {
            console.log('User not logged in');
        });
    }, []);

    const handleLogin = e => {
        e.preventDefault();
        const newLoginData = { ...loginData };
        newLoginData[e.target.className] = e.target.value;
        setLoginData(newLoginData);
        setRegisterError('');
    }

    const submitLogin = e => {
        e.preventDefault();

        if (!loginData.login) return setLoginError('Uzupełnij pole login');
        if (!loginData.password) return setLoginError('Uzupełnij pole hasło');

        Api('auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData)
        }).then(res => {
            setLoginError('');
            if (res?.error) return setLoginError(res.message);
            navigate('/dashboard');
        }).catch(error => {
            console.error(error);
            setLoginError(error);
        });
    }

    const handleRegister = e => {
        const newRegisterData = { ...registerData };
        newRegisterData[e.target.className] = e.target.value;
        setRegisterData(newRegisterData);
        setLoginError('');
    }

    const submitRegister = e => {
        e.preventDefault();

        if (!registerData.login) return setRegisterError('Uzupełnij pole login');
        if (!registerData.email) return setRegisterError('Uzupełnij pole Email');
        if (!registerData.password) return setRegisterError('Uzupełnij pole hasło');
        if (!acceptedTos) return setRegisterError('Musisz zaakceptować warunki regulaminu');
        if (registerData.login.length < 5) return setRegisterError('Login musi zawierać conamniej 5 znaków');
        if (registerData.login.length > 30) return setRegisterError('Login może zawierać maksymalnie 20 znaków');
        if (registerData.password.length < 8) return setRegisterError('Hasło musi zawierać conamniej 8 znaków');
        if (registerData.password.length > 55) return setRegisterError('Hasło może zawierać maksymalnie 55 znaków');

        Api('auth/register', {
            method: 'POST',
            body: JSON.stringify(registerData)
        }).then(res => {
            setRegisterError(res.message);
            registerForm?.current?.reset();
        }).catch(error => {
            console.error(error);
            setRegisterError(error);
        });
    }

    return (
        <div className="auth">
            <form className="login" onInput={handleLogin}>
                <h1>Zaloguj się</h1>

                <p>Login</p>
                <input type="text" className="login" placeholder='Login' />
                <p>Hasło</p>
                <input type="password" className="password" placeholder='Hasło' />

                <p className='form-error'>{loginError}</p>

                <button onClick={submitLogin}>Zaloguj się</button>
            </form>
            <form className="register" onInput={handleRegister} ref={registerForm}>
                <h1>Zarejestruj się</h1>

                <p>Login</p>
                <input type="text" className="login" placeholder='Login' />
                <p>Adres e-mail</p>
                <input type="email" className="email" placeholder='Adres e-mail' />
                <p>Hasło</p>
                <input type="password" className="password" placeholder='Hasło' required={true} />

                <p><input type="checkbox" name="rules" id="rules" onChange={() => setAcceptedTos(!acceptedTos)} /> Akceptuję <Link to="/tos"><u>regulamin</u></Link></p>

                <p className='form-error'>{registerError}</p>

                <button onClick={submitRegister}>Zarejestuj się</button>
            </form>
        </div>
    );
};

export default Auth;
