import {useState} from 'react';
import {Box, 
        Paper, 
        Button, 
        Grid, 
        Typography, 
        Divider, 
        Container,
    } from '@material-ui/core';

import mainLogo from '../../img/mainLogo.png';

/* Importación de estilos de la vista actual */
import {mainStyles as useStyles} from '../../styles';

/* Importación de componentes/páginas */
import QuizConfigForm from '../quiz-settings';

/* Página principal de configuración de trivia */

const WelcomePaper = ({setContinueQuiz}) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Container component="main" maxWidth="xs">
                    <Paper elevation={3} className={classes.paper}>
                        <img alt="Kwiz logo" src={mainLogo}/>
                        <Typography variant="h6" align="center" gutterBottom>
                            <Box fontWeight="fontWeightBold">
                                The quiz game you were looking for!
                            </Box>
                            <Divider className={classes.divider} />
                        </Typography>
                        <Button 
                            onClick={() => setContinueQuiz(true)} 
                            className={classes.startButton} 
                            variant="contained" 
                            color="primary"
                        >
                            Continue
                        </Button>
                    </Paper>
            </Container>
        </Grid>
    )
};

export default function MainPage () {
    const classes = useStyles();
    const [continueQuiz, setContinueQuiz] = useState(false);

    return (
        <div className={classes.mainContainer}>
            {continueQuiz && <QuizConfigForm setContinueQuiz={setContinueQuiz}/>}
            {!continueQuiz && <WelcomePaper setContinueQuiz={setContinueQuiz} /> }
        </div>
        
    )
}