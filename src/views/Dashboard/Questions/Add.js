import { useState } from 'react';
import './Add.sass';

const AddQuestion = () => {
    const [formData, setFormData] = useState({ goodAnswers: [], wrongAnswers: [] });
    const [formError, setFormError] = useState("");

    const handleForm = e => {
        const newFormData = { ...formData };
        newFormData[e.target.className] = e.target.value;
        setFormData(newFormData);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!formData.question) return setFormError("Uzupełnij pole: Treść pytania");
        if (!formData.goodAnswers.length < 1) return setFormError("Pytanie musi mieć conajmniej 1 prawidłową odpowiedź");
        if (!formData.wrongAnswers.length < 2) return setFormError("Pytanie musi mieć conajmniej 2 nieprawidłowe odpowiedzi");
        
        console.log(formData)
    }

    return (
        <>
            <h1 className='dashboard-title'>Dodaj nowe pytanie</h1>
            <form onInput={handleForm}>
                <p>Treść pytania</p>
                <input type="text" className="question" />
                <p>Prawidłowe odpowiedzi</p>
                {new Array(formData.goodAnswers.length + 1).forEach(idx => (
                    <input key={idx} type="text" className="goodAnswer" />
                ))}
                <p>Nieprawidłowe odpowiedzi</p>
                {new Array(formData.wrongAnswers.length + 1).forEach(idx => (
                    <input key={idx} type="text" className="badAnswer" />
                ))}
                <p>{formError}</p>
                <button onClick={handleSubmit}>Dodaj pytanie</button>
            </form>
        </>
    );
};

export default AddQuestion;
