import { message } from "antd";
import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { NewTodo, Todo, User } from "../../shared/types";

class APIClient {
  private client: AxiosInstance;
  constructor() {
    this.client = Axios.create({
      timeout: 10000,
      baseURL: "http://localhost:3000",
    });

    this.client.interceptors.response.use((response: AxiosResponse) => {
      if (response.data.error && response.data.error.message) {
        if (response.data.error.code === "TOKEN_EXPIRED") {
          this.unsetAuthenticatedInstance();
          message.error(response.data.error.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          message.error(response.data.error.message);
        }
        return Promise.reject(
          new Error(response.data.error.message || "UNDEFINED_ERROR")
        );
      } else {
        return Promise.resolve(response.data);
      }
    });
  }

  setAuthenticatedInstance(token: string) {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
      let date = new Date();

      document.cookie = `token=${token}${date.setTime(date.getTime() + 4 * 60 * 60)}; path=/`
    }
  }

  unsetAuthenticatedInstance() {
    this.client.defaults.headers.common.Authorization = null;
    document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  signup(userData: User) {
    return this.client.post("/user", userData);
  }

  login(userData: User) {
    return this.client.post("/user/login", userData);
  }

  getUser() {
    return this.client.get("/user");
  }

  createTodo(todoPayload: NewTodo): Promise<Todo> {
    return this.client.post("/todos", todoPayload);
  }

  getTodos(): Promise<Todo[]> {
    return this.client.get("/todos");
  }

  updateTodo(todoId: number, todoData: NewTodo): Promise<Todo> {
    return this.client.put(`/todos/${todoId}`, todoData);
  }

  deleteTodo(todoId: number) {
    return this.client.delete(`/todos/${todoId}`);
  }
}

export default new APIClient();
