import { v4 as uuidv4 } from "uuid";
import SEND_NOTIFICATION from "../assets/img/bell.svg";
import SEND_EMAIL from "../assets/img/email.svg";
import SEND_TEXT from "../assets/img/chat.svg";
import ADD_WAIT from "../assets/img/stopwatch.svg";
import SEND_FORM from "../assets/img/survey.svg";
import ADD_NOTE from "../assets/img/note.svg";
import ADD_TASK from "../assets/img/tick.svg";
import UPDATE_CANDIDATE from "../assets/img/candidate.svg";
import END_AUTOMATION from "../assets/img/hexagon-fill.svg";
import TRIGGER from "../assets/img/trigger.svg";
import PATH from "../assets/img/path.png";
import PATH_RULES from "../assets/img/path.png";
import DELAY from "../assets/img/delay.svg";
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
