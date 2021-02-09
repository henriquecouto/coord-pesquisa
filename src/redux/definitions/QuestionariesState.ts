import Questionary from "../../entities/Questionary";

export default interface IQuestionariesState {
  respondingQuestionary?: Questionary;
  respondingQuestionaryResponses?: any;
  questionaries?: Array<Questionary>;
  loading: boolean;
  error?: Error;
}
