import { getRandomQuestion } from "../helpers/actions-helper.js";
import { getRequest } from "../helpers/http-request-helper.js";

export default {
  setTeams(context, payload) {
    context.commit("setTeams", payload);
  },
  setQuestionsCount(context, payload) {
    context.commit("setQuestionsCount", payload);
  },
  setLocation(context, payload) {
    window.location.hash = payload;
    context.commit("setLocation", payload);
  },
  loadCategories(context, payload) {
    getRequest("/categories?count=6").then((result) => {
      context.commit("setCategories", result);
    });
  },
  setSelectedQuestionAndAnswer(context, payload) {
    getRequest("/clues?category=" + payload.category).then((result) => {
      let question = result.find((q) => q.value && q.value >= payload.index * 100);

      question = question ?? getRandomQuestion(result);

      context.commit("setSelectedQuestionAndAnswer", question);
      context.commit("setSelectedBox", `${payload.category}-${payload.index}`);
    });
  },
  addPoints(context, payload) {
    context.commit("addPoints", payload);
  },
  deductPoints(context, payload) {
    context.commit("deductPoints", payload);
  },
  addAnsweredQuestion(context, payload) {
    context.commit("addAnsweredQuestion", payload);
  },
  closeQuestion(context, payload) {
    context.commit("closeQuestion");
  },

  setFinalQuestionAndAnswer(context, payload) {
    getRequest("final").then((result) => {
      context.commit("setSelectedQuestionAndAnswer", result[0]);
    });
  },
  setWinner(context, payload) {
    context.commit("setWinner");
  },

  resetGame(context, payload) {
    context.commit("resetGame");
  },
  resetSelectedQuestionAndAnswer(context, payload) {
    context.commit("resetSelectedQuestionAndAnswer");
  },
};
