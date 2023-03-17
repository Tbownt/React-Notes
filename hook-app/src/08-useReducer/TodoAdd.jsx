import { useForm } from "../hooks/useForm";

export const TodoAdd = ({ handleNewTodo, todos }) => {
  const { description, onInputChange, onResetForm } = useForm({
    description: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (description.trim().length <= 1) return;
    if (todos.some((todo) => todo.description === description)) return;
    const newTodo = {
      id: new Date().getTime(),
      done: false,
      description: description,
    };
    handleNewTodo(newTodo);
    onResetForm();
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="¿Qué hay que hacer?"
          className="form-control"
          name="description"
          value={description}
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="btn btn-outline-primary mt-1"
          onClick={(event) => onSubmit(event)}
        >
          Agregar
        </button>
      </form>
    </>
  );
};
