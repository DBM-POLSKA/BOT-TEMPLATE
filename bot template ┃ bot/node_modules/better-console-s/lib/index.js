const { createFrame } = require("./frame");
const { applyColor } = require("./colors");

function betterConsole(text, options = {}) {
  const {
    padding = 0,
    paddingTop = padding,
    paddingBottom = padding,
    paddingLeft = padding,
    paddingRight = padding,
    margin = 0,
    marginTop = margin,
    marginBottom = margin,
    marginLeft = 0,
    marginRight = 0,
    borderStyle = "null",
    borderColor = "white",
    textColor = "white",
    backgroundColor = null,
    color = null,
    newLine = true,
  } = options;

  const framed = createFrame(text, {
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    borderStyle,
  });

  let result;

  if (color) {
    result = applyColor(framed, color, backgroundColor);
  } else {
    const lines = framed.split("\n");

    function colorLine(line) {
      if (line.length < 2) return line;

      const leftBorder = line[0];
      const rightBorder = line[line.length - 1];
      const middle = line.slice(1, -1);

      const leftColored = applyColor(leftBorder, borderColor);
      const rightColored = applyColor(rightBorder, borderColor);
      const middleColored = applyColor(middle, textColor, backgroundColor);

      return leftColored + middleColored + rightColored;
    }

    const topLineColored = applyColor(lines[0], borderColor, backgroundColor);
    const bottomLineColored = applyColor(
      lines[lines.length - 1],
      borderColor,
      backgroundColor
    );

    const middleLinesColored = lines.slice(1, -1).map(colorLine);

    result = [topLineColored, ...middleLinesColored, bottomLineColored].join(
      "\n"
    );
  }

  if (!newLine) {
    result = result.replace(/\n/g, "");
  }

  return result;
}

module.exports = betterConsole;
