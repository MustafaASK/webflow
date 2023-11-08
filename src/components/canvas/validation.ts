import { NODE_TYPES } from "../../constant/nodeTypes";
import {
  validateAddNoteWrapper,
  validateAddTaskWrapper,
  validateSendEmailWrapper,
  validateDelayNode,
} from "./validation-helper";

const getErrorList = (nodes: any, nodeId: string, errorList: any) => {
  const nodeX = nodes.find((nd: any) => nd.id === nodeId);
  let { type } = nodeX;
  let data;
  switch (type) {
    case NODE_TYPES.ADD_NOTE:
      data = validateAddNoteWrapper(nodeX);
      // @ts-ignore
      if (data) {
        errorList.push(data);
      }
      break;
    case NODE_TYPES.ADD_TASK:
      data = validateAddTaskWrapper(nodeX);
      // @ts-ignore
      if (data) {
        errorList.push(data);
      }
      break;
    case NODE_TYPES.SEND_EMAIL:
      data = validateSendEmailWrapper(nodeX);
      // @ts-ignore
      if (data) {
        errorList.push(data);
      }
      break;
    case NODE_TYPES.DELAY:
      data = validateDelayNode(nodeX);
      // @ts-ignore
      if (data) {
        errorList.push(data);
      }
      break;
    default:
  }
  return errorList;
};

const dfs = (startingNode: any, graphData: any) => {
  let visited = {};
  // @ts-ignore
  let orderedNodes = [];
  function DFSUtil(vert: any, visited: any) {
    visited[vert] = true;
    orderedNodes.push(vert);

    let get_neighbours = graphData.get(vert);

    for (let i in get_neighbours) {
      let get_elem = get_neighbours[i];
      if (!visited[get_elem]) DFSUtil(get_elem, visited);
    }
  }
  DFSUtil(startingNode, visited);
  // @ts-ignore
  return orderedNodes;
};
const getGraphForJourney = (nodeData: any, edgeData: any) => {
  const graphData = new Map();
  for (let i = 0; i < nodeData.length; i++) {
    graphData.set(nodeData[i], []);
  }
  edgeData.forEach((ed: any) => {
    graphData.get(ed.source).push(ed.target);
    graphData.get(ed.target).push(ed.source);
  });
  return graphData;
};

const getOrderedNodes = (nodes: any, edges: any) => {
  const graphData = getGraphForJourney(
    nodes.map((item: any) => item.id),
    edges
  );

  const orderedNodes = dfs("Trigger", graphData);

  nodes.forEach((nodeItem: any) => {
    if (orderedNodes.findIndex((item: any) => nodeItem.id === item) === -1) {
      orderedNodes.push(nodeItem.id);
    }
  });
  return orderedNodes;
};
export const validateGraph = (nodes: any, edges: any) => {
  const orderedNodes = getOrderedNodes(nodes, edges);
  // @ts-ignore
  const errorList = [];
  orderedNodes.forEach(async (nodeId) => {
    // @ts-ignore
    getErrorList(nodes, nodeId, errorList);
  });
  // @ts-ignore
  return errorList;
};
