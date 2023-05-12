import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

class CompanyProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            companyUsername: this.props.params.handle,
            company: null,
            loading: false,
            error: false,
            reviews: null,
            title: "",
            desc: "",
            rating: "",
        };
        this.companyText = this.companyText.bind(this);
        this.addReview = this.addReview.bind(this);
    }

    addReview(e) {
        e.preventDefault();
        if (this.state.title && this.state.desc && this.state.rating) {
            axios.post("http://localhost:8082/addreview", this.state).then((res) => {
                this.getCompanyProfile();
            }).catch((error) => {
            })
        }
    }

    async getCompanyProfile() {
        this.setState({ loading: true, title: "", desc: "", rating: "" });
        axios.post("http://localhost:8082/getcompanyprofile", this.state).then((res) => {
            this.setState({ company: res.data.company, reviews: res.data.reviews });
        }).catch((error) => {
            this.setState({ company: null, error: true });
        })
        this.setState({ loading: false });
    }

    companyText(name) {
        let text;
        if (name !== "maintenance") {
            text = name.slice(0, -1);
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    componentDidMount() {
        this.getCompanyProfile();
    }

    render() {
        const { loading, error, company, reviews, username, title, desc, rating } = this.state;
        if (!loading) {
            if (error && !company) {
                return (
                    <div className="company-profile">
                        <Navbar />
                        <div className="container">
                            <p>Error retreiving profile</p>
                        </div>
                    </div>
                );
            } else if (!company) {
                return (
                    <div className="company-profile">
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
                <div className="company-profile">
                    <Navbar />
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                <h1 className="display-4">{`${company.companyName} (@${company.username})`}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1 className="display-6">{this.companyText(company.category)}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="lead">{company.email}</p>
                                <p className="lead">{company.phone}</p>
                            </div>
                            {/* <div className="col">
                                <p></p>
                                <Link className="btn btn-primary" to={`/request-workorder/${company.username}`}>Request a work order</Link>
                            </div> */}
                            <div className="col">
                                <div className="col">
                                    <p className="lead">{`${company.street}, ${company.unit ? `${company.unit} ` : ``}`}</p>
                                    <p className="lead">{`${company.city}, ${company.state}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>{company.about}</p>
                            </div>
                        </div>
                        <div className="row">
                            <hr />
                            <div className="col">
                                <h1 className="display-6">Recent Reviews</h1>
                            </div>
                        </div>
                        { !reviews || reviews.length <= 0 ? null :
                            <div className="row">
                                <div className="col">
                                    <div className="card text-center">
                                        <div className="card-header">
                                            {reviews[0].rating}/5
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{reviews[0].title}</h5>
                                            <p className="card-text overflow-auto">{reviews[0].description}</p>
                                        </div>
                                        <div className="card-footer text-body-secondary">
                                            {reviews[0].updatedAt}
                                        </div>
                                    </div>
                                </div>
                                {reviews.length >= 2 ?
                                    <div className="col">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                {reviews[1].rating}/5
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{reviews[1].title}</h5>
                                                <p className="card-text overflow-auto">{reviews[1].description}</p>
                                            </div>
                                            <div className="card-footer text-body-secondary">
                                                {reviews[1].updatedAt}
                                            </div>
                                        </div>
                                    </div>
                                : null}
                                {reviews.length >= 3 ?
                                    <div className="col">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                {reviews[2].rating}/5
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{reviews[2].title}</h5>
                                                <p className="card-text overflow-auto">{reviews[2].description}</p>
                                            </div>
                                            <div className="card-footer text-body-secondary">
                                                {reviews[2].updatedAt}
                                            </div>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                        <br />
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#reviewCollapse" aria-expanded="false" aria-controls="reviewCollapse">
                                    Add Review
                                </button>
                            </div>
                            <div className="col">
                                {/* ADD ALL REVIEWS VIEW */}
                                <Link className="btn btn-primary mb-3">See All</Link> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-8">
                                <div className="collapse" id="reviewCollapse">
                                    <div className="card">
                                        <div className="card-header">@{username}'s Review</div>
                                        <div className="card-body">
                                            <input onChange={e => this.setState({ title: e.target.value })} type="text" className="form-control mb-3" placeholder="Enter a title" value={title} />
                                            <textarea onChange={e => this.setState({ desc: e.target.value })} className="form-control mb-3" rows="3" placeholder="Enter your review" value={desc} />
                                            <div className="row">
                                                <p>Rating (out of 5)</p>
                                                <input onChange={e => this.setState({ rating: e.target.value })} type="range" className="form-range" min="1" max="5" value={rating} />
                                            </div>
                                        </div>
                                        <div className="card-footer"><button onClick={this.addReview} className="btn btn-primary">Done</button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                        <br />
                    </div>
                </div>
            );
        }
    }
}

const CompanyProfile= (props) => {
    const params = useParams();
    return (
        <CompanyProfileClass {...props} params={params}/>
    );
};

export default CompanyProfile;