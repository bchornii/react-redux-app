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
    const input = wrapper.find('input').find({name: 'title'});

    // act
    input.simulate('change', { target: {
      name: 'title',
      value: 'new title'
    }});

    // assert
    expect(wrapper.state().course.title).toBe('new title');
  });

  it('change Category changes state appropriately', () => {
    // arrange
    const wrapper = setup();
    const input = wrapper.find('input').find({name: 'category'});

    // act
    input.simulate('change', { target: {
      name: 'category',
      value: 'new category'
    }});

    // assert
    expect(wrapper.state().course.category).toBe('new category');
  });

  it('change Length changes state appropriately', () => {
    // arrange
    const wrapper = setup();
    const input = wrapper.find('input').find({name: 'length'});

    // act
    input.simulate('change', { target: {
      name: 'length',
      value: 'new length'
    }});

    // assert
    expect(wrapper.state().course.length).toBe('new length');
  });

  it('select Author changes state appropriately', () => {
    // arrange
    const wrapper = setup();
    const input = wrapper.find('select').find({name: 'authorId'});

    // act
    input.simulate('change', { target: {
      name: 'authorId',
      value: 'test-author'
    }});

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
    const lengthTextBox = wrapper.find('input').find({name: 'length'});

    // act
    lengthTextBox.simulate('change', { target: {
      name: 'length',
      value: 'new len'
    }});

    // assert
    expect(spy).toHaveBeenCalled();
  });
});
