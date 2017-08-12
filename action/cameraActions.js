import { SET_TEXTFROMPIC, CONSUME_TEXTFROMPIC } from '../config/constants';

export function setTextFromPic(text){
    return{
        type: SET_TEXTFROMPIC,
        payload: text
    }
}