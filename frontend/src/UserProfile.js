import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class UserProfile extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: false,
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
        return (
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
                <div className = "footnote-wrapper">
                    <button className="small-btn footnote">
                        <span className = "regular-text">About</span>
                    </button>
                    <button className="small-btn footnote">
                        <span className = "regular-text">Contact</span>
                    </button>
                </div>
            </div>

        );
    }
}

export default UserProfile;
