import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: false,
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
      return (<div className="Background">
        <div className="App">
          <div className="header">
            Frame
            <button className="closeButton">
              x
            </button>
          </div>
          <div className="maintitle">
            Title
          </div>
          <button className="sign" onClick={this.handleSubmit}>
            {this.state.loggedIn ? "signout" : "signin"}
          </button>
          <header className="mainheader">
            My ask me anything
          </header>
          {this.state.loggedIn ?
              <div className="boxwrapper">
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
              </div>}
          <div className="footnotewrapper">
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
