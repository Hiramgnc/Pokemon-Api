import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import { getPokemons } from './actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

    useEffect (() => {
      dispatch(getPokemons())
  },[dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exactpath='/home' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
