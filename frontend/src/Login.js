import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter, withRouter, Redirect} from 'react-router-dom';


class Signup extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            username: "Agent47"
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendData = this.sendData.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.setState({loggedIn: this.props.loggedIn})
        }

    }
    handleSubmit = () =>
    {
        localStorage.setItem('token', "tokenForAgent47");
        return ;
    }
    sendData = (event) => {

        event.preventDefault()
        this.props.action();
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
                                    <Link to = '/profile'>
                                        <button className = "small-btn"  onClick = {this.sendData}>
                                            <span className = "regular-text">Login</span>
                                        </button>
                                    </Link>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        else return (
            <Redirect to = "/"/>
        );
    }
}

export default Signup;
