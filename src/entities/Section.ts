import Subsection from "./Subsection";

class Section {
  public id!: string;
  public name!: string;
  public priority!: string;
  public questionary!: string;
  public subsections?: Array<Subsection>;

  constructor(props: Section) {
    Object.assign(this, props);
  }
}

export default Section;
