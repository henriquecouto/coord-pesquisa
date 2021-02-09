import IAcademicTitleState from "./AcademicTitleState";
import IAcademicUnitState from "./AcademicUnitState";
import IKnowledgeAreaState from "./KnowledgeAreaState";
import IQuestionariesState from "./QuestionariesState";
import IUserState from "./UserState";

export default interface IGlobalState {
  knowledgeAreasReducer: IKnowledgeAreaState;
  academicTitlesReducer: IAcademicTitleState;
  academicUnitsReducer: IAcademicUnitState;
  userReducer: IUserState;
  questionariesReducer: IQuestionariesState;
}
