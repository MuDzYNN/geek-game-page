import { useState } from 'react';
import Api from '../libs/api';
import './Login.sass';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState('');


    const handleForm = e => {
        e.preventDefault();
        const newFormData = { ...formData };
        newFormData[e.target.id] = e.target.value;
        setFormData(newFormData);
    }

    const submitForm = e => {
        e.preventDefault();

        if (!formData['login']) setFormError('Uzupełnij pole login');
        if (!formData['password']) setFormError('Uzupełnij pole hasło');

        Api('login', {
            method: 'POST',
            body: JSON.stringify(formData)
        }).then(res => {
            setFormError('');
            if (res.error) return setFormError(res.message);
            setFormError('Zalogowano');
        }).catch(error => {
            console.error(error);
            setFormError(error.message);
        });
    }

    return (
        <form className="login" onInput={handleForm} onSubmit={submitForm}>
            <h1>Login</h1>

            <p>Login</p>
            <input type="text" id="login" placeholder='Login' />
            <p>Hasło</p>
            <input type="password" id="password" placeholder='Hasło' />

            <p className='login-error'>{formError}</p>

            <button>Zaloguj się</button>
        </form>
    );
};

export default Login;
