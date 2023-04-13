import styles from "@/styles/quiz.module.css";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ShowAnswers from "@/Components/ShowAnswers/ShowAnswers";
import { shuffleAnswers } from "@/helpers/shuffleAnswers";
import Answer from "@/Components/Answer/Answer";

export default function Quiz({ data }) {
  useEffect(() => {
    setQuestions(data);
    setAnswers(shuffleAnswers(data[0]));
  }, []);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const quizState = questions.length > 0 ? "progress" : "not-ready";

  const handleSelect = (answer) => {
    setCurrentAnswer(answer);
  };

  const handleNext = () => {
    if (currentAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setShowResults(true);
    }
    if (showResults === false) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswers(shuffleAnswers(questions[currentQuestionIndex + 1]));
    }

    setUserChoices([...userChoices, currentAnswer]);
    setCurrentAnswer("");
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setQuestions(data);
    setAnswers(shuffleAnswers(data[0]));
    setCurrentQuestionIndex(0);
    setCurrentAnswer("");
    setShowResults(false);
    setScore(0);
    setUserChoices([]);
    setShowAnswers(false);
  };

  return (
    <>
      {showAnswers && (
        <ShowAnswers questions={questions} userChoices={userChoices} />
      )}

      {showResults && !showAnswers && (
        <div className={styles.result}>
          <h3> Completed! </h3>

          <div className={styles.resultInfo}>
            <h2 >
              You Scored {score} out of {questions.length}.
            </h2>

            <div className={styles.resultOption} onClick={() => handleRestart()}>
              Restart
            </div>

            <div className={styles.resultOption} onClick={() => handleShowAnswers()}>
              Show Answers
            </div>
          </div>
        </div>
      )}

      {quizState === "not-ready" && <div> Loading.........</div>}

      <Container>
        <div className={styles.main}>
          {!showResults && currentQuestion && (
            <>
              <div className={styles.questionNumber}>
                <h3>
                  Question {currentQuestionIndex + 1} / {questions.length}
                </h3>
              </div>

              <div className={styles.quiz}>
                <div className={styles.questionText}>
                  <p>{questions[currentQuestionIndex].question}</p>
                </div>
                <div className={styles.options}>
                  {answers.map((answer, index) => (
                    <Answer
                      key={index}
                      answer={answer}
                      index={index}
                      selectAnswer={(answer) => handleSelect(answer)}
                      currentAnswer={currentAnswer}
                    />
                  ))}
                </div>

                {currentAnswer && (
                  <div className={styles.nextQuestion}>
                    <button onClick={() => handleNext()}>
                      {currentQuestionIndex + 1 === questions.length
                        ? "Finish"
                        : "Next Question"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://the-trivia-api.com/api/questions?limit=5");
  const data = await res.json();

  return {
    props: { data },
  };
}
