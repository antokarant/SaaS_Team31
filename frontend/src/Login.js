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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit()
    {
        this.setState({loggedIn : true});
        return ;
    }

    render()
    {
        if(!this.state.loggedIn) return (
            <div className = "App">
                <div className = "main-window">
                    <header className="mainheader">
                        Log in
                    </header>
                    <div className = "main-area">
                        <div className = "user-form">
                            <form>
                                <table>
                                    <tr>
                                        <td><label className = "regular-text">User name:</label></td>
                                        <td><input type = "text" name = "username" /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Password:</label></td>
                                        <td><input type = "text" name = "password" /></td>
                                    </tr>
                                    <br />
                                    <button onClick = {this.handleSubmit}>Login</button>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        else return (
            <div></div>
        );
    }
}

export default Signup;
