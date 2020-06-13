import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './style.css';

const Lecture = props => {

    return (
        <Link className="text-link" to={{
            pathname:"/lectureView",
            title:props.title,
            description:props.description,
            date:props.createdAt
        }}>
            <div className="container">
                <div className="col-md-10 blogShort">
                    <h5>{props.title}</h5>
                    <i className="fa fa-book fa-2x pull-left img-responsive thumb margin10 img-thumbnail" aria-hidden="true"/>
                        <em>{props.createdAt}</em>
                        <article><p>{props.description}</p></article>
                        <a className="btn btn-blog" href="http://bootsnipp.com/user/snippets/2RoQ">Read More</a>
                </div>
            </div>
        </Link>
    );
}

export default withRouter(Lecture);