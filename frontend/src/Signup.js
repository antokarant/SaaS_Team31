import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

import axios from 'axios';
import querystring from 'querystring';


class Signup extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            givenName: undefined,
            givenPassword: undefined,
            givenPassword2: undefined,
            error: false,
            signedup: false,
            error2:false
        };
        this.sendData = this.sendData.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.setState({loggedIn: this.props.loggedIn})

        }

    }
    sendData = (event) => {
        event.preventDefault()
        if((!(this.state.givenName && this.state.givenPassword && this.state.givenPassword2)) || !(this.state.givenPassword === this.state.givenPassword2)){
            this.setState({error: true})
        }else {
            let url = `https://saas-team31-soa-esb.herokuapp.com/user`;
            axios.post(url,
                querystring.stringify({
                    "username": this.state.givenName,
                    "password": this.state.givenPassword
                }),
                ).then(res => {
                    this.setState({signedup: true})
            })
            .catch(error => {
                this.setState({token: null, loggedIn: false, error2: true})
            });
            return ;

        }
    }
    handleChange(event)
    {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({ [name]: value });
    }

    render()
    {
        if(this.state.signedup)
            return <Redirect to = '/login'/>
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
                                        <td><label className = "regular-text">Username:</label></td>
                                        <td><input type = "text"  name = "givenName" value={this.state.givenName} onChange={this.handleChange} /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Password:</label></td>
                                        <td><input type = "password" name = "givenPassword" value={this.state.givenPassword} onChange={this.handleChange} /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><label className = "regular-text">Re-enter password:</label></td>
                                        <td><input type = "password" name = "givenPassword2" value={this.state.givenPassword2} onChange={this.handleChange} /></td>
                                    </tr>
                                    <br />
                                    <tr>{this.state.error?"You need to give username and password and passwords must match":""}</tr>
                                    <tr>{this.state.error2?"Account with same username already exists":""}</tr>

                                </table>
                            </form>
                        </div>
                        (After successfully signing up you need to login to your account)
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
