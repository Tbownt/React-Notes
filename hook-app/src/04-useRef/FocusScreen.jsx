import { useRef } from "react";
export const FocusScreen = () => {
  const inputRef = useRef();

  //el useRef sirve para hacer referencias a los componentes/elementos que se le asigna
  const onClick = () => {
    // console.log(inputRef);
    inputRef.current.select();
  };
  return (
    <>
      <h1>Focus Screen</h1>
      <hr />

      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese su nombre"
        className="form-control"
      />
      <button onClick={onClick} className="btn btn-primary mt-2">
        Set focus
      </button>
    </>
  );
};
