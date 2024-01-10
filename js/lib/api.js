import { getRequest } from "../helpers/http-request-helper.js";

export default class API {
  static getCategories() {
    return getRequest("/categories?randomize=true&pagesize=6");
  }

  static getClues(category, difficulty) {
    return getRequest(`/categories/${category}/random?orderby=Value${difficulty ? `&value=${difficulty}` : ""}`);
  }

  static getFinalClue() {
    return getRequest("final");
  }
}
