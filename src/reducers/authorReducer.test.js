import expect from 'expect';
import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
  it('shoud return authors untoched when passed LOAD_AUTHORS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const authors = [{}, {}, {}];
    const action = actions.loadAuthorsSuccess(authors);

    // act
    const newState = authorReducer(initialState, action);

    // assert
    expect(newState.length).toBe(3);

  });
});
