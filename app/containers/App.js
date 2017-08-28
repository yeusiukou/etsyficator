import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actions'
import { connect } from 'react-redux';
import './App.scss';
import '../assets/layout.scss'
import Listing from '../components/Listing.js'
import Empty from '../components/Empty.js'
import Login from '../components/Login.js'
import Removed from '../components/Removed.js'
import Loading from '../components/Loading.js'


// I use decorators here, otherwise it can be written as
// export default connect(mapStateToProps, mapDispatchToProps)(App)

@connect(
  state => ({
    data: state.appData
  }), 
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
export default class App extends Component {

  render() {
    
    return (
      <div className="App">
        {getScreen.bind(this)()}
      </div>
    );

    function getScreen(){
      if(!this.props.data.token)
        return <Login />
  
      if(this.props.data.isLoading)
        return <Loading />
      if(this.props.data.isRemoved)
        return <Removed />
  
      if(this.props.data.listing.url)
        return <Listing />
      else return <Empty />
    }
  }

  componentWillMount(){
    this.props.actions.fetchUrl();
  }
}
