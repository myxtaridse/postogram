import { applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { thunk } from "redux-thunk";
import { createStore } from "redux";

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = createStore(rootReducer, applyMiddleware(thunk));
