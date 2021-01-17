import IAcademicTitleState from "./AcademicTitleState";
import IKnowledgeAreaState from "./KnowledgeAreaState";

export default interface IGlobalState {
  knowledgeAreasReducer: IKnowledgeAreaState;
  academicTitlesReducer: IAcademicTitleState;
}
