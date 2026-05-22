import { useEffect, useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
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
      <Form
        data-testid="completed-modal"
        method="POST"
        className={styles.completedModal}
      >
        <h2>🔥 You found all the targets in 123 seconds! You ranked 12</h2>
        <div>
          <label htmlFor="name" className="srOnly">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength="26"
            placeholder="Name (required)"
            className={styles.nameInput}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitClick}>
            Submit & Return to the Homepage
          </button>
        </div>
      </Form>
    </>
  );
};

const TargetDropdown = ({
  missionId,
  targets,
  setTargets,
  dropdownCoordinates,
  clickCoordinates,
  setClickResult,
  setShowCompletionModal,
}) => {
  if (targets.every((target) => target.sniped)) return;

  const handleTargetClick = async (event) => {
    // move this to fetch! POST
    // step 5: update target dropdown click
    // step 6: update test! and done!

    const url = `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}/targets/${event.currentTarget.dataset.id}/validate`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          x: clickCoordinates[0],
          y: clickCoordinates[1],
        }),
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const result = await response.json();
      console.log(result.data?.items[0].targetFound);

      if (result.data?.items[0].targetFound) {
        const newTargets = targets.map((target) => {
          if (Number(target.id) === Number(event.target.dataset.id)) {
            return {
              ...target,
              sniped: true,
            };
          } else {
            return target;
          }
        });
        setTargets(newTargets);
        setClickResult(result.data.items[0].name);

        if (newTargets.every((target) => target.sniped))
          setShowCompletionModal(true);
      } else {
        setClickResult("error");
      }
    } catch (error) {
      console.error(error);
      // set click result to error!
    }
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
        <li key={target.id}>
          <button type="button" onClick={handleTargetClick} data-id={target.id}>
            {target.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Mission = () => {
  const result = useLoaderData();
  const [leaderboard, setLeaderboard] = useState(
    result.leaderboardJson?.data?.items,
  );
  const [leaderboardFetchError, setLeaderboardFetchError] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  // the position that the dropdown should be shown (relative to the imageContainer)
  const [dropdownCoordinates, setDropdownCoordinates] = useState([0, 0]);
  // the coordinate that was clicked on the image
  const [clickCoordinates, setClickCoordinates] = useState([0, 0]);
  const [targets, setTargets] = useState(
    result.missionJson?.data?.items[0]?.targets.map((target) => ({
      ...target,
      sniped: false,
    })),
  );
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

  if (result.missionJson?.error) {
    return (
      <div className={styles.errorContainer}>
        <p>
          {result.missionJson?.error?.message ||
            result.leaderboardJson?.error?.message}
        </p>
      </div>
    );
  }

  const missionId = result.missionJson?.data?.items[0].id;
  const cursor =
    leaderboard &&
    leaderboard.length > 0 &&
    leaderboard[leaderboard.length - 1].id;
  const data = result.missionJson.data.items[0];
  const clickResultClass =
    clickResult && (clickResult === "error" ? styles.failure : styles.success);

  const handleButtonClick = async () => {
    if (leaderboard.length >= result.leaderboardJson.data.totalItems) return;

    const url = `${import.meta.env.VITE_SERVER_URL}/missions/${result.missionJson.data.items[0].id}/leaderboard?cursor=${cursor}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const result = await response.json();
      const newLeaderboard = leaderboard.concat(result.data.items);

      setLeaderboard(newLeaderboard);
      setLeaderboardFetchError(false);
    } catch (error) {
      console.error(error.message);
      setLeaderboardFetchError(true);
    }
  };

  return (
    <>
      {showCompletionModal && <ConfirmationModal />}
      <h1 className={styles.missionHeading}>Mission: {data.mission}</h1>
      <div className={styles.imageContainer}>
        {showTargetDropdown && (
          <TargetDropdown
            missionId={missionId}
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
      <div className={styles.leaderboardContainer}>
        <h2 className={styles.leaderboardHeading}>Leaderboard</h2>
        {result.leaderboardJson?.error && (
          <p className={styles.loadError}>
            {result.leaderboardJson?.error?.message}
          </p>
        )}
        <table
          aria-label="Leaderboard table"
          className={styles.leaderboardTable}
        >
          {!result.leaderboardJson?.error && (
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
          )}
          {result.leaderboardJson?.data && leaderboard.length > 0 && (
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td className={styles.rankTd}>{index + 1}</td>
                  <td className={styles.playerTd}>{entry.name}</td>
                  <td className={styles.timeTd}>{entry.time}s</td>
                  <td className={styles.dateTd}>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {leaderboard?.length <= 0 && (
          <p className={styles.emptyPara}>
            There's nobody on the leaderboard right now. Will you be the first?
          </p>
        )}
        {leaderboard?.length < result.leaderboardJson?.data?.totalItems && (
          <button
            type="button"
            onClick={handleButtonClick}
            className={styles.showMoreButton}
          >
            Show more
          </button>
        )}
        {leaderboardFetchError && (
          <p className={styles.fetchError}>
            There was an error loading the entries. Please try again later.
          </p>
        )}
      </div>
    </>
  );
};

export { Mission };
