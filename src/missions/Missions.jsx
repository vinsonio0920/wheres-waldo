import { useLoaderData } from "react-router-dom";

const Missions = () => {
  const result = useLoaderData();
  console.log(result.data);

  return (
    <ul className="missionList" aria-label="Missions">
      {result.data.map((mission) => (
        <li key={mission.id}>
          <img src={mission.image} alt="Mission picture" width={300} />
          <p>Targets: {mission.targets.length}</p>
        </li>
      ))}
    </ul>
  );
};

export { Missions };
