export function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  if (questions[randomIndex]) {
    return questions[randomIndex];
  } else {
    return getRandomQuestion(questions);
  }
}

export function getRandomItemsFromArray(arr, noOfItems) {
  if (noOfItems > arr.length) {
    throw new Error("Number of items requested exceeds the array length.");
  }

  const randomItems = [];

  while (randomItems.length < noOfItems) {
    let currentIndex = Math.floor(Math.random() * arr.length);
    if (randomItems.findIndex((item) => item.id === arr[currentIndex].id) === -1) {
      randomItems.push(arr[currentIndex]);
    }
  }

  return randomItems;
}
