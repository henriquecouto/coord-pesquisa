class Route {
  public name!: string;
  public path!: string;
  public icon?: any;
  public showInHeader?: boolean;

  constructor(props: Route) {
    Object.assign(this, props);
  }
}

export default Route;
