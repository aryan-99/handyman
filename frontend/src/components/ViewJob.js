import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

class ViewJobClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            company: localStorage.getItem("company"),
            jobid: this.props.params.jobId,
            job: null,
            user: null,
            price: "",
            desc: "",
            loading: false,
            error: false,
            bidplaced: false,
            bid: null,
            biddeleted: false,
            bids: null,
            accepted: false,
        }
        this.submitBid = this.submitBid.bind(this);
        this.deleteBid = this.deleteBid.bind(this);
        this.acceptBid = this.acceptBid.bind(this);
    }

    acceptBid(e) {
        e.preventDefault();
        axios.post("http://localhost:8082/acceptbid", {acceptbid: e.target.id}).then((res) => {
            this.setState({ accepted: true, bids: null });
        }).catch((error) => {
            this.setState({ accepted: false });
        })
    }

    submitBid(e) {
        if (Number(this.state.price) > 0) {
            axios.post("http://localhost:8082/addbid", this.state).then((res) => {
                this.setState({ bidplaced: true, bid: res.data, error: false, biddeleted: false });
            }).catch((error) => {
                this.setState({ bidplaced: false, error: true, biddeleted: false, bid: null });
            })
        }
    }

    deleteBid(e) {
        if (this.state.bid) {
            axios.post("http://localhost:8082/deletebid", this.state).then((res) => {
                this.setState({ biddeleted: true, bid: null, error: false, bidplaced: false });
            }).catch((error) => {
                this.setState({ biddeleted: false, error: true, bidplaced: false });
            })
        }
    }

    async getJob() {
        this.setState({ loading: true });
        axios.post("http://localhost:8082/getjob", this.state).then((res) => {
            this.setState({ job: res.data.job, user: res.data.user, bid: res.data.bid, bids: res.data.bids });
        }).catch((error) => {
            this.setState({ job: null, user: null, error: true });
        })
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getJob();
    }

    render() {
        const { loading, error, job, user, price, desc, company, bid, username, bids } = this.state;
        const capitalizedCat = job ? job.category[0].toUpperCase() + job.category.slice(1) : null;
        if (!loading) {
            if (error && !job) {
                return (
                    <div className="view-job">
                        <Navbar />
                        <div className="container">
                            <p>Error retreiving job</p>
                        </div>
                    </div>
                );
            } else if (!job) {
                return (
                    <div className="view-job">
                        <Navbar />
                        {/* <div className="container text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> */}
                    </div>
                );
            }
            return (
                <div className="view-job">
                    <Navbar />
                    <br />
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                <h1 className="display-4">{job.title}</h1>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h1 className="display-6">{`@${user.username}`}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>Category: {capitalizedCat}</p>
                                </div>
                                {company && !username ? 
                                    <div className="col">
                                        <Link className="btn btn-primary" to={`/message/${job._id}`}>Message</Link>
                                    </div>
                                : null}
                            </div>
                            <div className="row">
                                <p>{job.description}</p>
                            </div>
                            { username && !company && bids && !job.accepted && bids.length ? 
                                <div>
                                    <h1 className="display-6">Bids</h1>
                                    <div className="card-group">
                                        {
                                            bids.map((entry) => (
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title"><Link to={`/profile/${entry.companyUser}`}>{entry.companyName}</Link> | ${entry.quote}</h5>
                                                        <p className="card-text">{entry.description ? entry.description : "No additional information provided."}</p>
                                                        <button className="btn btn-success" onClick={this.acceptBid} id={entry._id}>Accept Bid</button>
                                                    </div>
                                                    <div className="card-footer">
                                                        <small className="text-body-secondary">Last updated at: {entry.updatedAt}</small>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>  
                                </div>
                            : null}
                            { username && !company && job.accepted? 
                                <div>
                                    <h4>Accepted Bid</h4>
                                    <div className="card-group">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title"><Link to={`/profile/${job.companyUser}`}>{job.companyName}</Link> | ${job.quote}</h5>
                                                <p className="card-text">{job.bidDesc ? job.bidDesc : "No additional information provided."}</p>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            : null}
                            { company && !bid && !job.accepted ?
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-6">
                                        <div className="card">
                                            <div className="card-header">Place a bid</div>
                                            <div className="card-body">
                                                <div className="input-group mb-3">
                                                    <input onChange={e => this.setState({ price: e.target.value })} type="number" className="form-control mb-3" placeholder="Enter a quote" value={price} />
                                                </div>
                                                <textarea onChange={e => this.setState({ desc: e.target.value })} className="form-control mb-3" rows="3" placeholder="Enter any additional information" value={desc} />
                                            </div>
                                            <div className="card-footer"><button onClick={this.submitBid} className="btn btn-primary">Done</button></div>
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            : null }
                            { company && bid && !job.accepted ?
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-6">
                                        <div className="card">
                                            <div className="card-header">Your current bid</div>
                                            <div className="card-body">
                                                <div className="input-group mb-3">
                                                    <input readOnly type="number" className="form-control mb-3" value={bid.quote} />
                                                </div>
                                                <textarea readOnly className="form-control mb-3" rows="3" placeholder="No additional information." value={bid.description} />
                                            </div>
                                            <div className="card-footer"><button onClick={this.deleteBid} className="btn btn-danger">Delete</button></div>
                                        </div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            : null }
                            {company && job.accepted ? <p className="lead">This job has been accepted already.</p> : null}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

const ViewJob= (props) => {
    const params = useParams();
    return (
        <ViewJobClass {...props} params={params}/>
    );
};

export default ViewJob;