async function missionAction({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const url = `${import.meta.env.VITE_SERVER_URL}/missions/${formData.missionId}/leaderboard`;

  try {
    const { name, missionId } = formData;
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        name,
        missionId,
      }),
      credentials: "include",
    });
    if (!response.ok && response.status !== 400)
      throw new Error(`Response status: ${response.status}`);

    // save the name to localStorage for future forms
    localStorage.setItem("name", name);

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
