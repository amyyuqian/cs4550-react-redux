let _singleton = Symbol();
const COURSE_API_URL = '/api/course';
const MODULE_API_URL = '/api/module';

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    findAllModules() {
        return fetch(MODULE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    createModule(courseId, module) {
        return fetch(COURSE_API_URL + '/' + courseId + '/module', {
            body: JSON.stringify(module),
            headers: {
               'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
    })}

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL + '/' + moduleId, {
            method: 'DELETE'
        })
    }

    findAllModulesByCourse(courseId) {
      return fetch(COURSE_API_URL + '/' + courseId + '/module', {
        method: 'GET'
      }).then(function (response) {
        return response.json();
    })}
}
