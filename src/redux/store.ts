import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { brandsReducer } from './reducers/brandsReducer';

let reducers = combineReducers({
    brands: brandsReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store