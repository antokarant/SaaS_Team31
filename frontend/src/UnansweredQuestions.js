import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class UnansweredQuestions extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            questions: null,
            responseReceived: false,
            sessionData: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
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
        let url = `http://localhost:3000/question/unanswered`;
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

    displayQuestions()
    {
        return (
            <div className = "qa-fetch-result">
                {
                this.state.sessionData.map(question => (
                    <div className = "qa-block" key = {question.id} >
                        <Link to = {`/question/${question.id}`} className = "link-text">
                            <div><div className = "qa-block-title">{question.title}</div> <div className = "qa-block-keywords">{question.keywords.map(keyword => (<div className = "keyword-box">{keyword.name}</div>))}</div> <div className = "qa-block-details">asked by {question.user.username} on {question.createdOn.slice(0, 10)}</div></div>
                        </Link>
                    </div>

                    ))
                }
            </div>
        );
    }

    render()
    {
        return (
            <div className="App">
                <div className = "main-window">
                    <header>Unanswered questions</header>
                    {this.state.responseReceived ? this.displayQuestions() : <div></div>}
                </div>
            </div>
        );
    }
}

export default UnansweredQuestions;
