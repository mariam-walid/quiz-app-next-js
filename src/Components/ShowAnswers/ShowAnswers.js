import styles from "@/Components/ShowAnswers/showAnswers.module.css";
import { Container } from "react-bootstrap";


const ShowAnswers = (props) => {
  return (
    <Container>
      <div className={styles.showAnswers}>
        <h2>Quiz Answers</h2>
        {props.questions.map((question, index) => (
          <div className={styles.quizAnswer} key={index}>
            <h5>
              {index + 1}: {question.question}
            </h5>
            <div className={styles.answers}>
              <p>Correct answer: {question.correctAnswer}</p>
              <p>
                Your answer:{" "}
                <span
                  className={`${
                    props.userChoices[index] === question.correctAnswer
                      ? styles.correct
                      : styles.wrong
                  }`}
                >
                  {props.userChoices[index]}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShowAnswers;
