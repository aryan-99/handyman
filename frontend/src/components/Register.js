import React from "react";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            street: "",
            unit: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            msg: props.msg,
            redirect: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8082/register", this.state).then((res) => {
            this.setState({redirect: "/login", msg: "Registeration successful!"});
        }).catch((error) => {
            this.setState({msg: "Error with registeration: try again"});
        })
    }

    render() {
        return (
            <div className="register">
                {this.state.redirect ? <Navigate push to={{pathname: this.state.redirect, state: {msg: this.state.msg}}}/> : null}
                <Navbar />
                <p className={this.state.msg ? "msg" : "hidden"}>{this.state.msg}</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group container">
                        <div className="input-group mb-3">
                            <input id="firstName" value={this.state.firstName} type="text" className="form-control" placeholder="First Name" aria-label="First Name" onChange={e => this.setState({firstName: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="lastName" value={this.state.lastName} type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" onChange={e => this.setState({lastName: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="email" value={this.state.email} type="text" className="form-control" placeholder="Email" aria-label="Email" onChange={e => this.setState({email: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="at-symbol">@</span>
                            <input id="username" value={this.state.username} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="at-symbol" onChange={e => this.setState({username: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="password" value={this.state.password} type="password" className="form-control" placeholder="Password" aria-label="Password" onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="input-group mb-3">
                            <input id="street" value={this.state.street} type="text" className="form-control" placeholder="Street Address" aria-label="Street Address" onChange={e => this.setState({street: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="unit" value={this.state.unit} type="text" className="form-control" placeholder="Unit/Apt" aria-label="Unit/Apt" onChange={e => this.setState({unit: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="city" value={this.state.city} type="text" className="form-control" placeholder="City" aria-label="City" onChange={e => this.setState({city: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="state" value={this.state.state} type="text" className="form-control" placeholder="State" aria-label="State" onChange={e => this.setState({state: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="zip" value={this.state.zip} type="text" className="form-control" placeholder="Zipcode" aria-label="Zipcode" onChange={e => this.setState({zip: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input id="country" value={this.state.country} type="text" className="form-control" placeholder="Country" aria-label="Country" onChange={e => this.setState({country: e.target.value})} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;