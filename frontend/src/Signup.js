import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class Signup extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: false,
            username: "Agent47"
        };
    }

    render()
    {
        return (
            <div className="App">
                <div className = "main-window">
                    <header className="mainheader">
                        Sign up
                    </header>
                    <div className = "main-area">
                        <div className = "user-form">
                            <form>
                                <table>
                                    <tr>
                                        <td><label className = "regular-text">User name (e-mail):</label></td>
                                        <td><input type = "text" name = "username" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Password:</label></td>
                                        <td><input type = "text" name = "password1" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Re-enter password:</label></td>
                                        <td><input type = "text" name = "password2" /></td>
                                    </tr>
                                    <br />
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div className = "footnote-wrapper">
                    <button className="footnote">
                        Submit
                    </button>
                    <button className="footnote">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

export default Signup;
