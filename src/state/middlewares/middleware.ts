const foo = 123;
export default foo;
// import { RootState } from "../reducers";
// import { Action } from "../actions";

// //advance typescript stuff lol
// //generic type def for our redux middleware typecheking
// interface MiddlewareAPI<S, A> {
//   getState(): S;
//   dispatch(action: A): void;
// }

// interface _Middleware<S, A> {
//   (api: MiddlewareAPI<S, A>): (
//     next: (action: A) => void
//   ) => (action: A) => void;
// }

// export type Middleware = _Middleware<RootState, Action>;
