export const shuffleAnswers = (question) => {
  if (!question) {
    return [];
  }
  const answers = [question.correctAnswer, ...question.incorrectAnswers];
  return answers
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
