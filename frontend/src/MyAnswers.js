import './App.css';
import axios from 'axios';
import React from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';

class MyAnswers extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            questions: null,
            answersReceived: false,
            answersData: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        this.displayAnswers = this.displayAnswers.bind(this);
    }

    componentDidMount()
    {
        this.fetchAnswers();
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    fetchAnswers()
    {
        let url = `http://localhost:5000/answer`;
        axios.get(url,
            {
                headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            let obj = response.data;
            JSON.stringify(obj);
            this.setState({answersData: obj});
            if(this.state.answersData) this.setState({answersReceived : true});
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction();
        });
    }

    displayAnswers()
    {
        return (
            <div className = "qa-fetch-result">
                {
                this.state.answersData.map(answer => (
                    <div className = "qa-block" key = {answer.id} >
                        <Link to = {`/question/${answer.question.id}`} className = "link-text">
                            <div><div className = "qa-block-title">{answer.question.title}</div> <div className = "qa-block-details">answered on {answer.createdOn.slice(0, 10)}</div></div>
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
                    <div className = "label-block"><span className = "regular-text">Questions answered by you</span></div>
                    {this.state.answersReceived ? this.displayAnswers() : <div></div>}
                </div>
            </div>
        );
    }
}

export default MyAnswers;
