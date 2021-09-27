import React from "react";
import { List } from "antd";
import "./index.styles.css";
import { useAppSelector } from "../../hooks";

interface TodoListProps {
  children: React.ReactNode;
}

const TodoList = ({ children }: TodoListProps) => {
  const isLoading = useAppSelector((state) => state.todos.isLoading);
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <List
      bordered
      size="large"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        display: todos.length ? "initial" : "flex",
      }}
      loading={isLoading}
      className="todo-list-container"
    >
      {children}
    </List>
  );
};

export default TodoList;
