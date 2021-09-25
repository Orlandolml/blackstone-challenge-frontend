import { message } from "antd";
import React, { useState, useRef, useEffect, SyntheticEvent } from "react";
import Todo from "../todo";
import Select from "../select";
import AddTodo from "../add-todo";
import TodoList from "../todo-list";
import EmptyListImage from "../../../public/empty.svg";
import { wrapThunkAction } from "../../utils/reduxToolkit";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../redux/todosSlice";

const Main = () => {
  const [todoDate, setTodoDate] = useState<string>("");
  const [todoValue, setTodoValue] = useState<string>("");

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const dispatch = useAppDispatch();

  const todosRefs = useRef<{ [key: string]: any }>({});

  const fetchedTodos = useAppSelector((state) => {
    switch (state.todos.visibilityFilter) {
      case "completed":
        return state.todos.todos.filter((todo) => todo.status === 2);
      case "uncompleted":
        return state.todos.todos.filter((todo) => todo.status === 1);
      default:
        return state.todos.todos;
    }
  });

  const onInputChange = (event: any) => {
    setTodoValue(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    wrapThunkAction(
      dispatch(createTodo({ task: todoValue, dueDate: todoDate }))
    ).then((response) => {
      setTodoDate("");
      setTodoValue("");
    });
  };

  const onDateSelect = (date: any, dateString: string) => {
    setTodoDate(dateString);
  };

  const onDeleteTodoPress = (event: SyntheticEvent, todoId: number) => {
    event.stopPropagation();
    let todos = todosRefs.current;
    todos[todoId].classList.add("fall");

    if (todos.hasOwnProperty(todoId)) {
      setTimeout(() => {
        wrapThunkAction(dispatch(deleteTodo(todoId)))
          .then((action: any) => {
            message.success(action.payload.response.data.message);
          })
          .catch((error) => {
            message.error("Error while trying to delete a todo");
          });
      }, 300);
    }
  };

  return (
    <div className="app-content-container">
      <div className="content-header">
        <AddTodo
          showAddButton
          value={todoValue}
          onTodoSubmitPress={addTodo}
          dueDateValue={todoDate || ""}
          handleDateChange={onDateSelect}
          handleInputChange={onInputChange}
        ></AddTodo>
      </div>
      <Select></Select>
      <TodoList>
        {!!fetchedTodos.length ? (
          fetchedTodos.map((item) => {
            return (
              <Todo
                todo={item}
                key={`todo-${item.id}`}
                ref={(ref: any) => {
                  todosRefs.current[item.id] = ref;
                }}
                handleDeleteTodo={(event: SyntheticEvent) =>
                  onDeleteTodoPress(event, item.id)
                }
                handleToggleTodo={(event: SyntheticEvent) => {
                  event.stopPropagation();
                  wrapThunkAction(
                    dispatch(
                      updateTodo({
                        todoId: item.id,
                        todoData: { status: item.status === 1 ? 2 : 1 },
                      })
                    )
                  );
                }}
              />
            );
          })
        ) : (
          <div className="empty-list-container">
            <img className="empty-list-image" src={EmptyListImage} />
            <h2>No todos yet!</h2>
          </div>
        )}
      </TodoList>
    </div>
  );
};

export default Main;
