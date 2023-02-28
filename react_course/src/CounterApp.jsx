import { useState } from "react";
import PropTypes from "prop-types";

/*
En esta clase se explica sobre los hooks de React como se utilizan
y como funciona React por detras
*/
const CounterApp = ({ value }) => {
  const [counter, setCounter] = useState(value);

  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubstract = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(value);
  };
  return (
    <div>
      <h1>CounterApp</h1>
      <h3>{counter}</h3>
      <br />
      <button onClick={() => handleAdd()}> +1 </button>
      <button onClick={() => handleSubstract()}> -1 </button>
      <button aria-label="btn-reset" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
};

export default CounterApp;

CounterApp.propTypes = {
  value: PropTypes.number.isRequired,
};
