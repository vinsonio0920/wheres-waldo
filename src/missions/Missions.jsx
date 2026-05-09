import { useLoaderData } from "react-router-dom";
import styles from "./Missions.module.css";

const Missions = () => {
  const result = useLoaderData();

  return (
    <ul
      className="missionList"
      aria-label="Missions"
      className={styles.missionUl}
    >
      {result.data.map((mission) => (
        <li key={mission.id} className={styles.missionLi}>
          <img src={mission.image} alt="Mission picture" width={300} />
          <p>Targets: {mission.targets.length}</p>
        </li>
      ))}
    </ul>
  );
};

export { Missions };
