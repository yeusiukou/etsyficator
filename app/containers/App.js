import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import '../assets/layout.scss'
import Listing from '../components/Listing.js'
import Empty from '../components/Empty.js'
import Login from '../components/Login.js'
import Removed from '../components/Removed.js'

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
      <div className="App">
        {/* <Listing /> */}
        {/* <Empty /> */}
        {/* <Login /> */}
        <Removed />
      </div>
    );
  }
}
