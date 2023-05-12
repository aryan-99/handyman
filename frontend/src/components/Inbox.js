import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            company: localStorage.getItem("company"),
            threads: [],
            error: false,
            redirect: false,
            loading: false,
        }
    }

    async getInbox() {
        this.setState({ loading: true });
        if (this.state.username || this.state.company) {
            axios.post("http://localhost:8082/inbox", this.state).then((res) => {
            this.setState({ threads: res.data });
            }).catch((error) => {
                this.setState({ error: true });
            })
        } else {
            this.setState({ redirect: true });
        }
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getInbox();
    }

    render() {
        const { loading, redirect, threads, company, username } = this.state;
        if (!loading) {
            if (redirect) {
                return (
                    <Navigate push to={{pathname: "/login"}}/>
                );
            }
            if (company && threads && threads.length) {
                return (
                    <div className="inbox">
                        <Navbar />
                        <br />
                        <div className="container">
                            <div className="list-group">
                                {
                                    threads.map((thread) => (
                                        <Link key={thread.id} type="button" className="list-group-item list-group-item-action" to={`/message/${thread.job}`}>{`${thread.title} (@${thread.username})`}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                );
            }
            if (username && threads && threads.length) {
                return (
                    <div className="inbox">
                        <Navbar />
                        <br />
                        <div className="container">
                            <div className="list-group">
                                {
                                    threads.map((thread) => (
                                        <Link key={thread._id} type="button" className="list-group-item list-group-item-action" to={`/message/${thread.job}`}>{`${thread.title} (${thread.companyName})`}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div className="inbox">
                        <Navbar />
                        <br />
                        <div className="container">
                            <p className="lead">No messages to show.</p>
                        </div>
                    </div>
            );
        }
    }
}

export default Inbox;