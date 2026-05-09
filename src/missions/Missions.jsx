import { Link, useLoaderData } from "react-router-dom";
import styles from "./Missions.module.css";

const Missions = () => {
  const result = useLoaderData();

  if (result.error) {
    return (
      <div className={styles.errorContainer}>
        <p>{result.error.message}</p>
      </div>
    );
  }
  if (result.data.length <= 0) {
    return (
      <div className={styles.emptyContainer}>
        <div>
          <h1>No missions yet</h1>
          <p>New missions will come, check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <ul
      className="missionList"
      aria-label="Missions"
      className={styles.missionUl}
    >
      {result.data.map((mission) => (
        <li key={mission.id} className={styles.missionLi}>
          <Link to={`/missions/${mission.id}`}></Link>
          <img src={mission.image} alt="Mission picture" width={300} />
          <p>Targets: {mission.targets.length}</p>
        </li>
      ))}
    </ul>
  );
};

export { Missions };
