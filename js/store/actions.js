import { getRandomItemsFromArray, getRandomQuestion } from "../helpers/actions-helper.js";
import { getRequest } from "../helpers/http-request-helper.js";
import speaker from "../helpers/speaker.js";

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
  async loadCategories(context, payload) {
    if (localStorage.getItem("categories")) {
      const list = JSON.parse(localStorage.getItem("categories"));
      const randomItems = getRandomItemsFromArray(list, 6);

      context.commit("setCategories", randomItems);
      return;
    }

    const result = await Promise.all(
      Array(10)
        .fill()
        .map((v, i) => getRequest(`/categories?count=100&offset=${(i + 1) * 100}`))
    );

    const completeList = [].concat(...result);
    localStorage.setItem("categories", JSON.stringify(completeList));

    const randomItems = getRandomItemsFromArray(completeList, 6);
    context.commit("setCategories", randomItems);
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
        speaker.speak(question.question);
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
