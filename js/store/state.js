export const defaultState = {
  teams: [],
  categories: [],
  setup: {
    questions: 3,
    teams: 2,
  },

  selectedSpeaker: 0,

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
