import React from "react";
import { List } from "antd";
import "./index.styles.css";
import { Todo } from "../../shared/types";
import { useAppSelector } from "../../hooks";
import todosSlice from "../../redux/todosSlice";

interface TodoListProps {
  children: React.ReactNode;
}

const TodoList = ({ children }: TodoListProps) => {
  const isLoading = useAppSelector((state) => state.todos.isLoading);

  return (
    <List
      bordered
      size="large"
      loading={isLoading}
      className="todo-list-container"
    >
      {children}
    </List>
  );
};

export default TodoList;
