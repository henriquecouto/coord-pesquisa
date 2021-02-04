class ShortBio {
  public researchGate?: string;
  public orcid?: string;
  public resume?: string;
  public publications?: Array<{ value: string }>;
  public education?: Array<{ value: string }>;

  constructor(props: ShortBio) {
    Object.assign(this, props);
  }
}

export default ShortBio;
