export interface User {
  name?: string;
  email: string;
  password: string;
  lastName?: string;
}

export interface Todo {
  id: number;
  task: string;
  dueDate?: string;
  status?: number;
  ownerId?: number;
}

export interface NewTodo {
  task?: string;
  dueDate?: string;
  status?: number;
}
