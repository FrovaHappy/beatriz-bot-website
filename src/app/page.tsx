"use client";
import styles from "./page.module.css";
import Shapes from "./sections/shapes";
import HomeContext from "./context";
import Options from "./sections/options";
export default function Home() {

  return (
    <HomeContext>
      <main className={styles.main}>
        <Shapes />
        <Options />
      </main>
    </HomeContext>
  );
}
