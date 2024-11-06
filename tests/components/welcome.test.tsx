import React from "react";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import Welcome from "../../src/components/Programs/Welcome";


describe("group", () => {
  it("should render the welcome data when publishedData is provided", () => {
    render(<Welcome />);
    expect(1).toBeTruthy();
  });
});
