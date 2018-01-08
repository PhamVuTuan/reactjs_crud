
import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filterTables from './filterTables';
import search from './search';
import sort from './sort';


const myReducers =  combineReducers({
        tasks,
        isDisplayForm,
        taskEditing,
        filterTables,
        search,
        sort
});

export default myReducers;
