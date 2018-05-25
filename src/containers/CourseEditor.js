import React from 'react';
import ModuleList from './ModuleList';

export default class CourseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.courseId,
    };
  }

  componentDidMount() {
    this.selectCourse(this.props.match.params.courseId);
  }

  componentWillReceiveProps(newProps){
    this.selectCourse(newProps.match.params.courseId);
  }
  
  selectCourse = (courseId) => {
    this.setState({ courseId: courseId });
  }

  render() {
    return (
      <div>
        <h5 className="ml-3">Course {this.state.courseId}</h5>
        <hr />
        <ModuleList courseId={this.state.courseId} />
      </div>
    )
  }
}
