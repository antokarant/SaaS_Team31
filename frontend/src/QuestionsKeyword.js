import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class QuestionsKeyword extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            questions: null,
            responseReceived: false,
            keywordsReceived: false,
            questionData: null,
            keywordData: null,
            keyword: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.keywordOptions = this.keywordOptions.bind(this);
        this.fetchKeywords = this.fetchKeywords.bind(this);

        this.fetchKeywords();

    }


    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchQuestions(event)
    {
        event.preventDefault();
        let url = `http://localhost:5000/question/keyword/${this.state.keyword}`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({questionData: obj});
            if(this.state.questionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }

    displayQuestions()
    {
        return (
            <div className = "qa-fetch-result">
                {
                this.state.questionData.map(question => (
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

    fetchKeywords(){
        let url = `http://localhost:5000/keyword`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({keywordData: obj});
            if(this.state.keywordData) this.setState({keywordsReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }
    keywordOptions(){
        let result = this.state.keywordData
        return (
                result.map(keyword => (
                        <option key={keyword.name}>{keyword.name}</option>
                    ))
        );        
    }

    render()
    {
        return (
            <div className="App">
                <div className = "main-window">
                    {this.state.responseReceived ? this.displayQuestions() : <div></div>}
                </div>
                <div>
                    <select name = "keyword" value={this.state.keyword} onChange = {this.handleChange} className = "dropdown">
                              <option></option>
                              {this.state.keywordsReceived ? this.keywordOptions() : <div></div>}
                    </select>
                    <br />
                    <button className="small-btn footnote" onClick = {this.fetchQuestions}>
                          <span className = "regular-text" >Search</span>
                    </button>

                </div>
            </div>
        );
    }
}


export default QuestionsKeyword;
