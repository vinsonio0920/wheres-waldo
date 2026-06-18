import { describe, expect, it } from "vitest";
import { Attributions } from "./Attributions";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

describe("Attributions component", () => {
  const mockRoutes = [
    {
      path: "/",
      element: <p>Index route</p>,
    },
    {
      path: "/attributions",
      element: <Attributions />,
    },
  ];

  const router = createMemoryRouter(mockRoutes, {
    initialEntries: ["/attributions"],
  });

  it("Renders attributions page correctly", () => {
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { name: /Attributions/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("attributions-para")).toBeInTheDocument();

    const attributionsList = screen.getByRole("list", {
      name: /^Attributions list$/i,
    });
    expect(attributionsList).toBeInTheDocument();
    expect(within(attributionsList).getAllByRole("listitem")).toHaveLength(4);
  });
});
