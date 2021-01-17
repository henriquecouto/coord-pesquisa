import { combineReducers } from "redux";
import { knowledgeAreasReducer } from "./knowledgeAreas/knowledgeAreas.ducks";
import { academicTitlesReducer } from "./academicTitles/academicTitles.ducks";

const Reducers = () =>
  combineReducers({ knowledgeAreasReducer, academicTitlesReducer });

export default Reducers;
