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
            console.log("REQUEST SENT");
            console.log(response);
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({answersData: obj});
            if(this.state.questionsData) this.setState({answersReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            this.setState({loggedOut: true})
            this.props.logoutAction()

        });
    }

    displayAnswers()
    {
        console.log("inside display");
        return (
            <div className = "showResult">
                {
                this.state.answersData.map(answer => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div key = {answer.id} >{answer.id} {answer.positiveVotes} {answer.negativeVotes} {answer.text} {answer.user.id}</div>
                  
                    ))
                }
            </div>
            // <div>{JSON.stringify(this.state.questionsData[0])}</div>
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
        console.log("inside display");
        return (
            <div className = "showResult">
                {
                this.state.questionsData.map(question => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div key = {question.id} ><Link to = {`/question/${question.id}`} >{question.id}</Link> {question.createdOn} {question.updatedOn} {question.title} {question.description}</div>
                  
                    ))
                }
            </div>
            // <div>{JSON.stringify(this.state.questionsData[0])}</div>
        );
    }

    render()
    {   if(this.state.loggedOut)
            return <Redirect to= "/"/>
        if(true) return (
            <div className="App">
                {console.log(this.state.loggedIn)}
                <div className = "main-window">
                    {this.state.answersReceived ? this.displayAnswers() : <div></div>}<br/><br/>
                    {this.state.questionsReceived ? this.displayQuestions() : <div></div>}
                </div>
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

export default MyQuestionsAnswers;
