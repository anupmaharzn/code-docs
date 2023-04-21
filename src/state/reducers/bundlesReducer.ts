import { produce } from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  //this is object
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined; //key cell id - value {respective code ,err(if any) of that bundled code}
}

const initalState: BundleState = {};

const reducer = produce(
  (state: BundleState = initalState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case ActionType.BUNDLE_COMPELTE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
