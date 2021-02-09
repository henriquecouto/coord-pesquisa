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

  getQuestionaryByIdRequested: ["id"],
  getQuestionaryByIdSucceeded: ["questionary"],
  getQuestionaryByIdFailed: ["error"],

  getQuestionaryResponsesRequested: ["id"],
  getQuestionaryResponsesSucceeded: ["responses"],
  getQuestionaryResponsesFailed: ["error"],

  replyQuestionaryRequested: ["id", "replies"],
  replyQuestionaryFailed: ["error"],
});

export const INITIAL_STATE: IQuestionariesState = {
  respondingQuestionary: undefined,
  respondingQuestionaryResponses: undefined,
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

const getAllSucceeded = (
  state: IQuestionariesState,
  { questionaries }: { questionaries: Array<Questionary> }
) => {
  return { ...state, loading: false, questionaries };
};

const getResponsesSucceeded = (
  state: IQuestionariesState,
  { responses }: { responses: any }
) => {
  return {
    ...state,
    loading: false,
    respondingQuestionaryResponses: responses,
  };
};

const getByIdSucceeded = (
  state: IQuestionariesState,
  { questionary }: { questionary: Questionary }
) => {
  return { ...state, loading: false, respondingQuestionary: questionary };
};

export const questionariesReducer = createReducer(INITIAL_STATE, {
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_REQUESTED]: requested,
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_FAILED]: failed,
  [QuestionariesTypes.GET_ALL_QUESTIONARIES_SUCCEEDED]: getAllSucceeded,

  [QuestionariesTypes.GET_QUESTIONARY_BY_ID_REQUESTED]: requested,
  [QuestionariesTypes.GET_QUESTIONARY_BY_ID_FAILED]: failed,
  [QuestionariesTypes.GET_QUESTIONARY_BY_ID_SUCCEEDED]: getByIdSucceeded,

  [QuestionariesTypes.GET_QUESTIONARY_RESPONSES_REQUESTED]: requested,
  [QuestionariesTypes.GET_QUESTIONARY_RESPONSES_FAILED]: failed,
  [QuestionariesTypes.GET_QUESTIONARY_RESPONSES_SUCCEEDED]: getResponsesSucceeded,

  [QuestionariesTypes.REPLY_QUESTIONARY_REQUESTED]: requested,
  [QuestionariesTypes.REPLY_QUESTIONARY_FAILED]: failed,
});
