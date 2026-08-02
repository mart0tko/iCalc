export default function generateRandomNumbers(min, max, places) {
  if (min === "" || max === "" || min === null || max === null) {
    throw new RangeError("Minimum and maximum are required.");
  }
  const minimum = Number(min);
  const maximum = Number(max);

  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    throw new RangeError("Minimum and maximum must be valid numbers.");
  }
  if (minimum > maximum) {
    throw new RangeError("Minimum must not be greater than maximum.");
  }

  if (Number.isInteger(minimum) && Number.isInteger(maximum)) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  const decimals = places === undefined ? 2 : Number(places);
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new RangeError("Decimal places must be an integer from 0 to 20.");
  }

  const value = Math.random() * (maximum - minimum) + minimum;
  return value.toFixed(decimals);
}
