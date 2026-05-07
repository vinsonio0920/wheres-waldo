// Tests the routing of the app (integration)

import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { routes } from "./routes";
import { render, screen } from "@testing-library/react";

describe("Full app rendering and navigation", () => {
  test("Homepage loads on index route", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();

    expect(screen.getByRole("list", { name: /missions/i })).toBeInTheDocument();
  });

  // add test for error 404 later
});
