import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actions'
import { connect } from 'react-redux';
import './App.scss';
import '../assets/layout.scss'
import Listing from '../components/Listing/Listing'
import Empty from '../components/Empty/Empty'
import Login from '../components/Login/Login'
import Removed from '../components/Removed/Removed'
import Loading from '../components/Loading/Loading'
import Continue from '../components/Continue/Continue'


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
      const account = this.props.data.account;

      if(this.props.data.isLoading)
        return <Loading />
      
      if(!account.token){
        if(account.shopName)
          return <Continue {...this.props} />
        else return <Login {...this.props} />
      }
  
      if(this.props.data.isRemoved)
        return <Removed {...this.props} />
        
      if(this.props.data.listing.url)
        return <Listing {...this.props} />
      else return <Empty {...this.props} />
    }
  }

  componentWillMount(){
    this.props.actions.init();
  }
}
