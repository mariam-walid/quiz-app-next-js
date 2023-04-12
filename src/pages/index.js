import styles from "@/styles/home.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <Container className={styles.landing}>
      <div className={styles.welcome}>
        <h1>Welcome</h1>
        <div className={styles.startQuiz}>
          <p>
            Click the start button below whenever you are ready to start the quiz.
          </p>
          <button>
            <Link href="/quiz">Start quiz</Link>
          </button>
        </div>
      </div>
    </Container>
  );
}
