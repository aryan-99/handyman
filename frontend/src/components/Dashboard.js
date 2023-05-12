import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            company: localStorage.getItem("company"),
            jobs: null,
            bids: null,
            loading: false,
            error: false,
            redirect: false,
        }
    }

    async getJobs() {
        this.setState({ loading: true });
        if (this.state.username || this.state.company) {
            axios.post("http://localhost:8082/jobs", this.state).then((res) => {
                this.setState({ jobs: res.data.jobs, bids: res.data.bids });
            }).catch((error) => {
                this.setState({ error: true });
            })
        } else {
            this.setState({ redirect: true });
        }
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getJobs();
    }

    render() {
        const { loading, jobs, error, redirect, company, bids } = this.state;
        if (!loading) {
            if (redirect) {
                return (
                    <Navigate push to={{pathname: "/login"}}/>
                );
            }
            if (!company) {
                if (jobs && jobs.length) { 
                    return (
                        <div className="dashboard">
                            <Navbar />
                            <br />
                            <div className="container">
                                {error ? <p>Error loading jobs</p> : 
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Marketplace</th>
                                                <th>Accepted</th>
                                                <th>Completed</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                jobs.map((entry) => (
                                                    <tr key={entry._id}>
                                                        <th key="title" scope="row">{entry.title}</th>
                                                        <td key="marketplace">{entry.marketplace ? "Yes" : "No"}</td>
                                                        <td key="accepted">{entry.accepted ? "Yes" : "No"}</td>
                                                        <td key="completed">{entry.completed ? "Yes" : "No"}</td>
                                                        <td key="actions"><Link className="btn btn-sm btn-primary" to={`/view-job/${entry._id}`}>View</Link>&nbsp;<Link className="btn btn-sm btn-danger" to={`/delete-job/${entry._id}`}>Delete</Link></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                }
                                <div>
                                    <Link className="btn btn-primary" to="/">Search for a handyman</Link>
                                    &nbsp;
                                    <Link className="btn btn-primary" to="/create-job">Create a job</Link>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="dashboard">
                            <Navbar />
                            <br />
                            <div className="container">
                                <p>No jobs to display.</p>
                                <div>
                                    <Link className="btn btn-primary" to="/">Search for a handyman</Link>
                                    &nbsp;
                                    <Link className="btn btn-primary" to="/create-job">Create a job</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                if (jobs && jobs.length) {
                    return (
                        <div className="dashboard">
                            <Navbar />
                            <br />
                            <div className="container">
                                <div className="jobs">
                                    <h1 className="display-6">Jobs</h1>
                                    {error ? <p>Error loading jobs</p> : 
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Marketplace</th>
                                                    <th>Completed</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobs.map((entry) => (
                                                        <tr key={entry._id}>
                                                            <th key="title" scope="row">{entry.title}</th>
                                                            <td key="marketplace">{entry.marketplace ? "Yes" : "No"}</td>
                                                            <td key="completed">{entry.completed ? "Yes" : "No"}</td>
                                                            <td key="actions"><Link className="btn btn-sm btn-primary" to={`/view-job/${entry._id}`}>View</Link>&nbsp;<Link className="btn btn-sm btn-primary" to={`/message/${entry._id}`}>Message</Link></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    }
                                </div>
                                <div className="bids">
                                    <h1 className="display-6">Bids</h1>
                                    {error ? <p>Error loading bids</p> : 
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Job</th>
                                                    <th>Quote</th>
                                                    <th>Accepted</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bids.map((entry) => (
                                                        <tr key={entry._id}>
                                                            <th key="job" scope="row">{entry.jobName}</th>
                                                            <td key="marketplace">{entry.quote ? "Yes" : "No"}</td>
                                                            <td key="accepted">{entry.accepted ? "Yes" : "No"}</td>
                                                            <td key="actions"><Link className="btn btn-sm btn-primary" to={`/view-job/${entry.job}`}>View</Link>&nbsp;<Link className="btn btn-sm btn-primary" to={`/message/${entry.job}`}>Message</Link></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    }
                                </div>
                                <div>
                                    <Link className="btn btn-primary" to="/marketplace">Visit Marketplace</Link>
                                    &nbsp;
                                    <Link className="btn btn-primary" to="/inbox">Check Inbox</Link>
                                </div>
                            </div>
                        </div>
                    );
                } else if (bids && bids.length) {
                    return (
                        <div className="dashboard">
                            <Navbar />
                            <br />
                            <div className="container">
                                <div className="bids">
                                    <h1 className="display-6">Bids</h1>
                                    {error ? <p>Error loading bids</p> : 
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Job</th>
                                                    <th>Quote</th>
                                                    <th>Accepted</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bids.map((entry) => (
                                                        <tr key={entry._id}>
                                                            <th key="job" scope="row">{entry.jobName}</th>
                                                            <td key="quote">${entry.quote}</td>
                                                            <td key="accepted">{entry.accepted ? "Yes" : "No"}</td>
                                                            <td key="actions"><Link className="btn btn-sm btn-primary" to={`/view-job/${entry.job}`}>View</Link>&nbsp;<Link className="btn btn-sm btn-primary" to={`/message/${entry.job}`}>Message</Link></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    }
                                </div>
                                <div>
                                    <Link className="btn btn-primary" to="/marketplace">Visit Marketplace</Link>
                                    &nbsp;
                                    <Link className="btn btn-primary" to="/inbox">Check Inbox</Link>
                                </div>
                            </div>
                        </div>
                        
                    );
                } else {
                    return (
                        <div className="dashboard">
                            <Navbar />
                            <br />
                            <div className="container">
                                <p>No jobs or bids to display.</p>
                                <div>
                                    <Link className="btn btn-primary" to="/marketplace">Visit Marketplace</Link>
                                    &nbsp;
                                    <Link className="btn btn-primary" to="/inbox">Check Inbox</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}

export default Dashboard;