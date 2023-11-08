import { Node, Edge } from "reactflow";
export const initialNodes: Node[] = [
  {
    id: "Trigger",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
    // dragHandle: ".custom-drag-handle",
    type: "TRIGGER",
    style: {
      opacity: 0,
    },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 0, y: 0 },
    type: "ADD_STEP_NODE",
    style: {
      opacity: 0,
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "Trigger",
    target: "2",
    type: "smoothstep",
  },
];
