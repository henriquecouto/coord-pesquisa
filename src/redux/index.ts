import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Reducers from "./index.ducks";
import Sagas from "./index.sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = createStore(Reducers(), applyMiddleware(...middleware));

sagaMiddleware.run(Sagas);
