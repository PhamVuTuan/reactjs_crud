import React, { Component } from 'react';

import './App.css';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from "./components/TaskList";

class  App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
        };

    }

    componentWillMount(){
       if(localStorage && localStorage.getItem('tasks')){

            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({tasks:tasks});
            //console.log(tasks)
      }

    }

    onGenerateData = ()=> {
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

        localStorage.setItem('tasks',JSON.stringify(tasks));


    }

    randomID = ()=>{
       return Math.random().toString(36).substring(7);
    }

    onToggleForm = ()=>{

        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        });
    }

    handleCloseTaskForm = ()=>{

        this.setState({isDisplayForm : false})
    }

    onSubmit = (data)=>{
        data.id = this.randomID();
       // const tasks = Object.assign({},this.state.tasks,{data});
        var tasks = this.state.tasks.concat(data);
        //console.log(tasks);
        //console.log(this.state.tasks);
        this.setState({
            tasks : tasks,
        });

        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    render(){

        var{tasks , isDisplayForm }= this.state;

        var elemTaskForm = isDisplayForm ? <TaskForm
            onCloseTaskForm = {this.handleCloseTaskForm}
            onSubmit        = {this.onSubmit}
            />
            : '';

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
                    <Control/>
                    <TaskList
                        tasks = {tasks}
                    />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
