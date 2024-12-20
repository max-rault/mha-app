import { createStore, combineReducers, applyMiddleware } from "redux";

import { thunk } from 'redux-thunk';
import staffReducer from './staffReducer';
import requestsReducer from "./requestsReducer";
import statsReducer from "./statsReducer";
import mqttReducer from "./mqttReducer";

const rootReducers = combineReducers(
    {
      staff: staffReducer,
      requests: requestsReducer,
      stats: statsReducer,
      mqtt: mqttReducer
    }
);

const configureStore = () =>{
  return createStore(rootReducers, applyMiddleware(thunk));
}

export default configureStore;