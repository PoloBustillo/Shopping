import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ParticleEffectButton from "react-particle-effect-button";

const DeleteIcon = ({ variant = "danger", removeFunc }) => {
  const [show, setShow] = useState(false);
  return (
    <ParticleEffectButton
      color="#FF1111"
      direction="right"
      duration={500}
      hidden={show}
      style={"stroke"}
      type={"circle"}
      easing="easeOutExpo"
      onBegin={() => {
        setTimeout(() => {
          removeFunc();
        }, 500);

        console.log("DOS");
      }}
    >
      <Button onClick={() => setShow(true)} type="button" variant={variant}>
        <i className="fas fa-trash"></i>
      </Button>
    </ParticleEffectButton>
  );
};

export default DeleteIcon;
