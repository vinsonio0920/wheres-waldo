// tests React of App component

import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// NOTE: We do not test CSS media queries (display: none) here
describe("App component", () => {
  const dropdownLinks = ["Attributions", "Missions"];

  it("Renders header correctly", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // header
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toMatch(/Sniper/i);

    const menuButton = screen.getByRole("button", { name: /^Menu$/i });
    expect(menuButton).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /^Menu dropdown$/i }),
    ).toBeInTheDocument();

    const menuDropdown = screen.queryByRole("list", {
      name: /^Menu dropdown$/i,
    });
    expect(menuDropdown).toBeInTheDocument();
    expect(within(menuDropdown).getAllByRole("listitem")).toHaveLength(
      dropdownLinks.length,
    );
  });
});
