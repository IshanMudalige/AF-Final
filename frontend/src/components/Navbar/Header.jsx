import React, { Component } from 'react';
import Navbar from "./Navbar/Navbar";
import * as authActions from '../../actions/authActions'
import { connect } from 'react-redux';

class Header extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <header className="Header">
                <Navbar logout={this.logout}/>
            </header>
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
        getToken: () => dispatch(authActions.getToken()),
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);