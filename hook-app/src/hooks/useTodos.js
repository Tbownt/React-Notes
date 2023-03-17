import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";
const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = { type: "ADD_TODO", payload: todo };
    return dispatchTodo(action);
  };

  const handleDeleteTodo = (id) => {
    const action = { type: "REMOVE_TODO", payload: id };
    return dispatchTodo(action);
  };

  const onToggleTodo = (id) => {
    const action = { type: "TOGGLE_TODO", payload: id };
    return dispatchTodo(action);
  };

  const todosCount = todos.length;

  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  // const
  return {
    todos,
    handleDeleteTodo,
    onToggleTodo,
    handleNewTodo,
    todosCount,
    pendingTodosCount,
  };
};
