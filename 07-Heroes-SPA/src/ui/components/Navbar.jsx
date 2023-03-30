import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogOut = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <div className="navbar-nav">
        <Link className="navbar-brand" to="/">
          Asociaciones
        </Link>
        <NavLink
          className={({ isActive }) =>
            `nav-item nav-link ${isActive ? "active" : ""}`
          }
          to="/marvel"
        >
          Marvel
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-item nav-link ${isActive ? "active" : ""}`
          }
          to="/dc"
        >
          DC
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-item nav-link ${isActive ? "active" : ""}`
          }
          to="/search"
        >
          Search
        </NavLink>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-primary" aria-label="span">
            {user?.name}
          </span>
          <button
            className="nav-item nav-link btn"
            onClick={() => {
              onLogOut();
            }}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
