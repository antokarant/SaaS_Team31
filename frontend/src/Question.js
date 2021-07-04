import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class Question extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            responseReceived: false,
            sessionData: null,
            id: this.props.match.params.id,
            answer: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestion = this.displayQuestion.bind(this);
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    }

    componentDidMount()
    {
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
        let url = `http://localhost:5000/question/id/${this.state.id}`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({sessionData: obj});
            if(this.state.sessionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }

    displayQuestion()
    {
        let question = this.state.sessionData;
        return (
            <div>
                <header>{question.title}</header>
                <div className = "vote-box">
                    <div className = "vote-box-positive">{question.upvotes}</div>
                    <div className = "vote-box-negative">{question.downvotes}</div>
                </div>
                <div className = "q-desc-contain">
                    <span className = "left-text">{question.description}</span>
                    <span className = "left-text q-desc-details">asked by {question.user.username}</span>
                    <span className = "q-desc-details">on {question.createdOn.slice(0, 10)}</span>
                </div>
                <div>Answers</div>
            </div>
        );
    }
    handleAnswerSubmit(e){
        //e.preventDefault();

        if(this.state.answer)
        {
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
                this.props.logoutAction()
            });
        }
        else
        {
            console.error("Information required");
        }

    }

    render()
    {

        return (
            <div className="App">
                {console.log(this.state.loggedIn)}
                <div className = "main-window">
                    {this.state.responseReceived ? this.displayQuestion() : <div></div>}
                </div>
                <form>
                      <div>
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
            </div>
        );
    }
}

export default Question;
