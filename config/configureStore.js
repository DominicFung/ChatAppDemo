import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import infoReducer from '../reducers/infoReducer'

const initialState = {
    TextFromPic: ""
}

export default store = createStore(infoReducer, initialState);

