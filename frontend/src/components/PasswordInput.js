import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { isPasswordSafe } from "../utils/utils";

const PasswordInput = ({
  password,
  placeholder = "Introduzca contraseña",
  setPasswordParent = () => {},
  setError = () => {},
  label = "Contraseña",
  autoComplete = "on",
  enableValidations = true,
}) => {
  const [passwordValid, isPasswordValid] = useState();
  const [passwordVisibility, setPasswordVisbility] = useState(false);

  return enableValidations ? (
    <Form.Group controlId="password">
      <Form.Label>{label}</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type={passwordVisibility ? "input" : "password"}
          autoComplete={autoComplete}
          className={passwordValid ? "is-valid" : "is-invalid"}
          placeholder={placeholder}
          value={password}
          onChange={(e) => {
            isPasswordValid(isPasswordSafe(e.target.value));
            setError(isPasswordSafe(e.target.value));
            setPasswordParent(e.target.value);
          }}
          aria-describedby="passwordHelpBlock"
        ></Form.Control>

        <InputGroup.Append>
          <InputGroup.Text
            onClick={() => {
              setPasswordVisbility(!passwordVisibility);
            }}
          >
            {!passwordVisibility ? (
              <i className="fas fa-unlock"></i>
            ) : (
              <i className="fas fa-lock"></i>
            )}
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <Form.Text id="passwordHelpBlock" muted>
        Tip: usa almenos un número y una MAYUSCULA.
      </Form.Text>
      <div className="valid-feedback">Contraseña segura!!</div>
      <div className="invalid-feedback">
        Contraseña NO suficientemente segura!!
      </div>
    </Form.Group>
  ) : (
    <Form.Group controlId="password">
      <Form.Label>{label}</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          type={passwordVisibility ? "input" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={password}
          onChange={(e) => {
            setPasswordParent(e.target.value);
          }}
        ></Form.Control>
        <InputGroup.Append>
          <InputGroup.Text
            onClick={() => {
              setPasswordVisbility(!passwordVisibility);
            }}
          >
            {!passwordVisibility ? (
              <i className="fas fa-unlock"></i>
            ) : (
              <i className="fas fa-lock"></i>
            )}
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
