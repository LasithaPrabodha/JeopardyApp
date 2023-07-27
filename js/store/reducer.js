import { defaultState } from "./state.js";

export default {
  setTeams(state, payload) {
    state.teams = payload;

    return state;
  },
  setQuestionsCount(state, payload) {
    state.setup.questions = payload;
    return state;
  },
  setLocation(state, payload) {
    state.location = payload;

    return state;
  },
  setWinner(state, payload) {
    const winner = state.teams.reduce((prev, current) => (+prev.score > +current.score ? prev : current), {});

    state.winner = winner;

    return state;
  },
  setCategories(state, payload) {
    state.categories = payload;

    return state;
  },
  setSelectedQuestionAndAnswer(state, payload) {
    state.question = payload;

    return state;
  },
  setSelectedBox(state, payload) {
    state.selectedBox = payload;

    return state;
  },
  setFinalQuestionAndAnswer(state, payload) {
    state.finalQ = payload.question;
    state.finalA = payload.answer;

    return state;
  },
  addPoints(state, payload) {
    const team = state.teams.find((team) => team.id === payload.teamId);

    team.score += state.question.value * 2;

    return state;
  },
  deductPoints(state, payload) {
    const team = state.teams.find((team) => team.id === payload.teamId);

    team.score -= state.question.value * 2;

    return state;
  },
  addAnsweredQuestion(state, payload) {
    state.answeredQuestions.push(state.selectedBox);
    state.selectedBox = null;
    state.question = null;

    return state;
  },

  closeQuestion(state, payload) {
    state.selectedBox = null;
    state.question = null;
    return state;
  },
  resetGame(state, payload) {
    state.teams.forEach((team) => (team.score = 0));
    state.answeredQuestions = [];
    state.selectedBox = null;
    state.question = null;

    return state;
  },
  resetSelectedQuestionAndAnswer(state, payload) {
    state.question = {
      question: null,
      answer: null,
      value: null,
    };
    return state;
  },
};
