import { describe, it } from "vitest";
import { Mission } from "./Mission";

describe("Mission component", () => {
  it("Renders mission page correctly", () => {
    const mockRoutes = [
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({}),
      },
    ];
  });

  it("Renders error correctly", () => {});

  it("Renders form correctly", () => {});
});
