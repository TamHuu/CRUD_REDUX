import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
const Header = () => {
  const { handleLogoutContext, user } = useContext(UserContext);
  console.log(">>>> check user", user);
  const navigate = useNavigate();
  const handleLogout = () => {
    handleLogoutContext();
    navigate("/");
    toast.success("Logout succed");
    // }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Le Huu Tam Dev 2000
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <>
              <Nav className="me-auto" activeKey="/">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manager Users
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link">Welcome {user.email}</span>
                )}

                <NavDropdown title="Setting">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink to="/login" className="dropdown-item">
                      Login
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
