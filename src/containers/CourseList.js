import React from 'react';
import CourseRow from './CourseRow';
import CourseService from '../services/CourseService';

export default class CourseList extends React.Component {
  constructor() {
    super();
    
    this.courseService = CourseService.instance;
    this.state = {
      courses: [],
    };
  }

  findAllCourses = () => {
    this.courseService.findAllCourses()
        .then((courses) => {
            this.setState({courses: courses});
        });
  }

  componentDidMount() {
    this.findAllCourses();
  }

  courseRows = () => {
    let rows = this.state.courses.map((course) => {
        return <CourseRow course={course} key={course.id}
          delete={this.deleteCourse}/>
      }
    )
    return (rows);
  }

  titleChanged = (event) => {
    this.setState({
      course: { 
        title: event.target.value
      }
    })
  }

  deleteCourse = (courseId) => {
    this.courseService.deleteCourse(courseId)
      .then(() => { this.findAllCourses(); 
      });
  }

  createCourse = () => {
    this.courseService.createCourse(this.state.course)
      .then(() => { this.findAllCourses(); 
      });
  }
  

  render() {
    return (
      <div className="container">
        <div className="ml-3">
          <h5>Course List</h5>
        </div>
        <div className="input-group add-lesson col-md-3">
          <input className="form-control" id="course" 
                placeholder="CS2500" onChange={this.titleChanged}/>
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={this.createCourse}>Add</button>
          </span>
        </div>
        <table className={'table'}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Created</td>
              <td>Modified</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {this.courseRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
