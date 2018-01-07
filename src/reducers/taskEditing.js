
import * as types from './../constants/ActionTypes';

var initialState = {
    id : "",
    name:"",
    status : false
};

var myReducer = (state= initialState, action)=>{

    switch(action.type){
        case  types.EDIT_TASK:
            var stateEdit = Object.assign({},action.task);
            return stateEdit;
        default :
            return state;
    }
};

export default myReducer;
