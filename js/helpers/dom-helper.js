export function generate(tagName) {
  return document.createElement(tagName);
}

export function select(selector) {
  return document.querySelector(selector);
}

export function selectAll(selector) {
  return document.querySelectorAll(selector);
}
