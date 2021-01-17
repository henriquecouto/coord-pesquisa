class AcademicTitle {
  public readonly name!: string;
  public readonly id!: number;

  constructor(props: AcademicTitle) {
    Object.assign(this, props);
  }
}

export default AcademicTitle;
