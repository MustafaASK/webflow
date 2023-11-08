import { Node, Edge, MarkerType } from "reactflow";
export const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
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
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 0, y: 0 },
    type: "ACTION",
    style: {
      opacity: 0,
    },
  },
  {
    id: "4",
    data: { label: "Node 3" },
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
    source: "1",
    target: "2",
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
  },
];
