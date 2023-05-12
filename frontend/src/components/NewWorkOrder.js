import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

class NewWorkOrderClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            title: "",
            companyUsername: this.props.params.handle,
            companyName: null,
            desc: "",
            files: [],
            validated: false,
            error: false,
            redirect: false,
            loading: false,
        }
        this.submitWorkOrder = this.submitWorkOrder.bind(this);
        this.validateWorkOrder = this.validateWorkOrder.bind(this);
    }

    validateWorkOrder() {
        if (this.state.title && this.state.desc) {
            this.setState({ validated: true, error: false });
            return true;
        }
        this.setState({ validated: false, error: true });
        return false;
    }

    submitWorkOrder(e) {
        e.preventDefault();
        const headers = {
            "Content-Type": "multipart/form-data",
        }
        if(this.validateWorkOrder()) {
            axios.post("http://localhost:8082/addworkorder", this.state, headers)
            .then((res) => {
                this.setState({ redirect: true });
            }).catch((error) => {
                this.setState({ validated: true, error: true });
            })
        }
    }

    async getCompanyProfile() {
        this.setState({ loading: true });
        axios.post("http://localhost:8082/getcompanyprofile", this.state).then((res) => {
            this.setState({ companyName: res.data.company.companyName });
        }).catch((error) => {
            this.setState({ companyName: null, error: true });
        })
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.getCompanyProfile();
    }

    render() {
        const { companyUsername, companyName, redirect, error, validated, loading, } = this.state;
        if (redirect || !companyUsername) {
            return (<Navigate push to={{pathname: "/dashboard"}}/>);
        }
        if (!loading) {
            if (error && !companyName) {
                return (
                    <div className="add-workorder">
                        <Navbar />
                        <div className="container">
                            <p>Error retreiving company name</p>
                        </div>
                    </div>
                );
            } else if (!companyName) {
                return (
                    <div className="add-workorder">
                        <Navbar />
                        {/* <div className="container text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> */}
                    </div>
                );
            }
            return (
                <div className="add-workorder">
                    <Navbar />
                    <br />
                    <div className="container">
                        {error && !validated ? <p>Error: please ensure there is a title and description</p> : null}
                        <div className="row">
                            <div className="col">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input onChange={e => this.setState({title: e.target.value})} id="title" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="companyName" className="form-label">Company</label>
                                <input id="companyName" className="form-control" type="text" value={companyName} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <textarea onChange={e => this.setState({desc: e.target.value})} id="desc" className="form-control" rows="5"></textarea>
                            </div>
                        </div>
                        {/* FIXME */}
                        {/* <div className="row">
                            <div className="col">
                                <label htmlFor="fileUpload" className="form-label">Attach images</label>
                                <input onChange={e => this.setState( {files: [...files, ...e.target.files]} )} id="fileUpload" className="form-control" type="file" multiple/>
                            </div>
                        </div> */} 
                        <div className="row">
                            <div className="col">
                                <br />
                                <button className="btn btn-primary" onClick={this.submitWorkOrder}>Request Work Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (validated && error) {
            return (
                <div className="add-workorder">
                    <Navbar />
                    <br />
                    <div className="container">
                        <p>Database error</p>
                    </div>
                </div>
            );
        }
    }
}

const NewWorkOrder= (props) => {
    const params = useParams();
    return (
        <NewWorkOrderClass {...props} params={params}/>
    );
};

export default NewWorkOrder;