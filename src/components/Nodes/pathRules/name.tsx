import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import { NODE_TYPES } from "../../../constant/nodeTypes";
const PathName = ({ nodeId }: { nodeId: string }) => {
  const { state, handleUpdateOfPathName } = useReactFlowContext();
  const { edgesData, nodesData } = state || {};
  let pathNodeid = edgesData?.find(
    (edge: any) => edge.target === nodeId
  )?.source;
  let pathNodeData = nodesData?.find((node: any) => node.id === pathNodeid);
  let { label = "" } = pathNodeData?.data?.payload || {};
  const [name, setName] = useState(label);
  return (
    <Box>
      <FormControl fullWidth>
        <TextField
          id="textData"
          placeholder="Enter path name..."
          variant="outlined"
          value={name}
          className="input-path-rule"
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            if (name?.trim()) {
              handleUpdateOfPathName(
                nodeId,
                name?.trim(),
                NODE_TYPES.PATH_RULES
              );
            }
          }}
        />
      </FormControl>
    </Box>
  );
};

export default PathName;
