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
import Profile from './Profile';
import MyQuestionsAnswers from './MyQuestionsAnswers';
import Question from './Question';
import QuestionsKeyword from './QuestionsKeyword';

class App extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: false,
            username: null

        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.loginCallbackFunction = this.loginCallbackFunction.bind(this);
        this.logoutCallbackFunction = this.logoutCallbackFunction.bind(this);
        this.LoginProcess = this.LoginProcess.bind(this);

    }
    componentDidMount() {
        console.log("hello there" + document.cookie)
        let token = localStorage.getItem("token")
        console.log("test" + token)
        if (token === null || !token) {
            console.log("hello there")

            this.setState({loggedIn: false})
        }
        else{
            console.log("option2")
            let username = localStorage.getItem('username')
            this.setState({loggedIn: true, username: username})
        }
    }
    handleSubmit(){
        if(this.state.loggedIn===false)
        this.setState({loggedIn: true,});
        else
        this.setState({loggedIn: false,});
    }
    myChangeHandler(){
        console.log("test test")
    }
    loginCallbackFunction = (username) => {
        this.setState({loggedIn: true})
        this.setState({"username": username})
        localStorage.setItem('username', username)

    }
    logoutCallbackFunction = () => {
        //console.log(document.cookie)
        var mydate = new Date();
        localStorage.removeItem("token")
        this.setState({loggedIn: false})
    }
    /*<button onClick={()=>console.log(this.state.loggedIn)}></button>
    <button onClick={()=>console.log(localStorage.getItem('token'))}></button> gia elegxo mesa sto render*/
    render(){
        console.log("mytimenow" +this.state.loggedIn)

        if(this.state.loggedIn){
            return (
            <div className = "Background">
                {console.log(document.cookie)}
                <div className = "layout">
                    <div>
                    <Link to = "/" >
                        <div className="main-title">
                            Q2A
                        </div>
                    </Link>
                        <Link to="/">
                            <span className="regular-text">
                                <button onClick={this.logoutCallbackFunction} className="cool-btn">Log out</button>
                            </span>
                        </Link>
                        <Link to = "/myprofile">
                            <button className = "cool-btn">
                                {this.state.username}
                            </button>
                        </Link>
                    </div>
                </div>

                <Route exact path = "/" render={props => <Home  loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/signup"  render={props => <Signup  loggedIn={this.state.loggedIn}/>}/>
                <Route exact path = "/login" render={props => <Login loginAction={this.loginCallbackFunction} loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/askquestion" render={props => <AskQuestion  loggedIn={this.state.loggedIn} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/writeanswer" render={props => <WriteAnswer  loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/profile" render={props => <UserProfile loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/questions" render={props => <AllQuestions logoutAction={this.logoutCallbackFunction} loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/myprofile" render={props => <Profile  />} />
                <Route exact path = "/myquestionsanswers" render={props => <MyQuestionsAnswers  logoutAction={this.logoutCallbackFunction}/>} />
                <Route path = "/question/:id" render={(props) => <Question {...props} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/questionsperkeyword" render={props => <QuestionsKeyword logoutAction={this.logoutCallbackFunction} loggedIn={this.state.loggedIn}/>} />



                <div className="media">
                    <a className="myLink" href="https://github.com/antokarant/SaaS_team31">github</a>
                    <a className="myLink" href="https://www.gmail.com">email</a>
                    <a className="myLink" href="https://www.ece.ntua.gr/en">contact us</a>
                    <a className="myLink" href="https://en.wikipedia.org/wiki/Documentation">documentation</a>
                    <a className="myLink" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">course materials</a>
                </div>
            </div>
            );
        }
        else return(
            <div className = "Background">
                {console.log(document.cookie)}

                <div className = "layout">
                    <div>
                    <Link to = "/" >
                        <div className="main-title">
                            Q2A
                        </div>
                    </Link>
                        <Link to="/login">
                            <span className="regular-text">
                                <button className="cool-btn">Log in</button>
                            </span>
                        </Link>
                        <Link to = "/signup">

                        <button className = "cool-btn">
                        Sign up
                        </button>
                        </Link>
                    </div>
                </div>

                <Route exact path = "/" render={props => <Home  loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/signup"  render={props => <Signup  loggedIn={this.state.loggedIn}/>}/>
                <Route exact path = "/login" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/askquestion" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/writeanswer" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/profile" render={props => <UserProfile loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/questions" render={props => <AllQuestions loggedIn={this.state.loggedIn} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/questionsperkeyword" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction}/>} />

                <div className="media">
                    <a className="myLink" href="https://github.com/antokarant/SaaS_team31">github</a>
                    <a className="myLink" href="https://www.gmail.com">email</a>
                    <a className="myLink" href="https://www.ece.ntua.gr/en">contact us</a>
                    <a className="myLink" href="https://en.wikipedia.org/wiki/Documentation">documentation</a>
                    <a className="myLink" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34">course materials</a>
                </div>
            </div>
            );
    };
    LoginProcess(){
        let url = `http://localhost:5000/auth/login`;
        axios.post(url,
            querystring.stringify({
                "username": this.state.givenName,
                "password": this.state.givenPassword
            }),
            ).then(res => {
                    console.log("we are here")
                    let obj = res.data;
                    JSON.stringify(obj)
                    console.log(obj.access_token)
                    this.setState({token: obj.access_token})
                    console.log(this.state.token)
                    document.cookie = obj.access_token;
                    if(obj.access_token)
                            this.setState({loggedIn: true,})

        })
        .catch(error => {
            this.setState({token: null, loggedIn: false})
        });
        return ;
    }

/*<div className="header">
                            <Link to = "/" className="closeButton">
                            <button className="test">x</button>
                            </Link>
                        </div>
auto einai gia to x pou den epaize kala*/
}
export default App;
