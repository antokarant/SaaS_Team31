import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class MyQuestions extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            questions: null,
            questionsReceived: false,
            questionsData: null,
            answersReceived: false,
            answersData: null,
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
        let url = `https://saas-team31-mvc-backend.herokuapp.com/question/user`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({questionsData: obj});
            if(this.state.questionsData) this.setState({questionsReceived : true});
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
                this.state.questionsData.map(question => (
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
                    <div className = "label-block"><span className = "regular-text">Questions submitted by you</span></div>
                    {this.state.questionsReceived ? this.displayQuestions() : <div></div>}
                </div>
            </div>
        );
    }
}

export default MyQuestions;
