import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionaryForm from "../../components/QuestionaryForm";
import IGlobalState from "../../redux/definitions/GlobalState";
import { QuestionariesActions } from "../../redux/questionaries/questionaries.ducks";

interface IQuestionaryParams {
  questionaryId: string;
}

const Questionary: React.FC = () => {
  const dispatch = useDispatch();
  const { questionaryId } = useParams<IQuestionaryParams>();
  const {
    respondingQuestionary,
    respondingQuestionaryResponses,
    loading,
  } = useSelector((state: IGlobalState) => state.questionariesReducer);

  useEffect(() => {
    dispatch(QuestionariesActions.getQuestionaryByIdRequested(questionaryId));
    dispatch(
      QuestionariesActions.getQuestionaryResponsesRequested(questionaryId)
    );
  }, [dispatch, questionaryId]);

  const onSubmit = (data: any) => {
    dispatch(
      QuestionariesActions.replyQuestionaryRequested(questionaryId, data)
    );
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <QuestionaryForm
      onSubmit={onSubmit}
      respondingQuestionary={respondingQuestionary}
      respondingQuestionaryResponses={respondingQuestionaryResponses}
    />
  );
};

export default Questionary;
