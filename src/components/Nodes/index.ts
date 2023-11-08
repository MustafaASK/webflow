import Action from "./action";
import Delay from "./delay";
import EmptyPathBranch from "./emptyPathBranch";
import Path from "./path";
import PathBranch from "./pathBranch";
import PathRules from "./pathRules";
import Trigger from "./trigger";
import AddStepNode from "./addStepNode";

import SendEmail from "./sendEmail";
import SendText from "./sendText";
import AddTask from "./addTask";
import EndAutomation from "./endAutomation";
import SendSurvey from "./sendSurvey";
import SendNotification from "./sendNotification";
import UpdateCandidate from "./updateCandidate";
import Questionnaire from "./questionnaire";
import AddNote from "./addNote";
import { NODE_TYPES } from "../../constant/nodeTypes";
const nodeTypes = {
  [NODE_TYPES.ACTION]: Action,
  [NODE_TYPES.DELAY]: Delay,
  [NODE_TYPES.EMPTY_PATH_BRANCH]: EmptyPathBranch,
  [NODE_TYPES.PATH]: Path,
  [NODE_TYPES.PATH_BRANCH]: PathBranch,
  [NODE_TYPES.PATH_RULES]: PathRules,
  [NODE_TYPES.TRIGGER]: Trigger,
  [NODE_TYPES.ADD_STEP_NODE]: AddStepNode,
  [NODE_TYPES.SEND_EMAIL]: SendEmail,
  [NODE_TYPES.SEND_TEXT]: SendText,
  [NODE_TYPES.ADD_NOTE]: AddNote,
  [NODE_TYPES.ADD_TASK]: AddTask,
  [NODE_TYPES.END_AUTOMATION]: EndAutomation,
  [NODE_TYPES.SEND_FORM]: SendSurvey,
  [NODE_TYPES.SEND_NOTIFICATION]: SendNotification,
  [NODE_TYPES.UPDATE_CANDIDATE]: UpdateCandidate,
  [NODE_TYPES.QUESTIONNAIRE]: Questionnaire,
};
export default nodeTypes;
