import { Button } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { MouseEventHandler, useState, LegacyRef } from "react";
import "./index.styles.css";
import { Todo } from "../../shared/types";
import TodoDetails from "../todo-details";

interface TodoProps {
  todo: Todo;
  ref: LegacyRef<HTMLDivElement>;
  handleDeleteTodo: MouseEventHandler<HTMLElement>;
  handleToggleTodo: MouseEventHandler<HTMLElement>;
}

const Todo = React.forwardRef(
  (
    { todo, handleDeleteTodo, handleToggleTodo }: TodoProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleModalCancel = (event) => {
      if (event) {
        event.stopPropagation();
      }
      setShowDetails(false);
    };

    return (
      <div
        ref={ref}
        onClick={() => {
          setShowDetails(true);
        }}
        className={`todo-item${todo.status === 2 ? " todo-completed" : ""}`}
      >
        <div className="todo-content-container">
          <h3>{todo.task}</h3>
          <p>{new Date(todo.dueDate || "").toDateString()}</p>
        </div>
        <div className="todo-actions-container">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleToggleTodo}
          ></Button>
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleDeleteTodo}
            className="delete-todo-button"
          ></Button>
        </div>
        <TodoDetails
          todo={todo}
          visible={showDetails}
          onCancelPress={handleModalCancel}
        ></TodoDetails>
      </div>
    );
  }
);

export default Todo;
