import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useApi from '../../../hooks/useApi';
import './Add.sass';

const QuestionAdd = ({ apiUrl, captcha = false }) => {
    const defaultFormData = { goodAnswers: [""], wrongAnswers: [""] }
    const [formData, setFormData] = useState(defaultFormData);
    const [formError, setFormError] = useState("");
    const formElement = useRef(null);
    const captchaRef = useRef(null);
    const Api = useApi();

    useEffect(() => {
        console.log(process.env.REACT_APP_SITE_KEY)
        console.log(process.env.REACT_APP_SECRET_KEY)
        return () => {
            captchaRef.current.reset();
        }
    }, []);

    const handleForm = e => {
        const newFormData = { ...formData };

        if (e.target.id.includes('goodAnswer_')) {
            const id = Number(e.target.id.replace('goodAnswer_', ''));
            newFormData.goodAnswers[id] = e.target.value;
            if (newFormData.goodAnswers[newFormData.goodAnswers.length - 1] !== '') newFormData.goodAnswers.push("");
        } else if (e.target.id.includes('wrongAnswer_')) {
            const id = Number(e.target.id.replace('wrongAnswer_', ''));
            newFormData.wrongAnswers[id] = e.target.value;
            if (newFormData.wrongAnswers[newFormData.wrongAnswers.length - 1] !== '') newFormData.wrongAnswers.push("");
        } else {
            newFormData[e.target.id] = e.target.value;
        }

        setFormData({ ...newFormData });
        setFormError("");
    }

    const handleBlur = e => {
        if (e.target.value.trim() !== '') return;
        const newFormData = { ...formData };

        if (e.target.id.includes('goodAnswer_')) {
            const id = Number(e.target.id.replace('goodAnswer_', ''));
            if (newFormData.goodAnswers.length !== id + 1) newFormData.goodAnswers[id] = null;
        } else if (e.target.id.includes('wrongAnswer_')) {
            const id = Number(e.target.id.replace('wrongAnswer_', ''));
            if (newFormData.wrongAnswers.length !== id + 1) newFormData.wrongAnswers[id] = null;
        }

        setFormData({ ...newFormData });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        console.log(token)

        const goodAnswers = formData.goodAnswers.filter(v => v !== null && v !== '');
        const wrongAnswers = formData.wrongAnswers.filter(v => v !== null && v !== '');

        if (!formData.question) return setFormError("Uzupełnij pole: Treść pytania");
        if (goodAnswers.length < 1) return setFormError("Pytanie musi mieć conajmniej 1 prawidłową odpowiedź");
        if (wrongAnswers.length < 2) return setFormError("Pytanie musi mieć conajmniej 2 nieprawidłowe odpowiedzi");

        setFormError("");
        Api(apiUrl, {
            method: 'POST',
            body: JSON.stringify({
                question: formData.question,
                goodAnswers: goodAnswers,
                wrongAnswers: wrongAnswers,
            })
        }).then(res => {
            setFormError(res.message);
            setFormData({ ...defaultFormData });
            formElement?.current.reset();
        }).catch(error => {
            console.error(error);
            setFormError(error);
        });
    }

    return (
        <>
            <h1 className='dashboard-title'>Dodaj nowe pytanie</h1>
            <form className='add_question-form' onInput={handleForm} onBlur={handleBlur} ref={formElement}>
                <p className='add_question-label'>Treść pytania</p>
                <input type="text" id="question" />
                <p className='add_question-label'>Prawidłowe odpowiedzi</p>
                {formData.goodAnswers.map((question, idx) => (
                    question !== null ? <input key={idx} type="text" id={`goodAnswer_${idx}`} /> : null
                ))}
                <p className='add_question-label'>Nieprawidłowe odpowiedzi</p>
                {formData.wrongAnswers.map((question, idx) => (
                    question !== null ? <input key={idx} type="text" id={`wrongAnswer_${idx}`} /> : null
                ))}
                <p className='add_question-error'>{formError}</p>
                {captcha ? (
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                    />
                ) : null}
                <button onClick={handleSubmit}>Dodaj pytanie</button>
            </form>
        </>
    );
};

export default QuestionAdd;
