import Section from "./Section";

class Questionary {
  public id!: string;
  public name!: string;
  public description!: string;
  public sections?: Array<Section>;

  constructor(props: Questionary) {
    Object.assign(this, props);
  }
}

export default Questionary;
