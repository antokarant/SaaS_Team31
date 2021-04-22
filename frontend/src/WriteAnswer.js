import './App.css';
import React from 'react';

class WriteAnswer extends React.Component
{

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
      return (
        <div className="App">
            <header className="mainheader">
                Answer a Question
            </header>
            <br /><br />
            <div className = "main-area">
                  <form>
                      <div>
                          <label className = "regular-text">Select a question:</label>
                          <br />
                          <select className = "dropdown" name = "question">
                              <option></option>
                              <option className = "regular-text">C++: How to properly delete array of pointers to pointers in class destructor</option>
                              <option className = "regular-text">How to save an image from an HTML webpage with JSoup</option>
                              <option className = "regular-text">Why does it burn when I pee?</option>
                              <option className = "regular-text">Difference between Python datetime and time modules</option>
                              <option className = "regular-text">Excess blood in stool; should I be worried?</option>
                              <option className = "regular-text">What is the most efficient path-finding algorithm for an undirected graph?</option>
                          </select>
                      </div>
                      <br />
                      <span className = "regular-text">Other answers, if available, will be shown here</span>
                      <div className = "box"></div>
                      <br />
                      <div>
                          <label className = "regular-text">Your answer:</label>
                          <br />
                          <textarea name = "answer"></textarea>
                      </div>
                      <br />
                  </form>
              </div>
              <div className="footnote-wrapper">
                  <button className="footnote">
                      Answer
                  </button>
                  <button className="footnote">
                      Never mind
                  </button>
              </div>
          </div>
      );
    }
}

export default WriteAnswer;