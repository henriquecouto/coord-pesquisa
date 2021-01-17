import KnowledgeArea from "../entities/KnowledgeArea";

const collectAllKnowledgeAreas = (data: any): Array<KnowledgeArea> => {
  const validAreas: Array<any> = data.map(
    (masterArea: any) => masterArea.areas
  );
  return validAreas.flat();
};

export default collectAllKnowledgeAreas;
