class KnowledgeArea {
  public readonly name!: string;
  public readonly code!: string;
  public children?: KnowledgeArea;

  constructor(props: KnowledgeArea) {
    Object.assign(this, props);
  }
}

export default KnowledgeArea;
