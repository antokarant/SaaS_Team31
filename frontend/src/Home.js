import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class Home extends React.Component
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
        return (
            <div className = "App">
                <div className = "main-window">
                    <header className="mainheader">
                        Welcome to AMA
                    </header>
                    <div className = "main-area">
                        <div className = "big-box">Questions per keyword</div>
                        <div className = "big-box">Questions per day</div>
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

export default Home;
