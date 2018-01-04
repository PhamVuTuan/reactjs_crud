import React, { Component } from 'react';

class TaskItem extends Component {

    changeStatus = ()=>{
        this.props.onChangeStatus(this.props.task.id);
    }

    deleteItem = ()=>{
        this.props.onDeleteItem(this.props.task.id);
    }

    editItem = ()=>{
        this.props.onEditItem(this.props.task.id);
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
                    onClick={this.changeStatus}
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

export default TaskItem;
