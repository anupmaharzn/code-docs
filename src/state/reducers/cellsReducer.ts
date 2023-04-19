import { produce } from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

type CellsState = {
  loading: boolean;
  error: string | null;
  order: string[]; //collection of cell id string
  data: {
    [key: string]: Cell; //key:cellid value=>Cell interface {id,content,type}
  };
};

const initalState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
//use of immer + redux
const reducer = produce((state: CellsState = initalState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      //update the content
      state.data[id].content = content;
      return state;

    case ActionType.DELETE_CELL:
      //delete form data
      delete state.data[action.payload];
      //delete from order
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      //find out the index of particular action.payload.id
      const index = state.order.findIndex((id) => id === action.payload.id);
      //if direction is up then this otherwise that index + 1
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      //if outside the array bound =>  return
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      //simple swap logic
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;

    case ActionType.INSERT_CELL_AFTER:
      //create new cell
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };
      //add to data key:value
      state.data[cell.id] = cell;
      //find the index of action.payload.id(to insert before this particular id)
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      //if not found id === null
      //push it to first of the order array
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        //add after foundIndex(splice le agadi nai insert garxa its default behaviour)
        //so foundindex + 1 garnu parxa for after
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return state;
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
