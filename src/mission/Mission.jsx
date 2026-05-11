import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./Mission.module.css";

const TargetDropdown = ({ targets, dropdownCoordinates }) => {
  return (
    <ul
      className={styles.targetDropdown}
      style={{
        left: dropdownCoordinates[0] + 55,
        top: dropdownCoordinates[1] + 13,
      }}
    >
      {targets.map((target) => (
        <li key={target.key}>
          <button type="button">{target.targetName}</button>
        </li>
      ))}
    </ul>
  );
};

const Mission = () => {
  const result = useLoaderData();
  const [leaderboard, setLeaderboard] = useState(result.data.leaderboard);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.classList.contains("missionPicture")) {
        const rect = event.target.getBoundingClientRect();
        setShowTargetDropdown(true);
        setDropdownCoordinates([
          event.clientX - rect.left,
          event.clientY - rect.top,
        ]);
      } else {
        setShowTargetDropdown(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

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
        {showTargetDropdown && (
          <TargetDropdown
            targets={data.targets}
            dropdownCoordinates={dropdownCoordinates}
          />
        )}
        <img
          src={data.image}
          alt="Mission picture"
          className="missionPicture"
        />
      </div>
      <p
        data-testid="click-result"
        className={`${styles.resultPara} ${styles.failure}`}
      ></p>
      <p>
        NOTE: Pagination is currently mocked. After the backend is implemented
        we will make it work!
      </p>
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
