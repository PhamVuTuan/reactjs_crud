
import * as types from './../constants/ActionTypes';

var initialState = false;

var myReducer = (state = initialState, action)=>{
    switch(action.types){
        
        case types.TOGGLE_FORM:
            return !state;

        default : return true;
    }
}

export default myReducer;