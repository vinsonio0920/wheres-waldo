async function missionsLoader() {
  const url = `${import.meta.env.VITE_SERVER_URL}/missions`;

  try {
    const response = await fetch(url);

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
  const url = `${import.meta.env.VITE_SERVER_URL}/missions/${missionId}`;

  try {
    const response = await fetch(url);

    const result = await response.json();
    return result;
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
