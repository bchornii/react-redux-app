import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseListRow from './CourseListRow';
import {Link} from 'react-router';

function setup(){
  let course = {
    id: 'clean-code'
  };
  return shallow(<CourseListRow course={course} />);
}

describe('Course List Row', () => {
  it('should return single row', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.find('tr').length).toBe(1);
  });

  it('should render five columns', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.children('td').length).toBe(5);
  });

  it('link should redirect to course with id equal to "clean-code"', () => {
    // arrange
    const wrapper = setup();
    const link = wrapper.find(Link);

    // assert
    expect(link.find({to: "/course/clean-code"}).length).toBe(1);
  });

  it('should open redirect to course in new tab', () => {
    // arrange
    const wrapper = setup();
    const anchor = wrapper.find('a');

    // assert
    expect(anchor.find({target: "_blank"}).length).toBe(1);
  });
});
