import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class AskQuestion extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            sessionData: null,
            questionAsked: false,
            responseReceived:false,
            keyword1: null,
            keyword2: null,
            keyword3: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keywordOptions = this.keywordOptions.bind(this);
        this.fetchKeywords = this.fetchKeywords.bind(this);


    }

    componentDidMount()
    {
        this.fetchKeywords();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(e)
    {
        e.preventDefault();

        if(this.state.questionTitle && this.state.questionText)
        {
            let url = `http://localhost:5000/question`;
            let keywords = []
            if(this.state.keyword1 !== null)
                keywords.push({"name": this.state.keyword1})
            if((this.state.keyword2 !== null) && (this.state.keyword2 !== this.state.keyword1))
                keywords.push({"name": this.state.keyword2})
            if(this.state.keyword3 !== null && (this.state.keyword3 !== this.state.keyword1) && (this.state.keyword3 !== this.state.keyword2))
                keywords.push({"name": this.state.keyword3})

            axios.post(url, 
                {
                title: this.state.questionTitle,
                description: this.state.questionText,
                keywords: keywords
            },{ headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
            },)
            .then(res => {
                let obj = res.data;
                console.log(obj);
                JSON.stringify(obj)
                this.setState({questionAsked: true})
            })
            .catch(error => {
                console.error(error);
                this.props.logoutAction()
            });
        }
        else
        {
            console.error("Information required");
        }
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
            console.log(obj)
            this.setState({sessionData: obj});
            if(this.state.sessionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()
        });
    }
    keywordOptions(){

        return ( 
                this.state.sessionData.map(keyword => (
                            <option key={keyword.name}>{keyword.name}</option> 
                    ))
        );


    }
    render()
    {
        
        if(this.state.questionAsked)
            return <Redirect to = "/myquestionsanswers"/>

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
                            <input type = "text" className = "text-field" name = "questionTitle" onChange = {this.handleChange}/>
                            <label className = "regular-text">Description:</label>
                            <br />
                            <textarea name = "questionText" onChange = {this.handleChange}></textarea>
                            <br />
                            <label className = "regular-text">Keywords(choose up to 3 from existing keywords):</label>
                            <br />
                        </form>
                        <select name = "keyword1" value={this.state.keyword1} onChange = {this.handleChange} className = "dropdown">                              <option></option>
                              {this.state.responseReceived ? this.keywordOptions() : <div></div>}
                        </select>
                        <select name = "keyword2" value={this.state.keyword2} onChange = {this.handleChange} className = "dropdown">                              <option></option>
                              <option></option>
                              {this.state.responseReceived ? this.keywordOptions() : <div></div>}
                        </select>
                        <select name = "keyword3" value={this.state.keyword3} onChange = {this.handleChange} className = "dropdown">                              <option></option>
                              <option></option>
                              {this.state.responseReceived ? this.keywordOptions() : <div></div>}
                        </select>

                    </div>
                </div>
                <div className = "footnote-wrapper">
                    <Link to = '/'>
                        <button className="small-btn footnote" onClick = {this.handleSubmit}>
                            <span className = "regular-text">Submit</span>
                        </button>
                    </Link>
                    <Link to = '/'>
                        <button className="small-btn footnote">
                            <span className = "regular-text">Cancel</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AskQuestion;
