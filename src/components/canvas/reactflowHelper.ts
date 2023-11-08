const JOURNEY_BUILDER_CLASS_NAME = ".journey-builder-app-container";

export const getCanvasPostions = () => {
  let jbAppConatiner;
  if (typeof window !== "undefined") {
    jbAppConatiner = document?.querySelector(JOURNEY_BUILDER_CLASS_NAME);
  }
  return jbAppConatiner?.getBoundingClientRect();
};

export const getDropPosition = (event: any) => {
  const { clientX, clientY } = event || {};
  const appPosition = getCanvasPostions();
  const { left, top } = appPosition || {};
  let leftPosition = clientX;
  let topPosition = clientY;
  if (left) {
    leftPosition -= left;
  }
  if (top) {
    topPosition -= top;
  }
  return {
    leftPosition,
    topPosition,
  };
};
