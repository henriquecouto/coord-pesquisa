import AcademicUnit from "../../entities/AcademicUnit";

export default interface IAcademicUnitState {
  academicUnits: Array<AcademicUnit>;
  loading: boolean;
  error?: Error;
}
