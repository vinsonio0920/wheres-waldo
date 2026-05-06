// Tests the routing of the app

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
    // expect(screen.getByRole("list", { name: /targets/i })).toBeInTheDocument();
    // when hovered, maybe also show a list of targets to find
  });

  // add test for error 404 later
});
