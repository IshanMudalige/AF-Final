import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import Error from '../Message/Error/error';
import Header from "../Navbar/Header";


class Signin extends Component {

    state = {
        redirectToReferrer: false,
        email: '',
        password: '',
        isAdmin:false,
        isError: false,
        errorMessage: ''
    }

    textHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setError = (error, message) => {
        this.setState({
            error: error,
            errorMessage: message
        })
    }

    loginHandler = (e) => {
        e.preventDefault();

        if(this.state.email === ''){
            this.setError(true, 'Enter Email'); return;
        }

        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(this.state.email)){
            this.setError(true, 'Invalid Email Address'); return;
        }

        if(this.state.password === ''){
            this.setError(true, 'Enter Password'); return;
        }

        this.props.authenticate(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                if(response.hasOwnProperty('token')&&response.hasOwnProperty('admin')){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.setState({
                        redirectToReferrer: true,
                        isAdmin:true,
                    });
                }else if(response.hasOwnProperty('token')){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.setState({
                        redirectToReferrer: true,
                        isAdmin:false,
                    });
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.setState({
                            redirectToReferrer: true,
                        });
                    }
                })
                .catch(er => {
                    console.log(er);
                });
        }
    }


    render() {

        if(this.state.redirectToReferrer&&this.state.isAdmin)
            return <Redirect to="/addLecture"/>
        if(this.state.redirectToReferrer)
            return <Redirect to="/lectureList"/>

        return (
            <React.Fragment>
                <Header/>
                <div className="jumbotron bg-transparent d-flex align-items-center">
                    <form className="col-md-4 offset-md-4" onSubmit={this.loginHandler}>
                        <div>
                            <h4>Login</h4>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                                   value={this.state.email}
                                   onChange={this.textHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter password"
                                   value={this.state.password}
                                   onChange={this.textHandler}/>
                        </div>
                        <Error>{this.state.errorMessage}</Error>
                        <br/>
                        <div className="form-group ">
                            <button type="submit" className="btn btn-info btn-block">Login</button>
                        </div>
                        <div>
                            <span>Don't have an account ? </span><Link to="/signup"> Register here</Link>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);