import React from "react";
import Navbar from "./Navbar";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
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
        axios.post("http://localhost:8082/login", this.state).then((res) => {
            localStorage.setItem("username", this.state.username);
            console.log("Logged in as ", localStorage.getItem("username"));
            this.setState({redirect: "/"});
        }).catch((error) => {
            this.setState({msg: "Error logging in"});
        })
    }

    render() {
        return (
            <div className="login">
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
                <p>Don't have an account? Click <Link to="/register">here</Link> to register</p>
            </div>
        );
    }
}

export default Login;