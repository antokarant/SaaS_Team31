import './App.css';
import WriteAnswer from './WriteAnswer';
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
        <Route exact path = "/writeanswer" component = {WriteAnswer} />
            <div className="App">
                <div className="header">
                    Frame
                    <button className = "closeButton">x</button>
                </div>

                <div className="main-title">
                    Title
                </div>
                <button className = "cool-btn" onClick={this.handleSubmit}>
                    <span className = "regular-text">{this.state.loggedIn ? "Log out" : "Log in"}</span>
                </button>
                <button className = "cool-btn">
                    <span className = "regular-text">{this.state.loggedIn ? this.state.username : "Sign up"}</span>
                </button>
                <div className = "main-window">
                    <header className="mainheader">
                        My ask me anything
                    </header>
                    {this.state.loggedIn ?
                        <div className="box-wrapper">
                            <div className="boxbox">
                                box box box
                            </div>
                            <div className="boxbox">
                              box box box
                            </div>
                            <div className="boxbox">
                              box box box
                            </div>
                            <div className="boxbox">
                              box box box
                            </div>
                        </div>
                            :
                        <div className="boxwrapper">
                            <form>
                                <label>
                                    Username:
                                    <input className = "username-field" type = "text" name = "username" onChange = {this.myChangeHandler} />
                                </label> <br />
                                <label>
                                    Password:
                                    <input className = "password-field" type = "password" name = "password" onChange = {this.myChangeHandler} />
                                </label> <br />
                                <button onClick={this.handleSubmit}>Login</button>
                            </form>
                        </div>
                    }
                </div>
                <div className = "footnote-wrapper">
                    <button className="footnote">
                        github
                    </button>
                    <button className="footnote">
                        email
                    </button>
                    <button className="footnote" >
                        test
                    </button>
                    <button className="footnote">
                        phone
                    </button>
                </div>
            </div>
        </div>
      );
    }
}

export default App;
