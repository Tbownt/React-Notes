import { useTodos } from "../hooks";
import { TodoList, TodoAdd } from "./";

export const TodoApp = () => {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleDeleteTodo,
    onToggleTodo,
    handleNewTodo,
  } = useTodos();

  return (
    <>
      <h1>
        TodoApp: {todosCount} <small>pendientes: {pendingTodosCount}</small>
      </h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <TodoList
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
            onToggleTodo={onToggleTodo}
          />

          <div className="col-7">
            <h4>Agregar TODO</h4>
            <hr />
            <TodoAdd handleNewTodo={handleNewTodo} todos={todos} />
          </div>
        </div>
      </div>
    </>
  );
};
