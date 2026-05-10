import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./Mission.module.css";

const Mission = () => {
  const result = useLoaderData();
  const [leaderboard, setLeaderboard] = useState(result.data.leaderboard);

  const data = result.data;

  // placeholder before adding the backend
  const handleButtonClick = () => {
    if (leaderboard.length >= 20) return;

    const newLeaderboard = [...leaderboard];
    let time = 11;

    for (let i = 0; i < 10; i++) {
      newLeaderboard.push({ name: "broski", time: time, date: "Best" });
      time += 1;
    }

    setLeaderboard(newLeaderboard);
  };

  return (
    <>
      <h1 className={styles.missionHeading}>Mission: {data.mission}</h1>
      <div className={styles.imageContainer}>
        <img src={data.image} alt="Mission picture" />
      </div>
      <p
        data-testid="click-result"
        className={`${styles.resultPara} ${styles.failure}`}
      >
        There is nothing here.
      </p>
      <p>NOTE: </p>
      <div className={styles.leaderboardContainer}>
        <h2 className={styles.leaderboardHeading}>Leaderboard</h2>
        <table
          aria-label="Leaderboard table"
          className={styles.leaderboardTable}
        >
          <thead>
            <tr>
              <th scope="col" className={styles.rankTh}>
                Rank
              </th>
              <th scope="col" className={styles.playerTh}>
                Player
              </th>
              <th scope="col" className={styles.timeTh}>
                Time
              </th>
              <th scope="col" className={styles.dateTh}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.time}>
                <td className={styles.rankTd}>{index + 1}</td>
                <td className={styles.playerTd}>{entry.name}</td>
                <td className={styles.timeTd}>{entry.time}s</td>
                <td className={styles.dateTd}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaderboard.length < 20 && (
          <button
            type="button"
            onClick={handleButtonClick}
            className={styles.showMoreButton}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
};

export { Mission };
