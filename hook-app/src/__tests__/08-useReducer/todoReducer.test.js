import { todoReducer } from "../../08-useReducer/todoReducer";

describe("Pruebas en todoReducer", () => {
  const initialState = [
    {
      id: 1,
      description: "demo todo",
      done: false,
    },
  ];

  test("debe de regresar el estado inicial", () => {
    const newState = todoReducer(initialState, {});
    expect(newState).toBe(initialState);
  });

  test("debe de agregar un todo", () => {
    const action = {
      type: "ADD_TODO",
      payload: {
        id: 2,
        description: "todo demo 2",
        done: false,
      },
    };
    const newState = todoReducer(initialState, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContain(action.payload);
  });

  test("debe de eliminar un todo", () => {
    const action = {
      type: "REMOVE_TODO",
      payload: 1,
    };

    const newState = todoReducer(initialState, action);
    expect(newState).toHaveLength(0);
  });

  test("debe de realizar el Toggle del todo", () => {
    const action = {
      type: "TOGGLE_TODO",
      payload: 1,
    };
    const newState = todoReducer(initialState, action);
    expect(newState[0].done).toBe(true);

    const newState2 = todoReducer(newState, action);
    expect(newState2[0].done).toBe(false);
  });
});
