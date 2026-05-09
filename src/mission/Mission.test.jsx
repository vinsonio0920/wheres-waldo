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
              { name: "Anon", time: "1", date: "Test" },
            ],
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, {
      initialEntries: [".missions/1"],
    });

    render(<RouterProvider router={router} />);

    // mission
    expect(
      await screen.findByRole("heading", {
        name: /^Mission: Find the panda amon the racoons$/i,
      }),
    ).toBeInTheDocument();
    expect(
      await screen.getByRole("img", { name: /^Mission picture$/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("click-result"));

    // leaderboard
    const leaderboard = await screen.getByRole("list", {
      name: /^Leaderboard$/i,
    });
    const moreButton = within(leaderboard).getByRole("button", { name: /^$/i });
    expect(leaderboard).toBeInTheDocument();
    expect(leaderboard).toHaveLength(10);
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
      initialEntries: [".missions/1"],
    });

    render(<RouterProvider router={router} />);

    const leaderboard = await screen.getByRole("list", {
      name: /^Leaderboard$/i,
    });
    const moreButton = within(leaderboard).getByRole("button", { name: /^$/i });
    expect(leaderboard).toBeInTheDocument();
    expect(leaderboard).toHaveLength(10);
    expect(moreButton).toBeInTheDocument();
  });

  it("Renders error correctly", () => {});

  it("Renders form correctly", () => {
    // also tests for error and correct notification
  });
});
