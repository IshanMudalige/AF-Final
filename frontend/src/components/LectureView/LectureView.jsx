import React, {Component} from "react";
import Header from "../Navbar/Header";


class LectureView extends Component {

    render() {

    return(
        <React.Fragment>
            <Header/>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h1 class="mt-4">{this.props.location.title}</h1>
                        <hr/>
                        <p>Posted on {this.props.location.date}</p>
                        <hr/>
                        <p class="lead">{this.props.location.description}</p>
                        <p>{this.props.location.description}</p>
                        <div class="card my-4">
                        <h5 class="card-header">Leave a Comment:</h5>
                            <div class="card-body">
                               <form>
                                   <div class="form-group">
                                       <textarea class="form-control" rows="3"/>
                                   </div>
                                   <button type="submit" class="btn btn-info">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

}

export default LectureView