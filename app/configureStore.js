import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleWare = applyMiddleware(thunk)

export default function configureStore() {
  let store = createStore(rootReducer, middleWare)
  return store
}