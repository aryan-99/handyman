import React from "react";
import { Navigate } from "react-router-dom";

class Logout extends React.Component {
    render() {
        localStorage.setItem("username", "");
        localStorage.setItem("company", "");
        return (
            <Navigate push to={{pathname: "/login"}}/>
        );
    }
}

export default Logout;