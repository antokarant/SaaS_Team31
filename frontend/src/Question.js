import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class Question extends React.Component
{

    constructor(props)
    {
        super(props);
        console.log("which came first")
        this.state = {
            loggedIn: props.loggedIn,
            questions: null,
            responseReceived: false,
            sessionData: null,
            id: this.props.match.params.id,
            loggedOut: false,
            answer: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    }

    componentDidMount()
    {
        console.log("we are here 2")
        if(document.cookie){
            console.log("i am logged in")
            this.setState({loggedIn : true})
        }
        this.fetchQuestions();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchQuestions()
    {
        console.log("we are here bla bla bla")
        let url = `http://localhost:5000/question/id/${this.state.id}`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            // handle success
            console.log("REQUEST SENT");
            console.log(response);
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({sessionData: obj});
            if(this.state.sessionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            //this.props.action()
            //this.setState({loggedOut: true})
        });
    }

    displayQuestions()
    {
        let answer = this.state.sessionData
        console.log("inside display");
        return (
            <div>
                {
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div> {answer.id} {answer.positiveVotes} {answer.negativeVotes} {answer.text} {answer.user.id}</div>
                  
                }
            </div>
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
        );
    }
    handleAnswerSubmit(e){
        e.preventDefault();
        console.log(this.state.answer)
        // connect with backend function
        if(this.state.answer)
        {
            // connect with backend function - send request
            let url = `http://localhost:5000/answer`;

            axios.post(url, 
                {
                text: this.state.answer,
                question:{"id": this.state.id} 
            },{ headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
            },)
            .then(res => {
                let obj = res.data;
                console.log(obj);
                JSON.stringify(obj)
            })
            .catch(error => {
                console.error(error);
                //this.setState({loggedOut: true})
            });
        }
        else
        {
            console.error("Information required");
        }

    }

    render()
    {

        if(true) return (
            <div className="App">
                {console.log(this.state.loggedIn)}
                <div className = "main-window">
                    {this.state.responseReceived ? this.displayQuestions() : <div></div>}
                </div>
                <form>
                      <div>
                          <label className = "regular-text">Select a question:</label>
                          <br />
                      </div>
                      <br />
                      <br />
                      <div>
                          <label className = "regular-text" >Your answer:</label>
                          <br />
                          <textarea  name = "answer" value={this.state.answer} onChange={this.handleChange}></textarea>
                      </div>
                      <br />
                      <div className="footnote-wrapper">
                      <button className="small-btn footnote" onClick = {this.handleAnswerSubmit}>
                          <span className = "regular-text" >Answer</span>
                    </button>
                      
              </div>
                  </form>
                  
                <Link to = "/">button</Link>
            </div>
        );
        else return (
            <div>
            {console.log("byeee")}
            <Redirect to = "/"/>
            </div>
        );
    }
}

export default Question;