import { addNodeSchema } from "../Nodes/addNote/schema";
import { addTaskSchema } from "../Nodes/addTask/schema";
import { sendEmailSchema } from "../Nodes/sendEmail/schema";
import { delaySchema } from "../Nodes/delay/schema";

export const validateAddNoteWrapper = (nodeX: any) => {
  try {
    addNodeSchema.validateSync(nodeX?.data?.payload);
  } catch (err) {
    return {
      id: nodeX?.id,
      // @ts-ignore
      errors: {
        // @ts-ignore
        addNote: err?.errors,
      },
    };
  }
};

export const validateAddTaskWrapper = (nodeX: any) => {
  try {
    addTaskSchema.validateSync(nodeX?.data?.payload, { abortEarly: false });
  } catch (err) {
    // @ts-ignore
    let errorObject = err?.inner?.reduce((acc, current) => {
      acc[current?.path] = current?.message;
      return acc;
    }, {});
    return {
      id: nodeX?.id,
      // @ts-ignore
      errors: errorObject,
    };
  }
};

export const validateSendEmailWrapper = (nodeX: any) => {
  try {
    sendEmailSchema.validateSync(nodeX?.data?.payload, { abortEarly: false });
  } catch (err) {
    // @ts-ignore
    let errorObject = err?.inner?.reduce((acc, current) => {
      acc[current?.path] = current?.message;
      return acc;
    }, {});
    if (errorObject && !nodeX?.data?.payload?.isCCChecked) {
      delete errorObject.cc;
      delete errorObject.bcc;
    }
    if (
      typeof errorObject === "object" &&
      Object.keys(errorObject).length === 0
    ) {
      errorObject = undefined;
    }
    return {
      id: nodeX?.id,
      // @ts-ignore
      errors: errorObject,
    };
  }
};

export const validateDelayNode = (nodeX: any) => {
  try {
    delaySchema.validateSync(nodeX?.data?.payload, { abortEarly: false });
  } catch (err) {
    // @ts-ignore
    let errorObject = err?.inner?.reduce((acc, current) => {
      acc[current?.path] = current?.message;
      return acc;
    }, {});
    return {
      id: nodeX?.id,
      // @ts-ignore
      errors: errorObject,
    };
  }
};
