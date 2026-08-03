function finiteNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new RangeError(`${name} must be a finite number.`);
  }
  return number;
}

function positiveNumber(value, name, { allowZero = false } = {}) {
  const number = finiteNumber(value, name);
  if (allowZero ? number < 0 : number <= 0) {
    throw new RangeError(
      `${name} must be ${allowZero ? "zero or greater" : "greater than zero"}.`
    );
  }
  return number;
}

export function percentage(percent, value) {
  return (
    (finiteNumber(percent, "Percent") * finiteNumber(value, "Value")) / 100
  );
}

export function percentageChange(original, next) {
  const start = finiteNumber(original, "Original value");
  if (start === 0) {
    throw new RangeError("Original value must not be zero.");
  }
  return ((finiteNumber(next, "New value") - start) / Math.abs(start)) * 100;
}

export function percentageDifference(first, second) {
  const a = finiteNumber(first, "First value");
  const b = finiteNumber(second, "Second value");
  const average = (Math.abs(a) + Math.abs(b)) / 2;
  if (average === 0) {
    return 0;
  }
  return (Math.abs(a - b) / average) * 100;
}

export function calculateBmi(weightKg, heightMeters) {
  const weight = positiveNumber(weightKg, "Weight");
  const height = positiveNumber(heightMeters, "Height");
  return weight / height ** 2;
}

export function calculateBmr({ age, weightKg, heightCm, gender }) {
  const validAge = positiveNumber(age, "Age");
  const weight = positiveNumber(weightKg, "Weight");
  const height = positiveNumber(heightCm, "Height");
  if (!["female", "male"].includes(gender)) {
    throw new RangeError("Gender must be female or male.");
  }

  // Mifflin-St Jeor equation.
  return (
    10 * weight + 6.25 * height - 5 * validAge + (gender === "male" ? 5 : -161)
  );
}

export function calculateLoan(principal, annualRate, months) {
  const amount = positiveNumber(principal, "Loan amount");
  const term = positiveNumber(months, "Loan term");
  const yearlyRate = positiveNumber(annualRate, "Interest rate", {
    allowZero: true,
  });
  const monthlyRate = yearlyRate / 100 / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? amount / term
      : (amount * monthlyRate * (1 + monthlyRate) ** term) /
        ((1 + monthlyRate) ** term - 1);
  const totalPayment = monthlyPayment * term;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - amount,
  };
}

export function calculateCompoundInterest(
  principal,
  annualRate,
  years,
  compoundsPerYear
) {
  const amount = positiveNumber(principal, "Principal", { allowZero: true });
  const rate = finiteNumber(annualRate, "Interest rate") / 100;
  const duration = positiveNumber(years, "Years", { allowZero: true });
  const frequency = positiveNumber(compoundsPerYear, "Compounding frequency");
  return amount * (1 + rate / frequency) ** (frequency * duration);
}

export function calculateSip(principal, monthlyInvestment, annualRate, years) {
  const initial = positiveNumber(principal, "Initial investment", {
    allowZero: true,
  });
  const contribution = positiveNumber(monthlyInvestment, "Monthly investment", {
    allowZero: true,
  });
  const rate = finiteNumber(annualRate, "Interest rate") / 100 / 12;
  const months = positiveNumber(years, "Duration") * 12;
  let futureValue = initial;

  for (let month = 0; month < months; month += 1) {
    futureValue = (futureValue + contribution) * (1 + rate);
  }

  const totalInvestment = initial + contribution * months;
  return {
    futureValue,
    totalInvestment,
    totalReturns: futureValue - totalInvestment,
  };
}

export function calculateCagr(initialValue, finalValue, years) {
  const initial = positiveNumber(initialValue, "Initial value");
  const final = positiveNumber(finalValue, "Final value", { allowZero: true });
  const duration = positiveNumber(years, "Years");
  return ((final / initial) ** (1 / duration) - 1) * 100;
}

export function calculateFuelCost(distance, efficiency, price) {
  const validDistance = positiveNumber(distance, "Distance");
  const validEfficiency = positiveNumber(efficiency, "Fuel efficiency");
  const validPrice = positiveNumber(price, "Fuel price", { allowZero: true });
  return (validDistance / validEfficiency) * validPrice;
}

export function calculateMargin(cost, revenue) {
  const validCost = finiteNumber(cost, "Cost");
  const validRevenue = finiteNumber(revenue, "Revenue");
  if (validRevenue === 0) {
    throw new RangeError("Revenue must not be zero.");
  }
  const profit = validRevenue - validCost;
  return {
    profit,
    margin: (profit / validRevenue) * 100,
    markup: validCost === 0 ? null : (profit / validCost) * 100,
  };
}

export function calculateDiscount(price, discountPercent) {
  const validPrice = positiveNumber(price, "Price", { allowZero: true });
  const discount = finiteNumber(discountPercent, "Discount");
  if (discount < 0 || discount > 100) {
    throw new RangeError("Discount must be between 0 and 100.");
  }
  const savings = (validPrice * discount) / 100;
  return { savings, finalPrice: validPrice - savings };
}

export function calculateTip(bill, tipPercent) {
  const validBill = positiveNumber(bill, "Bill", { allowZero: true });
  const percent = positiveNumber(tipPercent, "Tip", { allowZero: true });
  const tip = (validBill * percent) / 100;
  return { tip, total: validBill + tip };
}

export function calculateRate(part, total, label = "Total") {
  const validPart = positiveNumber(part, "Value", { allowZero: true });
  const validTotal = positiveNumber(total, label);
  return (validPart / validTotal) * 100;
}

export function calculateSalaryRates(annualSalary, hoursPerWeek) {
  const salary = positiveNumber(annualSalary, "Salary", { allowZero: true });
  const weeklyHours = positiveNumber(hoursPerWeek, "Hours per week");
  return {
    hourly: salary / (weeklyHours * 52),
    weekly: salary / 52,
  };
}

export function calculateCatAge(age) {
  const years = positiveNumber(age, "Cat age");
  if (years <= 1) return years * 15;
  if (years <= 2) return 15 + (years - 1) * 9;
  return 24 + (years - 2) * 4;
}

export function calculateDogAge(age) {
  const years = positiveNumber(age, "Dog age");
  if (years <= 1) return years * 15;
  if (years <= 2) return 15 + (years - 1) * 9;
  return 24 + (years - 2) * 5;
}

const HEATING_BTU_PER_SQUARE_METER = 25 * 10.764;
const COOLING_BTU_PER_SQUARE_METER = 20 * 10.764;

export function calculateBtuRequirement(areaSquareMeters) {
  const area = positiveNumber(areaSquareMeters, "Area");
  return {
    heating: area * HEATING_BTU_PER_SQUARE_METER,
    cooling: area * COOLING_BTU_PER_SQUARE_METER,
  };
}

export function calculateAreaFromBtu(capacity) {
  const btu = positiveNumber(capacity, "Capacity");
  return {
    heating: btu / HEATING_BTU_PER_SQUARE_METER,
    cooling: btu / COOLING_BTU_PER_SQUARE_METER,
  };
}
