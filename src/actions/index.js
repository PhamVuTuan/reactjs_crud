
import * as types from './../constants/ActionTypes';

export const listAll= ()=> {
    return {
        type : types.LIST_ALL,
    }
};

export const addTask= (task)=> {
    return {
        type : types.ADD_TASK,
        task
    }
};

export const onToggle= ()=> {
    return {
        type : types.TOGGLE_FORM,
    }
};

export const onCloseForm= ()=> {
    return {
        type : types.CLOSE_FORM,
    }
};

export const updateStatus= (id)=> {
    return {
        type : types.UPDATE_TASK_STATUS,
        id
    }
};