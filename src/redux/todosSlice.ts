import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, NewTodo } from "../shared/types";
import APIClient from "../modules/APIClient";

interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  visibilityFilter: string;
}

const initialState = {
  todos: [],
  isLoading: false,
  visibilityFilter: "all",
} as TodosState;

const createTodo = createAsyncThunk(
  "todos/create",
  async (newTodo: NewTodo, thunkApi) => {
    try {
      const response: any = await APIClient.createTodo(newTodo);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const getTodos = createAsyncThunk("todos/get", async ({}, thunkApi) => {
  try {
    const response: any = await APIClient.getTodos();

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const updateTodo = createAsyncThunk(
  "todos/put",
  async (
    { todoId, todoData }: { todoId: number; todoData: NewTodo },
    thunkApi
  ) => {
    try {
      const response: any = await APIClient.updateTodo(todoId, todoData);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (todoId: number, thunkApi) => {
    try {
      const response = await APIClient.deleteTodo(todoId);

      return { response, todoId };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload;
    },
    removeTodos(state) {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload.data.todo);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos.push(...action.payload.data);
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.data.id) {
          return { ...action.payload.data, status: action.payload.data.status };
        }
        return todo;
      });
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => {
        if (todo.id === action.payload.todoId) {
          return false;
        }
        return true;
      });
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default todosSlice.reducer;
export { createTodo, getTodos, updateTodo, deleteTodo };
export const { removeTodos, setVisibilityFilter } = todosSlice.actions;
