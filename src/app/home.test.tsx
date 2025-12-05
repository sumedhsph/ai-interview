import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Homepage", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText(/AI Interview Master/i)).toBeInTheDocument();
  });

  it("has a start button linking to interview", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /start mock interview/i });
    expect(link).toHaveAttribute("href", "/interview");
  });
});
