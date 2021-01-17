class Course {
  public readonly name!: string;

  constructor(props: Course) {
    Object.assign(this, props);
  }
}

export default Course;
