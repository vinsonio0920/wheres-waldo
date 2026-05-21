import { describe, expect, it } from "vitest";
import { Missions } from "./Missions";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

describe("Missions component", () => {
  // successful loader data with missions
  it("Renders mission list correctly", async () => {
    // main thing here is that we're mocking the loader data!
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        loader: () => ({
          data: {
            updated: "2026-05-21T02:10:37.237Z",
            totalItems: 2,
            startIndex: 1,
            itemsPerPage: 10,
            items: [
              {
                id: 1,
                image:
                  "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                mission: "Find the panda among the raccoons",
                type: "single",
                targets: [
                  {
                    id: 2,
                    name: "Panda",
                    locations: [
                      [
                        [166, 203],
                        [118, 152],
                      ],
                      [
                        [251, 286],
                        [116, 152],
                      ],
                      [
                        [185, 271],
                        [127, 156],
                      ],
                      [
                        [176, 244],
                        [155, 233],
                      ],
                    ],
                    missionId: 6,
                  },
                ],
              },
              {
                id: 2,
                image:
                  "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                mission: "Find the panda (2) among the raccoons",
                type: "single",
                targets: [
                  {
                    id: 2,
                    name: "Panda",
                    locations: [
                      [
                        [166, 203],
                        [118, 152],
                      ],
                      [
                        [251, 286],
                        [116, 152],
                      ],
                      [
                        [185, 271],
                        [127, 156],
                      ],
                      [
                        [176, 244],
                        [155, 233],
                      ],
                    ],
                    missionId: 6,
                  },
                ],
              },
              {
                id: 3,
                image:
                  "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
                mission: "Find the panda (3) among the raccoons",
                type: "single",
                targets: [
                  {
                    id: 2,
                    name: "Panda",
                    locations: [
                      [
                        [166, 203],
                        [118, 152],
                      ],
                      [
                        [251, 286],
                        [116, 152],
                      ],
                      [
                        [185, 271],
                        [127, 156],
                      ],
                      [
                        [176, 244],
                        [155, 233],
                      ],
                    ],
                    missionId: 6,
                  },
                ],
              },
            ],
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    const missionList = await screen.findByRole("list", { name: /Missions/i });
    expect(missionList).toBeInTheDocument();

    const missions = within(missionList).getAllByRole("listitem");
    expect(missions).toHaveLength(3);

    // we use index since it fits with the mock data ids
    missions.forEach((mission, index) => {
      expect(within(mission).getByRole("link")).toBeInTheDocument();
      expect(within(mission).getByRole("link")).toHaveAttribute(
        "href",
        `/missions/${index + 1}`,
      );
      expect(
        within(mission).getByRole("img", { name: /^Mission picture$/i }),
      ).toBeInTheDocument();
      expect(within(mission).getByText(/Targets/i)).toBeInTheDocument();
    });
  });

  // empty loader data
  it("Renders empty mission list correctly", async () => {
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        loader: () => ({
          data: {
            updated: "2026-05-21T02:10:37.237Z",
            totalItems: 2,
            startIndex: 1,
            itemsPerPage: 10,
            items: [],
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { name: /^No missions yet$/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^New missions will come, check back soon.$/i));
  });

  // error loader data
  it("Renders error correctly", async () => {
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        loader: () => ({
          error: {
            code: 500,
            message:
              "There was an error fetching the missions. Please try again later.",
          },
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText(
        "There was an error fetching the missions. Please try again later.",
      ),
    ).toBeInTheDocument();
  });
});
