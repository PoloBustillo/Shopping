import React from "react";
import { Row, Col } from "react-bootstrap";
import Plx from "react-plx";

const Banner = ({ text = "NEW" }) => {
  const parallaxData = [
    {
      start: 0,
      end: 500,
      easing: "easeInOut",
      properties: [
        {
          startValue: 1,
          endValue: 0,
          property: "scale",
        },
        {
          startValue: 1,
          endValue: 0.5,
          property: "opacity",
        },
      ],
    },
  ];
  return (
    <Plx className="MyAwesomeParallax" parallaxData={parallaxData}>
      <Row className="newContainer">
        <Col className="newText" lg={12}>
          {text}
        </Col>
      </Row>
    </Plx>
  );
};

export default Banner;
