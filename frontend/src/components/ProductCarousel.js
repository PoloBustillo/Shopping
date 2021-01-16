import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import Plx from "react-plx";

const renderBoxes = () => {
  const BOXES = [];
  const BOXES_PER_ROW = 4;
  const ROWS = 1;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < BOXES_PER_ROW; j++) {
      const top = i < ROWS / 2;
      const yFactor = top ? -1 : 1;
      const left = j < BOXES_PER_ROW / 2;
      const xFactor = left ? -1 : 1;
      const inside = (i === 1 || i === 2) && (j === 1 || j === 2); // I was lazy to write generic formula
      const scaleFactor = inside ? 0.5 : 1;
      const start = inside ? 40 : 100;
      const offset = inside ? 40 : 100;
      const rotationFactor = Math.random() > 0.5 ? 180 : -180;

      BOXES.push({
        data: [
          {
            start: "self",
            end: "self",
            startOffset: "-20vh",
            easing: "easeOutExpo",
            properties: [
              {
                startValue: 0.2,
                endValue: 1,
                property: "opacity",
              },
            ],
          },
          {
            start: "self",
            end: "self",
            endOffset: "40vh",
            duration: 500,
            name: "first",
            easing: "easeInExpo",
            properties: [
              {
                endValue: 1,
                startValue: 0,
                property: "opacity",
              },
              {
                endValue: 0,
                startValue: Math.random() * rotationFactor,
                property: "rotate",
              },
              {
                endValue: 1,
                startValue: 1 + Math.random() * scaleFactor,
                property: "scale",
              },
              {
                endValue: 0,
                startValue: (start + Math.random() * offset) * xFactor,
                property: "translateX",
                unit: "%",
              },
              {
                endValue: 0,
                startValue: (start + Math.random() * offset) * yFactor,
                property: "translateY",
                unit: "%",
              },
            ],
          },
        ],
      });
    }
  }
  return BOXES;
};
const boxes = renderBoxes();
const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader param={2} />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Card
      style={{
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        left: "50%",
      }}
      className="Explosion"
    >
      <Card.Header style={{ textAlign: "center" }}>
        <h1>Nuevos Productos</h1>
      </Card.Header>
      <Card.Body
        style={{
          backgroundColor: "black",
        }}
      >
        <Row>
          {products.map((product, index) => (
            <Col
              className="product"
              key={product._id}
              sm={12}
              md={6}
              lg={3}
              xl={3}
            >
              <Plx parallaxData={boxes[index].data}>
                <Card className="my-3 rounded">
                  <Card.Header>
                    <Link to={`/producto/${product._id}`}>
                      <Card.Img src={product.image} variant="top" />
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    <Link to={`/producto/${product._id}`}>
                      <Card.Title as="div">
                        <strong>{product.name}</strong>
                      </Card.Title>
                    </Link>

                    <Card.Text as="h3">${product.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Plx>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCarousel;
