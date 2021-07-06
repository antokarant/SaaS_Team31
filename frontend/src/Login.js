import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';



class Login extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            givenName: undefined,
            givenPassword: undefined,
            error: false,
            wrongAccount: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.setState({loggedIn: this.props.loggedIn})
        }

    }
    handleSubmit = (event) =>
    {
        event.preventDefault()
        let url = `http://localhost:5000/auth/login`;
        axios.post(url,
            querystring.stringify({
                "username": this.state.givenName,
                "password": this.state.givenPassword
            }),
            ).then(res => {
                    let obj = res.data;
                    JSON.stringify(obj)
                    this.setState({token: obj.access_token})
                    localStorage.setItem("token", obj.access_token)
                    if(obj.access_token)
                            this.setState({loggedIn: true,})
                    this.props.loginAction(this.state.givenName)

        })
        .catch(error => {
            this.setState({token: null, loggedIn: false, wrongAccount: true})
        });
        return ;
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
    {   //if(this.state.wrongAccount)
        //    return <Redirect to = "/"/>
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
                                        <td><label className = "regular-text">Username:</label></td>
                                        <td><input type = "text" name = "givenName" value={this.state.givenName} onChange={this.handleChange}/></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Password:</label></td>
                                        <td><input type = "password" name = "givenPassword" value={this.state.givenPassword} onChange={this.handleChange}/></td>
                                    </tr>
                                    <br />
                                        <button className = "small-btn"  onClick = {this.handleSubmit}>
                                            <span className = "regular-text">Login</span>
                                        </button>

                                </table>
                                <br/>
                                {this.state.error?"You need to give username and password":""}
                                {this.state.wrongAccount?"Your username and/or password is incorrect":""}

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

export default Login;
