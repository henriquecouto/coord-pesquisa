import AcademicUnit from "../entities/AcademicUnit";
import Course from "../entities/Course";

export default function academicUnitAdapter(data: any): AcademicUnit {
  return new AcademicUnit({
    id: data.id,
    name: data.nome,
    courses: data.cursos.map(
      (course: any) => new Course({ name: course.nome })
    ),
  });
}
