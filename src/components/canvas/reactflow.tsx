import React, {
  useLayoutEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  Controls,
  useStore,
  Background,
  BackgroundVariant,
  useReactFlow,
  useViewport,
} from "reactflow";
import { ReactFlowContext } from "../../context/reactFlowContext";
import nodeTypes from "../Nodes";
import { getLayoutedElements, updateGraphPositions } from "./helper";
import { PREVENT_OPEN_RIGHTSIDEBAR } from "../../constant/helper";
import "reactflow/dist/style.css";
import "./reactflow.scss";
import { NODE_TYPES } from "../../constant/nodeTypes";

const nodeInternals = (state: any) => state.nodeInternals;
const defaultViewport = { x: 200, y: 100, zoom: 0.5 };
const panOnDrag = [1, 2];
const ReactFlowWrapper = () => {
  const {
    state,
    updateNodeAndEdge,
    udpateRightSideBar,
    udpateElementSelected,
    updateAddStepNodeStyleUpdate,
    updateNodeAddOnDrop,
  } = useContext(ReactFlowContext) || {};
  const { nodesData, edgesData, elementSelected } = state || {};
  //Layouting start
  const nodesDataFromLibrary = useStore(nodeInternals);
  //HandlesGraphPlacements and updates
  let positonedNode = useMemo(
    () =>
      updateGraphPositions({
        nodes: structuredClone(nodesData),
        nodesDataFromLibrary,
      }),
    [nodesDataFromLibrary, nodesData]
  );

  let { nodes: layoutNodes } = getLayoutedElements({
    nodes: positonedNode,
    edges: edgesData,
  });

  const onNodeClick = useCallback((event: any, node: any) => {
    event.preventDefault()
    console.log(event, 'eer')
    if (event?.target?.closest(`[data-id="${PREVENT_OPEN_RIGHTSIDEBAR}"]`))
      return;
    if (event.target.classList.contains("MuiBackdrop-root")) return;
    if (
      [
        NODE_TYPES.PATH,

        NODE_TYPES.EMPTY_PATH_BRANCH,
        NODE_TYPES.PATH_BRANCH,
        NODE_TYPES.ADD_STEP_NODE,
      ].includes(node?.type)
    )
      return;
    const { id: currentElementId, type: currentElementType } = node || {};
    if (elementSelected?.id !== currentElementId) {
      udpateRightSideBar(false);
      udpateElementSelected({});
    }
    if (
      [
        NODE_TYPES.SEND_EMAIL,
        NODE_TYPES.SEND_NOTIFICATION,
        NODE_TYPES.SEND_FORM,
        NODE_TYPES.UPDATE_CANDIDATE,
        NODE_TYPES.ADD_NOTE,
        NODE_TYPES.ADD_TASK,
        NODE_TYPES.SEND_TEXT,
        NODE_TYPES.END_AUTOMATION,
        NODE_TYPES.QUESTIONNAIRE,
        NODE_TYPES.PATH_RULES,
        NODE_TYPES.DELAY,
        NODE_TYPES.TRIGGER,
      ].includes(currentElementType)
    ) {
      udpateRightSideBar(true);
      udpateElementSelected(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const d3Zoom = useStore((s: any) => s.d3Zoom);
  // const updateTransform = useStore((actions) => actions);
  const onDragOver = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!event?.target) return;
      let dataSet = event?.target?.dataset || {};
      const sourceNodeId = dataSet.nodeid;
      if (!sourceNodeId) return;
      const isAddStepNode = !!state?.nodesData?.find(
        (node: any) =>
          node.type === NODE_TYPES.ADD_STEP_NODE && node.id === sourceNodeId
      );
      if (isAddStepNode) {
        updateAddStepNodeStyleUpdate(sourceNodeId);
      } else {
        updateAddStepNodeStyleUpdate("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.nodesData, d3Zoom]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "move";
      const nodeTypeFromEvent = event?.dataTransfer?.types.find((type: any) =>
        type.includes("nodetype")
      );
      updateAddStepNodeStyleUpdate("");
      const nodeId = nodeTypeFromEvent?.split("/")[1];
      const dataSet = event?.target?.dataset;
      const sourceNodeId = dataSet.nodeid;
      const dropTargetType = state?.nodesData?.find(
        (item: any) => item.id === sourceNodeId
      )?.type;
      if (
        sourceNodeId &&
        nodeId &&
        dropTargetType === NODE_TYPES.ADD_STEP_NODE
      ) {
        updateNodeAddOnDrop(sourceNodeId, nodeId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.nodesData]
  );
  const { setViewport } = useReactFlow();
  const { x: viewportx, y: viewporty, zoom: viewPortZoom } = useViewport();

  const onDrag = useCallback(
    (event: any) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const windowHeight = window?.innerHeight || 500;
      const windowWidth = window?.innerWidth || 500;
      const duration = 100;
      const zoom = viewPortZoom || 0.5;
      const limitValue = 100;

      if (mouseY < limitValue) {
        const newy = viewporty + limitValue;
        setViewport(
          { x: viewportx, y: newy, zoom: zoom },
          { duration: duration }
        );
      }

      if (mouseY + limitValue > windowHeight) {
        const newy = viewporty - limitValue;
        setViewport(
          { x: viewportx, y: newy, zoom: zoom },
          { duration: duration }
        );
      }

      if (mouseX < limitValue) {
        const newx = viewportx + limitValue;
        setViewport(
          { x: newx, y: viewporty, zoom: zoom },
          { duration: duration }
        );
      }

      if (mouseX + limitValue > windowWidth) {
        const newx = viewportx - limitValue;
        setViewport(
          { x: newx, y: viewporty, zoom: zoom },
          { duration: duration }
        );
      }
    },
    [setViewport, viewportx, viewporty, viewPortZoom]
  );

  useLayoutEffect(() => {
    updateNodeAndEdge(layoutNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(layoutNodes)]);
  return (
    <div className="react-flow-wrapper">
      <ReactFlow
        className="react-flow-container"
        nodes={nodesData}
        edges={edgesData}
        zoomOnPinch={true}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        onNodeClick={onNodeClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDrag}
        nodesDraggable={true}
        onDrag={onDrag}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowWrapper;
