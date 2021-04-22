import './App.css';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';

class AskQuestion extends React.Component
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
                        Ask question
                    </header>
                    <div className = "main-area">
                        <form>
                            <label className = "regular-text">Question Title:</label>
                            <br />
                            <input type = "text" className = "text-field" name = "questionText" />
                            <label className = "regular-text">Description:</label>
                            <br />
                            <textarea name = "questionText"></textarea>
                            <label className = "regular-text">Keywords:</label>
                            <br />
                            <input type = "text" className = "text-field" name = "keywords" />
                        </form>
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

export default AskQuestion;
