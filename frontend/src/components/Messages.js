import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

class MessagesClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            company: localStorage.getItem("company"),
            loading: false,
            error: false,
            messages: null,
            jobid: this.props.params.jobid,
            newMsg: "",
            job: null,
        }
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.newMsg) {
            axios.post("http://localhost:8082/addjobmessage", this.state).then((res) => {
                this.getMessages();
            }).catch((error) => {
                this.setState({ error: true });
            })
        }
        this.setState({ newMsg: "" });
    }

    async getMessages() {
        this.setState({ loading: true, newMsg: "" });
        axios.post("http://localhost:8082/jobmessages", this.state).then((res) => {
            this.setState({ messages: res.data.messages,  job: res.data.job, newMsg: "" });
        }).catch((error) => {
            this.setState({ error: true });
        })
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getMessages();
    }

    render() {
        const { loading, messages, job, error, username, newMsg, company, jobid } = this.state;
        const sender = username ? username : company;
        if (!loading) {
            if (messages && !error) {
                if (messages.length <= 0) {
                    return (
                        <div className="job-messages">
                            <Navbar />
                            <br />
                            <div className="container">
                                <p className="text-center lead"><Link to={`/view-job/${jobid}`}>Job: <b>{job.title}</b></Link></p>
                                <br />
                                <p className="text-center">Begin the conversation</p>
                                <br />
                                <div className="input-group mb-3">
                                    <input value={newMsg} onChange={e => this.setState({ newMsg: e.target.value })} type="text" className="form-control" placeholder="Send a message..." />
                                    <button onClick={this.sendMessage} className="btn btn-outline-secondary" type="button">Send</button>
                                </div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="job-messages">
                        <Navbar />
                        <br />
                        <div className="container">
                            <p className="text-center lead"><Link to={`/view-job/${jobid}`}>Job: <b>{job.title}</b></Link></p>
                            <div className="container overflow-auto">
                                {
                                    messages.map((msg) => (
                                        <div className="row">
                                            <div className="col-6">
                                                {msg.sender === sender ? null :
                                                    <div className="card">
                                                        <div className="card-body">
                                                            {msg.content.text}
                                                        </div>
                                                        <div className="card-footer text-body-secondary">
                                                            {msg.timestamp}
                                                        </div>
                                                    </div>
                                                }
                                                <br />
                                            </div>
                                            <div className="col-6">
                                                {msg.sender !== sender ? null :
                                                    <div className="card">
                                                        <div className="card-body">
                                                            {msg.content.text}
                                                        </div>
                                                        <div className="card-footer text-body-secondary">
                                                            {msg.timestamp}
                                                        </div>
                                                    </div>
                                                }
                                                <br />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <br />
                            <div className="input-group mb-3">
                                <input value={newMsg} onChange={e => this.setState({ newMsg: e.target.value })} type="text" className="form-control" placeholder="Send a message..." />
                                <button onClick={this.sendMessage} className="btn btn-outline-secondary" type="button">Send</button>
                            </div>
                        </div>
                    </div>
                );
            } else {
                if (error) {
                    return (
                        <div className="job-messages">
                            <Navbar />
                            <br />
                            <div className="container">
                                <p className="text-center">Database Error</p>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}

const Messages= (props) => {
    const params = useParams();
    return (
        <MessagesClass {...props} params={params}/>
    );
};


export default Messages