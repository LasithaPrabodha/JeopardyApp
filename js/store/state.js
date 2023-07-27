export const defaultState = {
  teams: [],
  location: null,
  categories: [],
  setup: {
    questions: 3,
    teams: 2,
  },

  // reset
  winner: null,
  answeredQuestions: [],
  selectedBox: null,
  question: {
    question: null,
    answer: null,
    value: null,
  },
};

export default {
  ...defaultState,
};
