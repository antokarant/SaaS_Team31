import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class Signup extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47"
        };
        this.sendData = this.sendData.bind(this);

    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.setState({loggedIn: this.props.loggedIn})

        }

    }
    sendData = (event) => {

        event.preventDefault()
        this.props.action();
    }

    render()
    {
        if(!this.state.loggedIn)
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
                        <button className="small-btn footnote" onClick = {this.sendData}>
                            <span className = "regular-text">Submit</span>
                        </button>

                    <Link to = '/'>
                        <button className="small-btn footnote">
                            <span className = "regular-text">Cancel</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
        else return (
            <Redirect to = "/"/>
        );
    }
}

export default Signup;
