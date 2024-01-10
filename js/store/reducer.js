import { defaultState } from "./state.js";

export default {
  setSelectedSpeaker(state, payload) {
    state.selectedSpeaker = payload;
    return state;
  },

  setTeams(state, payload) {
    state.teams = payload;

    return state;
  },
  setQuestionsCount(state, payload) {
    state.setup.questions = payload;
    return state;
  },
  setWinner(state, payload) {
    const winner = state.teams.reduce((prev, current) => (+prev.score > +current.score ? prev : current), {});

    state.winner = winner;

    return state;
  },
  setCategories(state, payload) {
    state.categories = payload;
    state.teams.forEach((team) => (team.score = 0));
    state.answeredQuestions = [];
    state.selectedBox = null;
    state.question = null;
    state.winner = null;

    return state;
  },
  setSelectedQuestionAndAnswer(state, payload) {
    state.question = payload.question;
    state.selectedBox = payload.box;

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
    state.answeredQuestions.push(state.selectedBox);
    state.selectedBox = null;
    state.question = null;

    if (state.answeredQuestions.length === state.categories.length * state.setup.questions) {
      state.winner = state.teams.reduce((max, team) => (max.score > team.score ? max : team));
    }

    return state;
  },
  deductPoints(state, payload) {
    const team = state.teams.find((team) => team.id === payload.teamId);

    team.score -= state.question.value * 2;
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
    state.winner = null;

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
