import { useState, useEffect, useRef } from 'react';
import { FaCaretUp } from 'react-icons/fa';
import useApi from '../../../hooks/useApi';
import './List.sass';

const Question = ({ id, question }) => {
    const [isDropdownActive, setDropdownActive] = useState(false);
    const [goodAnswers, setGoodAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const questionElement = useRef();
    const Api = useApi();

    useEffect(() => {
        if (!questionElement?.current) return;

        if (isDropdownActive && goodAnswers.length < 1) {
            Api('questions/fetchAnswers?' + new URLSearchParams({ question: id })).then(res => {
                setGoodAnswers(res.data.goodAnswers);
                setWrongAnswers(res.data.wrongAnswers);
            }).catch(console.error);
        }
    }, [isDropdownActive]);

    useEffect(() => {
        const dropdown = questionElement.current.querySelector('.question-dropdown');
        isDropdownActive ? dropdown.style.height = `${dropdown.scrollHeight}px` : dropdown.style.height = '0';
    }, [isDropdownActive, wrongAnswers])

    return (
        <div className={`question ${isDropdownActive ? 'active' : ''}`} ref={questionElement}>
            <div className="question-header" onClick={() => setDropdownActive(!isDropdownActive)}>
                <p className='question-header-title'>[ID: {id}] {question}</p>
                <FaCaretUp className='question-header-caret' />
            </div>
            <div className="question-dropdown">
                <p className="question-dropdown-item">ID: {id}</p>
                <p className="question-dropdown-item">Pytanie: {question}</p>
                <p className="question-dropdown-item">Poprawne odpowiedzi</p>
                <ul>
                    {goodAnswers.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                    ))}
                </ul>
                <p className="question-dropdown-item">Niepoprawne odpowiedzi</p>
                <ul>
                    {wrongAnswers.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const QuestionList = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [questionsPerPage, setQuestionsPerPage] = useState(10);
    const [amountOfQuestions, setAmountOfQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const Api = useApi();

    useEffect(() => {
        const storageQuestionsPerPage = Number(localStorage.getItem('questionsPerPage'));
        if (storageQuestionsPerPage) setQuestionsPerPage(storageQuestionsPerPage);

        Api('questions/getAmmount').then(res => {
            setAmountOfQuestions(res.data.amountOfQuestion);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const ammountOfPages = Math.ceil(amountOfQuestions / questionsPerPage);
        setPages(Array.from(Array(ammountOfPages).keys()));
    }, [questionsPerPage, amountOfQuestions]);

    useEffect(() => {
        console.log((currentPage * questionsPerPage), (currentPage * questionsPerPage) + questionsPerPage)
        Api('questions/fetchQuetions', {
            method: 'POST',
            body: JSON.stringify({
                from: (currentPage * questionsPerPage),
                limit: questionsPerPage
            })
        }).then(res => {
            setQuestions(res.data);
        }).catch(console.error);
    }, [currentPage, pages]);

    const handleSelect = e => {
        setQuestionsPerPage(Number(e.target.value));
        localStorage.setItem('questionsPerPage', e.target.value);
        setCurrentPage(0);
    }

    return (
        <>
            <h1 className='dashboard-title'>Lista pytań gry</h1>
            <div className="list">
                <div className="controls">
                    <ul className="controls-pages">
                        {pages.map((page, idx) => (
                            <li
                                key={idx}
                                className={`${page === currentPage ? 'active' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >{page + 1}</li>
                        ))}
                    </ul>
                    <div className="paginator">
                        Liczba wyników na stronie: &nbsp;
                        <select value={questionsPerPage} onInput={handleSelect}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
                <div className="list-wrapper">
                    {questions.map((question) => (
                        <Question key={question.id} id={question.id} question={question.question} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuestionList;
