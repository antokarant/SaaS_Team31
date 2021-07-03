import './App.css';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class Home extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
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
        return (
            <div className = "App">
                <div className = "main-window">
                    <header className="mainheader">
                        Welcome to AMA
                    </header>
                    <div className = "main-area">
                        
                        <Link to = "/questionsperkeyword">
                            <div className = "big-box">Questions per keyword</div>
                        </Link>
                        <Link to = "/latestquestions">
                            <div className = "big-box">Latest Questions</div>
                        </Link>
                        <Link to = "/askquestion">
                            <div className = "big-box"><span className = "regular-text">Ask a question</span></div>
                        </Link>
                        
                            <div className = "big-box"><span className = "regular-text">To be filled</span></div>

                    </div>
                </div>

            </div>

        );
    }
}

export default Home;
