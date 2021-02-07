import { createActions, createReducer } from "reduxsauce";
import Questionary from "../../entities/Questionary";
import IQuestionariesState from "../definitions/QuestionariesState";

export const {
  Types: QuestionariesTypes,
  Creators: QuestionariesActions,
} = createActions({
  getAllQuestionariesRequested: [],
  getAllQuestionariesSucceeded: ["questionaries"],
  getAllQuestionariesFailed: ["error"],
});

export const INITIAL_STATE: IQuestionariesState = {
  questionaries: [],
  loading: false,
  error: undefined,
};

const requested = (state: IQuestionariesState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IQuestionariesState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const succeeded = (
  state: IQuestionariesState,
  { questionaries }: { questionaries: Array<Questionary> }
) => {
  return { ...state, loading: false, questionaries };
};

export const questionariesReducer = createReducer(INITIAL_STATE, {
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_REQUESTED]: requested,
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_FAILED]: failed,
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_SUCCEEDED]: succeeded,
});
