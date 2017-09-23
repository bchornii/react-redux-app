import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';
import * as authorsActions from '../actions/authorActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {title: 'Clean Code'};
    const action = courseActions.createCourseSuccess(course);

    // act
    store.dispatch(action);

    // assert
    const actual = store.getState().courses[0];
    const expected = {
      title: 'Clean Code'
    };
    expect(actual).toEqual(expected);
  });

  it('should handle updating course', () => {
    // arrange
    const existingCourse = {id: 'clean-code', title: 'Clean code'};
    const store = createStore(rootReducer, initialState);

    const editedCourse = {id: 'clean-code', title: 'Edited title'};
    const action = courseActions.updateCourseSuccess(editedCourse);

    // act
    store.dispatch(action);

    // assert
    const actual = store.getState().courses[0];
    const expected = {id: 'clean-code', title: 'Edited title'};
    expect(actual).toEqual(expected);

  });

  it('should handle loading courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const courses = [
      {title: 'A'},
      {title: 'B'}
    ];
    const action = courseActions.loadCoursesSuccess(courses);

    // act
    store.dispatch(action);

    // assert
    const actual = store.getState().courses;
    const expected = [...courses];
    expect(actual).toEqual(expected);
  });

  it('should handle loading authors', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const authors = [
      {id: 'cory-house'},
      {id: 'scott-allen'}
    ];
    const action = authorsActions.loadAuthorsSuccess(authors);

    // act
    store.dispatch(action);

    // assert
    const actual = store.getState().authors;
    const expected = [...actual];
    expect(actual).toEqual(expected);

  });

});
