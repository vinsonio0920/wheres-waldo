import { Link } from "react-router-dom";
import { logoSvg } from "../assets";

const ErrorPage = () => {
  return (
    <>
      <Link to="/">
        <img src={logoSvg} width="32" alt="Logo" />
        Sniper
      </Link>
      <h1>Wrong target!</h1>
      <p>
        The page you are looking for doesn't exist!{" "}
        <Link to="/">Head back to the homepage.</Link>
      </p>
    </>
  );
};

export { ErrorPage };
