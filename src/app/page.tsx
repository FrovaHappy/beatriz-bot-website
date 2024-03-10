"use client";
import styles from "./page.module.css";
import getBase64 from "@/utils/getBase64";
import Shapes from "./sections/shapes";
import HomeContext from "./context";
export default function Home() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
    const file = new FormData(e.currentTarget).get("file") as File;
    if (!file) return;
    let base64Img = await getBase64(file);
    if (typeof base64Img == "string") {
      base64Img = base64Img.replace(/^data:.+base64,/, "");
    }
    const result = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Img }),
    });
    const response = await result.json(); // response.data is an object containing the image URL
    console.log(response);
  }

  return (
    <HomeContext>
      <main className={styles.main}>
        <Shapes />
        <form action="" onSubmit={submit}>
          <input name="file" type="file" maxLength={1} />
          <button type="submit">Submit</button>
        </form>
      </main>
    </HomeContext>
  );
}
