import { combineReducers } from "redux";
import { knowledgeAreasReducer } from "./knowledgeAreas/knowledgeAreas.ducks";

const Reducers = () => combineReducers({ knowledgeAreasReducer });

export default Reducers;
