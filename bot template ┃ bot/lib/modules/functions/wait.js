module.exports = (time) => {
  if (typeof time === "number") {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  if (typeof time === "string") {
    const regex = /^(\d+(?:\.\d+)?)(ms|s|m|h|d)?$/i;
    const match = time.trim().match(regex);
    if (!match) {
      throw new Error(`Invalid time format: ${time}`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2] ? match[2].toLowerCase() : "ms";

    const multipliers = {
      ms: 1,
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    const ms = value * (multipliers[unit] || 1);

    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return Promise.reject(new Error("Error"));
};
