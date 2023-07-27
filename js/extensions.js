(function () {
  HTMLElement.prototype.setId = function (id) {
    this.id = id;
    return this;
  };

  HTMLElement.prototype.setClass = function (className) {
    this.classList.add(className);
    return this;
  };

  HTMLElement.prototype.setContentText = function (innerText) {
    this.innerText = innerText;
    return this;
  };
})();
