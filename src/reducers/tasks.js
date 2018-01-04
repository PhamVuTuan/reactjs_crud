
import * as types from './../constants/ActionTypes';

var tasks = JSON.parse(localStorage.getItem('tasks'));

var initialState = tasks ? tasks : [];


var randomID = () => {
    return Math.random().toString(36).substring(7);
}


var myReducer = (state= initialState, action)=>{

    switch(action.type){
        case  types.LIST_ALL :
            return state;
        case  types.ADD_TASK :
             var newTask ={
                id : randomID(),
                name : action.task.name,
                status : action.task.status === 'true' ? true: false,   
             }   
             state.push(newTask);
             localStorage.setItem('tasks', JSON.stringify(tasks));
             return [...state];
        default :
            return state;
    }
}

export default myReducer;