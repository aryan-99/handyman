import React from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

class DeleteJobClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            jobid: this.props.params.jobId,
            error: false,
            redirect: false,
            loading: false,
        };
    }

    async deleteJob() {
        this.setState({ loading: true });
        axios.post("http://localhost:8082/deletejob", this.state).then((res) => {
            this.setState({ redirect: true });
        }).catch((error) => {
            this.setState({ error: true });
        })
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.deleteJob();
    }

    render() {
        const { loading, redirect } = this.state;
        if (!loading) {
            if (redirect) {
                return (
                    <Navigate push to={{ pathname: "/dashboard" }}/>
                );
            }
        }
    }
}

const DeleteJob = (props) => {
    const params = useParams();
    return (
        <DeleteJobClass {...props} params={params}/>
    );
};


export default DeleteJob;