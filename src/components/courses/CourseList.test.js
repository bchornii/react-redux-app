import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

function getCourses(num){
  let courses = [];
  for(let i = 0; i < num; i ++){
    courses.push({});
  }
  return courses;
}

function setup(num){
  let courses = getCourses(num);
  return shallow(<CourseList courses={courses} />);
}

describe('Course List', () => {
  it('should return table', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.find('table').length).toBe(1);
  });

  it('should render five columns headers', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.find('th').length).toBe(5);
  });

  it('shoud return five <CourseListRow />', () => {
    // arrange
    const wrapper = setup(5);

    // assert
    expect(wrapper.find(CourseListRow).length).toBe(5);
  });
});
