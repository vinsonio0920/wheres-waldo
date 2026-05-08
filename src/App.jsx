import { Link, Outlet } from "react-router-dom";
import { logoSvg } from "./assets";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <h1>
            <img src={logoSvg} alt="Logo" width="30" />
            Sniper
          </h1>
        </Link>
        <div className={styles.rightLinks}>
          <Link to="/attributions">Attributions</Link>
          <Link to="/">Missions</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
