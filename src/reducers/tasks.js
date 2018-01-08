
import * as types from './../constants/ActionTypes';

var tasks = JSON.parse(localStorage.getItem('tasks'));

var initialState = tasks ? tasks : [];

var index ;


var randomID = () => {
    return Math.random().toString(36).substring(7);
}

var findIndex = (tasks,id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}



var myReducer = (state= initialState, action)=>{

    switch(action.type){
        case  types.LIST_ALL :
            return state;
        
        case  types.ADD_TASK :
             var task ={
                id : action.task.id,
                name : action.task.name,
                status : action.task.status ,
             }
             if(!task.id){
                 task.id = randomID();
                 state.push(task);
             }else{
                 index = findIndex(state, task.id);
                 state[index] = task;
             }
             localStorage.setItem('tasks', JSON.stringify(state));
             return [...state];

        case types.UPDATE_TASK_STATUS :
             index       = findIndex(state,action.id);
             var stateNew    =   Object.assign([],state,state[index] = {...state[index],status : !state[index].status});
             //localStorage.setItem('tasks', JSON.stringify(state));
            //  state[index] = {
            //      ...state[index],
            //      status : !state[index].status,
            //  }
            localStorage.setItem('tasks', JSON.stringify(stateNew));
            return stateNew
             //return [...state];
        case types.DELETE_TASK :
            index       = findIndex(state,action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];     

        default :
            return state;
    }
}

export default myReducer;