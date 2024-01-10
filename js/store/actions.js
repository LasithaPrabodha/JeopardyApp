import API from "../lib/api.js";

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
    try {
      const result = await API.getCategories();

      localStorage.setItem("categories", JSON.stringify(result));

      context.commit("setCategories", result);
    } catch (error) {
      alert("Service error. API is not responding for the requests.");
      return;
    }
  },
  setSelectedQuestionAndAnswer(context, payload) {
    API.getClues(payload.category, payload.index * 100).then((question) => {
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
    API.getFinalClue().then((result) => {
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
