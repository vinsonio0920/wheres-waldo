import { Link, Outlet } from "react-router-dom";
import { logoSvg } from "./assets";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>
            <img src={logoSvg} alt="Logo" width="30" />
            Sniper
          </h1>
        </Link>
        <div>
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
