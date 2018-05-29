import React from 'react';
import LessonService from '../services/LessonServiceClient';
import WidgetsComponent from './WidgetsComponent';

export default class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.lessonService = LessonService.instance;
    this.state = {
      lessons: [],
      activeLesson: '',
    };
  }

  findAllLessonsByModule = () => {
    this.lessonService.findAllLessonsByModule(this.props.courseId, this.props.moduleId)
      .then((lessons) => {
        this.setState({lessons: lessons})
      })
  }

  componentDidMount() {
    this.findAllLessonsByModule();
  }

  deleteLesson = (lessonId) => {
    this.lessonService.deleteLesson(lessonId)
      .then(() => { this.findAllLessonsByModule()
      })
  }

  createLesson = () => {
    this.lessonService.createLesson(this.props.courseId, this.props.moduleId,
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
    this.findAllLessonsByModule(); 
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
        <li className="nav-item lesson" key={lesson.id}>
          <button className={this.isActive(lesson)}
            onClick={() => {this.setActive(lesson)}}>
            {lesson.title}
            <button onClick={() => this.deleteLesson(lesson.id)} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </button>
        </li>
      )
    })
    return (tabs);
  }

  render() {
    return(
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
        <WidgetsComponent />
      </div>
      
    )
  }
}