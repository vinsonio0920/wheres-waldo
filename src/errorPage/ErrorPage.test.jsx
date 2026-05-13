import { describe, expect, it } from "vitest";
import { ErrorPage } from "./ErrorPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

describe("Error 404 component", () => {
  const mockRoutes = [
    {
      path: "/",
      element: <p>What's good guys!</p>,
      errorElement: <ErrorPage />,
    },
  ];

  const router = createMemoryRouter(mockRoutes, {
    initialEntries: ["/random-route"],
  });

  it("Renders error page correctly", () => {
    render(<RouterProvider router={router} />);

    const logoLink = screen.getByRole("link", { name: /^Logo$/i });
    expect(
      within(logoLink).getByRole("img", { name: /^Logo$/i }),
    ).toBeInTheDocument();
    expect(within(logoLink).getByText(/^Sniper$/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /^Wrong Target!$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^The page your are looking for doesn't exist!$/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^Head back to the homepage.$/i }),
    ).toBeInTheDocument();
  });
});
