import { createActions, createReducer } from "reduxsauce";
import AcademicUnit from "../../entities/AcademicUnit";
import IAcademicUnitState from "../definitions/AcademicUnitState";

export const {
  Types: AcademicUnitsTypes,
  Creators: AcademicUnitsActions,
} = createActions({
  getAcademicUnitsRequested: [],
  getAcademicUnitsSucceeded: ["academicUnits"],
  getAcademicUnitsFailed: ["error"],
});

export const INITIAL_STATE: IAcademicUnitState = {
  academicUnits: [],
  loading: false,
  error: undefined,
};

const requested = (state: IAcademicUnitState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IAcademicUnitState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const getAcademicUnitsSucceeded = (
  state: IAcademicUnitState,
  { academicUnits }: { academicUnits: Array<AcademicUnit> }
) => {
  return { ...state, loading: false, academicUnits };
};

export const academicUnitsReducer = createReducer(INITIAL_STATE, {
  [AcademicUnitsTypes.GET_ACADEMIC_UNITS_REQUESTED]: requested,
  [AcademicUnitsTypes.GET_ACADEMIC_UNITS_FAILED]: failed,
  [AcademicUnitsTypes.GET_ACADEMIC_UNITS_SUCCEEDED]: getAcademicUnitsSucceeded,
});
