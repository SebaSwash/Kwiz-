import {useState, useEffect} from 'react';
import {Box, 
    Paper, 
    Button, 
    Typography, 
    Container,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faSadCry, faTrophy } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from 'react-router';

/* Importación de estilos de la vista actual */
import {mainStyles as useStyles} from '../../styles';

const QuizResults = () => {
    const classes = useStyles();
    const history = useHistory();
    const [statusText, setStatusText] = useState(null);
    const [player, setPlayer] = useState(null);
    const [statusIcon, setStatusIcon] = useState(null);

    const checkResults = () => {
        try {
            let userScore = sessionStorage.getItem('score');
            let currentPlayer = JSON.parse(sessionStorage.getItem('currentPlayer'));
            let correctCounter = sessionStorage.getItem('correctCounter');

            if (userScore === null || currentPlayer === null) {
                // No se ha registrado un puntaje. Se redirecciona la inicio
                history.push('/');
            }


            currentPlayer.score = userScore;
            currentPlayer.correctCounter = correctCounter;
            currentPlayer.settingsQuery = new URLSearchParams(currentPlayer.settingsQuery);
            currentPlayer.correctPercentage =  parseInt(correctCounter) / currentPlayer.settingsQuery.get('amount');

            // Se selecciona el ícono según el rendimiento del jugador
            if (currentPlayer.correctPercentage >= 0.0 && currentPlayer.correctPercentage < 0.5) {
                setStatusIcon(<FontAwesomeIcon icon={faSadCry} size="8x" />);
                setStatusText("Don't cry like a baby! You can practice and try another time ;)");
            } else if (currentPlayer.correctPercentage >= 0.5 && currentPlayer.correctPercentage < 1) {
                setStatusIcon(<FontAwesomeIcon icon={faMedal} size="8x" />);
                setStatusText('Okey... that was not bad... Maybe next time you get all the answers!');
            } else if (currentPlayer.correctPercentage === 1) {
                setStatusIcon(<FontAwesomeIcon icon={faTrophy} size="8x" />);
                setStatusText('Amazing! Are you a genius or something?');
            }

            setPlayer(currentPlayer);

        } catch (error) {
            console.log(error);
            history.push('/');
        }
    }

    useEffect(() => {
        checkResults();
    }, []);

    return (
        <div className={classes.mainContainer}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} className={classes.paper}>
                    {statusIcon ? statusIcon : null}
                    {player ? (
                        <div>
                            <Typography  style={{marginTop: '30px'}} align="center" variant="h6">
                                <strong>{player.nickname}</strong>, you've got {player.score} points!
                                <br/><br/>
                                {statusText ? statusText : null}
                            </Typography>
                            <Typography  style={{marginTop: '30px'}} align="center" variant="subtitle1">
                                You have answered <strong>{player.correctCounter}</strong> of <strong>{player.settingsQuery.get('amount')}</strong> questions correctly (<strong>{player.correctPercentage} %</strong>)
                            </Typography>
                        </div>
                    ) : null}
                    <Box 
                        display="flex" 
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button 
                            type="submit"
                            className={classes.startButton} 
                            onClick={() => history.push('/')}
                            variant="contained" 
                            color="primary"
                        >
                            Finish
                        </Button>
                    </Box>
                </Paper> 
            </Container>
        </div>
    )
};

export default QuizResults;