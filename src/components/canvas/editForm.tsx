// import React, { useState } from "react";
import React, { useEffect, useState, useContext } from 'react'

import {
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom";
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
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './canvas.scss'

const EditForm = () => {

  const [state, setState] = useState({
    nodesData: initialNodes,
    edgesData: initialEdges,
    isRightSidebarOpen: false,
    elementSelected: {},
    selectedRenameId: "",
    hoveredAddStepNode: "",
    errorList: [],
  });
  const routeParams = useParams();
  // console.log(routeParams);
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


  const getlistbyid = (id: any) => {

    apiService.getlistbyid(id)
      .then((response: any) => {
        // setTeamLeads(response.data);
        console.log('getlistbyidResponse:', response.data);
        formik.setValues({ "editwebformname": response.data.webflowname, "editdescription": "demo" });
        let { nodes, edges } = convertBackendObjectToGraph(response.data.json);
        updateNodeAndEdge(nodes, edges);
        // formik.setFieldValue(response.data.webflowname,"demo");

      })
      .catch((error: any) => {
        console.error('Error list fetching data:', error);
      });
  };


  useEffect(() => {
    getlistbyid(routeParams.webid);
  }, []);

  const Validations = Yup.object({
    editwebformname: Yup.string().required('Required WebFormName'),
    editdescription: Yup.string().required('Required Description'),
  })

  const formik = useFormik({
    initialValues: {
      editwebformname: "",
      editdescription: ""
    },
    validationSchema: Validations,
    onSubmit: (values) => {
      submitData(values)
    }
  })

  const submitData = (values: any) => {
    // console.log(JSON.stringify(values, null, 2));
    let nodesObject = generateNormalizedObject(
      state?.nodesData,
      state?.edgesData
    );
    // let { nodes, edges } = convertBackendObjectToGraph(nodesObject);
    // console.log("data to backend : ")
    // console.log(JSON.stringify(nodesObject))
    // return
    const saveData = {
      "webflowid": routeParams.webid,
      "webflowname": values.editwebformname,
      "desc": values.editdescription,
      "json": (nodesObject)
    }

    apiService.savewebflow(saveData)
      .then((response: any) => {
        // setTeamLeads(response.data);
        console.log('getlistdataResponse:', response.data);
        if (response.data.Success) {
          navigate('/')
        }

      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <form className="journey-builder-app-container" onSubmit={formik.handleSubmit}>
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
            <Box className='top-container'>
              <Box className='top-input-container' >
                <ArrowBackRoundedIcon className="back-icon" onClick={onClickBackIcon} />
                <Box sx={{ height: '45px' }}>
                  <TextField variant="outlined"
                    value={formik.values.editwebformname}
                    id="editwebformname" name="editwebformname"
                    placeholder="Webformname"
                    spellCheck='false'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  {(formik.errors.editwebformname && formik.touched.editwebformname) ? <div className="error-msg">{formik.errors.editwebformname}</div> : null}
                </Box>
                <Box sx={{ height: '45px' }}>
                  <TextField variant="outlined"
                    value={formik.values.editdescription}
                    id="editdescription"
                    name="editdescription"
                    placeholder="Description"
                    spellCheck='false'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  {(formik.errors.editdescription && formik.touched.editdescription) ? <div className="error-msg">{formik.errors.editdescription}</div> : null}
                </Box>
              </Box>
              <Button
                type="submit"
                // onClick={submitData}
                className="submit-btn"
                variant="contained">
                Save
              </Button>
            </Box>
            <ReactFlowWrapper />
            {state.isRightSidebarOpen && (
              <RightSidebarWrapper elementSelected={state?.elementSelected} />
            )}
          </ReactFlowContext.Provider>
        </ReactFlowProvider>
      </BaseLayout>
    </form>

  )
}

export default EditForm