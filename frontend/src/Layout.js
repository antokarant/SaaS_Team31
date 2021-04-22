import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

function Layout(props)
{
    let loggedIn = props.loggedIn
    return (
        <div>
            <div className="header">
                Frame
                <button className = "closeButton">x</button>
            </div>

            <div className="main-title">
                Title
            </div>

            <Link to = "/login">
                <button className = "cool-btn">
                    <span className = "regular-text">{loggedIn ? "Log out" : "Log in"}</span>
                </button>
            </Link>

            <Link to = "/signup">
                <button className = "cool-btn">
                    <span className = "regular-text">{loggedIn ? this.state.username : "Sign up"}</span>
                </button>
            </Link>
        </div>
    );
}

export default Layout;
