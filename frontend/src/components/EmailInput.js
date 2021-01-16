import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { isEmail } from "../utils/utils";

const EmailInput = ({
  email,
  enableValidations = true,
  setEmailParent = () => {},
}) => {
  useEffect(() => {
    isEmailValid(isEmail(email));
  }, [email]);

  const [emailValid, isEmailValid] = useState();
  return enableValidations ? (
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        className={emailValid ? "is-valid" : "is-invalid"}
        placeholder="Introduzca email"
        value={email}
        onChange={(e) => {
          isEmailValid(isEmail(e.target.value));
          setEmailParent(e.target.value);
        }}
        aria-describedby="emailHelpBlock"
      ></Form.Control>
      <Form.Text id="emailHelpBlock" muted>
        Debe ser un email valido, ya que llegaran tus comprobantes
      </Form.Text>
      <div className="valid-feedback">Correo valido!!</div>
      <div className="invalid-feedback">Correo NO valido!!</div>
    </Form.Group>
  ) : (
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        className={emailValid ? "is-valid" : "is-invalid"}
        placeholder="Introduzca email"
        value={email}
        onChange={(e) => {
          isEmailValid(isEmail(e.target.value));
          setEmailParent(e.target.value);
        }}
      ></Form.Control>
    </Form.Group>
  );
};

export default EmailInput;
