// import { getBezierPath, Position } from "reactflow";
// import { PADDING } from "./config";
// type CustomSmoothStepT = {
//   sourceX: number;
//   sourceY: number;
//   sourcePosition: string;
//   target: any;
//   targetX: number;
//   targetY: number;
//   targetPosition: string;
//   borderRadius: number;
//   centerX: number;
//   centerY: number;
// };

// const bottomLeftCorner = (x: number, y: number, size: number) =>
//   `L ${x} ${y - size} Q ${x} ${y} ${x + size} ${y}`;
// const leftBottomCorner = (x: number, y: number, size: number) =>
//   `L ${x + size} ${y} Q ${x} ${y} ${x} ${y - size}`;
// const bottomRightCorner = (x: number, y: number, size: number) =>
//   `L ${x} ${y - size} Q ${x} ${y} ${x - size} ${y}`;
// const rightBottomCorner = (x: number, y: number, size: number) =>
//   `L ${x - size} ${y} Q ${x} ${y} ${x} ${y - size}`;
// const leftTopCorner = (x: number, y: number, size: number) =>
//   `L ${x + size} ${y} Q ${x} ${y} ${x} ${y + size}`;
// const topLeftCorner = (x: number, y: number, size: number) =>
//   `L ${x} ${y + size} Q ${x} ${y} ${x + size} ${y}`;
// const topRightCorner = (x: number, y: number, size: number) =>
//   `L ${x} ${y + size} Q ${x} ${y} ${x - size} ${y}`;
// const rightTopCorner = (x: number, y: number, size: number) =>
//   `L ${x - size} ${y} Q ${x} ${y} ${x} ${y + size}`;

// // Reference: https://github.com/wbkd/react-flow/issues/800
// export function getCustomSmoothStepPath({
//   sourceX,
//   sourceY,
//   sourcePosition = Position.Bottom,
//   target,
//   targetX,
//   targetY,
//   targetPosition = Position.Top,
//   borderRadius = 5,
//   centerX,
//   centerY,
// }: CustomSmoothStepT) {
//   const [_centerX, _centerY, offsetX, offsetY] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });
//   console.log(_centerX, _centerY, offsetX, offsetY);
//   const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
//   const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
//   const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
//   const leftAndRight = [Position.Left, Position.Right];
//   const cX = typeof centerX !== "undefined" ? centerX : _centerX;
//   const cY = typeof centerY !== "undefined" ? centerY : _centerY;

//   let firstCornerPath = null;
//   let secondCornerPath = null;

//   //   const padding = target === DUMMY_NODE_ID ? DUMMY_NODE_PADDING : PADDING;
//   const padding = PADDING;
//   const halfPadding = padding / 2;

//   let sourceHPadding = "";
//   let targetHPadding = "";

//   if (sourceX + padding <= targetX) {
//     firstCornerPath =
//       sourceY <= targetY
//         ? bottomLeftCorner(sourceX, cY, cornerSize)
//         : topLeftCorner(sourceX, cY, cornerSize);
//     secondCornerPath =
//       sourceY <= targetY
//         ? rightTopCorner(targetX, cY, cornerSize)
//         : rightBottomCorner(targetX, cY, cornerSize);
//   } else {
//     // here is the case specifically where new corners need introduced
//     firstCornerPath =
//       sourceY < targetY
//         ? bottomRightCorner(sourceX + halfPadding, cY, cornerSize)
//         : topRightCorner(sourceX + halfPadding, cY, cornerSize);
//     sourceHPadding = `${
//       sourceY <= targetY
//         ? rightTopCorner(sourceX + halfPadding, sourceY, cornerSize)
//         : rightBottomCorner(sourceX + halfPadding, sourceY, cornerSize)
//     }`;
//     secondCornerPath =
//       sourceY < targetY
//         ? leftTopCorner(targetX - halfPadding, cY, cornerSize)
//         : leftBottomCorner(targetX - halfPadding, cY, cornerSize);
//     targetHPadding = `${
//       sourceY < targetY
//         ? bottomLeftCorner(targetX - halfPadding, targetY, cornerSize)
//         : topLeftCorner(targetX - halfPadding, targetY, cornerSize)
//     }`;
//   }

//   if (
//     leftAndRight.includes(sourcePosition) &&
//     leftAndRight.includes(targetPosition)
//   ) {
//     if (sourceX + padding <= targetX) {
//       firstCornerPath =
//         sourceY <= targetY
//           ? rightTopCorner(cX, sourceY, cornerSize)
//           : rightBottomCorner(cX, sourceY, cornerSize);
//       secondCornerPath =
//         sourceY <= targetY
//           ? bottomLeftCorner(cX, targetY, cornerSize)
//           : topLeftCorner(cX, targetY, cornerSize);
//     }
//   } else if (
//     leftAndRight.includes(sourcePosition) &&
//     !leftAndRight.includes(targetPosition)
//   ) {
//     if (sourceX + padding <= targetX) {
//       firstCornerPath =
//         sourceY <= targetY
//           ? rightTopCorner(targetX, sourceY, cornerSize)
//           : rightBottomCorner(targetX, sourceY, cornerSize);
//     } else {
//       firstCornerPath =
//         sourceY <= targetY
//           ? bottomRightCorner(sourceX, targetY, cornerSize)
//           : topRightCorner(sourceX, targetY, cornerSize);
//     }
//     secondCornerPath = "";
//   } else if (
//     !leftAndRight.includes(sourcePosition) &&
//     leftAndRight.includes(targetPosition)
//   ) {
//     if (sourceX + padding <= targetX) {
//       firstCornerPath =
//         sourceY <= targetY
//           ? bottomLeftCorner(sourceX, targetY, cornerSize)
//           : topLeftCorner(sourceX, targetY, cornerSize);
//     } else {
//       firstCornerPath =
//         sourceY <= targetY
//           ? bottomRightCorner(sourceX, targetY, cornerSize)
//           : topRightCorner(sourceX, targetY, cornerSize);
//     }
//     secondCornerPath = "";
//   }

//   return `M ${sourceX} ${sourceY} ${sourceHPadding} ${firstCornerPath} ${secondCornerPath} ${targetHPadding} L ${targetX} ${targetY}`;
// }
