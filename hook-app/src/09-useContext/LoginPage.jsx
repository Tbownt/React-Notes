import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export const LoginPage = () => {
  const { setUser, user } = useContext(UserContext);

  return (
    <>
      <h1>LoginPage</h1>
      <hr />

      <pre aria-label="pre2">{JSON.stringify(user, null, 3)}</pre>

      <button
        className="btn btn-primary"
        onClick={() =>
          setUser({
            id: 123,
            name: "Andres Salom",
            email: "andresjose65@hotmail.com",
          })
        }
      >
        Establecer usuario
      </button>
    </>
  );
};
