import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class AskQuestion extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47",
            questionTitle: null,
            keywords: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(e)
    {
        e.preventDefault();

        // connect with backend function
        if(this.state.questionTitle && this.state.keywords)
        {
            // connect with backend function - send request
            let url = `http://localhost:5000/question`;

            axios.post(url, {
                title: this.state.questionTitle,
                user: {id: 1},
                keyword: {name: this.state.keywords}
            })
            .then(res => {
                let obj = res.data;
                console.log(obj);
                JSON.stringify(obj)
            })
            .catch(error => {
                console.error(error);
            });
        }
        else
        {
            console.error("Information required");
        }
    }

    render()
    {
        if(this.state.loggedIn) return (
            <div className="App">
                <div className = "main-window">
                    <header className="mainheader">
                        Ask question
                    </header>
                    <div className = "main-area">
                        <form>
                            <label className = "regular-text">Question Title:</label>
                            <br />
                            <input type = "text" className = "text-field" name = "questionTitle" onChange = {this.handleChange}/>
                            <label className = "regular-text">Description:</label>
                            <br />
                            <textarea name = "questionText" onChange = {this.handleChange}></textarea>
                            <label className = "regular-text">Keywords:</label>
                            <br />
                            <input type = "text" className = "text-field" name = "keywords" onChange = {this.handleChange}/>
                        </form>
                    </div>
                </div>
                <div className = "footnote-wrapper">
                    <Link to = '/'>
                        <button className="small-btn footnote" onClick = {this.handleSubmit}>
                            <span className = "regular-text">Submit</span>
                        </button>
                    </Link>
                    <Link to = '/'>
                        <button className="small-btn footnote">
                            <span className = "regular-text">Cancel</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
        else return(
            <Redirect to = "/"/>
        );
    }
}

export default AskQuestion;
