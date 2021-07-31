import './App.css';
import axios from 'axios';
import React, {UseState} from 'react';
import {Route, Link, BrowserRouter, Redirect} from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';

class UserStatistics extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            questionsReceived: false,
            questionData: null,
            answersReceived: false,
            answerData: null,
            questionCount: 0,
            answerCount: 0,
            voteCount: 0,
            calculated: false,
            questionFrequency: null,
            answerFrequency: null,
            latestMonths: null,
            loggedOut:false,
            userChoice: "total",
        };

        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        this.calculateStats = this.calculateStats.bind(this);
        this.displayStats = this.displayStats.bind(this);
        this.populateFrequencyArray = this.populateFrequencyArray.bind(this);
        this.getLatestMonths = this.getLatestMonths.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    componentDidMount()
    {
        if(document.cookie)
        {
            this.setState({loggedIn : true, loggedout: false})
        }
        this.getLatestMonths();
        this.fetchQuestions();
        this.fetchAnswers();
    }

    getLatestMonths()
    {
        let length = 4;
        let latestMonths = new Array(length);
        let d = new Date(Date.now());
        d.setDate(1); // set day to one that all months have, because setMonth will be used next
        // extract YYYY-MM from date string
        let m = d.getMonth() + 1; // January is 0
        m = m.toString();
        if(m.length === 1) m = "0" + m;

        let s = d.getFullYear() + "-" + m;
        latestMonths[length - 1] = s;

        for(let i = length - 2; i >= 0; i--)
        {
            d.setMonth(d.getMonth() - 1); // shift one month to the past, works for January
            m = d.getMonth() + 1;
            m = m.toString();
            if(m.length === 1) m = "0" + m;
            s = d.getFullYear() + "-" + m;
            latestMonths[i] = s;
        }

        this.setState({latestMonths: latestMonths});
    }

    fetchAnswers()
    {
        let url = `https://saas-team31-soa-esb.herokuapp.com/answer`;
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
            this.setState({answerData: obj});
            this.setState({answerCount: obj.length});
            if(this.state.answerData)
            {
                this.setState({answersReceived : true});
                this.calculateStats(this.state.answerData);
                this.populateFrequencyArray(this.state.answerData, "a");
            }
        })
        .catch(error => {
            // handle error
            console.log(error);
            this.props.logoutAction();
        });
    }

    fetchQuestions()
    {
        let url = `https://saas-team31-soa-esb.herokuapp.com/question/user`;
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
            this.setState({questionData: obj});
            this.setState({questionCount: obj.length});
            if(this.state.questionData)
            {
                this.setState({questionsReceived : true});
                this.calculateStats(this.state.questionData);
                this.populateFrequencyArray(this.state.questionData, "q");
            }
        })
        .catch(error => {
            console.log(error);
            this.props.logoutAction()

        });
    }

    calculateStats(dataFromBackend)
    {
        let counter = this.state.voteCount;
        for(const q of Object.entries(dataFromBackend))
        {
            // q is an array of 2 elements, first is a key and second the object with all the data
            counter += q[1].upvotes;
        }

        this.setState({voteCount: counter});
        this.setState({calculated: true});
    }

    populateFrequencyArray(dataFromBackend, type)
    {
        let ans = {};
        for(let i = 0; i < this.state.latestMonths.length; i++) ans[this.state.latestMonths[i]] = 0;
        for(const e of Object.entries(dataFromBackend))
        {
            let creationDate = e[1].createdOn.slice(0, 7);
            if(this.state.latestMonths.includes(creationDate))
                ans[creationDate] += 1;
        }

        ans = Object.values(ans);
        if(type === "q") this.setState({questionFrequency: ans});
        else if(type === "a") this.setState({answerFrequency: ans});
    }

    displayStats()
    {
        let pieData = [this.state.questionCount, this.state.answerCount];

        return (
            <div>
                <div className = "main-area">
                    <div>Total questions asked {this.state.questionCount}</div>
                    <div>Total answers submitted {this.state.answerCount}</div>
                    <div>User score {this.state.voteCount}</div>
                </div>

                <div>Your activity</div>
                <div onChange = {this.handleChange}>
                    <input type = "radio" className = "btn-radio" value = "total" name = "userChoice" checked = {this.state.userChoice === "total"} />
                    <label>Total</label>
                    <input type = "radio" className = "btn-radio" value = "time" name = "userChoice" checked = {this.state.userChoice === "time"} />
                    <label>Over time</label>
                </div>
                {this.state.userChoice === "total" ?
                    <div className = "chart-container">
                        <Pie
                            data = {{
                                labels: ["Questions", "Answers"],
                                datasets: [
                                    {
                                        label: "Submitted by user",
                                        data: pieData,
                                        backgroundColor: [
                                            'rgba(223, 98, 55, 0.2)',
                                            'rgba(10, 59, 95, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(223, 98, 55, 1)',
                                            'rgba(10, 59, 95, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    </div>
                    : <div></div> }
                {this.state.userChoice === "time" ?
                <div>
                    <div className = "chart-container">
                        <Bar
                            data = {{
                                labels: this.state.latestMonths,
                                datasets: [
                                    {
                                        label: "Questions per month",
                                        data: this.state.questionFrequency,
                                        backgroundColor: [
                                            'rgba(223, 98, 55, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(223, 98, 55, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div className = "chart-container">
                        <Bar
                            data = {{
                                labels: this.state.latestMonths,
                                datasets: [
                                    {
                                        label: "Answers per month",
                                        data: this.state.answerFrequency,
                                        backgroundColor: [
                                            'rgba(10, 59, 95, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(10, 59, 95, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    </div></div> : <div></div> }
                </div>
        );
    }

    render()
    {
        if(this.state.loggedOut) return <Redirect to= "/"/>
        return (
            <div className="App">
                <div className = "main-window">
                    <header>Your contributions</header>
                    {this.state.questionsReceived ? this.displayStats() : <div></div>}
                </div>
            </div>
        );
    }
}

export default UserStatistics;
