import KnowledgeArea from "../entities/KnowledgeArea";

export default function knowledgeAreaAdapter(data: any): KnowledgeArea {
  return new KnowledgeArea({
    name: data.nome,
    code: data.codigo,
  });
}
