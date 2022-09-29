import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import PokemonCreate from './components/PokemonCreate';

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
          <Route exact path='/home' component={Home} />
          <Route path='/pokemon' component={PokemonCreate} />
          <Route path='/home/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
