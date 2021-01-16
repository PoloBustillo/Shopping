import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { Sling as Hamburger } from "hamburger-react";

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <LinkContainer to="/">
          <Navbar.Brand>Leolandia</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle style={{ borderColor: "#FFF" }}>
          <Hamburger
            rounded
            duration={1}
            distance="lg"
            color="#555"
            size={30}
            direction={"left"}
            toggled={isOpen}
            toggle={setOpen}
          />
        </Navbar.Toggle>
        <Row style={{ width: "100%" }}>
          <Navbar.Collapse id="basic-navbar-nav">
            <Col lg={7}>
              {" "}
              <Nav className="ml-auto">
                <LinkContainer
                  onClick={() => {
                    setOpen(false);
                  }}
                  to="/compras"
                  className={"linkMenu"}
                >
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Carrito
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown
                    className={"linkMenu"}
                    title={userInfo.name}
                    id="username"
                  >
                    <LinkContainer
                      onClick={() => {
                        setOpen(false);
                      }}
                      to="/perfil"
                    >
                      <NavDropdown.Item>Perfil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Salir
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer
                    onClick={() => {
                      setOpen(false);
                    }}
                    to="/acceder"
                    className={"linkMenu"}
                  >
                    <Nav.Link>
                      <i className="fas fa-user"></i> Acceder
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown
                    className={"linkMenu"}
                    title="Admin"
                    id="adminmenu"
                  >
                    <LinkContainer
                      onClick={() => {
                        setOpen(false);
                      }}
                      to="/admin/userlist"
                    >
                      <NavDropdown.Item>Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      onClick={() => {
                        setOpen(false);
                      }}
                      to="/admin/productlist"
                    >
                      <NavDropdown.Item>Productos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      onClick={() => {
                        setOpen(false);
                      }}
                      to="/admin/orderlist"
                    >
                      <NavDropdown.Item>Ordenes</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Col>
            <Col lg={5} className={"mr-auto"}>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Col>
          </Navbar.Collapse>
        </Row>
      </Navbar>
    </header>
  );
};

export default Header;
