import React, { Component } from 'react';
import TaskItem from "./TaskItem";
import {connect} from 'react-redux';
import * as actions from './../actions/index'


class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName : "",
            filterStatus:-1,       
         }
    }

    onChange = (event)=>{
        var target = event.target;
        var name  = target.name;
        var value = target.value;

        // this.props.onFilter(
        //     name ==='filterName' ? value : this.state.filterName,
        //     name ==='filterStatus' ? value : this.state.filterStatus,
        // );

        var filter = {
           name   :   (name ==='filterName' ? value : this.state.filterName),
           status :   ( name ==='filterStatus' ? value : this.state.filterStatus)
        };

        this.props.onFilterTables(filter);

        this.setState({
            [name]: value,
         })
    }
    

  render() {

    var {tasks, filter, keyword, sort} = this.props;
    var {filterName, filterStatus}= this.state;

    if(filter.name){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1;    
        })
    }
    tasks = tasks.filter((task)=>{
        if(filter.status ===-1){
            return task;
        } else{
            return task.status === (filter.status===1 ? true : false );
        } 
    });      

    if(keyword){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(keyword) !== -1;    
        })
    }
    if(sort.by === 'name'){
            tasks.sort((a,b)=>{
                  if(a.name > b.name) return sort.value;
                  else if(a.name <b.name) return -sort.value;
                  else return 0; 
            });
        }else{
            tasks.sort((a,b)=>{
                if(a.status > b.status) return -sort.value;
                else if(a.status <b.status) return sort.value;
                else return 0; 
          });
    }

    var elemTasks = tasks.map((task, index)=>{
          return <TaskItem key={task.id}
                           task ={task}
                           index={index}
          />
     });

    return (
        <table className="table table-bordered table-hover mt-15">
            <thead>
            <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td>
                    <input type="text" className="form-control" value={filterName} 
                      onChange={this.onChange} name="filterName"/>
                </td>
                <td>
                    <select className="form-control"
                     value={filterStatus} onChange={this.onChange} name="filterStatus">
                        <option value="-1">Tất Cả</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Kích Hoạt</option>
                    </select>
                </td>
                <td></td>
            </tr>
            {elemTasks}
            </tbody>
        </table>
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        tasks : state.tasks,
        filter : state.filterTables,
        keyword : state.search,
        sort : state.sort
    }
}

const mapDispatchToProps = (dispatch, props)=>{
    return {
        onFilterTables : (filter)=>{
             dispatch(actions.onFilterTables(filter));
          },
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
