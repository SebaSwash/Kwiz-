import { makeStyles } from '@material-ui/core/styles';

/* Estilos de la vista principal */
const mainStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px',
        borderRadius: '30px'
    },
    divider: {
        marginTop: theme.spacing(2)
    },
    mainContainer: {
        position: 'absolute',
        margin: 0,
        padding: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'linear-gradient(0deg, rgba(29,125,89,1) 0%, rgba(18,54,37,1) 100%)'
    },
    box: {
        display: 'flex'
    },
    startButton: {
        marginTop: theme.spacing(5)
    },
    form: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    }
}));

export {mainStyles};