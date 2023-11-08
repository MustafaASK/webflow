import React from "react";
const PathBranch = ({ isStep = false }: { isStep?: boolean }) => {
  return (
    <div className="node-empty-path-branch-tooltip">
      <div className="node-empty-path-branch-tooltip-content">
        {isStep ? "Add a step" : "Add a path"}
      </div>
    </div>
  );
};

export default PathBranch;
