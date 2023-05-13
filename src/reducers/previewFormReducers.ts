import { fieldAnswer, formField } from "../types/formTypes";

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
        if (answer.id === action.questionID) {
          alreadyAnswered = true;
          if (answer.ans !== action.ans) {
            newState = state.map((answer) => ({
              ...answer,
              ans: answer.id === action.questionID ? action.ans : answer.ans,
            }));
          }
        }
      });
      if (!alreadyAnswered) {
        newState = [
          ...newState,
          {
            id: action.questionID,
            ans: action.ans,
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
  index: number;
  setCurrentIndexCB: (index: number) => void;
  getIndexQuestionCB: (index: number) => formField;
};

type questionActions = updateQuestion;

export function questionReducer(
  state: formField,
  action: questionActions
): formField {
  switch (action.type) {
    case "update_question":
      switch (action.kind) {
        case "next":
          action.setCurrentIndexCB(action.index + 1);
          return action.getIndexQuestionCB(action.index + 1);
        case "prev":
          action.setCurrentIndexCB(action.index - 1);
          return action.getIndexQuestionCB(action.index - 1);
      }
  }
}
