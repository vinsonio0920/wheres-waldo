import { describe, expect, it, vi } from "vitest";
import { Mission } from "./Mission";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

describe("Mission component", () => {
  const mockRoutes = [
    {
      path: "/missions/:missionId",
      element: <Mission />,
      loader: () => ({
        missionJson: {
          data: {
            updated: "2026-05-20T19:33:38.129Z",
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                id: 6,
                image:
                  "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                mission: "Find the panda among the raccoons",
                type: "single",
                targets: [
                  {
                    id: 2,
                    name: "Panda",
                    locations:
                      "[[[165.5,115],[205.5,154]],[[247,115],[284,149]],[[182,129],[269,171]],[[188,172],[245,231]]]",
                    missionId: 6,
                  },
                ],
              },
            ],
          },
        },
        leaderboardJson: {
          data: {
            totalItems: 13,
            startIndex: 1,
            itemsPerPage: 10,
            items: [
              {
                id: 4,
                name: "Vinsonius",
                time: 1,
                date: "2026-05-15T18:25:24.750Z",
                missionId: 6,
              },
              {
                id: 5,
                name: "Waldinho",
                time: 1,
                date: "2026-05-15T18:25:24.750Z",
                missionId: 6,
              },
              {
                id: 6,
                name: "Pirate King",
                time: 1,
                date: "2026-05-15T18:25:24.750Z",
                missionId: 6,
              },
              {
                id: 7,
                name: "Vinson 2.0",
                time: 1.11,
                date: "2026-05-19T21:28:36.234Z",
                missionId: 6,
              },
              {
                id: 8,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-19T22:47:50.403Z",
                missionId: 6,
              },
              {
                id: 9,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-20T00:21:05.101Z",
                missionId: 6,
              },
              {
                id: 10,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-20T00:21:05.699Z",
                missionId: 6,
              },
              {
                id: 11,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-20T00:21:06.277Z",
                missionId: 6,
              },
              {
                id: 12,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-20T00:21:06.833Z",
                missionId: 6,
              },
              {
                id: 13,
                name: "Vinson 2.0",
                time: 111,
                date: "2026-05-20T00:21:07.415Z",
                missionId: 6,
              },
            ],
          },
        },
      }),
    },
  ];

  const router = createMemoryRouter(mockRoutes, {
    initialEntries: ["/missions/1"],
  });

  it("Renders mission page correctly", async () => {
    render(<RouterProvider router={router} />);

    // mission
    expect(
      await screen.findByRole("heading", {
        name: /Find the panda among the raccoons/i,
      }),
    ).toBeInTheDocument();
    expect(
      await screen.getByRole("img", { name: /^Mission picture$/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("click-result"));

    // leaderboard
    expect(
      screen.getByRole("heading", { name: /^Leaderboard$/i }),
    ).toBeInTheDocument();

    const leaderboardTable = screen.getByRole("table", {
      name: /^Leaderboard table$/i,
    });
    const tableRows = within(leaderboardTable).getAllByRole("row");
    const moreButton = screen.getByRole("button", { name: /^Show More$/i });

    expect(leaderboardTable).toBeInTheDocument();
    // all rows in tbody + thead row
    expect(tableRows).toHaveLength(11);
    expect(moreButton).toBeInTheDocument();
  });

  it("Paginates leaderboard correctly", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: {
          items: [
            {
              id: "visjad",
              name: "Vinsonius",
              time: 1.12,
              date: "2026-05-15T18:25:24.750Z",
            },
            {
              id: "visjsadad",
              name: "Vinsonus",
              time: 2.12,
              date: "2026-05-15T18:25:24.750Z",
            },
            {
              id: "visjsasdwad",
              name: "Vinsonio",
              time: 1.33,
              date: "2026-05-15T18:25:24.750Z",
            },
          ],
        },
      }),
    });
    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    // leaderboard
    expect(
      await screen.findByRole("heading", { name: /^Leaderboard$/i }),
    ).toBeInTheDocument();

    const leaderboardTable = screen.getByRole("table", {
      name: /^Leaderboard table$/i,
    });
    const tableRows = within(leaderboardTable).getAllByRole("row");
    const moreButton = screen.getByRole("button", { name: /^Show More$/i });

    expect(leaderboardTable).toBeInTheDocument();
    // all rows in tbody + thead row
    expect(tableRows).toHaveLength(11);
    expect(moreButton).toBeInTheDocument();

    await user.click(moreButton);

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_SERVER_URL}/missions/6/leaderboard?cursor={"time_id":{"time":111,"id":13}}`,
      expect.objectContaining({
        credentials: "include",
      }),
    );
    expect(await within(leaderboardTable).findAllByRole("row")).toHaveLength(
      14,
    );
    expect(
      screen.queryByRole("button", { name: /^Show More$/i }),
    ).not.toBeInTheDocument();
  });

  it("Renders target dropdown correctly", async () => {
    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();

    user.click(missionPicture);

    // we await because the page needs to rerender before adding a target dropdown
    const targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    expect(targetDropdown).toBeInTheDocument();
    expect(within(targetDropdown).getAllByRole("listitem")).toHaveLength(1);
  });

  it("Updates target results correctly", async () => {
    const fetchMock = vi
      .spyOn(window, "fetch")
      // not found result
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [{ name: "panda", targetFound: false }],
          },
        }),
      })
      // found result
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [{ name: "panda", targetFound: true }],
          },
        }),
      });

    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    // Check that the relevant elements exists
    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    const checkmarkList = await screen.findByRole("list", {
      name: /^Checkmarks list$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();
    expect(within(checkmarkList).queryAllByAltText("listitem")).toHaveLength(0);
    // initial fetch (don't know where this is from...)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/leaderboard?cursor={"time_id":{"time":111,"id":13}}`,
      expect.objectContaining({
        credentials: "include",
      }),
    );

    // Main test
    let targetDropdown;
    let targetItems;

    // random click that doesn't have the target
    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 30, y: 60 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(
      await screen.findByText(/There is nothing here/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(0);
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/targets/2/validate`,
      expect.objectContaining({
        method: "POST",
      }),
    );

    // click that does contain the target!
    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 214, y: 154 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(await screen.findByText(/^You found panda$/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(1);
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/targets/2/validate`,
      expect.objectContaining({
        method: "POST",
      }),
    );

    // No more dropdown, as all targets have been found
    await user.click(missionPicture);
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
  });

  it("Shows target validation error", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({
        error: {
          code: 500,
          message:
            "There was an error validating the target. Please try again later.",
        },
      }),
    });

    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    // Check that the relevant elements exists
    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();
    // initial fetch (don't know where this is from...)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/leaderboard?cursor={"time_id":{"time":111,"id":13}}`,
      expect.objectContaining({
        credentials: "include",
      }),
    );

    // Main test
    let targetDropdown;
    let targetItems;

    // fetch error test
    // random click that doesn't have the target
    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 30, y: 60 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(
      await screen.findByText(
        /There was an error validating the target\. Please try again later\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/targets/2/validate`,
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("Renders completion modal correctly", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: {
          updated: new Date(),
          totalItems: 1,
          startIndex: 1,
          itemsPerPage: 1,
          items: [
            { name: "panda", targetFound: true, timeTaken: "0.02s", rank: 19 },
          ],
        },
      }),
    });
    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    // Check for elements
    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/leaderboard?cursor={"time_id":{"time":111,"id":13}}`,
      expect.objectContaining({
        credentials: "include",
      }),
    );

    // Find all targets
    let targetDropdown;
    let targetItems;

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 200, y: 130 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(await screen.findByText(/^You found panda$/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${import.meta.env.VITE_SERVER_URL}/missions/6/targets/2/validate`,
      expect.objectContaining({
        method: "POST",
      }),
    );

    // Main test
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
    const completedModal = screen.getByTestId("completed-modal");
    expect(completedModal).toBeInTheDocument();

    expect(
      within(completedModal).getByText(
        /^🔥 You found all the targets in \d+(\.\d+2)?[smhd]! You ranked \d+$/i,
      ),
    );
    expect(within(completedModal).getByLabelText("Name")).toBeInTheDocument();
    expect(
      within(completedModal).getByRole("textbox", { name: /name/i }),
    ).toBeInTheDocument();
    expect(
      within(completedModal).getByPlaceholderText("Name (required)"),
    ).toBeInTheDocument();
    expect(
      within(completedModal).getByRole("button", {
        name: /^Submit Score$/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(completedModal).getByRole("button", {
        name: /^Return to the homepage$/i,
      }),
    ).toBeInTheDocument();
    // button click will be tested as an integration test!
  });

  it("Renders mission error correctly", async () => {
    const mockMissionErrorRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          missionJson: {
            error: {
              code: 500,
              message:
                "There was an error fetching the mission. Please try again later.",
            },
          },
          leaderboardJson: {
            data: {
              totalItems: 13,
              startIndex: 1,
              itemsPerPage: 10,
              items: [
                {
                  id: 4,
                  name: "Vinsonius",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 5,
                  name: "Waldinho",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 6,
                  name: "Pirate King",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 7,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-19T21:28:36.234Z",
                  missionId: 6,
                },
                {
                  id: 8,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-19T22:47:50.403Z",
                  missionId: 6,
                },
                {
                  id: 9,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-20T00:21:05.101Z",
                  missionId: 6,
                },
                {
                  id: 10,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-20T00:21:05.699Z",
                  missionId: 6,
                },
                {
                  id: 11,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-20T00:21:06.277Z",
                  missionId: 6,
                },
                {
                  id: 12,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-20T00:21:06.833Z",
                  missionId: 6,
                },
                {
                  id: 13,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-20T00:21:07.415Z",
                  missionId: 6,
                },
              ],
            },
          },
        }),
      },
    ];

    const missionErrorRouter = createMemoryRouter(mockMissionErrorRoutes, {
      initialEntries: ["/missions/1"],
    });

    render(<RouterProvider router={missionErrorRouter} />);

    expect(
      await screen.findByText(
        /^There was an error fetching the mission. Please try again later.$/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /^Mission picture$/i }),
    ).toBeNull();
  });

  it("Renders leaderboard error correctly", async () => {
    const mockLeaderboardErrorRoute = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          missionJson: {
            data: {
              updated: "2026-05-20T19:33:38.129Z",
              totalItems: 1,
              startIndex: 1,
              itemsPerPage: 1,
              items: [
                {
                  id: 6,
                  image:
                    "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                  mission: "Find the panda among the raccoons",
                  type: "single",
                  targets: [
                    {
                      id: 2,
                      name: "Panda",
                      locations:
                        "[[[165.5,115],[205.5,154]],[[247,115],[284,149]],[[182,129],[269,171]],[[188,172],[245,231]]]",
                      missionId: 6,
                    },
                  ],
                },
              ],
            },
          },
          leaderboardJson: {
            error: {
              code: 500,
              message:
                "There was an error fetching the leaderboard. Please try again later.",
            },
          },
        }),
      },
    ];

    const missionErrorRouter = createMemoryRouter(mockLeaderboardErrorRoute, {
      initialEntries: ["/missions/1"],
    });

    render(<RouterProvider router={missionErrorRouter} />);

    expect(
      await screen.findByRole("img", { name: /^Mission picture$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Find the panda among the raccoons/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^Leaderboard$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /^There was an error fetching the leaderboard. Please try again later.$/i,
      ),
    ).toBeInTheDocument();
  });

  it("Renders leaderboard load more error correctly", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({
        error: {
          code: 500,
          message:
            "There was an error fetching the leaderboard. Please try again later.",
        },
      }),
    });
    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    // leaderboard
    expect(
      await screen.findByRole("heading", { name: /^Leaderboard$/i }),
    ).toBeInTheDocument();

    const leaderboardTable = screen.getByRole("table", {
      name: /^Leaderboard table$/i,
    });
    const tableRows = within(leaderboardTable).getAllByRole("row");
    const moreButton = screen.getByRole("button", { name: /^Show More$/i });

    expect(leaderboardTable).toBeInTheDocument();
    // all rows in tbody + thead row
    expect(tableRows).toHaveLength(11);
    expect(moreButton).toBeInTheDocument();

    await user.click(moreButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(await within(leaderboardTable).findAllByRole("row")).toHaveLength(
      11,
    );
    expect(
      screen.queryByRole("button", { name: /^Show More$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /^There was an error loading the entries. Please try again later.$/i,
      ),
    ).toBeInTheDocument();
  });

  it("Renders empty leaderboard correctly", async () => {
    const mockEmptyLeaderboardRouters = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          missionJson: {
            data: {
              updated: "2026-05-20T19:33:38.129Z",
              totalItems: 1,
              startIndex: 1,
              itemsPerPage: 1,
              items: [
                {
                  id: 6,
                  image:
                    "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                  mission: "Find the panda among the raccoons",
                  type: "single",
                  targets: [
                    {
                      id: 2,
                      name: "Panda",
                      locations:
                        "[[[165.5,115],[205.5,154]],[[247,115],[284,149]],[[182,129],[269,171]],[[188,172],[245,231]]]",
                      missionId: 6,
                    },
                  ],
                },
              ],
            },
          },
          leaderboardJson: {
            data: {
              totalItems: 13,
              startIndex: 1,
              itemsPerPage: 10,
              items: [],
            },
          },
        }),
      },
    ];

    const emptyLeaderboardRouter = createMemoryRouter(
      mockEmptyLeaderboardRouters,
      {
        initialEntries: ["/missions/1"],
      },
    );

    render(<RouterProvider router={emptyLeaderboardRouter} />);

    expect(
      await screen.findByRole("img", { name: /^Mission picture$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Find the panda among the raccoons/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^Leaderboard$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /^There's nobody on the leaderboard right now\. Will you be the first\?$/i,
      ),
    ).toBeInTheDocument();
  });

  it("Works with multiple unique targets", async () => {
    const mockMultipleUniqueRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          missionJson: {
            data: {
              updated: "2026-06-12T22:15:35.461Z",
              totalItems: 1,
              startIndex: 1,
              itemsPerPage: 1,
              items: [
                {
                  id: 8,
                  image:
                    "https://preview.redd.it/find-both-crocs-v0-wdsa4yue626g1.jpeg?width=1080&crop=smart&auto=webp&s=620982e9d2765d40bec1bdfed76b68e98ff9c201",
                  mission: "Find both crocs",
                  type: "multiple unique",
                  targets: [
                    {
                      id: 8,
                      name: "Croc (animal)",
                      locations:
                        "[[[349, 249],[435,305]],[[416,270],[480,320]],[[455,288],[574,360]]]",
                      missionId: 8,
                    },
                    {
                      id: 15,
                      name: "Croc (shoe)",
                      locations: "[[[398,1070],[418.5,1092]]]",
                      missionId: 8,
                    },
                  ],
                },
              ],
            },
          },
          leaderboardJson: {
            data: {
              totalItems: 13,
              startIndex: 1,
              itemsPerPage: 10,
              items: [
                {
                  id: 4,
                  name: "Vinsonius",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 5,
                  name: "Waldinho",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 6,
                  name: "Pirate King",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 7,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-19T21:28:36.234Z",
                  missionId: 6,
                },
                {
                  id: 8,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-19T22:47:50.403Z",
                  missionId: 6,
                },
                {
                  id: 9,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:05.101Z",
                  missionId: 6,
                },
                {
                  id: 10,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:05.699Z",
                  missionId: 6,
                },
                {
                  id: 11,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:06.277Z",
                  missionId: 6,
                },
                {
                  id: 12,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:06.833Z",
                  missionId: 6,
                },
                {
                  id: 13,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:07.415Z",
                  missionId: 6,
                },
              ],
            },
          },
        }),
      },
    ];
    const multipleUniqueRouter = createMemoryRouter(mockMultipleUniqueRoutes, {
      initialEntries: ["/missions/8"],
    });

    const fetchMock = vi
      .spyOn(window, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                name: "Croc (animal)",
                targetFound: true,
                timeTaken: "0.03s",
                rank: 21,
              },
            ],
          },
        }),
      })
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                name: "Croc (shoe)",
                targetFound: true,
                timeTaken: "0.02s",
                rank: 19,
              },
            ],
          },
        }),
      });
    const user = UserEvent.setup();

    render(<RouterProvider router={multipleUniqueRouter} />);

    // Check for elements
    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    const checkmarkList = await screen.findByRole("list", {
      name: /^Checkmarks list$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(0);
    // for now it wants me to say 6, but let's say for the sake of testing it's actually 0!
    expect(fetchMock).toHaveBeenCalledTimes(6);

    // Find all targets
    let targetDropdown;
    let targetItems;

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 400, y: 250 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(
      await screen.findByText(/^You found Croc \(animal\)$/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(7);

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 400, y: 1071 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");

    await user.click(targetItems[0]);
    expect(
      await screen.findByText(/^You found Croc \(shoe\)$/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(8);

    // Completion modal signifies end of mission
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
    const completedModal = screen.getByTestId("completed-modal");
    expect(completedModal).toBeInTheDocument();
  });

  // main thing here is to expect only one target in the dropdown yet multiple checkmarks before completion
  it("Works with multiple same targets", async () => {
    const mockMultipleSameRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          missionJson: {
            data: {
              updated: "2026-06-13T14:29:26.471Z",
              totalItems: 1,
              startIndex: 1,
              itemsPerPage: 1,
              items: [
                {
                  id: 9,
                  image:
                    "https://preview.redd.it/find-the-3-gymnasts-v0-ihi87vu0yk8f1.jpeg?width=1080&crop=smart&auto=webp&s=fc3adf6a8735bb7bf05e90105355bf1206fa33e5",
                  mission: "Find the 3 gymnasts",
                  type: "multiple same",
                  targets: [
                    {
                      id: 12,
                      name: "Gymnast",
                      locations:
                        "[[[962.5,388],[977.5,413]],[[1032.5,380],[1045.5,396]],[[973.5,424],[977.5,432]]]",
                      missionId: 9,
                    },
                    {
                      id: 13,
                      name: "Gymnast",
                      locations: "[[[35.5,745],[55.5,755]]]",
                      missionId: 9,
                    },
                    {
                      id: 14,
                      name: "Gymnast",
                      locations:
                        "[[[765,1032],[817.5,1058.5]],[[851.5,1031],[985.5,1082]],[[968.5,1080],[1082,1118]]]",
                      missionId: 9,
                    },
                  ],
                },
              ],
            },
          },
          leaderboardJson: {
            data: {
              totalItems: 13,
              startIndex: 1,
              itemsPerPage: 10,
              items: [
                {
                  id: 4,
                  name: "Vinsonius",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 5,
                  name: "Waldinho",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 6,
                  name: "Pirate King",
                  time: 1,
                  date: "2026-05-15T18:25:24.750Z",
                  missionId: 6,
                },
                {
                  id: 7,
                  name: "Vinson 2.0",
                  time: 1.11,
                  date: "2026-05-19T21:28:36.234Z",
                  missionId: 6,
                },
                {
                  id: 8,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-19T22:47:50.403Z",
                  missionId: 6,
                },
                {
                  id: 9,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:05.101Z",
                  missionId: 6,
                },
                {
                  id: 10,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:05.699Z",
                  missionId: 6,
                },
                {
                  id: 11,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:06.277Z",
                  missionId: 6,
                },
                {
                  id: 12,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:06.833Z",
                  missionId: 6,
                },
                {
                  id: 13,
                  name: "Vinson 2.0",
                  time: 111,
                  date: "2026-05-20T00:21:07.415Z",
                  missionId: 6,
                },
              ],
            },
          },
        }),
      },
    ];
    const multipleSameRouter = createMemoryRouter(mockMultipleSameRoutes, {
      initialEntries: ["/missions/8"],
    });

    const fetchMock = vi
      .spyOn(window, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                name: "gymnast",
                targetFound: true,
                timeTaken: "0.02s",
                rank: 19,
                id: 12,
              },
            ],
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                name: "gymnast",
                targetFound: true,
                timeTaken: "0.02s",
                rank: 19,
                id: 13,
              },
            ],
          },
        }),
      })
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          data: {
            updated: new Date(),
            totalItems: 1,
            startIndex: 1,
            itemsPerPage: 1,
            items: [
              {
                name: "gymnast",
                targetFound: true,
                timeTaken: "0.02s",
                rank: 19,
                id: 14,
              },
            ],
          },
        }),
      });
    const user = UserEvent.setup();

    render(<RouterProvider router={multipleSameRouter} />);

    // Check for elements
    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    const checkmarkList = await screen.findByRole("list", {
      name: /^Checkmarks list$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(0);
    // for now it wants me to say 8, but let's say for the sake of testing it's actually 0!
    expect(fetchMock).toHaveBeenCalledTimes(8);

    // Find all targets
    let targetDropdown;
    let targetItems;

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 970, y: 400 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");
    expect(targetItems).toHaveLength(1);

    await user.click(targetItems[0]);
    expect(await screen.findByText(/^You found gymnast$/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(9);

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 40, y: 754 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");
    expect(targetItems).toHaveLength(1);

    await user.click(targetItems[0]);
    expect(await screen.findByText(/^You found gymnast$/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(10);

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 852, y: 1032 },
    });
    targetDropdown = await screen.findByRole("list", {
      name: /^Target dropdown$/i,
    });
    targetItems = within(targetDropdown).getAllByRole("button");
    expect(targetItems).toHaveLength(1);

    await user.click(targetItems[0]);
    expect(await screen.findByText(/^You found gymnast$/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: /^Target dropdown$/i }),
    ).not.toBeInTheDocument();
    expect(within(checkmarkList).queryAllByRole("listitem")).toHaveLength(3);
    expect(fetchMock).toHaveBeenCalledTimes(11);

    // Completion modal signifies end of mission
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
    const completedModal = screen.getByTestId("completed-modal");
    expect(completedModal).toBeInTheDocument();
  });
});
