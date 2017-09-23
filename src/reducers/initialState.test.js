import expect from 'expect';
import initialState from './initialState';

describe('Initial State', () => {
  it('empty courses, empty authors and ajaxCallsInProgress is zero', () => {
    // arrange
    const expectedPayload = {
      courses: [],
      authors: [],
      ajaxCallsInProgress: 0
    };

    // act

    // assert
    expect(initialState).toEqual(expectedPayload);
  });
});
