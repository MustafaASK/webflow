import * as yup from "yup";

export const sendEmailSchema = yup.object({
  template: yup.string().required("please select template"),
  from: yup
    .object()
    .test("oneOfRequired", "Please select from field", function (item) {
      return item?.title;
    }),
  cc: yup.array().test("oneOfRequired", "Please select cc", function (item) {
    return item?.length;
  }),
  bcc: yup.array().test("oneOfRequired", "Please select bcc", function (item) {
    return item?.length;
  }),
  subject: yup.string().required("please add subject"),
  body: yup.string().test("oneOfRequired", "Please add body", function (item) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(item, "text/html");
    let isTextPresent = !!dom?.body?.textContent?.trim()?.length;
    return isTextPresent;
  }),
});
