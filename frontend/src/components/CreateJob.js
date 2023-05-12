import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

class CreateJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            title: "",
            desc: "",
            files: [],
            search: "",
            handymen: [],
            category: "choose a category",
            activetab: "job",
            validated: false,
            error: false,
            redirect: false,
            searcherror: "",
            bid: false,
        }
        this.createJob = this.createJob.bind(this);
        this.getHandyman = this.getHandyman.bind(this);
        this.isRepeat = this.isRepeat.bind(this);
        this.deleteHandyman = this.deleteHandyman.bind(this);
        this.bidCheck = this.bidCheck.bind(this);
    }

    isRepeat() {
        for (var i=0; i < this.state.handymen.length; i++) {
            if (this.state.handymen[i].username === this.state.search) {
                return true;
            }
        }
        return false;
    }

    getHandyman(e) {
        e.preventDefault();
        if(this.state.search && !this.isRepeat() && (this.state.handymen.length < 10)) {
            axios.post("http://localhost:8082/gethandyman", this.state)
            .then((res) => {
                if (res.data.error !== "false") {
                    this.setState({ searcherror: res.data.error });
                } else {
                    var updatedhandymen = [...this.state.handymen];
                    updatedhandymen.push(res.data.handyman[0]);
                    this.setState({ handymen: updatedhandymen, searcherror: "" });
                }
            }).catch((error) => {
                this.setState({ validated: true, error: true });
            })
        }
    }

    bidCheck(e) {
        this.setState({ bid: !this.state.bid });
    }

    validateJob(e) {
        if (this.state.title && this.state.desc && (this.state.handymen.length || this.state.bid)) {
            this.setState({ validated: true, error: false });
            return true;
        }
        this.setState({ validated: false, error: true });
        return false;
    }

    createJob(e) {
        e.preventDefault();
        const headers = {
            "Content-Type": "multipart/form-data",
        }
        if(this.validateJob()) {
            axios.post("http://localhost:8082/createjob", this.state, headers)
            .then((res) => {
                this.setState({ redirect: true });
            }).catch((error) => {
                this.setState({ validated: true, error: true });
            })
        }
    }

    deleteHandyman(e) {
        var updatedhandymen = [...this.state.handymen]
        for (var i=0; i < this.state.handymen.length; i++) {
            if (this.state.handymen[i].username === e.target.value) {
                updatedhandymen.splice(i, 1);
                break;
            }
        }
        this.setState({ handymen: updatedhandymen });
    }

    render() {
        const { username, activetab, files, handymen, searcherror, error, validated, redirect } = this.state;
        const capitalizedCat = this.state.category[0].toUpperCase() + this.state.category.slice(1)
        if (!username) {
            return (
                <Navigate push to={{pathname: "/login"}}/>
            );
        }
        if (redirect) {
            return (<Navigate push to={{pathname: "/dashboard"}}/>);
        }
        return (
            <div className="create-job">
                <Navbar />
                <br />
                <div className="container">
                    { error && !validated ?
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <div>
                                Error creating job: ensure that all required fields are completed and you have selected at least one handyman or opted for bidding.
                            </div>
                        </div>
                    : null }
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item" onClick={e => this.setState({ activetab: "job" })}>
                                    <Link className={activetab === "job" ? "nav-link active" : "nav-link"} href="#">Job Details</Link>
                                </li>
                                <li className="nav-item" onClick={e => this.setState({ activetab: "handyman" })}>
                                    <Link className={activetab === "handyman" ? "nav-link active" : "nav-link"} to="#">Select Handymen</Link>
                                </li>
                                <li className="nav-item" onClick={e => this.setState({ activetab: "bid" })}>
                                    <Link className={activetab === "bid" ? "nav-link active" : "nav-link"}>Bid Setup</Link>
                                </li>
                            </ul>
                        </div>
                        {activetab === "job" ? 
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="title" className="form-label">Title*</label>
                                        <input onChange={e => this.setState({title: e.target.value})} id="title" className="form-control" type="text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="desc" className="form-label">Description*</label>
                                        <textarea onChange={e => this.setState({desc: e.target.value})} id="desc" className="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                                {/* FIXME */}
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="fileUpload" className="form-label">Attach images (optional)</label>
                                        <input onChange={e => this.setState( {files: [...files, ...e.target.files]} )} id="fileUpload" className="form-control" type="file" multiple/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{capitalizedCat}</button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                                <li><button id="electricians" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Electricians</button></li>
                                                <li><button id="plumbers" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Plumbers</button></li>
                                                <li><button id="woodworkers" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Woodworkers</button></li>
                                                <li><button id="maintenance" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Maintenance</button></li>
                                        </ul>
                                    </div>
                                </div>
                                <br />
                                <button className="btn btn-primary" onClick={e => this.setState({ activetab: "handyman" })}>Next</button>
                            </div>
                        : null}
                        {activetab === "handyman" ? 
                            <div className="card-body">
                                { !searcherror ? null :
                                    <div className="row">
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <div>
                                                Handyman not found with username @{searcherror}
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row">
                                    <label htmlFor="handymaninput" className="form-label">Send your job to specific handymen:</label>
                                    <div className="col input-group mb-3">
                                        <span className="input-group-text" id="at-symbol">@</span>
                                        <input onChange={e => this.setState({search: e.target.value})} id="handymaninput" className="form-control" type="text" placeholder="Ex: eliec" />
                                        <button className="btn btn-primary" onClick={this.getHandyman}>+ Add</button>
                                    </div>
                                </div>
                                { !handymen.length ? null :
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="handymanlist" className="form-label">Selected Handymen (Max. 10)</label>
                                            <ul className="list-group">
                                                {
                                                    handymen.map((worker) => (
                                                        <li key={worker.username} className="justify-content-between align-items-start list-group-item">
                                                            <div className="row">
                                                                <div className="col">
                                                                    {worker.companyName}
                                                                </div>
                                                                <div className="col-10">
                                                                    <button className="btn btn-danger btn-sm" onClick={this.deleteHandyman} value={worker.username}>Delete</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }
                                <br />
                                <button className="btn btn-primary" onClick={e => this.setState({ activetab: "bid", searcherror: "" })}>Next</button>
                            </div>
                        : null}
                        {activetab === "bid" ? 
                            <div className="card-body">
                                <div className="row">
                                    <div className="col form-check">
                                        <input className="form-check-input" type="checkbox" onChange={this.bidCheck} />
                                        <label className="form-check-label" htmlFor="bidcheck">By checking this option, your job will be available for all handymen to view in the marketplace.</label>
                                    </div>
                                </div>
                                <br />
                                <button className="btn btn-success" onClick={this.createJob}>Finish</button>
                            </div>
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateJob;