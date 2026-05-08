// tests React of App component

import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserEvent from "@testing-library/user-event";
import { setScreenSize } from "../tests/utils";

describe("App component", () => {
  const dropdownLinks = ["Attributions", "Missions"];

  it("Renders mobile header correctly", async () => {
    setScreenSize(300);
    const user = UserEvent.setup();

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
    expect(screen.queryByRole("list", { name: /^Menu dropdown$/i })).toBeNull();
    await user.click(menuButton);

    const menuDropdown = screen.queryByRole("list", {
      name: /^Menu dropdown$/i,
    });
    expect(menuDropdown).toBeInTheDocument();
    expect(within(menuDropdown).getAllByRole("listitem")).toHaveLength(
      dropdownLinks.length,
    );
  });

  it("Renders desktop header correctly", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // header
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toMatch(/Sniper/i);
    expect(
      screen.getByRole("link", { name: /Attributions/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Missions/i })).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /^Menu$/i })).toBeNull();
    expect(screen.queryByRole("list", { name: /^Menu dropdown$/i })).toBeNull();
  });
});
