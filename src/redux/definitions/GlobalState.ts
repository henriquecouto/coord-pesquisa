import IAcademicTitleState from "./AcademicTitleState";
import IAcademicUnitState from "./AcademicUnitState";
import IKnowledgeAreaState from "./KnowledgeAreaState";

export default interface IGlobalState {
  knowledgeAreasReducer: IKnowledgeAreaState;
  academicTitlesReducer: IAcademicTitleState;
  academicUnitsReducer: IAcademicUnitState;
}
