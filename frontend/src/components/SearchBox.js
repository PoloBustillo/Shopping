import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/busqueda/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Row className="ml-auto">
      <Col xm={12}>
        <Form onSubmit={submitHandler} inline>
          <Col className="ml-auto" sm={6}>
            <Form.Control
              id={"searchBarInput"}
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Buscar Productos..."
            ></Form.Control>
          </Col>
          <Col sm={6}>
            <Button type="submit" variant="outline-success" className="p-2">
              Buscar <i className="fas fa-search"></i>
            </Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchBox;
