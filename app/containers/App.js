import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './App.css';

// @connect(
//   state => ({
//     todos: state.todos
//   }),
//   dispatch => ({
//     actions: bindActionCreators(TodoActions, dispatch)
//   })
// )
export default class App extends Component {

  render() {

    return (
      <div>Spocket</div>
    );
  }
}
