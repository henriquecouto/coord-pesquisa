import AcademicTitle from "../entities/AcademicTitle";

export default function academicTitleAdapter(data: any): AcademicTitle {
  return new AcademicTitle({
    id: data.id,
    name: data.nome,
  });
}
