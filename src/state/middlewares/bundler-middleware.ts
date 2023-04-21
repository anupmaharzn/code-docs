const foo = 123;
export default foo;
// import { Middleware } from "./middleware";
// import { ActionType } from "../action-types";
// import bundle from "../../bundler";
// //this middlerware is wiredup in store.ts
// //so any action that is dispatch will go thru
// //this middleware now
// let timer: any;

// export const bundlerMiddleware: Middleware = (store) => {
//   return (next) => {
//     return (action) => {
//       //next pass action  to next middlerware if any
//       //if not pass down to reducer
//       next(action);

//       if (action.type !== ActionType.UPDATE_CELL) {
//         return;
//       }
//       //getstate we have either cells or bundles
//       const { cells } = store.getState();
//       //cell ko data property maa cell(text,code) ko inforamtion extract
//       //as we know cell contain type code or text
//       const cell = cells?.data[action.payload.id];
//       //if cell is text then return
//       if (cell?.type === "text") {
//         return;
//       }
//       clearTimeout(timer);
//       //after filtering out for code cell updates only in above

//       timer = setTimeout(async () => {
//         console.log("starting bundling");
//         store.dispatch({
//           type: ActionType.BUNDLE_START,
//           payload: {
//             cellId: action.payload.id,
//           },
//         });
//         //send code for bundling
//         const result = await bundle(action.payload.content);
//         store.dispatch({
//           type: ActionType.BUNDLE_COMPELTE,
//           payload: {
//             bundle: result,
//             cellId: action.payload.id,
//           },
//         });
//         console.log("dispatched bundle completed");
//       }, 1000);
//     };
//   };
// };
