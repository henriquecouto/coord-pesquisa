import { combineReducers } from "redux";
import { knowledgeAreasReducer } from "./knowledgeAreas/knowledgeAreas.ducks";
import { academicTitlesReducer } from "./academicTitles/academicTitles.ducks";
import { academicUnitsReducer } from "./academicUnits/academicUnits.ducks";
import { userReducer } from "./user/user.ducks";

const Reducers = () =>
  combineReducers({
    knowledgeAreasReducer,
    academicTitlesReducer,
    academicUnitsReducer,
    userReducer,
  });

export default Reducers;
