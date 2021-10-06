import {useState, useEffect} from 'react';
import {
    Typography,
    Box,
    Button
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Importación de estilos de la vista actual */
import {mainStyles as useStyles} from '../../styles';

/* Componente para mostrar pregunta actual */
const Question = ({onQuestionChange, data}) => {
    const classes = useStyles();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        setQuestion(data);
    });

    /* Función de validación de respuesta seleccionada */
    const checkAnswer = (answer) => {
        let correctAnswer = answer === question.correct_answer;

        if (correctAnswer) {
            toast.success('¡Correct! The answer was: ' + answer);

            if (sessionStorage.getItem('score')) {
                sessionStorage.setItem('score', parseInt(sessionStorage.getItem('score')) + 10);
            } else {
                sessionStorage.setItem('score', 10);
            }

            if (sessionStorage.getItem('correctCounter')) {
                sessionStorage.setItem('correctCounter', parseInt(sessionStorage.getItem('correctCounter')) + 1);
            } else {
                sessionStorage.setItem('correctCounter', 1);
            }

        } else {
            toast.error('¡Ups! That was not the right answer...');
        }

        onQuestionChange();

    }

    return (
        <>

        <ToastContainer />

        {question ?
            (<div>
                <Typography style={{marginTop: '5px'}} align="center" variant="subtitle1">
                    <Box fontWeight="fontWeightBold">
                    ({question.category} - {question.difficulty})
                    </Box>
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: question.question }} style={{marginTop: '30px'}} align="center" variant="h6" />

                <Box textAlign='center'>

                {question.answers.map((answer, index) => {
                   return <Button
                        className={classes.startButton} 
                        variant="contained" 
                        color={index % 2 === 0 ? 'primary' : 'secondary'}
                        style={{marginRight: '3px'}}
                        onClick={() => checkAnswer(answer)}
                        key = {'answer-' + index}
                    >
                        {answer}
                    </Button> 
                    
                })}

                </Box>
                
            </div>)
    
        : null}

        </>
    )
};

export default Question;