import * as yup from "yup";

export const addNodeSchema = yup.object({
  text: yup.string().required("please add note"),
});
