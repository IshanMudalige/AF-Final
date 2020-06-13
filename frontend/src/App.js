import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducers from './reducers/authReducer';
import PrivateRoute from "./PrivateRoute";
import AddLecture from "./components/AdminPanel/AddLecture";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import LectureList from "./components/LectureList/LectureList";
import Home from "./components/Home/Home";
import LectureView from "./components/LectureView/LectureView";
import './App.css';

const rootReducers = combineReducers({
    auth: authReducers,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
window.store = store;

function App() {
  return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route path="/signin" component={Signin} />
                  <Route path="/signup" component={Signup} />
                  <PrivateRoute path="/addLecture" component={AddLecture} />
                  <PrivateRoute path="/lectureList" component={LectureList}/>
                  <PrivateRoute path="/lectureView" component={LectureView}/>
                  <Route path="/" component={Home} />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
