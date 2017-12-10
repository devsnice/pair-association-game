import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Game from './components/containers/Game/Game';

import './App.css';

import store from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}

export default App;
