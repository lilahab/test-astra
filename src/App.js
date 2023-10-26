import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPages from './views/LoginPages';
import Universitas from './views/Universitas';
import NotFound from './components/NotFound';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPages} />
        <Route path="/universitas" exact component={Universitas} />
    
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;