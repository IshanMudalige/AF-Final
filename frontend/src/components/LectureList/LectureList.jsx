import React, { Component } from 'react';
import Lecture from './Lecture/Lecture';
import {base_url} from "../../constants";
import Header from "../Navbar/Header";

import './styles.css';

class LectureList extends Component{

    state = {
        lecturesList: [],
    }

    componentDidMount() {
        this.getLectures();
    }

    getLectures = () => {
        fetch(`${base_url}/lecture/getAll`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    lecturesList: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    render() {

        return (
            <React.Fragment>
                <Header/>
                <br/>
                <div className="Content">
                    <h4 className="container title">Available Courses</h4>
                    <br/>
                        {
                            this.state.lecturesList.map(lecture => <Lecture
                                id={lecture._id}
                                title={lecture.title}
                                description={lecture.description}
                                createdAt={this.formatDate(lecture.createdAt)}
                            />)
                        }
                </div>
            </React.Fragment>

        );
    }
}

export default LectureList;