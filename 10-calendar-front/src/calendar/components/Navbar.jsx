import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; &nbsp;
        {user.name}
      </span>
      <Link to={"https://github.com/Tbownt"} className="github">
        <i
          className="fa-brands fa-github fa-2xl github"
          style={{ color: "#fcfcfc" }}
        ></i>
      </Link>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
