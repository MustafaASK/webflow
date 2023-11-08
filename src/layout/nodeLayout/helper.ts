export default function handleGhostModule(evt: any) {
  // @ts-ignore
  let cl = this.cloneNode(true);
  // @ts-ignore
  cl.style.backgroundColor = "rgb(255, 253, 249)";
  // @ts-ignore
  cl.style.border = "1px solid rgb(215, 213, 210)";
  // @ts-ignore
  cl.style.width = "158px";
  // @ts-ignore
  cl.style.borderRadius = "5px";
  // @ts-ignore
  cl.style.height = "30px";
  // @ts-ignore
  cl.style.position = "absolute";
  // @ts-ignore
  cl.style.left = "1000px";
  // @ts-ignore
  cl.style.overflow = "hidden";
  // @ts-ignore
  cl.style.padding = "5px";
  // @ts-ignore
  cl.style.fontWeight = 500;
  // @ts-ignore
  cl.style.fontSize = "12px";
  cl.style.display = "flex";
  // @ts-ignore
  cl.removeChild(cl?.getElementsByClassName("node-container-right")[0]);
  // cl.removeChild(cl?.getElementsByClassName("node-container-middle")[0]);

  let leftContainer = cl.getElementsByClassName("node-container-left")[0];
  let isLeftContainerOutbound = !!cl.getElementsByClassName(
    "node-container-left OUTBOUND"
  )[0];
  let isLeftContainerOutInbound = !!cl.getElementsByClassName(
    "node-container-left INBOUND"
  )[0];
  let isLeftContainerWrite = !!cl.getElementsByClassName(
    "node-container-left WRITE_TO_DB"
  )[0];
  let isLeftContainerEnd = !!cl.getElementsByClassName(
    "node-container-left END"
  )[0];
  let isLeftContainerWait = !!cl.getElementsByClassName(
    "node-container-left WAIT"
  )[0];
  if (leftContainer.getElementsByClassName("node-container-left-error")?.[0]) {
    leftContainer.removeChild(
      leftContainer.getElementsByClassName("node-container-left-error")[0]
    );
  }

  leftContainer.style.width = "30px";
  leftContainer.style.height = "30px";
  leftContainer.style.display = "flex";
  leftContainer.style.alignItems = "center";
  leftContainer.style.justifyContent = "center";
  leftContainer.style.marginRight = "5px";
  leftContainer.style.borderRadius = "5px";
  if (isLeftContainerOutbound) {
    leftContainer.style.backgroundColor = "#3084f2";
  }
  if (isLeftContainerOutInbound) {
    leftContainer.style.backgroundColor = "#f2b749";
  }
  if (isLeftContainerWrite) {
    leftContainer.style.backgroundColor = "#9896d9";
  }
  if (isLeftContainerEnd) {
    leftContainer.style.backgroundColor = "#d96d55";
  }
  if (isLeftContainerWait) {
    leftContainer.style.backgroundColor = "#000";
  }

  const getImage = leftContainer.getElementsByTagName("img")[0];
  if (getImage) {
    getImage.style.width = "15px";
    getImage.style.height = "15px";
  }
  let hoveredIcon = cl?.getElementsByClassName("node-container-hover-icon")[0];
  if (hoveredIcon) {
    cl.removeChild(hoveredIcon);
  }

  document.getElementsByTagName("body")[0].appendChild(cl);
  // @ts-ignore
  evt.dataTransfer.setDragImage(cl, 0, 0);
  window.setTimeout(function () {
    // @ts-ignore
    cl.parentNode.removeChild(cl);
  }, 1000);
}
