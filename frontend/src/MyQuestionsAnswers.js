import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class MyQuestionsAnswers extends React.Component
{

    constructor(props)
    {
        super(props);
        console.log("which came first")
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47",
            questions: null,
            questionsReceived: false,
            questionsData: null,
            answersReceived: false,
            answersData: null,
            loggedOut:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        this.displayAnswers = this.displayAnswers.bind(this);
    }

    componentDidMount()
    {
        console.log("we are here 2")
        if(document.cookie){
            console.log("i am logged in")
            this.setState({loggedIn : true, loggedout: false})
        }
        this.fetchQuestions();
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
        console.log("we are here")
        let url = `http://localhost:5000/answer`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            // handle success
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({answersData: obj});
            if(this.state.questionsData) this.setState({answersReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            // this.setState({loggedOut: true})
            this.props.logoutAction();
        });
    }

    displayAnswers()
    {
        return (
            <div className = "qa-fetch-result">
                {
                this.state.answersData.map(answer => (
                    <div className = "qa-block" key = {answer.id} >
                        <Link to = {`/answer/${answer.id}`} >
                            <div><span className = "qa-block-title">{answer.title}</span> <span className = "qa-block-details">{answer.user.username} {answer.createdOn}</span></div>
                        </Link>
                    </div>

                    ))
                }
            </div>
        );
    }

    fetchQuestions()
    {
        console.log("we are here")
        let url = `http://localhost:5000/question/user`;
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
            this.setState({questionsData: obj});
            if(this.state.questionsData) this.setState({questionsReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            //this.setState({loggedOut: true})
            this.props.logoutAction()

        });
    }

    displayQuestions()
    {
        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
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
            // <div>{JSON.stringify(this.state.questionsData[0])}</div>
        );
    }

    render()
    {
        if(this.state.loggedOut) return <Redirect to= "/"/>
        return (
            <div className="App">
                {console.log(this.state.loggedIn)}
                <div className = "main-window">
                    <div className = "label-block"><span className = "regular-text">Questions submitted by you</span></div>
                    {this.state.questionsReceived ? this.displayQuestions() : <div></div>}

                    <div className = "label-block"><span className = "regular-text">Questions answered by you</span></div>
                    {this.state.answersReceived ? this.displayAnswers() : <div></div>}
                </div>
            </div>
        );
    }
}

export default MyQuestionsAnswers;
