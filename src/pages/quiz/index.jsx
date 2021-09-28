import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory } from 'react-router';
import {
    Grid,
    Container,
    Paper,
    Typography,
    CircularProgress,
    Button
} from '@material-ui/core';
import Swal from 'sweetalert2';

/* Importación de funciones para comunicación con la API */
import { getQuiz } from '../../api';

/* Importación de componentes/páginas */
import Question from './question';

/* Importación de estilos de la vista actual */
import {mainStyles as useStyles} from '../../styles';

/* Componente de carga para obtención de preguntas */
const QuestionsLoader = () => {
    return (
        <>
            <CircularProgress color="primary" />
            <Typography style={{marginTop: '30px'}} align="center" variant="h6">
                Wait for us! We are generating your questions...
            </Typography>
        </>
    );
}

export default function Quiz () {
    const classes = useStyles();
    const history = useHistory();
    const [questionList, setQuestionList] = useState([]); // Variable para almacenar objetos de pregunta una vez obtenidos desde la API
    const [currentQuestion, setCurrentQuestion] = useState(null); // Índice de la pregunta actual
    
    let urlQueryParams = useLocation().search;

    /* Función para cambio de pregunta 
       y detección de finalización del quiz
    */
    const onQuestionChange = () => {
        if (currentQuestion + 1 === questionList.length) {
            // Se ha terminado el Quiz
            history.push('/results');
            return;
        }

        // En caso de que no se haya finalizado se pasa a la siguiente pregunta (index actual + 1)
        setCurrentQuestion(currentQuestion + 1);

    };

    /* Función de obtención de las preguntas para el quiz según las configuraciones seleccionadas */
    const getQuizData = async (urlQueryParams) => {
        // Se obtiene el quiz desde la API

        let data = await getQuiz(urlQueryParams);

        if (data.response_code === undefined) {
            /* Se ha producido una excepción de error en el archivo de conexión a la API */
            Swal.fire({
                title: 'Ups!',
                text: 'Something went wrong. Please try again!',
                icon: 'error',
                confirmButtonColor: '#575757'
            });
            return;
        }

        if (data.response_code !== 0) {
            /* Se ha producido un error al obtener datos desde la API según 
               la configuración establecida */
               await Swal.fire({
                   title: 'Ups!',
                   text: 'Something went wrong. Please try again!',
                   icon: 'error',
                   confirmButtonColor: '#575757',
                   confirmButtonText: 'Go back'
               });
               history.push('/');
               return;
        }

        /* Se ha obtenido correctamente el quiz */

        // Se juntan las preguntas y se limpian los objetos para cada una de ellas
        data.results.forEach((question, index) => {
            question.answers = []; // Lista en el objeto con todas las posibles respuestas
            let answerList = question.incorrect_answers; // Lista temporal para seleccionar aleatoriamente las respuestas
            answerList.push(question.correct_answer);

            while (answerList.length !== 0) {
                // Selección de un elemento aleatorio dentro de la lista de respuestas (incorrectas + correcta)
                let answerIndex = Math.floor(Math.random() * answerList.length);

                // Se agrega la respuesta aleatoria a la lista definitiva
                question.answers.push(answerList[answerIndex]);
                // Se elimina el elemento seleccionado de la lista temporal
                answerList.splice(answerIndex, 1);

            }
        });

        setQuestionList(data.results);
        setCurrentQuestion(0);

    }

    useEffect(() => {
        getQuizData(urlQueryParams);
    }, [urlQueryParams]);


    return (
        <div className={classes.mainContainer}>
            <Grid container>
                <Container component="main" maxWidth="xs">
                        <Paper elevation={3} className={classes.paper}>

                            {currentQuestion !== null ? (
                                <Question 
                                    onQuestionChange={onQuestionChange}
                                    data={questionList[currentQuestion]} />
                            ) : <QuestionsLoader />}

                                {currentQuestion + 1 === questionList.length ? 
                                    <Button 
                                        className={classes.startButton} 
                                        variant="contained" 
                                        color="primary"
                                        onClick={onQuestionChange}
                                        style={{marginRight: '3px'}}
                                    >
                                        Finish
                                    </Button> 
                                : null
                            }

                        </Paper>
                </Container>
            </Grid>
        </div>
    )
};