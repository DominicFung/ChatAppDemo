import { SET_TEXTFROMPIC, CONSUME_TEXTFROMPIC } from '../config/constants';

const initialState = {
    TextFromPic: ""
}

export default function infoReducer(state = initialState, action){
    switch(action.type){
        case SET_TEXTFROMPIC: return {
            ...state, TextFromPic: action.payload
        }
        case CONSUME_TEXTFROMPIC: return {
            ...state, TextFromPic: ""
        }
        default: return state
    }
}