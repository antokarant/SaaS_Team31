import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class QuestionsKeyword extends React.Component
{

    constructor(props)
    {
        super(props);
        console.log("which came first")
        this.state = {
            loggedIn: props.loggedIn,
            questions: null,
            responseReceived: false,
            keywordsReceived: false,
            questionData: null,
            keywordData: null,
            keyword: null
        };

console.log("constructor here")
        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.keywordOptions = this.keywordOptions.bind(this);
        this.fetchKeywords = this.fetchKeywords.bind(this);

        this.fetchKeywords();

    }

    componentDidMount()
    {
        if(localStorage.getItem("token")){
            this.setState({loggedIn : true})
        }

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
            // handle success
            console.log("REQUEST SENT");
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({questionData: obj});
            if(this.state.questionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            this.props.logoutAction()
        });
    }

    displayQuestions()
    {
        console.log("we are displayinng")
        return (
            <div>
                {
                this.state.questionData.map(question => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <div key = {question.id} >{question.id} {question.description} {question.title} </div>
                  
                    ))
                }
            </div>
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
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
            // handle success
            let obj = response.data;
            JSON.stringify(obj);
            console.log(obj)
            this.setState({keywordData: obj});
            if(this.state.keywordData) this.setState({keywordsReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            this.props.logoutAction()
        });
    }
    keywordOptions(){
        let result = this.state.keywordData
        return ( 
                result.map(keyword => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <option key={keyword.name}>{keyword.name}</option> 
                    ))
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
        );


    }

    render()
    {
        if(this.state.loggedIn) return (
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

                <Link to = "/">Homepage</Link>
            </div>
        );
        else return (
            <div>
            <Redirect to = "/"/>
            </div>
        );
    }
    //<textarea  name = "keyword" value={this.state.keyword} onChange={this.handleChange}></textarea>
    //gia eisodo keyword ws text
}

export default QuestionsKeyword;
