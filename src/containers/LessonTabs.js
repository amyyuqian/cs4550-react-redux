import React from 'react';
import LessonService from '../services/LessonServiceClient';
import WidgetsComponent from './WidgetsComponent';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.lessonService = LessonService.instance;
    this.state = {
      lessons: [],
      activeLesson: '',
      courseId: this.props.match.params.courseId,
      moduleId: this.props.match.params.moduleId,
    };
  }

  findAllLessonsByModule = () => {
    this.lessonService.findAllLessonsByModule(this.state.courseId, this.state.moduleId)
      .then((lessons) => {
        this.setState({lessons: lessons})
      })
  }

  componentDidMount() {
    this.findAllLessonsByModule();
    this.setState({ 
      courseId: this.props.match.params.courseId,
      moduleId: this.props.match.params.moduleId,
    })
  }

  deleteLesson = (lessonId) => {
    this.lessonService.deleteLesson(lessonId)
      .then(() => { this.findAllLessonsByModule()
      })
  }

  createLesson = () => {
    this.lessonService.createLesson(this.state.courseId, this.state.moduleId,
      this.state.lesson).then(() => { this.findAllLessonsByModule()})
  }

  titleChanged = (event) => {
    this.setState({
      lesson: { 
        title: event.target.value
      }
    })
  }

  setActive = (lesson) => {
    this.setState({activeLesson: lesson});
  }

  isActive = (lesson) => {
    if (lesson.title == this.state.activeLesson.title) {
      return 'nav-link active justify-content-between';
    } else {
      return 'nav-link justify-content-between';
    }
  }

  lessonTabs = () => {
    let tabs = this.state.lessons.map((lesson) => {
      return (
        <Link key={lesson.id} to={`/course/${this.state.courseId}/module/${this.state.moduleId}/lesson/${lesson.id}`}>
          <li className="nav-item lesson" key={lesson.id}>
            <button className={this.isActive(lesson)}
              onClick={() => {this.setActive(lesson)}}>
              {lesson.title}
              <button onClick={() => this.deleteLesson(lesson.id)} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </button>
          </li>
        </Link>
      )
    })
    return (tabs);
  }

  render() {
    return(
      <Router>
        <div className="lesson-editor container">
          <div className="input-group add-lesson">
            <input className="form-control" id="lesson" 
                  placeholder="Lesson name" onChange={this.titleChanged}/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={this.createLesson}>Add</button>
            </span>
          </div>
          <ul className="nav nav-tabs">
            {this.lessonTabs()}
          </ul>
          <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={WidgetsComponent}></Route>
        </div>
      </Router>
      
      
    )
  }
}