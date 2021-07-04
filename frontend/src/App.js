import './App.css';
import MyAnswers from './MyAnswers';
import AskQuestion from './AskQuestion';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import LatestQuestions from './LatestQuestions';
import UnansweredQuestions from './UnansweredQuestions';
import UserStatistics from './UserStatistics';
import React from 'react';
import {Route, Link, BrowserRouter, useHistory, withRouter} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import UserProfile from './UserProfile';
import MyQuestions from './MyQuestions';
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
        this.loginCallbackFunction = this.loginCallbackFunction.bind(this);
        this.logoutCallbackFunction = this.logoutCallbackFunction.bind(this);
        this.LoginProcess = this.LoginProcess.bind(this);

    }
    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token === null || !token) {

            this.setState({loggedIn: false})
        }
        else{
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
    loginCallbackFunction = (username) => {
        this.setState({loggedIn: true})
        this.setState({"username": username})
        localStorage.setItem('username', username)

    }
    logoutCallbackFunction = () => {
        var mydate = new Date();
        localStorage.removeItem("token")
        this.setState({loggedIn: false})
    }
    /*<button onClick={()=>console.log(this.state.loggedIn)}></button>
    <button onClick={()=>console.log(localStorage.getItem('token'))}></button> gia elegxo mesa sto render*/
    render(){

        if(this.state.loggedIn){
            return (
            <div className = "Background">
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
                        <Link to = "/profile">
                            <button className = "cool-btn">
                                {this.state.username}
                            </button>
                        </Link>
                    </div>
                </div>

                <Route exact path = "/" render={props => <Home  loggedIn={this.state.loggedIn}/>} />
                <Route exact path = "/signup"  render={props => <Signup/>}/>
                <Route exact path = "/login" render={props => <Login loginAction={this.loginCallbackFunction} />} />
                <Route exact path = "/askquestion" render={props => <AskQuestion logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/myanswers" render={props => <MyAnswers logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/latestquestions" render={props => <LatestQuestions logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/unanswered" render={props => <UnansweredQuestions logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/profile" render={props => <UserProfile  />} />
                <Route exact path = "/myquestions" render={props => <MyQuestions  logoutAction={this.logoutCallbackFunction}/>} />
                <Route path = "/question/:id" render={(props) => <Question {...props} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/stats" render={props => <UserStatistics logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/questionsperkeyword" render={props => <QuestionsKeyword logoutAction={this.logoutCallbackFunction}/>} />


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
                <Route exact path = "/signup"  render={props => <Signup />}/>
                <Route exact path = "/login" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/askquestion" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/myanswers" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/myquestions" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/profile" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/latestquestions" render={props => <Login  loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction} />} />
                <Route exact path = "/unanswered" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/questionsperkeyword" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction}/>} />
                <Route exact path = "/stats" render={props => <Login loginAction={this.loginCallbackFunction} logoutAction={this.logoutCallbackFunction}/>} />
                <Route path = "/question/:id" render={(props) => <Login logoutAction={this.logoutCallbackFunction} loginAction={this.loginCallbackFunction}/>} />


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
                    let obj = res.data;
                    JSON.stringify(obj)
                    this.setState({token: obj.access_token})
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
