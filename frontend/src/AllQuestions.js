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
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47",
            questions: null,
            responseReceived: false
        };

        this.handleChange = this.handleChange.bind(this);
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
        let url = `http://localhost:5000/question`;
        axios.get(url)
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
        })
        .then( foo => {
            // always executed
            /*
            return (
                <div>{this.state.sessionData[0]}</div>
            );
            */
        });
    }

    displayQuestions()
    {
        return (
            <div>
            {
                this.state.sessionData.map(function(dict, index){
                    return (
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div><span className = "link">{JSON.stringify(dict["title"])}</span> by <span className = "link">{JSON.stringify(dict["user"]["username"])}</span></div>
                    );
                })
            }
            </div>
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
        );
    }

    render()
    {
        if(this.state.loggedIn) return (
            <div className="App">
                <div className = "main-window">
                    {this.state.responseReceived ? this.displayQuestions() : <div></div>}
                </div>
            </div>
        );
        else return(
            <Redirect to = "/"/>
        );
    }
}

export default AllQuestions;
