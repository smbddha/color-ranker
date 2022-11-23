import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>
          <Link href="/">color ranker</Link>
        </h1>
      </div>
      <div>
        <Link className={styles.navitem} href="/rankings">
          rankings
        </Link>
        <Link className={styles.navitem} href="/about">
          about
        </Link>
      </div>
    </header>
  );
}
