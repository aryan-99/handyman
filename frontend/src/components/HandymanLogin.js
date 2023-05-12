import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

class HandymanLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            msg: "",
            redirect: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8082/handyman-login", this.state).then((res) => {
            localStorage.setItem("company", res.data.company);
            localStorage.setItem("token", res.data.token);
            console.log("Logged in as ", localStorage.getItem("company"));
            this.setState({redirect: "/"});
        }).catch((error) => {
            this.setState({msg: "Error logging in"});
        })
    }

    render() {
        return (
            <div className="handyman-login text-center">
                {this.state.redirect ? <Navigate push to={{pathname: this.state.redirect, state: {msg: this.state.msg}}}/> : null}
                <Navbar />
                <p className={this.state.msg ? "msg" : "hidden"}>{this.state.msg}</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group container">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="at-symbol">@</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="at-symbol" onChange={e => this.setState({username: e.target.value})} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Login</button>
                        </div>
                    </div>
                </form>
                <p>Want to register as a handyman? Contact us now!</p>
                <p>Looking for handymen? Click <Link to="/login">here</Link> to go to the customer login</p>
            </div>
        );
    }
}

export default HandymanLogin;