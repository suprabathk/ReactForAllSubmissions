import {
  currentlyPreviewedQuestion,
  fieldAnswer,
  formField,
} from "../types/formTypes";

type addAnswerAction = {
  type: "add_answer";
  questionID: number;
  ans: string | string[];
};
type answerActions = addAnswerAction;

export function answerReducer(
  state: fieldAnswer[],
  action: answerActions
): fieldAnswer[] {
  switch (action.type) {
    case "add_answer":
      let newState = [...state];
      let alreadyAnswered = false;
      state.forEach((answer) => {
        if (answer.form_field === action.questionID) {
          alreadyAnswered = true;
          if (answer.value !== action.ans) {
            newState = state.map((answer) => ({
              ...answer,
              ans:
                answer.form_field === action.questionID
                  ? action.ans
                  : answer.value,
            }));
          }
        }
      });
      if (!alreadyAnswered) {
        newState = [
          ...newState,
          {
            form_field: action.questionID,
            value: action.ans,
          },
        ];
      }
      return newState;
  }
}

type updateQuestionKind = "next" | "prev";

type updateQuestion = {
  type: "update_question";
  kind: updateQuestionKind;
  getIndexQuestionCB: (index: number) => formField;
};

type questionActions = updateQuestion;

export function questionReducer(
  state: currentlyPreviewedQuestion,
  action: questionActions
): currentlyPreviewedQuestion {
  switch (action.type) {
    case "update_question":
      switch (action.kind) {
        case "next":
          return (
            state && {
              index: state.index + 1,
              currentQuestion: action.getIndexQuestionCB(state.index + 1),
            }
          );
        case "prev":
          return (
            state && {
              index: state.index - 1,
              currentQuestion: action.getIndexQuestionCB(state.index - 1),
            }
          );
      }
  }
}
