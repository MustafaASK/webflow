import React from "react";
import { NODE_TYPES } from "../../constant/nodeTypes";
import RightSideBar from "./wrapper";
import SendTextOptions from "../Nodes/sendText/options";
import UpdateCandidateOptions from "../Nodes/updateCandidate/options";
import AddNoteOptions from "../Nodes/addNote/options";
import AddTaskoptions from "../Nodes/addTask/options";
import SendEmailOptions from "../Nodes/sendEmail/options";
import SendNotificationOptions from "../Nodes/sendNotification/options";
import QuestionnaireOptions from "../Nodes/questionnaire/options";
import EndAutomationOptions from "../Nodes/endAutomation/options";
import SendSurveyOptions from "../Nodes/sendSurvey/options";
import PathRulesOptions from "../Nodes/pathRules/options";
import DelayOptions from "../Nodes/delay/options";
import RightSideBarHeader from "./header";
import "./rightbar.scss";
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const RightSideBarWrapper = ({ elementSelected }: { elementSelected: any }) => {
  let { type: nodeType } = elementSelected || {};
  return (
    <RightSideBar>
      <RightSideBarHeader />
      <div className="right-sidebar-wrapper-content-children">
        {nodeType === NODE_TYPES.ADD_NOTE && <AddNoteOptions />}
        {nodeType === NODE_TYPES.ADD_TASK && <AddTaskoptions />}
        {nodeType === NODE_TYPES.UPDATE_CANDIDATE && <UpdateCandidateOptions />}
        {nodeType === NODE_TYPES.END_AUTOMATION && <EndAutomationOptions />}
        {nodeType === NODE_TYPES.QUESTIONNAIRE && <QuestionnaireOptions />}
        {nodeType === NODE_TYPES.SEND_EMAIL && <SendEmailOptions />}
        {nodeType === NODE_TYPES.SEND_NOTIFICATION && (
          <SendNotificationOptions />
        )}
        {nodeType === NODE_TYPES.SEND_FORM && <SendSurveyOptions />}
        {nodeType === NODE_TYPES.SEND_TEXT && <SendTextOptions />}
        {nodeType === NODE_TYPES.PATH_RULES && <PathRulesOptions />}
        {nodeType === NODE_TYPES.DELAY && <DelayOptions />}
      </div>
    </RightSideBar>
  );
};

export default RightSideBarWrapper;
