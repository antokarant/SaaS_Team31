import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class UserProfile extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit()
    {
        this.setState({loggedIn : true});
        return ;
    }

    render()
    {
        if(this.state.loggedIn) return (
            <div className = "App">
                <div className = "main-window">
                    <header className="mainheader">
                        MY PROFILE PAGE
                    </header>
                    <div className = "main-area">
                        <div className = "big-box">My questions</div>
                        <div className = "big-box">My answers</div>
                        <Link to = "/askquestion">
                            <div className = "big-box"><span className = "regular-text">Ask a question</span></div>
                        </Link>
                        <Link to = "/writeanswer">
                            <div className = "big-box"><span className = "regular-text">Answer a question</span></div>
                        </Link>
                    </div>
                </div>
            </div>

        );
        else return (
            <Redirect to = "/"/>
        );
    }
}

export default UserProfile;
