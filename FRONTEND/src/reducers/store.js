import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// app-reducers
import operationReducer from './operationReducer'

const mainReducer = combineReducers({
  operations: operationReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const generateStore=()=>{
    const store=createStore(
    mainReducer,
    composeEnhancers(applyMiddleware(thunk)
    ))
    return store
 }
