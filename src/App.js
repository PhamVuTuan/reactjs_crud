import React, { Component } from 'react';

import './App.css';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from "./components/TaskList";
import { connect } from 'react-redux';
import * as actions from './actions/index';

class  App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          //  tasks: [],
            //isDisplayForm: false,
            editTask: '',
            filter :{
                name : '',
                status : -1,
            },
            keyWords : '',
            sortName : '',
            sortValue : ''
        };

    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {

            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({tasks: tasks});
            //console.log(tasks)
        }

    }

    randomID = () => {
        return Math.random().toString(36).substring(7);
    }
    
    onGenerateData = () => {
        var tasks = [
            {
                id: this.randomID(),
                name: 'Hoc Lap Trinh',
                status: true,

            },
            {
                id: this.randomID(),
                name: 'Di Ngu',
                status: false,

            },
            {
                id: this.randomID(),
                name: 'An choi',
                status: true,

            },

        ];

        this.setState({tasks: tasks});

        localStorage.setItem('tasks', JSON.stringify(tasks));


    }



    handleCloseTaskForm = () => {

        this.setState({isDisplayForm: false})
    }

    handleOpenTaskForm = () => {

        this.setState({isDisplayForm: true})
    }

    onSubmit = (data) => {
        var tasks = this.state.tasks;
        if(!data.id){
            data.id = this.randomID();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
        });
       localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }


    onDeleteItem = (data)=> {
            var {tasks}= this.state;
            var index = this.findIndex(data);
            if(index !==-1){
                tasks.splice(index, 1);
            }
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
           this.handleCloseTaskForm();

    }

    onEditItem = (data)=> {
        this.handleOpenTaskForm();
        var {tasks}= this.state;
        var index  = this.findIndex(data);
        var editTask = tasks[index];
        this.setState({
            editTask : editTask
        })
    }

    onFilter= (filterName, filterStatus)=>{
        console.log(filterName, ' - ', filterStatus);
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
                filter:{
                    name : filterName.toLowerCase(),
                    status : filterStatus
                }
        })
    }
    onSearch = (keyword)=>{
        this.setState({
            keyWords : keyword
        })

    }

    onSort = (sortName, sortValue)=>{
       // console.log(sortName, ' aaa ', sortValue)
        this.setState({
            sortName : sortName,
            sortValue : sortValue
        })
    }

    onToggleForm = ()=>{
        var {taskEditing} = this.props;
        if(taskEditing && taskEditing.id !== ''){
            this.props.openForm();
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
           id: '',
           name : '',
           status : false,
        });

    }

    render(){

        var{ filter, keyWords , sortName, sortValue}= this.state;
        var{isDisplayForm}= this.props;

        var elemTaskForm = isDisplayForm ? <TaskForm
            onCloseTaskForm = {this.handleCloseTaskForm}
            onSubmit        = {this.onSubmit}
            // dataForm        = {this.state.editTask}
            />
            : '';

        // if(filter.name){
        //     tasks = tasks.filter((task)=>{
        //         return task.name.toLowerCase().indexOf(filter.name) !== -1;    
        //     })
        // }
        // tasks = tasks.filter((task)=>{
        //    if(filter.status ===-1){
        //         return task;
        //    } else{
        //        return task.status === (filter.status===1 ? true : false );
        //    }    

        // })
        // if(keyWords){
        //     tasks = tasks.filter((task)=>{
        //         return task.name.toLowerCase().indexOf(keyWords) !== -1;    
        //     })
        // }
        // if(sortName === 'name'){
        //     tasks.sort((a,b)=>{
        //           if(a.name > b.name) return sortValue;
        //           else if(a.name <b.name) return -sortValue;
        //           else return 0; 
        //     });
        // }else{
        //     tasks.sort((a,b)=>{
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status <b.status) return sortValue;
        //         else return 0; 
        //   });
        // }
       // console.log(this.props)
    return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                    {elemTaskForm}
                </div>

                <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                    >
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                        <span className="fa mr-5"></span>GenerateData
                    </button>
                    <Control onSearch = {this.onSearch}
                            onSort= {this.onSort}
                            sortName = {sortName}
                            sortValue = {sortValue}
                    />
                    <TaskList
                        // tasks = {tasks}
                        onChangeStatus = {this.onChangeStatus}
                        onDeleteItem = {this.onDeleteItem}
                        onFilter = {this.onFilter}
                    />
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        isDisplayForm : state.isDisplayForm,
        taskEditing : state.taskEditing
    }
}

const mapDispatchToProps = (dispatch, props)=>{
    return {
            onToggleForm : ()=>{
                dispatch(actions.onToggle());
            },
            openForm : ()=>{
                dispatch(actions.onOpenForm());
            },
            onClearTask : (task)=>{
                dispatch(actions.editTask(task));
            },
            closeForm : ()=>{
                dispatch(actions.onCloseForm());
            },
        }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
