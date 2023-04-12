import styles from "@/Components/Answer/answer.module.css";

const Answer = (props) => {
  const letters = ["A", "B", "C", "D"];

  const isSelected = props.currentAnswer === props.answer ? true : false;

  return (
    <div
      className={`${styles.answer} ${isSelected ? styles.selected : ""}`}
      onClick={() => props.selectAnswer(props.answer)}
    >
      <div className={styles.answerLetter}>{letters[props.index]}</div>

      <div className={styles.answerText}>{props.answer}</div>
    </div>
  );
};

export default Answer;
