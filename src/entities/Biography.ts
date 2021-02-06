import ShortBio from "./ShortBio";
import User from "./User";

class Biography {
  public personalData!: User;
  public academicData!: ShortBio;

  constructor(props: Biography) {
    Object.assign(this, props);
  }
}

export default Biography;
