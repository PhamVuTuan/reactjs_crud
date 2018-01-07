import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'


class TaskItem extends Component {

    changeStatus = ()=>{
        this.props.onChangeStatus(this.props.task.id);
    }

    deleteItem = ()=>{
        //this.props.onDeleteItem(this.props.task.id);
        this.props.deleteTask(this.props.task.id);
        this.props.closeForm();
    }

    editItem = ()=>{
      //console.log(this.props.task)
        //this.props.onEditItem(this.props.task.id);
        this.props.editTask(this.props.task);
        this.props.openForm();

    }

  render() {
      var {task, index} = this.props;

      return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ?
                            "label label-success"
                            : "label label-danger"
                        }
                    onClick={()=>{this.props.changeStatus(task.id)}}
                    >
                        {task.status === true ? "Kích Hoạt": "Ẩn"}
                                                </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.editItem}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>

    );
  }
}


const mapDispatchToProps = (dispatch, props)=>{
    return {
          changeStatus : (id)=>{
             dispatch(actions.updateStatus(id));
          },
          deleteTask : (id)=>{
             dispatch(actions.deleteTask(id));
          },
          closeForm : ()=>{
             dispatch(actions.onCloseForm());
          },
          openForm : ()=>{
            dispatch(actions.onOpenForm());
         },
          editTask : (task)=>{
             dispatch(actions.editTask(task));
          },
        }
}

export default connect(null,mapDispatchToProps)(TaskItem);
