import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      setMessage("Nombre requerido");
      setShowMessage(true);
    } else {
      if (password !== confirmPassword) {
        setMessage("Contraseñas diferentes");
        setShowMessage(true);
      } else {
        dispatch(register(name, email, password, phone));
      }
    }
  };

  return (
    <FormContainer>
      <h1>Registrarse</h1>
      {message && (
        <Message
          dismissible
          showDefault={showMessage}
          handleShow={setShowMessage}
          variant="danger"
        >
          {message}
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="name"
            placeholder="Introduzca nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="tel"
            maxLength="10"
            minLength="10"
            placeholder="Introduzca telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <EmailInput value={email} setEmailParent={setEmail}></EmailInput>
        <PasswordInput
          value={password}
          setPasswordParent={setPassword}
          setError={setPasswordError}
        ></PasswordInput>
        <PasswordInput
          value={confirmPassword}
          setPasswordParent={setConfirmPassword}
          placeholder="Confirmar Contraseña"
        ></PasswordInput>

        <Button
          type="submit"
          className={!passwordError ? "disabled" : ""}
          variant="primary"
        >
          Registrarse
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Tienes una cuenta?{" "}
          <Link
            className="link"
            to={redirect ? `/acceder?redirect=${redirect}` : "/acceder"}
          >
            Acceder
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
