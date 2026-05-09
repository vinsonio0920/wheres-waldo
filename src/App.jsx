import { Link, Outlet } from "react-router-dom";
import { logoSvg } from "./assets";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <h1>
            <img src={logoSvg} alt="Logo" width="30" />
            Sniper
          </h1>
        </Link>
        <div>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Menu"
            onClick={handleMenuClick}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <ul
            className={`${styles.rightLinks} ${showDropdown ? styles.opened : ""}`}
            aria-label="Menu dropdown"
          >
            <li>
              <Link to="/attributions">Attributions</Link>
            </li>
            <li>
              <Link to="/">Missions</Link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
