import { v4 as uuidv4 } from "uuid";
import SEND_NOTIFICATION from "../automationFlowIcons/bxs-bell-ring.png";
import SEND_EMAIL from "../automationFlowIcons/email.png";
import SEND_TEXT from "../automationFlowIcons/Group.png";
import ADD_WAIT from "../assets/img/stopwatch.svg";
import SEND_FORM from "../automationFlowIcons/Vector.png";
import ADD_NOTE from "../automationFlowIcons/stickynote.png";
import ADD_TASK from "../automationFlowIcons/Vector-1.png";
import UPDATE_CANDIDATE from "../automationFlowIcons/user.png";
import END_AUTOMATION from "../automationFlowIcons/Vector-2.png";
import TRIGGER from "../automationFlowIcons/bolt-solid.png";
import PATH from "../automationFlowIcons/Group-1.png";
import PATH_RULES from "../assets/img/path.png";
import DELAY from "../automationFlowIcons/hourglass.png";
export const generateUUID = () => {
  return uuidv4();
};

export const getImage = ({ type }) => {
  let imageMap = {
    SEND_NOTIFICATION: SEND_NOTIFICATION,
    SEND_EMAIL: SEND_EMAIL,
    SEND_TEXT: SEND_TEXT,
    ADD_WAIT: ADD_WAIT,
    SEND_FORM: SEND_FORM,
    ADD_NOTE: ADD_NOTE,
    ADD_TASK: ADD_TASK,
    UPDATE_CANDIDATE: UPDATE_CANDIDATE,
    END_AUTOMATION: END_AUTOMATION,
    TRIGGER: TRIGGER,
    PATH: PATH,
    PATH_RULES: PATH_RULES,
    DELAY: DELAY,
  };
  return imageMap[type];
};

export const PREVENT_OPEN_RIGHTSIDEBAR = "prevent-right-sidebar-open";

export const SEND_EMAIL_CONSTANT = {
  TEMPLATE: "TEMPLATE",
  FROM: "FROM",
  TO: "TO",
  ISCCCHECKED: "ISCCCHECKED",
  CC: "CC",
  BCC: "BCC",
  SUBJECT: "SUBJECT",
  BODY: "BODY",
};
