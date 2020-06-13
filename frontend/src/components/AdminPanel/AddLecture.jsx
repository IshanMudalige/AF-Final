import React, {Component} from 'react';
import Header from "../Navbar/Header";
import  { connect } from 'react-redux';
import Error from '../Message/Error/error';
import * as authActions from '../../actions/authActions';
import {base_url} from "../../constants/index";
import Success from "../Message/Success/succeess";

class AddLecture extends Component {

    state = {
        lecture: {
            title:'',
            description:'',
            content:'',
            category:'',
            createdBy:'',
            isError: false,
            errorMessage: '',
            isSuccess:false
        },
        categoryList: []
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.getCategories();
                        let lecture = {...this.state.lecture}
                        lecture.createdBy = this.props.auth.user.userId;
                        this.setState({lecture});
                    }

                })
                .catch(er => {
                    console.log(er);
                });
        }
    }

    getCategories = () => {
        fetch(`${base_url}/category/getAll`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    categoryList: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    textHandler = (e) => {
        const lecture = this.state.lecture;
        const updatedLecture = {
            ...lecture,
            [e.target.name] : e.target.value,
            isError: false,
            errorMessage: '',
            isSuccess: false
        }
        this.setState({
            lecture: updatedLecture
        })

    }

    selectBoxHandler = (e) =>{
        let lecture = {...this.state.lecture}
        lecture.category = e.target.value;
        this.setState({lecture});
    }

    setError = (error, message,success) => {
        const { lecture } = this.state;
        const updatedLecture= {
            ...lecture,
            isError: error,
            errorMessage: message,
            isSuccess: success
        }
        this.setState({
            lecture: updatedLecture
        });
    }

    addLectureHandler = (e) => {
        e.preventDefault();
        const { lecture } = this.state;

        if(lecture.title === ''){
            this.setError(true, 'Enter Lecture Title',false); return;
        }

        if(lecture.category === ''){
            this.setError(true,'Select a Category',false); return;
        }

        if(lecture.description === ''){
            this.setError(true,'Enter Description',false); return;
        }

        this.setError(false,'Lecture added successfully',true);
        fetch(`${base_url}/lecture/create`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': this.props.auth.token
            },
            method: 'POST',
            body: JSON.stringify(this.state.lecture)
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const {lecture}  = this.state;
        let msg =  <Error>{this.state.lecture.errorMessage}</Error>;
        if(this.state.lecture.isSuccess){
            msg = <Success>{this.state.lecture.errorMessage}</Success>;
        }

        return (
            <React.Fragment>
                <Header/>
                <br/>
                <div className="container">
                    <h4>Add New Lecture</h4>
                    <form onSubmit={this.addLectureHandler} >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputAddress">Lecture Title </label>
                                <input type="text" className="form-control"  name="title" placeholder="Title" value={lecture.title} onChange={this.textHandler} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputState">Select Category</label>
                                <select id="inputState" className="form-control" value={lecture.category} onChange={this.selectBoxHandler} >
                                    {
                                        this.state.categoryList.map(category => {
                                            return (
                                                <option value={category._id} key={category._id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Description</label>
                                <textarea type="text" className="form-control"  name="description" placeholder="Description" value={lecture.description} onChange={this.textHandler} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Content</label>
                                <textarea type="text" className="form-control"  name="content" placeholder="Content" value={lecture.content} onChange={this.textHandler} />
                            </div>
                        </div>
                        {msg}
                        <div className="form-group ">
                            <button type="submit" value="Submit" className="btn btn-dark">Publish Lecture</button>
                        </div>
                    </form>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddLecture);