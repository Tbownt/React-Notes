import { UserContext } from "./context/UserContext";
import { useContext } from "react";
export const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>
        HomePage <small>{user?.name}</small>
      </h1>
      <hr />
      <pre aria-label="pre">{JSON.stringify(user, null, 3)}</pre>
    </>
  );
};
