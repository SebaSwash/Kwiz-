import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

/* -------- Importación de componentes (páginas) principales -------- */
import MainPage from './pages/landing';
import QuizResults from './pages/quiz/result';
import Quiz from './pages/quiz';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4D4D4D',
      dark: '#212121'
    },
    secondary: {
      main: '#1f7f5a',
      dark: '#185e42'
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <Route exact path='/quiz'>
            <Quiz />
          </Route>
          <Route exact path='/results'>
            <QuizResults />
          </Route>
        </Switch>

      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
