async function missionsLoader() {
  const url = `${import.meta.env.VITE_SERVER_URL}/missions`;

  try {
    const response = await fetch(url, {
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: {
        code: 500,
        message:
          "There was an error fetching the missions. Please try again later.",
      },
    };
  }
}

async function missionLoader({ params }) {
  const { missionId } = params;
  const urls = [
    `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}`,
    `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}/leaderboard`,
  ];

  try {
    const requests = urls.map((url) =>
      fetch(url, {
        credentials: "include",
      }),
    );
    const responses = await Promise.all(requests);

    const jsons = responses.map((response) => response.json());
    const [missionJson, leaderboardJson] = await Promise.all(jsons);

    return { missionJson, leaderboardJson };
  } catch (error) {
    console.error(error);
    return {
      error: {
        code: 500,
        message:
          "There was an error fetching the mission. Please try again later.",
      },
    };
  }
}

export { missionsLoader, missionLoader };
