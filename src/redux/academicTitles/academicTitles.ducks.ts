import { createActions, createReducer } from "reduxsauce";
import AcademicTitle from "../../entities/AcademicTitle";
import IAcademicTitleState from "../definitions/AcademicTitleState";

export const {
  Types: AcademicTitlesTypes,
  Creators: AcademicTitlesActions,
} = createActions({
  getAcademicTitlesRequested: [],
  getAcademicTitlesSucceeded: ["academicTitles"],
  getAcademicTitlesFailed: ["error"],
});

export const INITIAL_STATE: IAcademicTitleState = {
  academicTitles: [],
  loading: false,
  error: undefined,
};

const requested = (state: IAcademicTitleState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IAcademicTitleState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const getAcademicTitlesSucceeded = (
  state: IAcademicTitleState,
  { academicTitles }: { academicTitles: Array<AcademicTitle> }
) => {
  return { ...state, loading: false, academicTitles };
};

export const academicTitlesReducer = createReducer(INITIAL_STATE, {
  [AcademicTitlesTypes.GET_ACADEMIC_TITLES_REQUESTED]: requested,
  [AcademicTitlesTypes.GET_ACADEMIC_TITLES_FAILED]: failed,
  [AcademicTitlesTypes.GET_ACADEMIC_TITLES_SUCCEEDED]: getAcademicTitlesSucceeded,
});
