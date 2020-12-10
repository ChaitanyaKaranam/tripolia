import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Flights from './pages/Flights';
import { ROUTES } from './config/routes';
import './styles/sass/main.scss';

function App() {

  const { HOME, FLIGHTS } = ROUTES;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={FLIGHTS.path} component={Flights} />
          <Route path={HOME.path} component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
