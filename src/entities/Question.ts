class Question {
  public name!: string;
  public priority!: string;
  public questionary!: string;
  public subsection!: string;
  public type!: "select" | "number";
  public options?: { name: string; value: string };

  constructor(props: Question) {
    Object.assign(this, props);
  }
}

export default Question;
