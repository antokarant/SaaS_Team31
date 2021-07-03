import './App.css';
import axios from 'axios';
import WriteAnswer from './WriteAnswer';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class AskQuestion extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            sessionData: null,
            loggedOut: false,
            questionAsked: false,
            responseReceived:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keywordOptions = this.keywordOptions.bind(this);
        this.fetchKeywords = this.fetchKeywords.bind(this);


    }

    componentDidMount()
    {
        if(localStorage.getItem("token")){
            this.setState({loggedIn : true})
        }
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

        // connect with backend function
        if(this.state.questionTitle && this.state.questionText && this.state.keywords)
        {
            // connect with backend function - send request
            let url = `http://localhost:5000/question`;

            axios.post(url, 
                {
                title: this.state.questionTitle,
                description: this.state.questionText,
                keywords: []
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
                //this.setState({loggedOut: true})
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
            // handle success
            console.log(response);
            let obj = response.data;
            JSON.stringify(obj);
            console.log(obj)
            this.setState({sessionData: obj});
            if(this.state.sessionData) this.setState({responseReceived : true});
        })
        .catch(error => {
            // handle error
            console.log(error);
            this.props.logoutAction()
        });
    }
    keywordOptions(){
        console.log(this.state.sessionData)
        console.log("hahahahah")

        return ( 
                this.state.sessionData.map(keyword => (
    
                        // <div>{Object.entries(dict).map(([key, value]) => <div> {JSON.stringify(value)} </div> )}</div>
                        <option key={keyword.name}>{keyword.name}</option> 
                    ))
            // <div>{JSON.stringify(this.state.sessionData[0])}</div>
        );


    }
    render()
    {
        
        if(this.state.questionAsked)
            return <Redirect to = "/myquestionsanswers"/>
        if(this.state.loggedOut)
            return <Redirect to = "/"/>
        if(this.state.loggedIn) return (
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
                        <select className = "dropdown" name = "question">
                              <option></option>
                              {this.state.responseReceived ? this.keywordOptions() : <div></div>}
                        </select>
                        <select className = "dropdown" name = "question">
                              <option></option>
                              {this.state.responseReceived ? this.keywordOptions() : <div></div>}
                        </select>
                        <select className = "dropdown" name = "question">
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
        else return(
            <Redirect to = "/"/>
        );
    }
}

export default AskQuestion;
