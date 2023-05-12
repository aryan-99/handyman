import React from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

class DeleteWorkOrderClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            orderId: this.props.params.orderId,
            error: false,
            redirect: false,
            loading: false,
        };
    }

    async deleteWorkOrder() {
        this.setState({ loading: true });
        axios.post("http://localhost:8082/deleteworkorder", this.state).then((res) => {
            this.setState({ redirect: true });
        }).catch((error) => {
            this.setState({ error: true });
        })
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.deleteWorkOrder();
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

const DeleteWorkOrder = (props) => {
    const params = useParams();
    return (
        <DeleteWorkOrderClass {...props} params={params}/>
    );
};


export default DeleteWorkOrder;