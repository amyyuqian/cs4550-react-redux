let _singleton = Symbol();
const COURSE_API_URL = '/api/course';
const LESSON_API_URL = '/api/lesson';

export default class LessonService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
        throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
      if(!this[_singleton])
          this[_singleton] = new LessonService(_singleton);
      return this[_singleton]
  }

  findAllLessons() {
    return fetch(LESSON_API_URL)
      .then(function (response) {
        return response.json();
      })
  }

  createLesson(courseId, moduleId, lesson) {
    return fetch(COURSE_API_URL + '/' + courseId + '/module/' + moduleId
      + '/lesson', {
        body: JSON.stringify(lesson),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }).then(function (response) {
            return response.json();
    })}

    deleteLesson(lessonId) {
      return fetch(LESSON_API_URL + '/' + lessonId, {
        method: 'DELETE'
      })
    }

    findAllLessonsByModule(courseId, moduleId) {
      return fetch(COURSE_API_URL + '/' + courseId + '/module/' + moduleId
        + '/lesson', {
          method: 'GET'
      }).then(function (response) {
        return response.json();
    })}
}