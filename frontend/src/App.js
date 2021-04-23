import './App.css';
import WriteAnswer from './WriteAnswer';
import AskQuestion from './AskQuestion';
import Signup from './Signup';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';
import UserProfile from './UserProfile';
import React from 'react';
import {Route, Link, BrowserRouter, useHistory, withRouter} from 'react-router-dom';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: !(localStorage.getItem('token')==='null' ),
      username: "Agent47"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.loginCallbackFunction = this.loginCallbackFunction.bind(this);
    this.logoutCallbackFunction = this.logoutCallbackFunction.bind(this);

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
  loginCallbackFunction = () => {
      localStorage.setItem('token', 'tokenForAgent47');
      this.setState({loggedIn: true})

  }
  logoutCallbackFunction = () => {
      localStorage.setItem('token', 'null');
      this.setState({loggedIn: false})
  }
/*<button onClick={()=>console.log(this.state.loggedIn)}></button>
<button onClick={()=>console.log(localStorage.getItem('token'))}></button> gia elegxo mesa sto render*/
  render(){

      return (
        <div className="Background">


            <div className = "layout">
                <Layout loggedIn = {this.state.loggedIn} logout={this.logoutCallbackFunction}/>
            </div>
            <Route exact path = "/" render={props => <Home  loggedIn={this.state.loggedIn}/>} />
            <Route exact path = "/signup"  render={props => <Signup action={this.loginCallbackFunction} loggedIn={this.state.loggedIn}/>}/>
            <Route exact path = "/login" render={props => <Login action={this.loginCallbackFunction} loggedIn={this.state.loggedIn}/>} />
            <Route exact path = "/askquestion" render={props => <AskQuestion  loggedIn={this.state.loggedIn}/>} />
            <Route exact path = "/writeanswer" render={props => <WriteAnswer  loggedIn={this.state.loggedIn}/>} />
            <Route exact path = "/profile" render={props => <UserProfile loggedIn={this.state.loggedIn}/>} />

            <div className="media">
                <a className="myLink" href="https://github.com/antokarant/SaaS_team31">github</a>
                <a className="myLink" href="https://www.gmail.com">email</a>
                <a className="myLink" href="https://www.ece.ntua.gr/en">contact us</a>
                <a className="myLink" href="https://en.wikipedia.org/wiki/Documentation">documentation</a>
                <a className="myLink" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">course materials</a>
            </div>
        </div>


      );
    };
};

export default App;
