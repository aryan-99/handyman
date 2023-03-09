import React from "react";
import Navbar from "./Navbar";
import axios from "axios";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            results: [],
            filter: "",
        };
        this.fetchList = this.fetchList.bind(this);
    }

    fetchList(e) {
        this.setState({filter: e.target.id});
        axios.post(`http://localhost:8082/list=${e.target.id}`, this.state).then((res) => {
            this.setState({results: res.data});
        }).catch((error) => {
        })
    }

    render() {
        return (
            <div className="home text-center" >
                <Navbar />
                <br />
                {!this.state.username ? <h1 class="display-3">Welcome to Handyman! Please register or login to begin</h1> :
                    <div className="dashboard">
                        <h1 class="display-3">Welcome to your dashboard, {this.state.username}</h1>
                        <br />
                        <div className="btn-group" role="group" aria-label="Filter listing">
                            <input type="radio" className="btn-check" name="btnradio" id="zip" autoComplete="off" onChange={this.fetchList} />
                            <label className="btn btn-outline-primary" htmlFor="zip">Zip</label>

                            <input type="radio" className="btn-check" name="btnradio" id="city" autoComplete="off" onChange={this.fetchList} />
                            <label className="btn btn-outline-primary" htmlFor="city">City</label>

                            <input type="radio" className="btn-check" name="btnradio" id="state" autoComplete="off" onChange={this.fetchList} />
                            <label className="btn btn-outline-primary" htmlFor="state">State</label>
                        </div>
                        {!this.state.filter ? null : 
                            <div className="listing">
                                <p>Here are all the handymen located within your {this.state.filter === "zip" ? "zipcode" : this.state.filter}:</p>
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
                                                <tr>
                                                    <th scope="row">{entry.companyName}</th>
                                                    <td>{`${entry.street}, ${entry.unit ? `${entry.unit}, ` : ``}${entry.city}, ${entry.state}`}</td>
                                                    <td>{entry.email}</td>
                                                    <td>{entry.phone}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Home;