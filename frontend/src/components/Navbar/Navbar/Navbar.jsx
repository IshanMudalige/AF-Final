import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as authActions from '../../../actions/authActions';
import { connect } from 'react-redux';
import './link.styles.css'

class Navbar extends Component{

    componentDidMount() {
        this.props.getToken();
    }

    render() {

        let dashboard;

        let guestAccount =  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li className="dropdown-item"><Link className="text-link" to="/signup"><i className="fa fa-user-plus"/>&nbsp;&nbsp;<span>Register</span></Link></li>
            <li className="dropdown-item"><Link className="text-link" to="/signin"><i className="fa fa-sign-in"/>&nbsp;&nbsp;<span>Login</span></Link></li>
        </div>;

        if(this.props.auth.isAuthenticated){
            guestAccount = <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="dropdown-item"><Link className="text-link" to="" onClick={() => this.props.logout()}><i className="fa fa-sign-out"/>&nbsp;&nbsp;<span>Logout</span></Link></li>
            </div>;

            dashboard = <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link"><Link to="/lectureList" className="text-link">Lecture List</Link></a>
                </li>
            </ul>
        }
        if(this.props.auth.isAuthenticated && this.props.auth.user.isAdmin){
            guestAccount = <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="dropdown-item"><Link className="text-link" to="" onClick={() => this.props.logout()}><i className="fa fa-sign-out"/>&nbsp;&nbsp;<span>Logout</span></Link></li>
            </div>;

            dashboard = <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link"><Link to="/addLecture" className="text-link">Add Lecture</Link></a>
                </li>
            </ul>
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <a className="navbar-brand brand"><Link className="text-link" to="/">e-Learning</Link></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        {dashboard}
                    </ul>
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-link" id="navbarDropdownMenuLink"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                  to="/account"><i className="fa fa-user-circle-o"/>&nbsp;&nbsp;{this.props.auth.isAuthenticated ? this.props.auth.user.firstName: 'My Account'}&nbsp;&nbsp;</Link>
                            {guestAccount}
                        </li>
                    </ul>
                    <ul>&nbsp;</ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);