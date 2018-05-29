import React from 'react';
import LessonTabs from './LessonTabs';

export default class ModuleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.courseId,
      moduleId: this.props.match.params.moduleId,
    }
  }

  render() {
    return (
        <LessonTabs courseId={this.state.courseId}
          moduleId={this.state.moduleId}/>
    )
  }
}