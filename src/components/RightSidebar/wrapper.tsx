import React, { memo } from "react";
import Drawer from "@mui/material/Drawer";
// import { NODE_TYPES } from "../../constant/nodeTypes";
import { useReactFlowContext } from "../../context/reactFlowContext";
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
type Anchor = "top" | "left" | "bottom" | "right";
const RightSideBar = ({ children }: { children: any }) => {
  const { udpateRightSideBar, udpateElementSelected } = useReactFlowContext();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      udpateRightSideBar(false);
      udpateElementSelected({});
    };
  return (
    <div className="right-sidebar-wrapper">
      <Drawer anchor="right" open={true} onClose={toggleDrawer("right", false)}>
        <div className="right-sidebar-wrapper">
          <div className="right-sidebar-wrapper-content">{children}</div>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(RightSideBar);
