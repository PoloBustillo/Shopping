import React, { useState, useEffect } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import DotLoader from "react-spinners/DotLoader";
import HashLoader from "react-spinners/HashLoader";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: auto;
  border-color: pink;
`;

const spinners = 4;

const Loader = ({ loading, param }) => {
  const [config, setConfig] = useState(param);

  useEffect(() => {
    if (param === undefined) {
      setConfig(Math.floor(Math.random() * spinners).toString());
    }
  }, [param]);

  return (
    <>
      {
        {
          0: (
            <ClockLoader
              color={"#000"}
              loading={loading}
              css={override}
              size={150}
            />
          ),
          1: (
            <DotLoader
              color={"#000"}
              loading={loading}
              css={override}
              size={150}
            />
          ),
          2: (
            <HashLoader
              color={"#000"}
              loading={loading}
              css={override}
              size={150}
            />
          ),
          3: (
            <CircleLoader
              color={"#000"}
              loading={loading}
              css={override}
              size={150}
            />
          ),
        }[config]
      }
      <span className="sr-only">Loading...</span>
    </>
  );
};

export default Loader;
