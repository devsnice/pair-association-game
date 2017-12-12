import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import initStyles from './initStyles';

import Game from '../components/containers/Game/Game';

initStyles();

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}

export default Application;
