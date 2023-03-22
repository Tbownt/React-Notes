export const TodoItem = ({ todo, handleDeleteTodo, onToggleTodo }) => {
  const { id, description, done } = todo;

  return (
    <>
      <li key={id} className="list-group-item d-flex justify-content-between">
        <span
          className={`align-self-center ${
            done && "text-decoration-line-through"
          }`}
          onClick={() => onToggleTodo(id)}
          aria-label="span"
        >
          {description}
        </span>
        <button className="btn btn-danger" onClick={() => handleDeleteTodo(id)}>
          Borrar
        </button>
      </li>
    </>
  );
};
