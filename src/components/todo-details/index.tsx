import { Button, Modal } from "antd";
import React, { useState } from "react";
import "./index.styles.css";
import AddTodo from "../add-todo";
import { Todo } from "../../shared/types";
import { useAppDispatch } from "../../hooks";
import { updateTodo } from "../../redux/todosSlice";
import { wrapThunkAction } from "../../utils/reduxToolkit";

interface TodoDetailsProps {
  todo: Todo;
  visible: boolean;
  onCancelPress: (event?) => any;
}

const TodoDetails = ({ todo, visible, onCancelPress }: TodoDetailsProps) => {
  const [taskValue, setTaskValue] = useState(todo.task);
  const [initialDueDateValue, setInitialDueDateValue] = useState(todo.dueDate);
  const [initialTaskValue, setInitialValue] = useState(todo.task);
  const [dueDate, setDueDate] = useState<string | undefined>(todo.dueDate);

  const dispatch = useAppDispatch();

  const handleAfterClose = () => {
    if (!taskValue) setTaskValue(initialTaskValue);

    if (!dueDate) setDueDate(initialDueDateValue);
  };

  return (
    <Modal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancelPress}
      afterClose={handleAfterClose}
      footer={[
        <Button
          type="primary"
          disabled={
            (!taskValue && !dueDate) ||
            (initialTaskValue === taskValue &&
              initialDueDateValue === dueDate) ||
            !taskValue
          }
          onClick={() => {
            if (initialTaskValue !== taskValue) {
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
                .catch((error) => {});
            }
          }}
        >
          Save
        </Button>,
      ]}
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
