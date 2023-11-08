import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import { getImage } from "../../constant/helper";
import NodesJson from "../../content/nodes.json";
import { useReactFlowContext } from "../../context/reactFlowContext";

const { NODES } = NodesJson;
const RightSideBarHeader = () => {
  const { state, udpateElementSelected, udpateRightSideBar } =
    useReactFlowContext();
  const { elementSelected } = state || {};
  const { type } = elementSelected || {};
  const { categoryType = "", label } =
    NODES?.find((item) => item.type === type) || {};
  return (
    <div className="right-sidebar-header">
      <div className="right-sidebar-header-left-container">
        <div
          className={classNames({
            "right-sidebar-header-left": true,
            [categoryType]: true,
          })}
        >
          <img src={getImage({ type })} alt={type} />
        </div>
        <div className="right-sidebar-header-left-label">{label}</div>
      </div>
      <div
        className="right-sidebar-header-right-container"
        onClick={() => {
          udpateElementSelected({});
          udpateRightSideBar(false);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default RightSideBarHeader;
