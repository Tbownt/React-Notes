import { useState } from "react";
import { useGetTodosQuery, useGetTodoByIdQuery } from "./store/apis/todosApi";

export const TodoApp = () => {
  //   const { data: todos = [], isLoading } = useGetTodosQuery();
  const [todoItem, setTodoItem] = useState(1);
  const { data: todo, isLoading } = useGetTodoByIdQuery(todoItem);

  const nextTodo = () => {
    setTodoItem(todoItem + 1);
  };
  const prevTodo = () => {
    setTodoItem(todoItem - 1);
  };

  return (
    <>
      <h1>Todos - RTK Query</h1>
      <hr />
      <h4>isLoading {isLoading ? "True" : "False"}</h4>

      <pre>{JSON.stringify(todo)}</pre>
      <button onClick={prevTodo}>Prev Todo</button>
      <button onClick={nextTodo}>Next Todo</button>
      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.completed ? "DONE" : "Pending"}</strong> {todo.title}
          </li>
        ))}
      </ul> */}
    </>
  );
};
