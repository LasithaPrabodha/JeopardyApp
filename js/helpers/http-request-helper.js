const BASE_URL = "https://jeopardy-api.azurewebsites.net/api";

export function getRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", BASE_URL + url);

    xhr.responseType = "json";

    xhr.onload = function () {
      if (xhr.status != 200) {
        reject(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = function () {
      reject("Request failed");
    };

    xhr.send();
  });
}
