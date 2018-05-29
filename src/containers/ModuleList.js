import React from 'react';
import ModuleService from '../services/ModuleServiceClient';
import ModuleRow from './ModuleRow';
import LessonTabs from './LessonTabs';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/Modules.css';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);

    this.moduleService = ModuleService.instance;
    this.state = {
      modules: [],
      activeModule: '',
    };
  }

  findAllModulesByCourse = () => {
    this.moduleService.findAllModulesByCourse(this.props.courseId)
      .then((modules) => {
        this.setState({modules: modules})
      })
  }

  componentDidMount() {
    this.findAllModulesByCourse();
  }

  deleteModule = (moduleId) => {
    this.moduleService.deleteModule(moduleId)
      .then(() => { this.findAllModulesByCourse(); 
      });
  }

  createModule = () => {
    this.moduleService.createModule(this.props.courseId, this.state.module)
      .then(() => { this.findAllModulesByCourse(); 
      });
  }

  titleChanged = (event) => {
    this.setState({
      module: { 
        title: event.target.value
      }
    })
  }

  setActive = (module) => {
      this.setState({activeModule: module});
  }

  isActive = (module) => {
    if (module.title == this.state.activeModule.title) {
      return 'list-group-item list-group-item-action justify-content-between active';
    } else {
      return 'list-group-item list-group-item-action justify-content-between ';
    }
  }

  moduleRows = () => {
    let rows = this.state.modules.map((module) => {
        return (
          <ModuleRow module={module} key={module.id} courseId={this.props.courseId}
          delete={this.deleteModule} isActive={this.isActive}
          setActive={this.setActive}/>
        )}
    )
    return (rows);
  }

  render() {
    return (
      <Router>
        <div>
          <div className="module-editor">
            <div className="module-container col-md-3">
              <div className="input-group add-module">
                <input className="form-control" id="module" 
                      placeholder="Module name" onChange={this.titleChanged}/>
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={this.createModule}>Add</button>
                </span>
              </div>
              <ul className="listGroup modules-wrapper">
                {this.moduleRows()}
              </ul>
            </div>
            <Route path="/course/:courseId/module/:moduleId" component={LessonTabs}></Route>
          </div>
        </div>
      </Router>
    )
  }
}