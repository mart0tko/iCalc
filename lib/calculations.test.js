import { describe, expect, it } from "vitest";
import {
  calculateBmi,
  calculateBmr,
  calculateBtuRequirement,
  calculateCagr,
  calculateCatAge,
  calculateCompoundInterest,
  calculateDiscount,
  calculateDogAge,
  calculateFuelCost,
  calculateLoan,
  calculateMargin,
  calculateAreaFromBtu,
  calculateRate,
  calculateSalaryRates,
  calculateSip,
  calculateTip,
  percentage,
  percentageChange,
  percentageDifference,
} from "./calculations";

describe("percentage calculations", () => {
  it("calculates a percentage of a value", () => {
    expect(percentage(20, 150)).toBe(30);
  });

  it("calculates percentage change and difference", () => {
    expect(percentageChange(100, 125)).toBe(25);
    expect(percentageDifference(80, 120)).toBe(40);
    expect(percentageDifference(0, 0)).toBe(0);
  });

  it("rejects percentage change from zero", () => {
    expect(() => percentageChange(0, 10)).toThrow(/must not be zero/);
  });
});

describe("health calculations", () => {
  it("calculates BMI from kilograms and meters", () => {
    expect(calculateBmi(70, 1.75)).toBeCloseTo(22.86, 2);
  });

  it("uses the Mifflin-St Jeor BMR formula", () => {
    expect(
      calculateBmr({
        age: 30,
        weightKg: 70,
        heightCm: 175,
        gender: "male",
      })
    ).toBeCloseTo(1648.75, 2);
  });

  it("rejects invalid physical measurements", () => {
    expect(() => calculateBmi(70, 0)).toThrow(/Height/);
  });

  it("uses a cat-specific age curve", () => {
    expect(calculateCatAge(1)).toBe(15);
    expect(calculateCatAge(2)).toBe(24);
    expect(calculateCatAge(5)).toBe(36);
  });

  it("uses a dog-specific age curve", () => {
    expect(calculateDogAge(1)).toBe(15);
    expect(calculateDogAge(2)).toBe(24);
    expect(calculateDogAge(5)).toBe(39);
  });
});

describe("financial calculations", () => {
  it("calculates amortized and zero-interest loans", () => {
    const loan = calculateLoan(100000, 5, 60);
    expect(loan.monthlyPayment).toBeCloseTo(1887.12, 2);
    expect(calculateLoan(1200, 0, 12).monthlyPayment).toBe(100);
  });

  it("calculates compound interest", () => {
    expect(calculateCompoundInterest(10000, 5, 5, 1)).toBeCloseTo(12762.82, 2);
  });

  it("includes the initial principal in SIP growth", () => {
    const result = calculateSip(1000, 100, 0, 1);
    expect(result.futureValue).toBe(2200);
    expect(result.totalInvestment).toBe(2200);
    expect(result.totalReturns).toBe(0);
  });

  it("calculates CAGR", () => {
    expect(calculateCagr(10000, 20000, 5)).toBeCloseTo(14.87, 2);
  });

  it("calculates margin, discounts, and tips", () => {
    expect(calculateMargin(60, 100)).toEqual({
      profit: 40,
      margin: 40,
      markup: 66.66666666666666,
    });
    expect(calculateDiscount(100, 25)).toEqual({
      savings: 25,
      finalPrice: 75,
    });
    expect(calculateTip(100, 20)).toEqual({ tip: 20, total: 120 });
  });

  it("rejects invalid zero divisors and discount ranges", () => {
    expect(() => calculateMargin(10, 0)).toThrow(/Revenue/);
    expect(() => calculateDiscount(100, 110)).toThrow(/between 0 and 100/);
  });

  it("calculates salary and business rates safely", () => {
    expect(calculateSalaryRates(52_000, 40)).toEqual({
      hourly: 25,
      weekly: 1000,
    });
    expect(calculateRate(25, 100)).toBe(25);
    expect(() => calculateRate(1, 0)).toThrow();
  });
});

describe("travel calculations", () => {
  it("calculates fuel cost", () => {
    expect(calculateFuelCost(200, 10, 1.5)).toBe(30);
  });

  it("converts between room area and BTU capacity", () => {
    const requirement = calculateBtuRequirement(20);
    expect(requirement.heating).toBeCloseTo(5382, 2);
    expect(requirement.cooling).toBeCloseTo(4305.6, 2);
    expect(calculateAreaFromBtu(requirement.heating).heating).toBeCloseTo(
      20,
      5
    );
  });
});
