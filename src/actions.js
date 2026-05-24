async function missionAction({ request }) {
  // if error don't do anything and show error
  // redirect back to the homepage

  const formData = Object.fromEntries(await request.formData());
  const url = `${import.meta.env.VITE_SERVER_URL}/missions/${formData.missionId}/leaderboard`;
  console.log(url);

  try {
    const { name, missionId } = formData;
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        name,
        time: "11.12", // placeholder time
        missionId,
      }),
    });
    if (!response.ok && response.status !== 400)
      throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: {
        code: 500,
        message:
          "There was an error submitting your score. Please try again later.",
      },
    };
  }
}

export { missionAction };
