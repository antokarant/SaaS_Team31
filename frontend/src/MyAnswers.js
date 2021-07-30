import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class MyAnswers extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            answersReceived: false,
            answersData: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        this.displayAnswers = this.displayAnswers.bind(this);
    }

    componentDidMount()
    {
        this.fetchAnswers();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchAnswers()
    {
        let url = `https://saas-team31-mvc-backend.herokuapp.com/answer`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({answersData: obj});
            if(this.state.answersData) this.setState({answersReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction();
        });
    }

    displayAnswers()
    {
        let distinctQuestions = [];
        let foundIDs = []; // disgusting
        for(const a of this.state.answersData)
        {
            if(!foundIDs.includes(a.question.id)) distinctQuestions.push(a.question);
            foundIDs.push(a.question.id);
        }

        console.log(distinctQuestions);

        return (
            <div className = "qa-fetch-result">
                {
                distinctQuestions.map(question => (
                    <div className = "qa-block" key = {question.id} >
                        <Link to = {`/question/${question.id}`} className = "link-text">
                            <div><div className = "qa-block-title">{question.title}</div> <div className = "qa-block-details">originally on {question.createdOn.slice(0, 10)}</div></div>
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
                    <div className = "label-block"><span className = "regular-text">Questions answered by you</span></div>
                    {this.state.answersReceived ? this.displayAnswers() : <div></div>}
                </div>
            </div>
        );
    }
}

export default MyAnswers;
