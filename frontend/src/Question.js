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
            answer: null,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestion = this.fetchQuestion.bind(this);
        this.displayQuestion = this.displayQuestion.bind(this);
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    }

    componentDidMount()
    {
        this.fetchQuestion();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchQuestion()
    {
        let url = `https://saas-team31-soa-esb.herokuapp.com/question/id/${this.state.id}`;
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
                <div className = "q-block">
                    <div className = "vote-box">
                        <div className = "vote-box-positive">{question.upvotes}</div>
                        <div className = "vote-box-negative">{question.downvotes}</div>
                    </div>
                    <div className = "q-desc-contain">
                        <span className = "left-text">{question.description}</span>
                        <span className = "left-text q-desc-details">asked by {question.user.username}</span>
                        <span className = "q-desc-details">on {question.createdOn.slice(0, 10)}</span>
                    </div>
                </div>
            </div>
        );
    }

    displayAnswers()
    {
        let answers = this.state.sessionData.answers;
        console.log(answers);
        return (
            <div>
                <header>Answers</header>
                {
                    answers.map(answer => (
                        <div className = "ans-block">
                            <div className = "vote-box">
                                <div className = "vote-box-positive">{answer.upvotes}</div>
                                <div className = "vote-box-negative">{answer.downvotes}</div>
                            </div>
                            <div key = {answer.id} className = "ans-contain">
                                <span className = "left-text">{answer.text}</span>
                                <span className = "left-text ans-details">answered by {answer.user.username}</span>
                                <span className = "right-text ans-details">on {answer.createdOn.slice(0, 10)}</span>
                            </div>
                        </div>

                        ))
                }
            </div>
        );
    }

    handleAnswerSubmit(e){
        e.preventDefault();

        if(this.state.answer)
        {
            let url = `https://saas-team31-soa-esb.herokuapp.com/answer`;

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
                JSON.stringify(obj)
                this.fetchQuestion()
                this.setState({answer: ""})
                console.log(this.state.answer)
            })
            .catch(error => {
                console.error(error);
                this.props.logoutAction()
                this.setState({redirect: true})
            });
        }
        else
        {
            console.error("Information required");
        }

    }

    render()
    {

        if(this.state.redirect){
            return <Redirect to = '/login'/>
        }
        else
            return (
                <div className="App">
                    <div className = "main-window">

                            {this.state.responseReceived ? this.displayQuestion() : <div></div>}
                            <br />
                            <br />
                            {this.state.responseReceived ? this.displayAnswers() : <div></div>}
                            <form>
                                <div>
                                    <br />
                                </div>
                                <br />
                                <br />
                                <div>
                                    <label className = "regular-text" >Your answer:</label>
                                    <br />
                                    <textarea name = "answer" value={this.state.answer} onChange={this.handleChange}></textarea>
                                </div>
                                <br />
                                <div className="footnote-wrapper">
                                    <button className="small-btn footnote" onClick = {this.handleAnswerSubmit}>
                                        <span className = "regular-text" >Answer</span>
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>

            );
    }
}

export default Question;
