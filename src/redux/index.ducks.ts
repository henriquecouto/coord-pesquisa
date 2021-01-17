import { combineReducers } from "redux";
import { knowledgeAreasReducer } from "./knowledgeAreas/knowledgeAreas.ducks";
import { academicTitlesReducer } from "./academicTitles/academicTitles.ducks";
import { academicUnitsReducer } from "./academicUnits/academicUnits.ducks";

const Reducers = () =>
  combineReducers({
    knowledgeAreasReducer,
    academicTitlesReducer,
    academicUnitsReducer,
  });

export default Reducers;
