import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class CourseManager extends React.Component {
  render() {
      return (
        <Router>
          <div>
            <nav className="navbar navbar-light">
              <span className="navbar-brand mb-0 h1">Course Manager</span>
              <div id="nav">
                <ul className="nav">
                  <li className="nav-item active">
                    <Link to="/course/list">Course List</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <hr />
            <Route path="/course/list" component={CourseList}></Route>
            <Route path="/course/:courseId/edit" component={CourseEditor}></Route>
          </div>
        </Router>
      )
  }
}
