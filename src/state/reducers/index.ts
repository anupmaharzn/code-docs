import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";
const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

//type defination as RootState of structure of state inside the store
//ReturnType is utilty that define reture type
//<> angle bracket is used for type assertion or in genric type
export type RootState = ReturnType<typeof reducers>;
