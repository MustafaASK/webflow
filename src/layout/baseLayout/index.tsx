import React from "react";
import "./base-layout.scss";
const BaseLayout = ({ children }: { children: any }) => {
  return <div className="react-flow-base-container">{children}</div>;
};

export default BaseLayout;
