import Course from "./Course";

class AcademicUnit {
  public readonly name!: string;
  public readonly id!: string;
  public courses?: Array<Course>;

  constructor(props: AcademicUnit) {
    Object.assign(this, props);
  }
}

export default AcademicUnit;
