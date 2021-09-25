import { Button, message, Modal } from "antd";
import React, { SyntheticEvent, useState } from "react";
import "./index.styles.css";
import AddTodo from "../add-todo";
import { Todo } from "../../shared/types";
import { useAppDispatch } from "../../hooks";
import { updateTodo } from "../../redux/todosSlice";
import { wrapThunkAction } from "../../utils/reduxToolkit";

interface TodoDetailsProps {
  todo?: Todo;
  visible: boolean;
  onOkPress: () => any;
  onCancelPress: () => any;
}

const TodoDetails = ({ todo, visible, onOkPress, onCancelPress }: any) => {
  const [taskValue, setTaskValue] = useState(todo.task);
  const [initialTaskValue, setInitialValue] = useState(todo.task);
  const [dueDate, setDueDate] = useState<string | undefined>(todo.dueDate);

  const dispatch = useAppDispatch();

  return (
    <Modal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancelPress}
      footer={[
        <Button
          type="primary"
          disabled={!taskValue || !dueDate}
          onClick={() => {
            wrapThunkAction(
              dispatch(
                updateTodo({
                  todoId: todo.id,
                  todoData: { task: taskValue, dueDate },
                })
              )
            )
              .then(() => {
                onCancelPress();
              })
              .catch((error) => {
                message.error(error.message);
              });
          }}
        >
          Save
        </Button>,
      ]}
      onOk={() => {
        if (initialTaskValue !== taskValue) {
          onOkPress();
        }
      }}
    >
      <div className="modal-content-container">
        <AddTodo
          value={taskValue}
          showAddButton={false}
          dueDateValue={dueDate}
          handleDateChange={(date, dateString) => {
            setDueDate(dateString);
          }}
          handleInputChange={(event) => {
            setTaskValue(event.target.value);
          }}
        ></AddTodo>
        <div className="modal-title">
          <h3>Task: </h3>
          <h1>{taskValue || ""}</h1>
        </div>
      </div>
    </Modal>
  );
};

export default TodoDetails;
