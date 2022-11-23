import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.main} style={{ width: "80%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          border: "3px solid black",
          // height: "24rem",
          // minWidth: "42rem",
          width: "100%",
          maxWidth: "42rem",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "1.2rem",
        }}
      >
        <label className={styles.label}>about</label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "1rem",
            paddingTop: "2rem",
          }}
        >
          <span>
            Color ranker is a micro-game to sooth the mind with mindless
            clicking with the side effect of color discovery.
          </span>
          <span>
            Bugs? Personal issues? Feature requests? Open an issue on the game’s{" "}
            <a href="https://github.com/smbddha/color-ranker/issues">github</a>.{" "}
          </span>

          <div
            style={{
              fontWeight: "light",
              fontSize: "small",
              textAlign: "center",
            }}
          >
            built with Next.js - powered by Vercel
          </div>
        </div>
      </div>
    </div>
  );
}
