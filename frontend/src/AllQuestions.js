import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class AllQuestions extends React.Component
{

    constructor(props)
    {
        super(props);
        console.log("which came first")
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47",
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
            this.setState({sessionData: obj});
            if(this.state.sessionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
    }

    displayQuestions()
    {
        console.log("inside display");
        return (
            <div>
                {
                this.state.sessionData.map(answer => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div key = {answer.id} >{answer.id} {answer.positiveVotes} {answer.negativeVotes} {answer.text} {answer.user.id}</div>
                  
                    ))
                }
            </div>
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
        );
    }

    render()
    {
        if(this.state.loggedIn) return (
            <div className="App">
                {console.log(this.state.loggedIn)}
                <div className = "main-window">
                    {this.state.responseReceived ? this.displayQuestions() : <div></div>}
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

export default AllQuestions;
