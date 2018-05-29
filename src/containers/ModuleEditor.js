import React from 'react';
import LessonTabs from './LessonTabs';
import { connect } from 'react-redux';
import WidgetList from './WidgetList';

const mapStateToProps = state => ({
  widgets: state.widgets
 })

const WidgetList = connect(
  mapStateToProps
 )(WidgetList)

let nextWidgetId = 0;
const AddWidgetComponent =
    ({ dispatch }) => {
    let input
    return (<div>
      <input ref={node => input = node} />
      <button type="submit" onClick={e => {
       dispatch({ type: 'ADD_WIDGET',
            id: nextWidgetId++,
            text: input.value})}}>Add Widget
      </button></div>)}
const AddWidget = connect()
(AddWidgetComponent)


export default class ModuleEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LessonTabs courseId={this.props.courseId}
          moduleId={this.props.moduleId}/>
        <WidgetEditor courseId={this.props.courseId}
          moduleId={this.props.moduleId} />
      </div>
    )
  }
}