import { describe, expect, it } from "vitest";
import { Missions } from "./Missions";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

describe("Mission component", () => {
  // successful loader data with missions
  it("Renders mission list correctly", async () => {
    // main thing here is that we're mocking the loader data!
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        loader: () => ({
          data: [
            {
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
            },
            {
              id: 2,
              image: "https://i.redd.it/ihi87vu0yk8f1.jpeg",
              mission: "Find the 3 gymnasts",
              targets: [
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
              ],
              type: "multiple similar",
            },
            {
              id: 3,
              image: "https://i.redd.it/wdsa4yue626g1.jpeg",
              mission: "Find both crocs (shoe and animal)",
              targets: [
                {
                  targetName: "Croc (shoe)",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Croc (animal)",
                  location: null,
                  sniped: false,
                },
              ],
              type: "multiple unique",
            },
          ],
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    const missionList = await screen.findByRole("list", { name: /Missions/i });
    expect(missionList).toBeInTheDocument();

    const missions = within(missionList).getAllByRole("listitem");
    expect(missions).toHaveLength(3);

    missions.forEach((mission) => {
      expect(
        within(mission).getByRole("img", { name: /^Mission picture$/i }),
      ).toBeInTheDocument();
      expect(within(mission).getByText(/Targets/i)).toBeInTheDocument();
    });
  });

  // empty loader data
  it("Renders empty mission list correctly", () => {
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        loader: () => ({
          data: [],
        }),
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { name: /^No missions yet$./i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^New missions will come, check back soon.$/i));
  });

  // error loader data
  it("Renders empty mission list correctly", () => {
    const mockRoutes = [
      {
        path: "/",
        element: <Missions />,
        error: {
          code: 500,
          message:
            "There was an error fetching the missions. Please try again later.",
        },
      },
    ];

    const router = createMemoryRouter(mockRoutes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(mockRoutes.error.message)).toBeInTheDocument();
  });
});
