import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            company: localStorage.getItem("company"),
            results: "none",
            location: "location",
            locDetails: "",
            validated: false,
            category: "category",
        };
        this.fetchList = this.fetchList.bind(this);
        this.validateLocDetails = this.validateLocDetails.bind(this);
    }

    validateLocDetails() {
        const loc = this.state.location;
        if (loc === "location" || this.state.category === "category") {
            this.setState({validated: false});
        } else if (loc === "zip" && !(isNaN(this.state.locDetails)) && this.state.locDetails.length === 5) {
            this.setState({validated: true});
        } else if (loc === "city" || loc === "state") {
            this.setState({validated: true});
        } else {
            this.setState({validated: false});
        }
    }

    fetchList(e) {
        e.preventDefault();
        this.validateLocDetails();
        if (this.state.validated) {
            axios.post("http://localhost:8082/list", this.state).then((res) => {
                this.setState({results: res.data});
            }).catch((error) => {
                this.setState({results: [], validated: false})
            })
        }
    }

    render() {
        const locationText = this.state.location === "zip" ? "zipcode" : this.state.location
        const capitalizedLoc = locationText[0].toUpperCase() + locationText.slice(1)
        const capitalizedCat = this.state.category[0].toUpperCase() + this.state.category.slice(1)
        const hasResults = this.state.results.length > 0
        const showTable = this.state.validated && this.state.results !== "none" && hasResults
        if (this.state.company) {
            return (<Navigate push to={{ pathname: "/dashboard" }}/>);
        }
        return (
            <div className="home text-center" >
                <Navbar />
                <br />
                    <div className="dashboard">
                        <h1 className="display-3">Search for Handymen</h1>
                        <br />
                        <div className="listing container">
                            <br />
                            <div className="row">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" onChange={e => this.setState({locDetails: e.target.value})} placeholder={`Search by ${locationText}`} aria-label="Search" />
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{capitalizedLoc}</button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button id="zip" className="dropdown-item" onClick={e => this.setState({location: e.target.id})}>Zipcode</button></li>
                                        <li><button id="city" className="dropdown-item" onClick={e => this.setState({location: e.target.id})}>City</button></li>
                                        <li><button id="state" className="dropdown-item" onClick={e => this.setState({location: e.target.id})}>State</button></li>
                                    </ul>
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{capitalizedCat}</button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button id="all" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>All</button></li>
                                        <li><button id="electricians" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Electricians</button></li>
                                        <li><button id="plumbers" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Plumbers</button></li>
                                        <li><button id="woodworkers" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Woodworkers</button></li>
                                        <li><button id="maintenance" className="dropdown-item" onClick={e => this.setState({category: e.target.id})}>Maintenance</button></li>
                                    </ul>
                                    <button className="btn" onClick={this.fetchList}>Search</button>
                                </div>
                            </div>
                            {/* ADD DIRECT SEARCH */}
                            {!showTable ? (!hasResults ? <p>No results found.</p>: null) :
                                <div>
                                    <br />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.results.map((entry) => (
                                                    <tr key={entry._id}>
                                                        <th key="name" scope="row"><Link key={entry.username} to={`/profile/${entry.username}`}>{entry.companyName}</Link></th>
                                                        <td key="address">{`${entry.street}, ${entry.unit ? `${entry.unit}, ` : ``}${entry.city}, ${entry.state}`}</td>
                                                        <td key="email">{entry.email}</td>
                                                        <td key="phone">{entry.phone}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
            </div>
        );
    }
}

export default Home;