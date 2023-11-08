import { createContext, useContext } from "react";
import { initialEdges, initialNodes } from "../content/template/initalData";
type ReactFlowContextT = {
  state?: {
    nodesData: any;
    edgesData: any;
    elementSelected: any;
    selectedRenameId: any;
    hoveredAddStepNode: string;
    errorList: any;
  };
  updateNodeAndEdge: (node: any) => void;
  addPath: (previousNodeId: string) => void;
  addNode: (previousNodeId: string, type: string) => void;
  addOnePath: (pathId: string) => void;
  deleteNode: (nodeId: string) => void;
  udpateElementSelected: (element: any) => void;
  udpateRightSideBar: (type: boolean) => void;
  deletePathRules: (nodeId: string, ruleId: string, itemId: string) => void;
  updatePathRulesNodeData: (
    data: any,
    nodeId: string,
    type: string,
    ruleId: string
  ) => void;
  handleUpdateOfPathRules: (
    nodeId: string,
    ruleId: string,
    itemId: string,
    data: any,
    type: string
  ) => void;
  handleRenameFieldUpdate: (nodeId: string) => void;
  handleUpdateOfPathName: (nodeId: string, data: string, type: string) => void;
  updateAddStepNodeStyleUpdate: (nodeId: string) => void;
  updateNodeAddOnDrop: (sourceNodeId: string, targetNodeId: string) => void;
  handleEmailUpdate: (nodeId: string, type: string, data: any) => void;
  handleSendTextUpdate: (nodeId: string, data: any) => void;
  handleDelayUpdate: (nodeId: string, type: string, data: any) => void;
  handleTaskUpdate: (nodeId: string, type: string, data: any) => void;
};
const initialState = {
  state: {
    nodesData: initialNodes,
    edgesData: initialEdges,
    elementSelected: {},
    selectedRenameId: "",
    hoveredAddStepNode: "",
    errorList: [],
  },
  updateNodeAndEdge: () => {},
  addPath: () => {},
  addNode: () => {},
  addOnePath: () => {},
  deleteNode: () => {},
  udpateElementSelected: () => {},
  udpateRightSideBar: () => {},
  updatePathRulesNodeData: () => {},
  deletePathRules: () => {},
  handleUpdateOfPathRules: () => {},
  handleRenameFieldUpdate: () => {},
  handleUpdateOfPathName: () => {},
  updateAddStepNodeStyleUpdate: () => {},
  updateNodeAddOnDrop: () => {},
  handleEmailUpdate: () => {},
  handleSendTextUpdate: () => {},
  handleDelayUpdate: () => {},
  handleTaskUpdate: () => {},
};
export const ReactFlowContext = createContext<ReactFlowContextT>(initialState);
export const useReactFlowContext = () => useContext(ReactFlowContext);
