import KnowledgeArea from "../../entities/KnowledgeArea";

export default interface IKnowledgeAreaState {
  knowledgeAreas: Array<KnowledgeArea>;
  loading: boolean;
  error?: Error;
}
