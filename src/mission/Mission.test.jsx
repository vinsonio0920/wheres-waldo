import { describe, expect, it } from "vitest";
import { Mission } from "./Mission";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

describe("Mission component", () => {
  it("Renders mission page correctly", async () => {
    const mockRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          data: {
            id: 1,
            image:
              "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
            mission: "Find the panda among the raccoons",
            targets: [
              {
                targetName: "Panda",
                location: null,
                sniped: false,
              },
            ],
            type: "single",
            leaderboard: [
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "1", date: "Test" },
            ],
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, {
      initialEntries: ["/missions/1"],
    });

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
    const user = UserEvent.setup();
    const mockRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          data: {
            id: 1,
            image:
              "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
            mission: "Find the panda among the raccoons",
            targets: [
              {
                targetName: "Panda",
                location: null,
                sniped: false,
              },
            ],
            type: "single",
            leaderboard: [
              { name: "Anon", time: "1", date: "Test" },
              { name: "Anon", time: "2", date: "Test" },
              { name: "Anon", time: "3", date: "Test" },
              { name: "Anon", time: "4", date: "Test" },
              { name: "Anon", time: "5", date: "Test" },
              { name: "Anon", time: "6", date: "Test" },
              { name: "Anon", time: "7", date: "Test" },
              { name: "Anon", time: "8", date: "Test" },
              { name: "Anon", time: "9", date: "Test" },
              { name: "Anon", time: "10", date: "Test" },
            ],
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, {
      initialEntries: ["/missions/1"],
    });

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

    expect(within(leaderboardTable).getAllByRole("row")).toHaveLength(21);
    expect(
      screen.queryByRole("button", { name: /^Show More$/i }),
    ).not.toBeInTheDocument();
  });

  it("Renders error correctly", () => {});

  it("Renders form correctly", () => {
    // also tests for error and correct notification
  });
});
