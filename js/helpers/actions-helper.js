export function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * result.length);
  if (questions[randomIndex]) {
    return questions[randomIndex];
  } else {
    return getRandomQuestion(questions);
  }
}
