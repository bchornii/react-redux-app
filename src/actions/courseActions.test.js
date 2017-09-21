import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

/**************************************************************************************************
 * Actions
**************************************************************************************************/
describe('Course Actions', () => {

    it('createCourseSuccess should create a CREATE_COURSE_SUCCESS action', () => {
      // arrange
      const initialState = {};
      const store = mockStore(initialState);
      const course = {id: 'clean-code', title: 'Clean code'};
      const expectedPayload = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      // act
      store.dispatch(courseActions.createCourseSuccess(course));

      // assert
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    it('updateCourseSuccess should create a UPDATE_COURSE_SUCCESS action', () => {
      // arrange
      const initialState = {};
      const store = mockStore(initialState);
      const course = {id: 'clean-code', title: 'Clean code'};
      const expectedPayload = {
        type: types.UPDATE_COURSE_SUCCESS,
        course: course
      };

      // act
      store.dispatch(courseActions.updateCourseSuccess(course));

      // assert
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    it('loadCoursesSuccess should create a LOAD_COURSES_SUCCESS action', () => {
      // arrange
      const initialState = {};
      const store = mockStore(initialState);
      const expectedPayload = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: []
      };

      // act
      store.dispatch(courseActions.loadCoursesSuccess([]));

      // assert
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

});

/**************************************************************************************************
 * Thunks
**************************************************************************************************/

describe('Course Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('loadCourses should dispatch BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS', (done) => {
    // example call to nock
    //nock('http://localhost:8080/api')
    //  .get('/getAllCourses')
    //  .reply(200, {body: {course: [{id: 1, firstName: 'Cory', lastName: 'House'}]}});

    // arrange
    const expectedPayload = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS}
    ];
    const initialState = {courses: []};
    const store = mockStore(initialState);

    // act
    store.dispatch(courseActions.loadCourses())
      .then(() => {
        const actions = store.getActions();

        // assert
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
        done();
      });
  });

  it('saveCourse should dispatch BEGIN_AJAX_CALL and UPDATE_COURSE_SUCCESS', (done) => {
    // arrange
    const course = {id: 'clean-code', title: 'New course'};
    const expectedPayload = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.UPDATE_COURSE_SUCCESS}
    ];
    const initialState = {courses: []};
    const store = mockStore(initialState);

    // act
    store.dispatch(courseActions.saveCourse(course))
      .then(() => {
        const actions = store.getActions();

        // assert
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.UPDATE_COURSE_SUCCESS);
        done();
      });
  });

});
