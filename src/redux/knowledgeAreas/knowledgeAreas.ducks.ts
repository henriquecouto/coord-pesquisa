import { createActions, createReducer } from "reduxsauce";
import KnowledgeArea from "../../entities/KnowledgeArea";
import IKnowledgeAreaState from "../definitions/KnowledgeAreaState";

export const {
  Types: KnowledgeAreasTypes,
  Creators: KnowledgeAreasActions,
} = createActions({
  getKnowledgeAreasRequested: [],
  getKnowledgeAreasSucceeded: ["knowledgeAreas"],
  getKnowledgeAreasFailed: ["error"],
});

export const INITIAL_STATE: IKnowledgeAreaState = {
  knowledgeAreas: [],
  loading: false,
  error: undefined,
};

const requested = (state: IKnowledgeAreaState) => {
  return { ...state, loading: true, error: undefined };
};

const failed = (state: IKnowledgeAreaState, { error }: { error: Error }) => {
  return { ...state, loading: false, error };
};

const getKnowledgeAreasSucceeded = (
  state: IKnowledgeAreaState,
  { knowledgeAreas }: { knowledgeAreas: Array<KnowledgeArea> }
) => {
  return { ...state, loading: false, knowledgeAreas };
};

export const knowledgeAreasReducer = createReducer(INITIAL_STATE, {
  [KnowledgeAreasTypes.GET_KNOWLEDGE_AREAS_REQUESTED]: requested,
  [KnowledgeAreasTypes.GET_KNOWLEDGE_AREAS_FAILED]: failed,
  [KnowledgeAreasTypes.GET_KNOWLEDGE_AREAS_SUCCEEDED]: getKnowledgeAreasSucceeded,
});
