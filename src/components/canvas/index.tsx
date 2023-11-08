import React from "react";
import { ReactFlowProvider } from "reactflow";
import Canvas from "./canvas";
import BaseLayout from "../../layout/baseLayout";

const Graph = () => {
  return (
    <div className="journey-builder-app-container">
      <BaseLayout>
        <ReactFlowProvider>
          <Canvas />
        </ReactFlowProvider>
      </BaseLayout>
    </div>
  );
};

export default Graph;
