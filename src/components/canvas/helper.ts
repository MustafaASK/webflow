import Dagre from "@dagrejs/dagre";
import { Node, MarkerType } from "reactflow";
import { generateUUID, SEND_EMAIL_CONSTANT } from "../../constant/helper";
import NodesJson from "../../content/nodes.json";
import { NODE_TYPES } from "../../constant/nodeTypes";
const { NODES } = NodesJson;

export const getLayoutedElements = ({
  nodes,
  edges,
}: {
  nodes: any;
  edges: any;
}) => {
  let direction = "TB";
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node: any) => {
    if (node.height) {
      dagreGraph.setNode(node.id, {
        width: node.width || 0,
        height: node.height || 0,
      });
    }
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);
  nodes.forEach((node: any) => {
    const { x, y, height, width } = dagreGraph.node(node.id) || {};
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    if (x && y) {
      node.position = {
        x: x - width / 2,
        y: y - height / 2,
      };
    }

    return node;
  });
  return { nodes: nodes, edges };
};

const setNameOfPath = (node: any, index: number) => {
  if (!node?.data?.payload?.label?.trim()) {
    node.data.payload.label = `Path ${index}`;
  }
};

export const updateGraphPositions = ({
  nodes,
  nodesDataFromLibrary,
}: {
  nodes: Node[];
  nodesDataFromLibrary: Map<string, Node>;
}) => {
  nodes.forEach((node, index) => {
    let { id } = node || {};
    let value = nodesDataFromLibrary.get(id);
    if (value) {
      let { height, width, style } = value || {};
      if (style?.opacity !== "undefined") {
        node.style = { ...node.style, opacity: 1 };
      }
      //set height and width
      node.height = height;
      node.width = width;
      //we need to serially set the name of path node
      if (node.type === NODE_TYPES.PATH_BRANCH) {
        setNameOfPath(node, index);
      }
    }
  });
  return nodes;
};

let getNodeTemplate = (type: string) => {
  let nodeData = {
    id: "",
    position: { x: 0, y: 0 },
    style: {
      opacity: 0,
    },
    type: "",
    data: {
      payload: {},
    },
  };
  if (
    ![
      NODE_TYPES.PATH,
      NODE_TYPES.PATH_RULES,
      NODE_TYPES.ADD_STEP_NODE,
      NODE_TYPES.PATH_BRANCH,
      NODE_TYPES.END_AUTOMATION,
    ].includes(type)
  ) {
    // @ts-ignore
    nodeData["dragHandle"] = ".custom-drag-handle";
  }
  return structuredClone(nodeData);
};

let getEdgeTemplate = (isMarker: boolean = false) => {
  let edge = structuredClone({
    id: "",
    source: "",
    target: "",
    type: "smoothstep",
    markerEnd: {},
  });
  if (isMarker) {
    edge.markerEnd = {
      type: MarkerType.Arrow,
    };
  }
  return edge;
};

// const edgeIdAppend = "reactflow__edge";

const createOnePath = ({
  draft,
  startNodeId,
  sourceIndex,
}: {
  draft: any;
  startNodeId: string;
  sourceIndex: number;
}) => {
  //start creating pathBranch1
  let { data: dataPathBranch1, type: typePathBranch1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.PATH_BRANCH) || {};
  let pathBranch1Id = generateUUID();
  let pathBranch1 = getNodeTemplate(typePathBranch1);
  pathBranch1.id = pathBranch1Id;
  pathBranch1.type = typePathBranch1 || "";
  pathBranch1.data = structuredClone(dataPathBranch1) || { payload: {} };
  sourceIndex += 1;
  draft.nodesData.splice(sourceIndex, 0, pathBranch1);

  let pathBranch1EdgeData = getEdgeTemplate(true);
  pathBranch1EdgeData.id = generateUUID();
  pathBranch1EdgeData.source = startNodeId;
  pathBranch1EdgeData.target = pathBranch1Id;
  draft.edgesData.push(pathBranch1EdgeData);

  //path rule start

  let { data: dataPathRule1, type: typePathRule1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.PATH_RULES) || {};
  let pathRule1ID = generateUUID();
  let pathRule1Temp = getNodeTemplate(typePathRule1);
  pathRule1Temp.id = pathRule1ID;
  pathRule1Temp.type = typePathRule1 || "";
  pathRule1Temp.data = structuredClone(dataPathRule1) || { payload: {} };
  sourceIndex += 1;
  draft.nodesData.splice(sourceIndex, 0, pathRule1Temp);

  let pathRule1EdgeData = getEdgeTemplate(true);
  pathRule1EdgeData.id = generateUUID();
  pathRule1EdgeData.source = pathBranch1Id;
  pathRule1EdgeData.target = pathRule1ID;
  draft.edgesData.push(pathRule1EdgeData);

  let { data: addStepData1, type: addStepType1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.ADD_STEP_NODE) || {};
  let addStep1ID = generateUUID();
  let addStep1Temp = getNodeTemplate(addStepType1);
  addStep1Temp.id = addStep1ID;
  addStep1Temp.type = addStepType1 || "";
  addStep1Temp.data = structuredClone(addStepData1) || { payload: {} };
  sourceIndex += 1;
  draft.nodesData.splice(sourceIndex, 0, addStep1Temp);

  let addStep1EdgeData = getEdgeTemplate();
  addStep1EdgeData.id = generateUUID();
  addStep1EdgeData.source = pathRule1ID;
  addStep1EdgeData.target = addStep1ID;
  draft.edgesData.push(addStep1EdgeData);
  return sourceIndex;
  //path rule end
};

export const addPathHelper = ({
  draft,
  previousNodeId,
}: {
  draft: any;
  previousNodeId: string;
}) => {
  //create path and edge
  let { data, type = "" } =
    NODES.find((node) => node.type === NODE_TYPES.PATH) || {};
  let pathNodeID = generateUUID();
  let pathNodeData = getNodeTemplate(type);
  pathNodeData.id = pathNodeID;
  pathNodeData.type = type || "";
  pathNodeData.data = structuredClone(data) || { payload: {} };

  let sourceIndex = draft?.nodesData?.findIndex(
    (item: any) => item.id === previousNodeId
  );
  sourceIndex += 1;
  //It is very important to maintain order of add node else graph will kee changing its postion
  draft.nodesData.splice(sourceIndex, 0, pathNodeData);

  let pathEdge1Data = getEdgeTemplate(true);
  pathEdge1Data.id = generateUUID();
  pathEdge1Data.source = previousNodeId;
  pathEdge1Data.target = pathNodeID;
  draft.edgesData.push(pathEdge1Data);
  //end creating path

  //Create a path branch
  sourceIndex = createOnePath({ draft, startNodeId: pathNodeID, sourceIndex });
  //End--- create a path branch

  //create path branch
  sourceIndex = createOnePath({ draft, startNodeId: pathNodeID, sourceIndex });
  //End--- create a path branch

  //create empty path branch
  let { data: dataemptyPathBranch1, type: emptytypePathBranch1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.EMPTY_PATH_BRANCH) || {};
  let emptypathBranch1Id = generateUUID();
  let emptypathBranch1 = getNodeTemplate(emptytypePathBranch1);
  emptypathBranch1.id = emptypathBranch1Id;
  emptypathBranch1.type = emptytypePathBranch1 || "";
  emptypathBranch1.data = structuredClone(dataemptyPathBranch1) || {
    payload: {},
  };
  sourceIndex += 1;
  draft.nodesData.splice(sourceIndex, 0, emptypathBranch1);
  draft.nodesData.push(emptypathBranch1);

  let emptypathBranch1EdgeData = getEdgeTemplate(true);
  emptypathBranch1EdgeData.id = generateUUID();
  emptypathBranch1EdgeData.source = pathNodeID;
  emptypathBranch1EdgeData.target = emptypathBranch1Id;
  draft.edgesData.push(emptypathBranch1EdgeData);
};

export const addNodeHelper = ({
  draft,
  previousNodeId,
  type,
}: {
  draft: any;
  previousNodeId: string;
  type: string;
}) => {
  //If we are adding in between
  const { target } =
    draft?.edgesData?.find((edge: any) => edge.source === previousNodeId) || {};
  if (target) {
    draft.edgesData = draft.edgesData.filter(
      (edge: any) => edge.source !== previousNodeId
    );
  }
  let { data: dataType1 } = NODES.find((node) => node.type === type) || {};
  let newNodeId1 = generateUUID();
  let newNodeId1Data = getNodeTemplate(type);
  newNodeId1Data.id = newNodeId1;
  newNodeId1Data.type = type || "";
  newNodeId1Data.data = structuredClone(dataType1) || { payload: {} };
  const sourceIndex = draft?.nodesData?.findIndex(
    (item: any) => item.id === previousNodeId
  );

  let newNodeEdge1 = getEdgeTemplate(true);
  newNodeEdge1.id = generateUUID();
  newNodeEdge1.source = previousNodeId;
  newNodeEdge1.target = newNodeId1;
  draft.edgesData.push(newNodeEdge1);
  //It is very important to maintain order of add node else graph will kee changing its postion
  draft.nodesData.splice(sourceIndex + 1, 0, newNodeId1Data);
  if (type === NODE_TYPES.END_AUTOMATION) return;

  //create add step path

  let { data: dataemptyPathBranch1, type: emptytypePathBranch1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.ADD_STEP_NODE) || {};
  let emptypathBranch1Id = generateUUID();
  let emptypathBranch1 = getNodeTemplate(emptytypePathBranch1);
  emptypathBranch1.id = emptypathBranch1Id;
  emptypathBranch1.type = emptytypePathBranch1 || "";
  emptypathBranch1.data = structuredClone(dataemptyPathBranch1) || {
    payload: {},
  };

  draft.nodesData.splice(sourceIndex + 2, 0, emptypathBranch1);

  let emptypathBranch1EdgeData = getEdgeTemplate();
  emptypathBranch1EdgeData.id = generateUUID();
  emptypathBranch1EdgeData.source = newNodeId1;
  emptypathBranch1EdgeData.target = emptypathBranch1Id;
  draft.edgesData.push(emptypathBranch1EdgeData);
  if (target) {
    let newEdgeToTarget = getEdgeTemplate(true);
    newEdgeToTarget.id = generateUUID();
    newEdgeToTarget.source = emptypathBranch1Id;
    newEdgeToTarget.target = target;
    draft.edgesData.push(newEdgeToTarget);
  }
};

export const addSinglePath = ({
  draft,
  pathId,
}: {
  draft: any;
  pathId: string;
}) => {
  let { source: parentPathId } = draft.edgesData?.find(
    (edge: any) => edge.target === pathId
  );
  let sourceIndex = draft?.nodesData?.findIndex(
    (item: any) => item.id === pathId
  );
  //we will insert just before empty path
  sourceIndex -= 1;
  //Create a path branch
  createOnePath({ draft, startNodeId: parentPathId, sourceIndex });
};

export const levelOrderTraverseAndgetNodeIdConnectedToPath = ({
  draft,
  nodeId,
}: {
  draft: any;
  nodeId: string;
}) => {
  let finalArray: string[] = [];
  let queue = [];
  queue.push(nodeId);
  while (queue.length > 0) {
    var temp: string[] = [];
    var array: string[] = [];
    while (queue.length > 0) {
      let currentVal = queue.shift();
      if (currentVal) {
        temp.push(currentVal);
        let arrayOfSources = draft.edgesData
          ?.filter((edge: any) => edge.source === currentVal)
          ?.map((item: any) => item.target);
        array = array.concat(arrayOfSources);
      }
    }
    queue = array;
    finalArray = finalArray.concat(temp);
  }

  return finalArray;
};

export const deletePathNode = ({
  draft,
  nodeId,
}: {
  draft: any;
  nodeId: string;
}) => {
  let finalArrayOfNodesToDelete = levelOrderTraverseAndgetNodeIdConnectedToPath(
    {
      draft,
      nodeId,
    }
  );

  draft.nodesData = draft.nodesData?.filter(
    (node: any) => finalArrayOfNodesToDelete.indexOf(node.id) < 0
  );

  draft.edgesData = draft.edgesData?.filter(
    (edge: any) => finalArrayOfNodesToDelete.indexOf(edge.source) < 0
  );
  //Delete the path connection
  draft.edgesData = draft.edgesData?.filter(
    (edge: any) => edge.target !== nodeId
  );
};

export const deleteNodeHelper = ({
  draft,
  nodeId,
}: {
  draft: any;
  nodeId: string;
}) => {
  const { type } = draft.nodesData?.find((node: any) => node.id === nodeId);
  if (type === NODE_TYPES.PATH || type === NODE_TYPES.PATH_BRANCH) {
    deletePathNode({ draft, nodeId });
  } else {
    draft.nodesData = draft.nodesData.filter((node: any) => node.id !== nodeId);
    let { source: parentOfCurrentNodeId } =
      draft.edgesData?.find((edge: any) => edge.target === nodeId) || {};

    let { target: childOfCurrentNodeId } =
      draft.edgesData?.find((edge: any) => edge.source === nodeId) || {};

    //remove this since it is a step node by design
    draft.nodesData = draft.nodesData.filter(
      (node: any) => node.id !== childOfCurrentNodeId
    );

    let { target: childOfchildNodeId } =
      draft.edgesData?.find(
        (edge: any) => edge.source === childOfCurrentNodeId
      ) || {};

    draft.edgesData = draft.edgesData.filter(
      (edge: any) => edge.source !== nodeId
    );

    draft.edgesData = draft.edgesData.filter(
      (edge: any) => edge.target !== nodeId
    );

    draft.edgesData = draft.edgesData.filter(
      (edge: any) => edge.source !== childOfCurrentNodeId
    );
    if (childOfchildNodeId) {
      let newEdge = getEdgeTemplate(true);
      newEdge.id = generateUUID();
      newEdge.source = parentOfCurrentNodeId;
      newEdge.target = childOfchildNodeId;
      draft.edgesData.push(newEdge);
    }
  }
};

const handleNodeAddOnDrop = (
  draft: any,
  sourceNodeId: any,
  targetNodeId: any
) => {
  const sourceIndex = draft?.nodesData?.findIndex(
    (item: any) => item.id === sourceNodeId
  );

  const nodeToBeAddedData = draft.nodesData?.find(
    (node: any) => node.id === targetNodeId
  );
  //Remove the dragged node from it's position
  draft.nodesData = draft.nodesData?.filter(
    (node: any) => node.id !== targetNodeId
  );

  let { data: addStepData1, type: addStepType1 = "" } =
    NODES.find((node) => node.type === NODE_TYPES.ADD_STEP_NODE) || {};
  let addStep1ID = targetNodeId + "v1";
  let addStep1Temp = getNodeTemplate(addStepType1);
  addStep1Temp.id = addStep1ID;
  addStep1Temp.type = addStepType1 || "";
  addStep1Temp.data = structuredClone(addStepData1) || { payload: {} };
  draft.nodesData.splice(sourceIndex + 1, 0, nodeToBeAddedData);
  draft.nodesData.splice(sourceIndex + 2, 0, addStep1Temp);

  //add edge between target and step node
  let emptypathBranch1EdgeData = getEdgeTemplate();
  emptypathBranch1EdgeData.id = generateUUID();
  emptypathBranch1EdgeData.source = targetNodeId;
  emptypathBranch1EdgeData.target = addStep1ID;
  draft.edgesData.push(emptypathBranch1EdgeData);

  return addStep1ID;
};

export const handleUpdateNodeAddOnDrop = ({
  draft,
  sourceNodeId,
  targetNodeId,
}: {
  draft: any;
  sourceNodeId: string;
  targetNodeId: string; //dragged Node id
}) => {
  //FindStep node Associated with targetNode
  const stepNodeId = draft.edgesData?.find(
    (edge: any) => edge.source === targetNodeId
  )?.target;

  const nodeAfterSourceNodeId = draft.edgesData?.find(
    (edge: any) => edge.source === sourceNodeId
  )?.target;
  if (targetNodeId === nodeAfterSourceNodeId) return; //No need to add as this is the same node
  if (stepNodeId === sourceNodeId) return; //No need to continue since there is no point
  //of dragging into the same step node

  //Check if any edge id connected after step node
  const nodeConnectedAfterStepId = draft.edgesData?.find(
    (edge: any) => edge.source === stepNodeId
  )?.target;

  if (nodeConnectedAfterStepId) {
    const nodeBeforeTargetId = draft.edgesData?.find(
      (edge: any) => edge.target === targetNodeId
    )?.source;
    let edgeData = getEdgeTemplate(true);
    edgeData.id = generateUUID();
    edgeData.source = nodeBeforeTargetId;
    edgeData.target = nodeConnectedAfterStepId;
    draft.edgesData.push(edgeData);
    //Remove edge after step node
    draft.edgesData = draft.edgesData?.filter(
      (edge: any) => edge.source !== stepNodeId
    );
  }
  //Remove edge connecting targetNode and originating from target
  draft.edgesData = draft.edgesData?.filter(
    (edge: any) => edge.source !== targetNodeId
  );
  draft.edgesData = draft.edgesData?.filter(
    (edge: any) => edge.target !== targetNodeId
  );
  //Remove step node
  draft.nodesData = draft.nodesData?.filter(
    (node: any) => node.id !== stepNodeId
  );

  //Changing position of targetNode

  //Addition logic when node is dropped

  const nodeConnectedFromSourceId = draft.edgesData?.find(
    (edge: any) => edge.source === sourceNodeId
  )?.target;
  const finalStepNodeId = handleNodeAddOnDrop(
    draft,
    sourceNodeId,
    targetNodeId
  );
  if (nodeConnectedFromSourceId) {
    //Remove edge after source node
    draft.edgesData = draft.edgesData?.filter(
      (edge: any) => edge.source !== sourceNodeId
    );

    let edgeData = getEdgeTemplate(true);
    edgeData.id = generateUUID();
    edgeData.source = finalStepNodeId;
    edgeData.target = nodeConnectedFromSourceId;
    draft.edgesData.push(edgeData);
  }
  //Connect node dragged to source

  let edgeDataSource = getEdgeTemplate(true);
  edgeDataSource.id = generateUUID();
  edgeDataSource.source = sourceNodeId;
  edgeDataSource.target = targetNodeId;
  draft.edgesData.push(edgeDataSource);
};

export const handleEmailUpdateHelper = ({
  draft,
  nodeId,
  type,
  data,
}: {
  draft: any;
  nodeId: string;
  type: string;
  data: any;
}) => {
  draft.nodesData?.forEach((node: any) => {
    if (node?.id === nodeId) {
      if (type === SEND_EMAIL_CONSTANT.TEMPLATE) {
        node.data.payload.template = data;
      } else if (type === SEND_EMAIL_CONSTANT.FROM) {
        node.data.payload.from = data;
      } else if (type === SEND_EMAIL_CONSTANT.TO) {
        node.data.payload.to = data;
      } else if (type === SEND_EMAIL_CONSTANT.CC) {
        node.data.payload.cc = data;
      } else if (type === SEND_EMAIL_CONSTANT.BCC) {
        node.data.payload.bcc = data;
      } else if (type === SEND_EMAIL_CONSTANT.BODY) {
        node.data.payload.body = data;
      } else if (type === SEND_EMAIL_CONSTANT.ISCCCHECKED) {
        node.data.payload.isCCChecked = data;
      } else if (type === SEND_EMAIL_CONSTANT.SUBJECT) {
        node.data.payload.subject = data;
      }
    }
  });
};

export const generateNormalizedObject = (nodes: any, edges: any) => {
  const nodesObject = {};
  nodes?.forEach((node: any) => {
    if (
      ![NODE_TYPES.ADD_STEP_NODE, NODE_TYPES.EMPTY_PATH_BRANCH].includes(
        node.type
      )
    ) {
      // @ts-ignore
      nodesObject[node.id] = {
        type: node.type,
        payload: node.data.payload,
        next: [],
      };
    }
  });

  edges?.forEach((edge: any) => {
    let { source, target } = edge;
    const targetNodeDetails = nodes?.find((node: any) => node.id === target);
    const isTargetStepNode =
      targetNodeDetails?.type === NODE_TYPES.ADD_STEP_NODE;
    if (isTargetStepNode) {
      let { target: targetoftarget } =
        edges?.find((edge: any) => edge.source === target) || {};
      if (targetoftarget) {
        // @ts-ignore
        nodesObject[source].next.push(targetoftarget);
      }
    }

    const isTargetRelatedToPath = [
      NODE_TYPES.PATH_BRANCH,
      NODE_TYPES.PATH_RULES,
    ].includes(targetNodeDetails?.type);

    if (isTargetRelatedToPath) {
      // @ts-ignore
      nodesObject[source].next.push(target);
    }
  });
  return nodesObject;
};

const addStepNode = (nodes: any) => {
  let node = getNodeTemplate("ADD_STEP_NODE");
  node.id = generateUUID();
  node.type = "ADD_STEP_NODE";
  node.data = {
    payload: {},
  };
  nodes.push(node);
  return node.id;
};
const addEdge = (
  edges: any,
  sourceId: string,
  targetId: string,
  type: boolean
) => {
  let edge = getEdgeTemplate(type || false);
  edge.id = generateUUID();
  edge.source = sourceId;
  edge.target = targetId;
  edges.push(edge);
};

const dfs = (
  nodesObject: any,
  nodes: any,
  edges: any,
  root: any,
  rootId: string
) => {
  if (!root) return;
  let node = getNodeTemplate(root.type);
  node.id = rootId;
  node.type = root.type;
  node.data = {
    payload: root.payload,
  };
  nodes.push(node);
  let targetId = rootId;
  if (
    ![
      NODE_TYPES.PATH,
      NODE_TYPES.PATH_BRANCH,
      NODE_TYPES.EMPTY_PATH_BRANCH,
      NODE_TYPES.END_AUTOMATION,
    ].includes(root.type)
  ) {
    targetId = addStepNode(nodes);
    addEdge(edges, rootId, targetId, false);
  }
  let nextNodearray = root.next;
  nextNodearray?.forEach((node: any) => {
    let data = nodesObject[node];
    addEdge(edges, targetId, node, true);
    dfs(nodesObject, nodes, edges, data, node);
  });
  if (root.type === NODE_TYPES.PATH) {
    let emptyPathBranchNode = getNodeTemplate(NODE_TYPES.EMPTY_PATH_BRANCH);
    let emptyId = generateUUID();
    emptyPathBranchNode.id = emptyId;
    emptyPathBranchNode.type = NODE_TYPES.EMPTY_PATH_BRANCH;
    emptyPathBranchNode.data = {
      payload: {},
    };
    nodes.push(emptyPathBranchNode);
    addEdge(edges, rootId, emptyId, true);
  }
};

export const convertBackendObjectToGraph = (nodesObject: any) => {
  // @ts-ignore
  let nodes = [];
  // @ts-ignore
  let edges = [];
  let root = nodesObject["Trigger"];
  // @ts-ignore
  dfs(nodesObject, nodes, edges, root, "Trigger");
  // @ts-ignore
  return { nodes, edges };
};
