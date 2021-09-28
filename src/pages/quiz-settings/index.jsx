import {Box, 
        Paper, 
        Button, 
        ButtonGroup,
        Grid, 
        Typography, 
        Divider, 
        Container,
        TextField,
        MenuItem
    } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';

/* Importación de estilos de la vista actual */
import {mainStyles as useStyles} from '../../styles';

/* Formulario de nombre de usuario y configuraciones */
export default function QuizConfigForm ({setContinueQuiz}) {
    const classes = useStyles();
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm();

    /* ====================== Definición de opciones de selección ====================== */
    const categories = [
        {value: '9', name: 'General Knowledge'},
        {value: '10', name: 'Entertainment: Books'},
        {value: '11', name: 'Entertainment: Film'},
        {value: '12', name: 'Entertainment: Music'},
        {value: '13', name: 'Entertainment: Musicals & Theatres'},
        {value: '14', name: 'Entertainment: Television'},
        {value: '15', name: 'Entertainment: Video Games'},
        {value: '16', name: 'Entertainment: Board Games'},
        {value: '17', name: 'Science & Nature'},
        {value: '18', name: 'Science: Computers'},
        {value: '19', name: 'Science: Mathematics'},
        {value: '20', name: 'Mythology'},
        {value: '21', name: 'Sports'},
        {value: '22', name: 'Geography'},
        {value: '23', name: 'History'},
        {value: '24', name: 'Politics'},
        {value: '25', name: 'Art'},
        {value: '26', name: 'Celebrities'},
        {value: '27', name: 'Animals'},
        {value: '28', name: 'Vehicles'},
        {value: '29', name: 'Entertainment: Comics'},
        {value: '30', name: 'Science: Gadgets'},
        {value: '31', name: 'Entertainment: Japanese Anime & Manga'},
        {value: '32', name: 'Entertainment: Cartoon & Animations'},
        {value: 'any', name: 'Any Category'}
    ];

    const difficulties = [
        {value: 'any', name: 'Any Difficulty'},
        {value: 'easy', name: 'Easy'},
        {value: 'medium', name: 'Medium'},
        {value: 'hard', name: 'Hard'}
    ];

    const types = [
        {value: 'any', name: 'Any Type'},
        {value: 'multiple', name: 'Multiple Choice'},
        {value: 'boolean', name: 'True / False'}
    ];

    /* =================================================================================== */

    const submitSettings = (data) => {
        /* Query params para la obtención de las preguntas 
           según las configuraciones seleccionadas */
        let queryParams = '?'; // ?bar=foo&another=thing&...

        Object.keys(data).forEach((setting, index) => {
            if (setting === 'nickname') {
                /* Se salta la ejecución para la llave que almacena el nickname */
                return;
            }
            if (index !== 1) {
                /* Corresponde a una configuración que debe tener el símbolo & */
                queryParams += '&'
            }
            /* Se agrega el parámetro junto a su valor */
            queryParams += setting + '=' + data[setting];
        });

        // Se almacena el nickname junto con la query de configuración en sessionStorage
        let currentPlayerData = {
            nickname: data['nickname'],
            settingsQuery: queryParams
        };

        sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayerData));
        history.push('/quiz' + queryParams);

    }

    return (
        <Grid container>
            <Container component="main" maxWidth="xs">
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" align="center" gutterBottom>
                            <Box fontWeight="fontWeightBold">
                                Please enter your nickname and the settings below
                            </Box>
                            <Divider className={classes.divider} />
                        </Typography>

                        <form onSubmit={handleSubmit(submitSettings)} className={classes.form} noValidate autoComplete="off">
                            <TextField 
                                fullWidth
                                label="Nickname"
                                id="nickname-input"
                                name="nickname"
                                helperText={errors.nickname ? 'This is a required field.' : "Try to select a good nickname. You could be into our gamers ranking!"}
                                {...register('nickname', {required: true})}
                                error={errors.nickname}
                                
                            />

                            <TextField 
                                fullWidth
                                className={classes.textField}
                                type="number"
                                label="Number of questions"
                                id="questions-number-input"
                                name="amount"
                                helperText={errors.questionNumber ? 'Invalid value. Number of questions must be greater than 0.' : null}
                                {...register('amount', {required: true, min: 0})}
                                error={errors.questionNumber}
                                
                            />

                            <TextField
                                    className={classes.textField}
                                    select
                                    fullWidth
                                    name="category"
                                    label="Category"
                                    {...register('category', {required: true})}
                                    helperText = {errors.category ? 'Please select one of the categories.' : null}
                                    error={errors.category}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                    className={classes.textField}
                                    select
                                    fullWidth
                                    name="difficulty"
                                    label="Difficulty"
                                    {...register('difficulty', {required: true})}
                                    helperText = {errors.difficulty ? 'Please select a difficulty.' : null}
                                    error={errors.difficulty}
                            >
                                {difficulties.map((difficulty) => (
                                    <MenuItem key={difficulty.value} value={difficulty.value}>
                                        {difficulty.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                    className={classes.textField}
                                    select
                                    fullWidth
                                    name="type"
                                    label="Type"
                                    {...register('type', {required: true})}
                                    helperText = {errors.type ? 'Please select a type.' : null}
                                    error={errors.type}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box 
                                display="flex" 
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <ButtonGroup style={{textAlign:"center"}} disableElevation variant="contained" color="primary">
                                    <Button 
                                        className={classes.startButton} 
                                        variant="contained" 
                                        color="default"
                                        onClick={() => setContinueQuiz(false)}
                                        style={{marginRight: '3px'}}
                                    >
                                        Go back
                                    </Button>

                                    <Button 
                                        type="submit"
                                        className={classes.startButton} 
                                        variant="contained" 
                                        color="primary"
                                    >
                                        Continue
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </form>

                    </Paper>
            </Container>
        </Grid>
    );

};