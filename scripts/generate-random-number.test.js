import { afterEach, describe, expect, it, vi } from "vitest";
import generateRandomNumbers from "./generate-random-number";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("generateRandomNumbers", () => {
  it("returns inclusive integers for integer bounds", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(generateRandomNumbers("1", "10", 2)).toBe(10);
  });

  it("returns a fixed precision decimal for decimal bounds", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(generateRandomNumbers(1.5, 2.5, 2)).toBe("2.00");
  });

  it("rejects invalid or reversed ranges", () => {
    expect(() => generateRandomNumbers("", 10, 2)).toThrow();
    expect(() => generateRandomNumbers(10, 1, 2)).toThrow(/Minimum/);
  });
});
