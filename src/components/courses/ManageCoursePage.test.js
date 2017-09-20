import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

function componentProps(){
  return {
    authors: [],
    course: {
      id: '',
      watchHref: '',
      title: '',
      authorId: '',
      length: '',
      category: ''
    },
    actions: {
      saveCourse: () => { return Promise.resolve(); }
    }
  };
}

function setup(){
  const props = componentProps();
  return mount(<ManageCoursePage {...props} />);
}

function simulateElementOnChange(wrapper, elementType, name, value){
  const input = wrapper.find(elementType).find({name: name});
  input.simulate('change', { target: {
    name: name,
    value: value
  }});
}


describe('Manage Course Page State Testing', () => {

  it('sets error message when trying to save empty title', () => {
    const wrapper = setup();
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });

  it('change Title changes state appropriately', () => {
    // arrange
    const wrapper = setup();

    // act
    simulateElementOnChange(wrapper, 'input', 'title', 'new title');

    // assert
    expect(wrapper.state().course.title).toBe('new title');
  });

  it('change Category changes state appropriately', () => {
    // arrange
    const wrapper = setup();

    // act
    simulateElementOnChange(wrapper, 'input', 'category', 'new category');

    // assert
    expect(wrapper.state().course.category).toBe('new category');
  });

  it('change Length changes state appropriately', () => {
    // arrange
    const wrapper = setup();

    // act
    simulateElementOnChange(wrapper, 'input', 'length', 'new length');

    // assert
    expect(wrapper.state().course.length).toBe('new length');
  });

  it('select Author changes state appropriately', () => {
    // arrange
    const wrapper = setup();

    // act
    simulateElementOnChange(wrapper, 'select', 'authorId', 'test-author');

    // assert
    expect(wrapper.state().course.authorId).toBe('test-author');
  });

});

describe('Manage Course Page Interaction Testing', () => {

  afterEach(() => {
    expect.restoreSpies();
  });

  it('press Save button calls saveCourse method', () => {
    // arrange
    const spy = expect.spyOn(ManageCoursePage.prototype, "saveCourse");
    const wrapper = setup();
    const saveButton = wrapper.find('input').last();

    // act
    saveButton.simulate('click');

    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('saving course calls validation method courseFormIsValid', () => {
    // arrange
    const spy = expect.spyOn(ManageCoursePage.prototype, "courseFormIsValid");
    const wrapper = setup();
    const saveButton = wrapper.find('input').last();

    // act
    saveButton.simulate('click');

    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('changing input fields calls updateCourseState method', () => {
    // arrange
    const spy = expect.spyOn(ManageCoursePage.prototype, "updateCourseState");
    const wrapper = setup();
    // act
    simulateElementOnChange(wrapper, 'input', 'length', 'new length');

    // assert
    expect(spy).toHaveBeenCalled();
  });
});
