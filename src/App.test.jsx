// tests React of App component

import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App component", () => {
  it("Renders header correctly", () => {
    render(<App />);

    // header
    expect(screen.getByRole("banner")).toBeInTheDocument();

    const header = screen.getByRole("banner");
    expect(header.getByRole("heading").textContent).toMatch(/Sniper/i);
    expect(
      header.getByRole("link", { name: /Attributions/i }),
    ).toBeInTheDocument();
    expect(header.getByRole("link", { name: /Home/i })).toBeInTheDocument();
  });
});
