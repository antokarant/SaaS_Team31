import './App.css';
import WriteAnswer from './WriteAnswer';
import AskQuestion from './AskQuestion';
import Signup from './Signup';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';
import AllQuestions from './AllQuestions';
import UserProfile from './UserProfile';
import React from 'react';
import {Route, Link, BrowserRouter, useHistory, withRouter} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';


class Profile extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
        };
    }
    /*<button onClick={()=>console.log(this.state.loggedIn)}></button>
    <button onClick={()=>console.log(localStorage.getItem('token'))}></button> gia elegxo mesa sto render*/
    render()
    {
        return (
            <div className = "App">
                <div className = "main-window">
                    <header className="mainheader">
                        My Profile page
                    </header>
                    <div className = "main-area">
                        <Link to = "/myquestionsanswers">
                            <div className = "big-box">my questions - my answers</div>
                        </Link>
                        <Link to = "/stats">
                            <div className = "big-box">my contributions per day</div>
                        </Link>
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
    }
}
export default Profile;
