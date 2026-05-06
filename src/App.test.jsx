// tests React of App component

import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
  it("Renders header correctly", () => {
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
  });
});
