import React, { Component } from 'react';
import App from './App';
import configureStore from '../configureStore'

import { Provider } from 'react-redux'
const store = configureStore()

export default class Root extends Component {

  render() {
    
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
