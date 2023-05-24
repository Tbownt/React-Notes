import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const BarraNav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogOut = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Heroes
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link
                to={"/marvel"}
                style={{ textDecoration: "none", color: "#fcfcfc" }}
              >
                Marvel
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={"/dc"}
                style={{ textDecoration: "none", color: "#fcfcfc" }}
              >
                DC
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={"/search"}
                style={{ textDecoration: "none", color: "#fcfcfc" }}
              >
                Search
              </Link>
            </Nav.Link>
            <Nav.Link
              style={{ marginLeft: "2.5px" }}
              onClick={() => window.open("https://github.com/Tbownt", "_blank")}
            >
              GitHub
            </Nav.Link>
            <Navbar.Text style={{ marginLeft: "2.5px" }}>
              {user?.name}
            </Navbar.Text>
          </Nav>
          <Nav>
            <Nav.Link onClick={onLogOut} style={{ color: "#DC4C64" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
