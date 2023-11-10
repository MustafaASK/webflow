import React, { useState } from "react";
import { produce } from "immer";
import { ReactFlowProvider } from "reactflow";
import { ReactFlowContext } from "../../context/reactFlowContext";
import ReactFlowWrapper from "./reactflow";
import RightSidebarWrapper from "../RightSidebar";
import BaseLayout from "../../layout/baseLayout";
import {
  addPathHelper,
  addNodeHelper,
  addSinglePath,
  deleteNodeHelper,
  handleUpdateNodeAddOnDrop,
  handleEmailUpdateHelper,
  generateNormalizedObject,
  convertBackendObjectToGraph,
} from "./helper";
import { Box, TextField, Button } from '@mui/material'
import { initialEdges, initialNodes } from "../../content/template/initalData";
import { NODE_TYPES } from "../../constant/nodeTypes";
import { validateGraph } from "./validation";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from "react-router-dom";
import apiService from "../../api/apiService";
import './canvas.scss'

const AddForm = () => {
    
  const [state, setState] = useState({
    nodesData: initialNodes,
    edgesData: initialEdges,
    isRightSidebarOpen: false,
    elementSelected: {},
    selectedRenameId: "",
    hoveredAddStepNode: "",
    errorList: [],
  });
  const updateNodeAndEdge = (nodes: any, edges?: any) => {
    setState(
      produce((draft) => {
        draft.nodesData = nodes;
        if (edges?.length) {
          draft.edgesData = edges;
        }
      })
    );
  };
  const addPath = (previousNodeId: string) => {
    setState(
      produce((draft) => {
        addPathHelper({
          draft,
          previousNodeId,
        });
      })
    );
  };
  const addNode = (previousNodeId: string, type: string) => {
    setState(
      produce((draft) => {
        addNodeHelper({
          draft,
          previousNodeId,
          type,
        });
      })
    );
  };

  const addOnePath = (pathId: string) => {
    setState(
      produce((draft) => {
        addSinglePath({
          draft,
          pathId,
        });
      })
    );
  };

  const deleteNode = (nodeId: string) => {
    setState(
      produce((draft) => {
        deleteNodeHelper({
          draft,
          nodeId,
        });
      })
    );
  };

  const udpateElementSelected = (element: any) => {
    setState(
      produce((draft) => {
        draft.elementSelected = element;
      })
    );
  };

  const udpateRightSideBar = (type: boolean) => {
    setState(
      produce((draft) => {
        draft.isRightSidebarOpen = type;
      })
    );
  };

  const updatePathRulesNodeData = (
    data: any,
    nodeId: string,
    type: string,
    ruleId: string
  ) => {
    setState(
      produce((draft) => {
        if (type === "OR") {
          let newNodeData = [...draft?.nodesData];
          newNodeData?.forEach((node) => {
            if (node?.id === nodeId) {
              node.data.payload.rules.push(data);
            }
          });
          draft.nodesData = newNodeData;
        } else if (type === "AND") {
          draft?.nodesData?.forEach((node: any) => {
            if (node?.id === nodeId) {
              node.data.payload.rules?.forEach((item: any) => {
                if (item.id === ruleId) {
                  item.condition.push(data);
                }
              });
            }
          });
        }
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
  };
  const deletePathRules = (nodeId: string, ruleId: string, itemId: string) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          if (node?.id === nodeId) {
            node.data.payload.rules?.forEach((item: any) => {
              if (item.id === ruleId) {
                item.condition = item.condition?.filter(
                  (cond: any) => cond.id !== itemId
                );
              }
            });
            node.data.payload.rules = node.data.payload.rules?.filter(
              (item: any) => item?.condition?.length
            );
          }
        });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
  };
  const handleUpdateOfPathRules = (
    nodeId: string,
    ruleId: string,
    itemId: string,
    data: any,
    type: string
  ) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          if (node?.id === nodeId) {
            node.data.payload.rules?.forEach((item: any) => {
              if (item.id === ruleId) {
                item.condition?.forEach((cond: any) => {
                  if (itemId === cond.id) {
                    if (type === "CONDITION") {
                      cond.condition = data;
                    } else if (type === "TEXT") {
                      cond.text = data;
                    } else if (type === "FIELD") {
                      cond.field = data;
                    }
                  }
                });
              }
            });
          }
        });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
  };

  const handleRenameFieldUpdate = (nodeId: string) => {
    setState(
      produce((draft) => {
        draft.selectedRenameId = nodeId;
      })
    );
  };

  const handleUpdateOfPathName = (
    nodeId: string,
    data: string,
    type: string
  ) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          let pathBranchId;
          if (type === NODE_TYPES.PATH_RULES) {
            pathBranchId = draft.edgesData?.find(
              (edge: any) => edge.target === nodeId
            )?.source;
          }
          if (pathBranchId) {
            if (node?.id === pathBranchId) {
              node.data.payload.label = data;
            }
          } else if (node?.id === nodeId) {
            node.data.payload.label = data;
          }
        });
      })
    );
  };

  const updateAddStepNodeStyleUpdate = (nodeId: string) => {
    setState(
      produce((draft) => {
        draft.hoveredAddStepNode = nodeId;
      })
    );
  };

  const updateNodeAddOnDrop = (sourceNodeId: string, targetNodeId: string) => {
    setState(
      produce((draft) => {
        handleUpdateNodeAddOnDrop({
          draft,
          sourceNodeId,
          targetNodeId,
        });
      })
    );
  };

  const handleEmailUpdate = (nodeId: string, type: string, data: any) => {
    setState(
      produce((draft) => {
        handleEmailUpdateHelper({ draft, nodeId, type, data });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
    validate();
  };
  const handleSendTextUpdate = (nodeId: string, data: any) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          if (node?.id === nodeId) {
            node.data.payload.text = data;
          }
        });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
    validate();
  };

  const handleDelayUpdate = (nodeId: string, type: string, data: any) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          if (node?.id === nodeId) {
            if (type === "DAYS") node.data.payload.days = data;
            if (type === "TYPE") node.data.payload.type = data;
          }
        });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
    validate();
  };

  const handleTaskUpdate = (nodeId: string, type: string, data: any) => {
    setState(
      produce((draft) => {
        draft.nodesData?.forEach((node: any) => {
          if (node?.id === nodeId) {
            if (type === "TITLE") node.data.payload.title = data;
            if (type === "TYPE") node.data.payload.type = data;
            if (type === "PRIORITY") node.data.payload.priority = data;
            if (type === "ASSIGNEDTO") node.data.payload.assignedTo = data;
            if (type === "DUEDATE") node.data.payload.dueData = data;
            if (type === "REPEAT") node.data.payload.repeat = data;
            if (type === "NOTES") node.data.payload.notes = data;
          }
        });
        draft.elementSelected =
          draft?.nodesData?.find((node: any) => nodeId === node.id) || {};
      })
    );
    validate();
  };

  const validate = () => {
    let nodesObject = generateNormalizedObject(
      state?.nodesData,
      state?.edgesData
    );
    // let { nodes, edges } = convertBackendObjectToGraph(nodesObject);
    console.log("data to backend : ", nodesObject)
    setState(
      produce((draft) => {
        // @ts-ignore
        draft.errorList = validateGraph(draft.nodesData, draft.edgesData);
        // draft.nodesData = nodes;
        // draft.edgesData = edges;
      })
    );

    // submitData()
  };

  const navigate = useNavigate()

  const onClickBackIcon = () => {
    navigate('/')
  }

    return (
      <div className="journey-builder-app-container">
      <BaseLayout>
        <ReactFlowProvider>
          
    <ReactFlowContext.Provider
    value={{
      state,
      addPath,
      updateNodeAndEdge,
      addNode,
      addOnePath,
      deleteNode,
      udpateElementSelected,
      udpateRightSideBar,
      updatePathRulesNodeData,
      deletePathRules,
      handleUpdateOfPathRules,
      handleRenameFieldUpdate,
      handleUpdateOfPathName,
      updateAddStepNodeStyleUpdate,
      updateNodeAddOnDrop,
      handleEmailUpdate,
      handleSendTextUpdate,
      handleDelayUpdate,
      handleTaskUpdate,
    }}
  >
    <div>helo</div>
    <ReactFlowWrapper />
    {/* {state.isRightSidebarOpen && (
      <RightSidebarWrapper elementSelected={state?.elementSelected} />
    )} */}
  </ReactFlowContext.Provider>
        </ReactFlowProvider>
      </BaseLayout>
    </div>
        
    )
}

export default AddForm