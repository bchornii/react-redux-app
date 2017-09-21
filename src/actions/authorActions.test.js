import expect from 'expect';
import * as authorActions from './authorActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

/**************************************************************************************************
 * Actions
**************************************************************************************************/
describe('Author Actions', () => {

  it('loadAuthorsSuccess should create a LOAD_AUTHORS_SUCCESS action', () => {
    // arrange
    const initialState = {};
    const store = mockStore(initialState);
    const expectedPayload = {
      type: types.LOAD_AUTHORS_SUCCESS,
      authors: []
    };

    // act
    store.dispatch(authorActions.loadAuthorsSuccess([]));

    // assert
    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);

  });

});

/**************************************************************************************************
 * Thunks
**************************************************************************************************/

describe('Author Async Actions', () => {

  it('loadAuthors should dispatch BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS', (done) => {
    // arrange
    const expectedPayload = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_AUTHORS_SUCCESS}
    ];
    const initialState = {authors: []};
    const store = mockStore(initialState);

    // act
    store.dispatch(authorActions.loadAuthors())
      .then(() => {
        const actions = store.getActions();

        // assert
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
        done();
      });
  });

});
