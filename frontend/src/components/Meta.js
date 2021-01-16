import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Leolandia Tienda",
  description: "Vendemos los mejores productos al mejor precio.",
  keywords: "ropa, accesorios, anillos, aretes",
};

export default Meta;
