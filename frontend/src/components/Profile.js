import React from "react";
import Navbar from "./Navbar";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="profile">
                <Navbar />
            </div>
        );
    }
}

export default Profile;