import AcademicTitle from "../../entities/AcademicTitle";

export default interface IAcademicTitleState {
  academicTitles: Array<AcademicTitle>;
  loading: boolean;
  error?: Error;
}
