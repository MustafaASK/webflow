import * as yup from "yup";

export const delaySchema = yup.object({
  days: yup.string().required("please add days"),
  type: yup.string().required("please select type"),
});
