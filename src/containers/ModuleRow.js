import React from 'react';

export default class ModuleRow extends React.Component {
  delete = () => {
    this.props.delete(this.props.module.id);
  }

  setActive = () => {
    this.props.setActive(this.props.module)
  }

  render() {
    return (
        <button className={this.props.isActive(this.props.module)}
          onClick={this.setActive}>
        {this.props.module.title}
        <button onClick={this.delete} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </button>
    )
  }
}