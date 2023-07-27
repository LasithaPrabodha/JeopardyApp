export function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  if (questions[randomIndex]) {
    return questions[randomIndex];
  } else {
    return getRandomQuestion(questions);
  }
}
