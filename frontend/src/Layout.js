import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';

function Layout(props)
{
    let loggedIn = props.loggedIn;
    let logout = props.logout

    return (
        <div>
            <div className="header">
                Frame

                <Link to = "/" className="closeButton">

                        <button className="test">x</button>

                </Link>
            </div>


            <div className="main-title">
                Title
            </div>
            {loggedIn ?
                <Link to = "/">
                    <button className="cool-btn" onClick={console.log("test")}>Log out </button>
                </Link>

                :
                <Link to="/login">
                    <span className="regular-text">
                        <button className="cool-btn">Log in</button>
                    </span>
                </Link>
            }

            {loggedIn ?
                <Link to = "/profile">

                    <button className = "cool-btn" >
                        "agent 47"
                    </button>
                </Link>

                :
                <Link to = "/signup">

                    <button className = "cool-btn">
                       Sign up
                    </button>
                </Link>
            }
        </div>
    );
}

export default Layout;

