import React from 'react';
import LessonTabs from './LessonTabs';

export default class ModuleEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <LessonTabs courseId={this.props.courseId}
          moduleId={this.props.moduleId}/>
    )
  }
}