import React, { Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Vector, forces } from "react-particle-image";
const ParticleImage = React.lazy(() => import("react-particle-image"));

const Footer = () => {
  // Round number up to nearest step for better canvas performance
  const round = (n, step = 20) => Math.ceil(n / step) * step;

  // Try making me lower to see how performance degrades
  const STEP = 1;
  const particleOptions = {
    filter: ({ x, y, image }) => {
      return true;
    },
    color: ({ x, y, image }) => {
      const pixel = image.get(x, y);
      // Canvases are much more performant when painting as few colors as possible.
      // Use color of pixel as color for particle however round to nearest 30
      // to decrease the number of unique colors painted on the canvas.
      // You'll notice if we remove this rounding, the framerate will slow down a lot.
      return `rgba(
        ${round(pixel.r, STEP)}, 
        ${round(pixel.g, STEP)}, 
        ${round(pixel.b, STEP)}, 
        ${round(pixel.a, STEP) / 255}
      )`;
    },
    radius: ({ x, y, image }) => {
      const pixel = image.get(x, y);
      const magnitude = (pixel.r + pixel.g + pixel.b) / 3;
      // Lighter colors will have smaller radius
      return 3 - (magnitude / 255) * 1.5;
    },
    mass: () => 40,
    friction: () => 0.15,
    initialVelocity: ({ image }) =>
      new Vector((Math.random() - 0.5) * 1000, (Math.random() - 1) * 1000),
  };

  const motionForce = (x, y) => {
    return forces.disturbance(x, y, 5);
  };

  return (
    <footer>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={{ span: 6, offset: 3 }}>
            <Suspense fallback={<div>Loading...</div>}>
              <ParticleImage
                src={"/corgiParticles3.png"}
                width={280}
                height={250}
                scale={1}
                entropy={5}
                maxParticles={5000}
                particleOptions={particleOptions}
                mouseMoveForce={motionForce}
                touchMoveForce={motionForce}
                backgroundColor="#FFF"
              />
            </Suspense>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} className="text-center py-3">
            Copyright &copy; TaquitoCorp <i className="fas fa-paw"></i>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
