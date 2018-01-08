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
            keyWords : '',
            sortName : '',
            sortValue : ''
        };

    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {

            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({tasks: tasks});
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

        var{ sortName, sortValue}= this.state;
        var{isDisplayForm}= this.props;


        var elemTaskForm = isDisplayForm ? <TaskForm
            />
            : '';
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
                    <Control onSort= {this.onSort}
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
        taskEditing : state.taskEditing,
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
