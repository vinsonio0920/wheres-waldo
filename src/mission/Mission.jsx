import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
      <h1>Mission:{data.mission}</h1>
      <div>
        <img src={data.image} width={300} alt="Mission picture" />
        <p data-testid="click-result"></p>
      </div>
      <p>NOTE: </p>
      <div>
        <h2>Leaderboard</h2>
        <table aria-label="Leaderboard table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.time}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.time}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaderboard.length < 20 && (
          <button type="button" onClick={handleButtonClick}>
            Show more
          </button>
        )}
      </div>
    </>
  );
};

export { Mission };
