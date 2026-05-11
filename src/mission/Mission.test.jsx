import { describe, expect, it } from "vitest";
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
        data: {
          id: 1,
          image:
            "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
          mission: "Find the panda among the raccoons",
          targets: [
            {
              key: "82a91656-fb51-4c56-bc6b-9393ac968fef",
              targetName: "Panda",
              // array of boxes, these are the possible click areas!
              locations: [
                // ears (left, right)
                [
                  [166, 203],
                  [118, 152],
                ],
                [
                  [251, 286],
                  [116, 152],
                ],
                // face
                [
                  [185, 271],
                  [127, 156],
                ],
                [
                  [176, 244],
                  [155, 233],
                ],
              ],
              sniped: false,
            },
          ],
          type: "single",
          leaderboard: [
            { name: "AnononyMouseLol123344", time: "1", date: "Test" },
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

    expect(within(leaderboardTable).getAllByRole("row")).toHaveLength(21);
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

  it("Update target results correctly", async () => {
    const user = UserEvent.setup();

    render(<RouterProvider router={router} />);

    const missionPicture = await screen.findByRole("img", {
      name: /^Mission picture$/i,
    });
    expect(missionPicture).toBeInTheDocument();
    expect(screen.getByTestId("click-result")).toBeEmptyDOMElement();

    // random click that doesn't have the target
    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 30, y: 60 },
    });
    expect(screen.getByTestId("click-result").textContent).toMatch(
      /There is nothing here/i,
    );

    await user.pointer({
      keys: "[MouseLeft]",
      target: missionPicture,
      coords: { x: 200, y: 130 },
    });
    expect(screen.getByTestId("click-result").textContent).toMatch(
      /You found panda/i,
    );
  });

  it("Renders form modal correctly", () => {
    // also tests for error and correct notification
  });

  it("Renders error correctly", () => {});
});
