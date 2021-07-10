import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class LatestQuestions extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            questions: null,
            responseReceived: false,
            popularQuestions: null,
            popResponseReceived: false,
            LatestQuestions: null,
            sortBy: "latest",
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchLatestQuestions = this.fetchLatestQuestions.bind(this);
        this.fetchPopularQuestions = this.fetchPopularQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
    }

    componentDidMount()
    {
        this.fetchLatestQuestions();
        this.fetchPopularQuestions();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchPopularQuestions()
    {
        let url = `http://localhost:5000/question/popular`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({popularQuestions: obj});
            if(this.state.popularQuestions) this.setState({popResponseReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }

    fetchLatestQuestions()
    {
        let url = `http://localhost:5000/question/latest`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({latestQuestions: obj});
            if(this.state.latestQuestions) this.setState({responseReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }

    displayQuestions()
    {
        if(this.state.sortBy === "latest")
            return (
                <div className = "qa-fetch-result">
                    {
                    this.state.latestQuestions.map(question => (
                        <div className = "qa-block" key = {question.id} >
                            <Link to = {`/question/${question.id}`} className = "link-text">
                                <div><div className = "qa-block-title">{question.title}</div> <div className = "qa-block-keywords">{question.keywords.map(keyword => (<div className = "keyword-box">{keyword.name}</div>))}</div> <div className = "qa-block-details">asked by {question.user.username} on {question.createdOn.slice(0, 10)}</div></div>
                            </Link>
                        </div>

                        ))
                    }
                </div>
            );
        else if(this.state.sortBy === "popular")
            return (
                <div className = "qa-fetch-result">
                    {
                    this.state.popularQuestions.map(question => (
                        <div className = "qa-block" key = {question.id} >
                            <Link to = {`/question/${question.id}`} className = "link-text">
                                <div><div className = "qa-block-title">{question.title}</div> <div className = "qa-block-keywords">{question.keywords.map(keyword => (<div className = "keyword-box">{keyword.name}</div>))}</div> <div className = "qa-block-details">asked by {question.user.username} on {question.createdOn.slice(0, 10)}</div></div>
                            </Link>
                        </div>

                        ))
                    }
                </div>
            );
    }

    render()
    {
        return (
            <div className="App">
                <div className = "main-window">
                    <header>View questions</header>
                    <div className = "main-area-quick-fix">
                        <div className = "left-text">Sort by</div>
                        <select className = "dropdown" name = "sortBy" value = {this.state.sortBy} onChange={this.handleChange}>
                            <option value = "latest">Latest</option>
                            <option value = "popular">Most popular</option>
                        </select>
                    </div>
                    {this.state.responseReceived && this.state.popResponseReceived ? this.displayQuestions() : <div></div>}
                </div>
            </div>
        );
    }
}

export default LatestQuestions;
