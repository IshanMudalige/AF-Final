import React, {Component} from 'react';
import Header from "../Navbar/Header";
import img from './landing_1.png';
import './styles.css';
import {Link} from "react-router-dom";

class Home extends Component {

    render(){
        return(
            <React.Fragment>
                <Header/>
                <br/>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <img src={img} alt={img} className="img-fluid img-absolute image"/>
                        <div className="row mb-4 text">
                            <div className="col-lg-4 mr-auto">
                                <h1>Start Online Learning</h1>
                                <p className="mb-5">Advances in technology now allow students to study entirely online while still socializing with classmates, watching lectures and participating in subject-specific discussions..</p>
                                <div>
                                    <Link className="text-link" to="/signin"><a href="#" className="btn btn-danger mr-2 mb-2">Get Started</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Home;