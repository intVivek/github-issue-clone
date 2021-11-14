import { createStore } from "redux";
import repoReducer from './reducer/index';

const store = createStore(
  repoReducer,
);

export default store;