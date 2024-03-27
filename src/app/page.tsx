"use client";
import styles from './page.module.scss'
import Shapes from "./sections/shapes";
import HomeContext from "./context";
import Options from "./sections/options";
import NewShape from '@/components/NewShape'
import Canvas from '@/components/Canvas'
export default function Home() {
  return (
    <HomeContext>
      <main className={styles.main}>
        <NewShape />
        <Shapes />
        <Options />
        <Canvas />
      </main>
    </HomeContext>
  )
}
