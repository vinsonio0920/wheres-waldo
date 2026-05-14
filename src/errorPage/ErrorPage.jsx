import { Link } from "react-router-dom";
import { logoSvg } from "../assets";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <Link to="/" className={styles.logoLink}>
        <img src={logoSvg} width="32" alt="Logo" />
        <span>Sniper</span>
      </Link>
      <h1 className={styles.errorHeading}>Wrong target!</h1>
      <p>The page you are looking for doesn't exist!</p>
      <Link to="/" className={styles.homepageLink}>
        Head back to the homepage.
      </Link>
    </div>
  );
};

export { ErrorPage };
