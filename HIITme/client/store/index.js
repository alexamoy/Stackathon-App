import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const reducer = combineReducers({});

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware)

export default store;