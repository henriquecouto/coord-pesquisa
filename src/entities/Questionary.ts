class Questionary {
  public id!: string;
  public name!: string;
  public description!: string;

  constructor(props: Questionary) {
    Object.assign(this, props);
  }
}

export default Questionary;
