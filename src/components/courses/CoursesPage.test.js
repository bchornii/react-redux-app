import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import { CoursesPage } from './CoursesPage';
import CourseList from './CourseList';

function componentProps(){
  // these props are not required for shallow()
  // but they are for mount
  return {
    courses: [],
    actions: {}
  };
}

function setup(){
  const props = componentProps();
  return shallow(<CoursesPage {...props} />);
}

describe('Courses Page', () => {
  it('should contain CourseList component', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.find(CourseList).length).toBe(1);
  });

  it('click Add Course should call redirectToAddCoursePage method', () => {
    // arrange
    const spy = expect.spyOn(CoursesPage.prototype, "redirectToAddCoursePage");
    const wrapper = setup();
    const addCourseButton = wrapper.find('input').filter({type: 'submit'}).first();

    // act
    addCourseButton.simulate('click');

    // assert
    expect(spy).toHaveBeenCalled();
  });
});
