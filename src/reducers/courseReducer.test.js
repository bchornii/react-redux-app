import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should create course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const newCourse = {title: 'C'};
    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];
    const course = {id: 'B', title: 'New Title'};
    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id === course.id);
    const untochedCourse = newState.find(a => a.id === 'A');

    // assert
    expect(updatedCourse.title).toEqual('New Title');
    expect(untochedCourse.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });

  it('should return courses untoched when passed LOAD_COURSES_SUCCESS', () => {
    // arrange
    const initialState = [];
    const courses = [{}, {}, {}];
    const action = actions.loadCoursesSuccess(courses);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
  });

});
