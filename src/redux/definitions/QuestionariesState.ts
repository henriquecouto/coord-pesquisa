import Questionary from "../../entities/Questionary";

export default interface IQuestionariesState {
  respondingQuestionary?: Questionary;
  questionaries?: Array<Questionary>;
  loading: boolean;
  error?: Error;
}
