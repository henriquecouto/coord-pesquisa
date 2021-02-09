import { combineReducers } from "redux";
import { knowledgeAreasReducer } from "./knowledgeAreas/knowledgeAreas.ducks";
import { academicTitlesReducer } from "./academicTitles/academicTitles.ducks";
import { academicUnitsReducer } from "./academicUnits/academicUnits.ducks";
import { userReducer } from "./user/user.ducks";
import { questionariesReducer } from "./questionaries/questionaries.ducks";

const Reducers = () =>
  combineReducers({
    knowledgeAreasReducer,
    academicTitlesReducer,
    academicUnitsReducer,
    userReducer,
    questionariesReducer,
  });

export default Reducers;
