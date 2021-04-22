import './App.css';
import WriteAnswer from './WriteAnswer';
import AskQuestion from './AskQuestion';
import Signup from './Signup';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: false,
      username: "Agent47"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this. myChangeHandler = this. myChangeHandler.bind(this);
  }
  handleSubmit(){
    if(this.state.loggedIn===false)
      this.setState({loggedIn: true,});
    else
      this.setState({loggedIn: false,});
  }
  myChangeHandler(){
    console.log("test test")
  }
  render(){
      return (
        <div className="Background">
            <div className = "layout">
                <Layout loggedIn = {this.state.loggedIn}/>
            </div>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/signup" component = {Signup} />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/askquestion" component = {AskQuestion} />
            <Route exact path = "/writeanswer" component = {WriteAnswer} />
        </div>
      );
    }
}

export default App;
