import React from 'react';
import { Link } from 'react-router-dom';

export default class CourseRow extends React.Component {

  delete = () => {
    this.props.delete(this.props.course.id);
  }

  render() {
      return (
        <tr>
          <td>
            <Link to={`/course/${this.props.course.id}/edit`}>
              {this.props.course.title}
            </Link>
          </td>
          <td>
            {this.props.course.created}
          </td>
          <td>
            {this.props.course.modified}
          </td>
          <td><button className={'btn btn-danger'} onClick={this.delete}>Delete</button></td>
        </tr>
      )
  }
}
