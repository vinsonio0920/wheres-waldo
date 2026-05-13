import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./Mission.module.css";

const ConfirmationModal = () => {
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    // upload time to leaderboard
    navigate("/");
  };

  return (
    <>
      <div data-testid="overlay" className="overlay"></div>
      <div data-testid="completed-modal" className={styles.completedModal}>
        <h2>🔥 You found all the targets in 123 seconds! You ranked 12</h2>
        <button type="button" onClick={handleSubmitClick}>
          Submit & Return to the Homepage
        </button>
      </div>
    </>
  );
};

const TargetDropdown = ({
  targets,
  setTargets,
  dropdownCoordinates,
  clickCoordinates,
  setClickResult,
  setShowCompletionModal,
}) => {
  if (targets.every((target) => target.sniped)) return;

  const handleTargetClick = (event) => {
    const clickedTarget = targets.find(
      (target) => target.key === event.currentTarget.dataset.key,
    );

    let targetFound = false;
    clickedTarget.locations.forEach((location) => {
      // check if the click is inside one of the target's box
      const isInsideX =
        location[0][0] <= clickCoordinates[0] &&
        clickCoordinates[0] <= location[0][1];
      const isInsideY =
        location[1][0] <= clickCoordinates[1] &&
        clickCoordinates[1] <= location[1][1];

      if (isInsideX && isInsideY) {
        targetFound = true;

        const newTargets = targets.map((target) => {
          if (target.key === event.currentTarget.dataset.key) {
            return {
              ...target,
              sniped: true,
            };
          } else {
            return target;
          }
        });
        setTargets(newTargets);
        setClickResult(clickedTarget.targetName);

        if (newTargets.every((target) => target.sniped))
          setShowCompletionModal(true);
      }
    });

    // error handling
    if (targetFound) return;
    setClickResult("error");
  };

  return (
    <ul
      className={styles.targetDropdown}
      style={{
        left: dropdownCoordinates[0],
        top: dropdownCoordinates[1],
      }}
      aria-label="Target dropdown"
    >
      {targets.map((target) => (
        <li key={target.key}>
          <button
            type="button"
            onClick={handleTargetClick}
            data-key={target.key}
          >
            {target.targetName}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Mission = () => {
  const result = useLoaderData();
  const [leaderboard, setLeaderboard] = useState(result.data.leaderboard);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  // the position that the dropdown should be shown (relative to the imageContainer)
  const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
  // the coordinate that was clicked on the image
  const [clickCoordinates, setClickCoordinates] = useState([0, 0]);
  const [targets, setTargets] = useState(result.data.targets);
  const [clickResult, setClickResult] = useState("");
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.classList.contains("missionPicture")) {
        const containerRect = event.target.parentNode.getBoundingClientRect();
        const imageRect = event.target.getBoundingClientRect();

        setShowTargetDropdown(true);
        setDropdownCoordinates([
          event.clientX - containerRect.left,
          event.clientY - containerRect.top,
        ]);
        setClickCoordinates([
          event.clientX - imageRect.left,
          event.clientY - imageRect.top,
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
  const clickResultClass =
    clickResult && (clickResult === "error" ? styles.failure : styles.success);

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
      {showCompletionModal && <ConfirmationModal />}
      <h1 className={styles.missionHeading}>Mission: {data.mission}</h1>
      <div className={styles.imageContainer}>
        {showTargetDropdown && (
          <TargetDropdown
            targets={targets}
            setTargets={setTargets}
            dropdownCoordinates={dropdownCoordinates}
            clickCoordinates={clickCoordinates}
            setClickResult={setClickResult}
            setShowCompletionModal={setShowCompletionModal}
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
        className={`${styles.resultPara} ${clickResultClass}`}
      >
        {clickResult &&
          (clickResult === "error"
            ? "There is nothing here"
            : `You found ${clickResult}`)}
      </p>
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
