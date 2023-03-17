import React from "react";
import ReactDOM from "react-dom/client";
import { TodoApp } from "./08-useReducer/TodoApp";
// import "./08-useReducer/intro-reducer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);
