import Questionary from "../../entities/Questionary";

export default interface IQuestionariesState {
  questionaries?: Array<Questionary>;
  loading: boolean;
  error?: Error;
}
