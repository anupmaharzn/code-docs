import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";
export const useActions = () => {
  const dispatch = useDispatch();
  //to avoid rerendering
  //only render(recalcuate) when dispatch changes otherwise do nothing just return prev calc value
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

// how to use it
// use case example
// const {updateCell}  = useActions();

// updateCell(asdfasdf);
