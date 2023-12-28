import { getRandomItemsFromArray, getRandomQuestion } from "../helpers/actions-helper.js";
import { getRequest } from "../helpers/http-request-helper.js";

const NO_OF_CATEGORIES = 6;

export default {
  setTeams(context, payload) {
    context.commit("setTeams", payload);
  },
  setQuestionsCount(context, payload) {
    context.commit("setQuestionsCount", payload);
  },
  navigate(context, payload) {
    window.location.hash = payload;
    context.location.publish(payload);
  },
  async loadCategories(context, payload) {
    if (localStorage.getItem("categories")) {
      const list = JSON.parse(localStorage.getItem("categories"));
      const randomItems = getRandomItemsFromArray(list, NO_OF_CATEGORIES);

      context.commit("setCategories", randomItems);
      return;
    }
    try {
      const result = await Promise.all(
        Array(10)
          .fill()
          .map((v, i) => getRequest(`/categories?count=100&offset=${(i + 1) * 100}`))
      );
    } catch (error) {
      alert("jservice.io service error. API is not responding for the requests.");
      return
    }

    const completeList = [].concat(...result);
    localStorage.setItem("categories", JSON.stringify(completeList));

    const randomItems = getRandomItemsFromArray(completeList, NO_OF_CATEGORIES);
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
          // selects the question while skipping questions with null values
          const question = result.find((q) => q.value && q.value >= payload.index * 100);
          return question ?? getRandomQuestion(result);
        });
      })
      .then((question) => {
        context.commit("setSelectedQuestionAndAnswer", { question, box: `${payload.category}-${payload.index}` });
      });
  },
  addPoints(context, payload) {
    context.commit("addPoints", payload);
  },
  deductPoints(context, payload) {
    context.commit("deductPoints", payload);
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
