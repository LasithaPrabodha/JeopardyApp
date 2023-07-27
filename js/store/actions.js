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
    getRequest(`/clues?category=${payload.category}&value=${payload.index * 100}`)
      .then((result) => {
        if (result.length) {
          return getRandomQuestion(result);
        }

        return getRequest("/clues?category=" + payload.category).then((result) => {
          result.sort((a, b) => a.value - b.value);
          const question = result.find((q) => q.value && q.value >= payload.index * 100);
          return question ?? getRandomQuestion(result);
        });
      })
      .then((question) => {
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
