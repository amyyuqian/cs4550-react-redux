import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ModuleEditor from './ModuleEditor';

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
                    <a className="nav-link" href="/course/list">Course List </a>
                  </li>
                </ul>
              </div>
            </nav>
            <hr />
            <Route path="/course/list" component={CourseList}></Route>
            <Route path="/course/:courseId/edit" component={CourseEditor}></Route>
            <Route path="/course/:courseId/module/:moduleId/edit" component={ModuleEditor}></Route>
          </div>
        </Router>
      )
  }
}
