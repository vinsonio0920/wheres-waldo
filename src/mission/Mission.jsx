import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import styles from "./Mission.module.css";
import { formatTime } from "../utils";
import { checkmarkPng } from "../assets";

const CompletionModal = ({ missionId, timeTaken, rank }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") || "");
  let result;
  let resultClass;
  let showSubmitButton = true;

  if (fetcher.data?.data?.items?.[0]) {
    result = "Score submitted!";
    resultClass = styles.success;
    showSubmitButton = false;
  } else if (fetcher.data?.error) {
    if (fetcher.data.error.code === 400) {
      // only show name error as other form inputs will be taken care of
      result = fetcher.data.error.errors.find(
        (error) => error.path === "name",
      ).msg;
    } else {
      result =
        "There was an error submitting your score. Please try again later.";
    }
    resultClass = styles.failure;
  }

  const handleReturnClick = () => {
    // redirects the user back to the homepage
    navigate("/");
  };

  return (
    <>
      <div data-testid="overlay" className="overlay"></div>
      <fetcher.Form
        data-testid="completed-modal"
        method="POST"
        className={styles.completedModal}
        autoComplete="off"
      >
        <h2>
          🔥 You found all the targets in {timeTaken}! You ranked {rank}
        </h2>
        <div>
          <label htmlFor="name" className="srOnly">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="26"
            placeholder="Name (required)"
            className={`${styles.nameInput} ${resultClass === styles.failure && styles.invalid} ${resultClass === styles.success && styles.submitted}`}
            disabled={!showSubmitButton}
          />
          <p className={`${styles.formResult} ${resultClass}`}>{result}</p>
        </div>
        <div>
          <input
            type="hidden"
            name="missionId"
            id="missionId"
            value={missionId}
          />
        </div>
        <div>
          {showSubmitButton && (
            <button type="submit" className={styles.submitButton}>
              Submit Score
            </button>
          )}
          <button
            type="button"
            className={styles.returnButton}
            onClick={handleReturnClick}
          >
            Return to the homepage
          </button>
        </div>
      </fetcher.Form>
    </>
  );
};

const TargetDropdown = ({
  missionId,
  missionType,
  targets,
  setTargets,
  dropdownCoordinates,
  clickCoordinates,
  setClickResult,
  setShowCompletionModal,
  setTimeTaken,
  setRank,
}) => {
  if (targets.every((target) => target.sniped)) return;

  const handleTargetClick = async (event) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}/targets/${event.currentTarget.dataset.id}/validate`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          x: clickCoordinates[0],
          y: clickCoordinates[1],
        }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const result = await response.json();

      if (result.data?.items[0].targetFound) {
        const newTargets = targets.map((target) => {
          if (Number(target.id) === Number(event.target.dataset.id)) {
            return {
              ...target,
              sniped: true,
              snipedCoords: clickCoordinates,
            };
          } else {
            return target;
          }
        });
        setTargets(newTargets);
        setClickResult(result.data.items[0].name);

        if (newTargets.every((target) => target.sniped)) {
          setShowCompletionModal(true);
          setTimeTaken(result.data?.items[0].timeTaken);
          setRank(result.data?.items[0].rank);
        }
      } else {
        setClickResult("error");
      }
    } catch (error) {
      console.error(error);
      setClickResult("fetch error");
    }
  };

  const handleMultipleSameTargetClick = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}/targets/multiple/validate`;
    const unsnipedTargetIds = targets.reduce((filtered, target) => {
      if (!target.sniped) {
        return filtered.concat(target.id);
      }

      return filtered;
    }, []);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          x: clickCoordinates[0],
          y: clickCoordinates[1],
          targetIds: JSON.stringify(unsnipedTargetIds),
        }),
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(
          `Response status: ${response.status}. There was an error validating the body!`,
        );

      const result = await response.json();

      if (result.data?.items[0].targetFound) {
        const newTargets = targets.map((target) => {
          if (Number(target.id) === Number(result.data?.items[0].id)) {
            return {
              ...target,
              sniped: true,
              snipedCoords: clickCoordinates,
            };
          } else {
            return target;
          }
        });
        setTargets(newTargets);
        setClickResult(result.data.items[0].name);

        if (newTargets.every((target) => target.sniped)) {
          setShowCompletionModal(true);
          setTimeTaken(result.data?.items[0].timeTaken);
          setRank(result.data?.items[0].rank);
        }
      } else {
        setClickResult("error");
      }
    } catch (error) {
      console.error(error);
      setClickResult("fetch error");
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
      {missionType === "multiple same" ? (
        <li>
          <button type="button" onClick={handleMultipleSameTargetClick}>
            {targets[0].name}
          </button>
        </li>
      ) : (
        targets.map(
          (target) =>
            !target.sniped && (
              <li key={target.id}>
                <button
                  type="button"
                  onClick={handleTargetClick}
                  data-id={target.id}
                >
                  {target.name}
                </button>
              </li>
            ),
        )
      )}
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
      snipedCoords: null,
    })),
  );
  const [clickResult, setClickResult] = useState("");
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [rank, setRank] = useState(null);

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
  const missionType = result.missionJson?.data?.items[0].type;
  const cursor = leaderboard &&
    leaderboard.length > 0 && {
      time_id: {
        time: leaderboard[leaderboard.length - 1].time,
        id: leaderboard[leaderboard.length - 1].id,
      },
    };
  const data = result.missionJson.data.items[0];
  const clickResultClass =
    clickResult &&
    (clickResult === "error" || clickResult === "fetch error"
      ? styles.failure
      : styles.success);
  let clickResultPara;

  switch (clickResult) {
    case "fetch error":
      clickResultPara =
        "There was an error validating the target. Please try again later.";
      break;
    case "error":
      clickResultPara = "There is nothing here";
      break;
    case "":
      clickResultPara = null;
      break;
    default:
      clickResultPara = `You found ${clickResult}`;
  }

  const handleButtonClick = async () => {
    if (leaderboard.length >= result.leaderboardJson.data.totalItems) return;

    const url = `${import.meta.env.VITE_SERVER_URL}/missions/${result.missionJson.data.items[0].id}/leaderboard?cursor=${JSON.stringify(cursor)}`;
    try {
      const response = await fetch(url, {
        credentials: "include",
      });
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
      {showCompletionModal && (
        <CompletionModal
          missionId={missionId}
          timeTaken={timeTaken}
          rank={rank}
        />
      )}
      <div className={styles.gameContainer}>
        <h1 className={styles.missionHeading}>Mission: {data.mission}</h1>
        <div className={styles.imageContainer}>
          <ul className={styles.markers}>
            {targets.map(
              (target) =>
                target.sniped && (
                  <li key={target.id}>
                    <img
                      src={checkmarkPng}
                      width="30"
                      style={{
                        left: target.snipedCoords[0],
                        top: target.snipedCoords[1],
                      }}
                      alt="Checkmark marker"
                    ></img>
                  </li>
                ),
            )}
          </ul>
          {showTargetDropdown && (
            <TargetDropdown
              missionId={missionId}
              missionType={missionType}
              targets={targets}
              setTargets={setTargets}
              dropdownCoordinates={dropdownCoordinates}
              clickCoordinates={clickCoordinates}
              setClickResult={setClickResult}
              setShowCompletionModal={setShowCompletionModal}
              setTimeTaken={setTimeTaken}
              setRank={setRank}
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
          {clickResultPara}
        </p>
      </div>
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
                  <td className={styles.timeTd}>{formatTime(entry.time)}</td>
                  <td className={styles.dateTd}>
                    {format(entry.date, "MM/dd/yyyy")}
                  </td>
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
