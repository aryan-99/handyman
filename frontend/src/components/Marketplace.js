import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: localStorage.getItem("company"),
            redirect: false,
            jobs: null,
        }
    }

    async getMarket() {
        this.setState({ loading: true });
        if (this.state.company) {
            axios.post("http://localhost:8082/marketplace", this.state).then((res) => {
                this.setState({ jobs: res.data.jobs });
            }).catch((error) => {
                this.setState({ error: true });
            })
        } else {
            this.setState({ redirect: true });
        }
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getMarket();
    }

    render() {
        const { loading, redirect, jobs } = this.state;
        if (!loading) {
            if (redirect) {
                return (
                    <Navigate push to={{pathname: "/login"}}/>
                );
            }
            if (jobs && jobs.length) {
                return (
                    <div className="marketplace">
                        <Navbar />
                        <br />
                        <div className="container">
                            <div className="card-group">
                                {
                                    jobs.map((job) => (
                                        <div key={job._id} className="card">
                                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                                            <div className="card-body">
                                                <h5 className="card-title"><Link to={`/view-job/${job._id}`}>{job.title}</Link></h5>
                                                <p className="card-text">{job.description}</p>
                                            </div>
                                            <div className="card-footer">
                                                <small className="text-body-secondary">Last updated at: {job.updatedAt}</small>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="marketplace">
                        <Navbar />
                        <br />
                        <div className="container">
                            <p className="lead">No jobs in the marketplace.</p>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Marketplace;