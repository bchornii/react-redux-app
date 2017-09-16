import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invatiant';

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState
  );
}
