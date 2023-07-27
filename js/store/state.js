export const defaultState = {
  teams: [],
  location: null,
  winner: null,
  categories: [],
  question: {
    question: null,
    answer: null,
    value: null,
  },
  setup: {
    questions: 3,
    teams: 2,
  },
  answeredQuestions: [],
  selectedBox: null,
};

export default {
  ...defaultState,
};
