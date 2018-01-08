
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
export const onOpenForm= ()=> {
    return {
        type : types.OPEN_FORM,
    }
};

export const updateStatus= (id)=> {
    return {
        type : types.UPDATE_TASK_STATUS,
        id
    }
};
export const deleteTask= (id)=> {
    return {
        type : types.DELETE_TASK,
        id
    }
};
export const editTask= (task)=> {
    return {
        type : types.EDIT_TASK,
        task
    }
};
export const onFilterTables= (filter)=> {
    return {
        type : types.FILTER_TABLES,
        filter
    }
};
export const onSearchTask= (keyword)=> {
    return {
        type : types.SEARCH,
        keyword
    }
};
export const onSort= (sort)=> {
    return {
        type : types.SORT,
        sort
    }
};
