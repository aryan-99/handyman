import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
        };
    }
    render() {
        return (
            <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Handyman</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item">{this.state.username ? <Link className="nav-link active" to="/profile">Profile</Link> : null}</li>
                            <li className="nav-item">{this.state.username ? <Link className="nav-link active" to="/logout">Logout</Link> : <Link className="nav-link active" to="/login">Login</Link>}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;