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
            username: "Agent47",
            givenName: undefined,
            givenPassword: undefined,
            error: false,
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleChange = this.handleChange.bind(this);

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
        if(!(this.state.givenName && this.state.givenPassword)){
            this.setState({error: true})
           // alert("message")
        }
        else {
            this.props.action();
        }
    }
    handleChange(event)
    {
        let target = event.target;
        let value = target.value;
// must check for type if datatypes are different, here both are strings
        let name = target.name;

        this.setState({ [name]: value });
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
                                        <td><input type = "text" name = "givenName" value={this.state.givenName} onChange={this.handleChange}/></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Password:</label></td>
                                        <td><input type = "text" name = "givenPassword" value={this.state.givenPassword} onChange={this.handleChange}/></td>
                                    </tr>
                                    <br />
                                    <Link to = '/profile'>
                                        <button className = "small-btn"  onClick = {this.sendData}>
                                            <span className = "regular-text">Login</span>
                                        </button>
                                    </Link>
                                </table>
                                <br/>
                                {this.state.error?"You need to give username and password":""}
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
