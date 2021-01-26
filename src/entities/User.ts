import AcademicTitle from "./AcademicTitle";
import AcademicUnit from "./AcademicUnit";
import Course from "./Course";
import KnowledgeArea from "./KnowledgeArea";

class User {
  public fullName!: string;
  public siape!: string;
  public lattes!: string;
  public knowledgeArea!: KnowledgeArea;
  public academicTitle!: AcademicTitle;
  public academicUnit!: AcademicUnit;
  public course!: Course;
  public email!: string;
  public picture!: string;

  constructor(props: Omit<User, "password">) {
    Object.assign(this, props);
  }
}

export default User;
