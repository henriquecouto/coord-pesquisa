import Question from "./Question";

class Subsection {
  public id!: string;
  public name!: string;
  public priority!: string;
  public questionary!: string;
  public section!: string;
  public questions?: Array<Question>;

  constructor(props: Subsection) {
    Object.assign(this, props);
  }
}

export default Subsection;
