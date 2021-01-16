import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticleEffectButton from "react-particle-effect-button";
import { useDispatch } from "react-redux";
import ReactCardFlip from "react-card-flip";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Badge,
  Row,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Rating from "./Rating";
import { addToCart } from "../actions/cartActions";

const Product = ({ product, history }) => {
  const dispatch = useDispatch();
  const [numProd, setNumProd] = useState(product.countInStock === 0 ? 0 : 1);
  const [button, setButton] = useState(false);
  const [button2, setButton2] = useState(false);
  const [flipped, setFlipped] = useState(false);
  return (
    <Card
      className="my-3 rounded"
      bg={product.countInStock === 0 ? "secondary" : "ligth"}
    >
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <div
          onMouseEnter={() => {
            setFlipped(!flipped);
          }}
          style={{ display: flipped ? "block" : "hidden" }}
        >
          <Link to={`/producto/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
          </Link>
          <Card.Body></Card.Body>
          <Card.Body>
            <Link to={`/producto/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as="h3">${product.price}</Card.Text>
          </Card.Body>
        </div>
        <div
          onMouseLeave={() => {
            setFlipped(false);
          }}
        >
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Link to={`/producto/${product._id}`}>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
              </Link>

              <Card.Text as="h3">${product.price}</Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <InputGroup size={"lg"}>
                <InputGroup.Prepend>
                  <Button
                    disabled={product.countInStock === 0}
                    onClick={() => {
                      if (numProd - 1 <= 1) {
                        setNumProd(1);
                      } else {
                        setNumProd(numProd - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  disabled={product.countInStock === 0}
                  type="number"
                  style={{ textAlign: "center" }}
                  value={numProd}
                  onChange={(e) => {
                    if (
                      Number.parseInt(e.target.value) > product.countInStock
                    ) {
                      setNumProd(product.countInStock);
                    } else {
                      setNumProd(e.target.value);
                    }
                  }}
                />
                <InputGroup.Append>
                  <Button
                    disabled={product.countInStock === 0}
                    onClick={() => {
                      if (numProd + 1 > product.countInStock) {
                        setNumProd(product.countInStock);
                      } else {
                        setNumProd(numProd + 1);
                      }
                    }}
                  >
                    +
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Row></Row>
            </ListGroupItem>
            <ListGroupItem>
              <ParticleEffectButton
                onBegin={() => {
                  dispatch(addToCart(product._id, Number(numProd)));
                }}
                onComplete={() => {
                  setButton(false);
                }}
                color="#000"
                hidden={button}
                duration={200}
                speed={10}
                size={6}
                type="rectangle"
                style={"stroke"}
                direction="top"
              >
                <Button
                  disabled={product.countInStock === 0}
                  onClick={() => setButton(true)}
                >
                  Añadir a carrito
                </Button>
              </ParticleEffectButton>
              {button && (
                <div style={{ top: "-30px", position: "relative" }}>
                  <p className="text-success">
                    Se ha agregado ({numProd}) producto
                  </p>
                </div>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <ParticleEffectButton
                onComplete={() => {
                  history.push("/compras");
                }}
                color="#000"
                hidden={button2}
                duration={200}
                speed={10}
                size={6}
                type="rectangle"
                style={"stroke"}
                direction="top"
              >
                <Button
                  disabled={product.countInStock === 0}
                  onClick={() => setButton2(true)}
                >
                  Finaliza Compra
                </Button>
              </ParticleEffectButton>
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            {product.category && (
              <Card.Link href={`/busqueda/${product.category}`}>
                <Badge variant="dark">{product.category}</Badge>
              </Card.Link>
            )}
            {product.brand && (
              <Card.Link href={`/busqueda/${product.brand}`}>
                <Badge variant="dark">{product.brand}</Badge>
              </Card.Link>
            )}
          </Card.Body>
        </div>
      </ReactCardFlip>
    </Card>
  );
};

export default Product;
