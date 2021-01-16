import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Acceder a Leolandia</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <EmailInput
          enableValidations={false}
          value={email}
          setEmailParent={setEmail}
        ></EmailInput>
        <PasswordInput
          value={password}
          setPasswordParent={setPassword}
          enableValidations={false}
        ></PasswordInput>

        <Button type="submit" variant="primary">
          Acceder
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Cliente Nuevo?{" "}
          <Link
            className="link"
            to={redirect ? `/registro?redirect=${redirect}` : "/registro"}
          >
            Registrarse
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
