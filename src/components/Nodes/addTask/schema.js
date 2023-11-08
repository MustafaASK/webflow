import * as yup from "yup";

export const addTaskSchema = yup.object({
  title: yup.string().required("please add text"),
  type: yup.string().required("please select type"),
  priority: yup.string().required("please select priority"),
  assignedTo: yup.string().required("please select Assigned to"),
  //   dueData = "",
  notes: yup.string().required("please add notes"),
});
