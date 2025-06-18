const styles = {
  null: {
    topLeft: " ",
    topRight: " ",
    bottomLeft: " ",
    bottomRight: " ",
    topBorder: " ",
    bottomBorder: " ",
    leftBorder: " ",
    rightBorder: " ",
  },
  single: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    topBorder: "─",
    bottomBorder: "─",
    leftBorder: "│",
    rightBorder: "│",
  },
  double: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    topBorder: "═",
    bottomBorder: "═",
    leftBorder: "║",
    rightBorder: "║",
  },
  bold: {
    topLeft: "┏",
    topRight: "┓",
    bottomLeft: "┗",
    bottomRight: "┛",
    topBorder: "━",
    bottomBorder: "━",
    leftBorder: "┃",
    rightBorder: "┃",
  },
  extraBold: {
    topLeft: "▛",
    topRight: "▜",
    bottomLeft: "▙",
    bottomRight: "▟",
    topBorder: "▀",
    bottomBorder: "▄",
    leftBorder: "▌",
    rightBorder: "▐",
  },
  block: {
    topLeft: "█",
    topRight: "█",
    bottomLeft: "█",
    bottomRight: "█",
    topBorder: "▀",
    bottomBorder: "▄",
    leftBorder: "▌",
    rightBorder: "▐",
  },

  rounded: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    topBorder: "─",
    bottomBorder: "─",
    leftBorder: "│",
    rightBorder: "│",
  },
  doubleRounded: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    topBorder: "═",
    bottomBorder: "═",
    leftBorder: "║",
    rightBorder: "║",
  },
  ascii: {
    topLeft: "+",
    topRight: "+",
    bottomLeft: "+",
    bottomRight: "+",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: "|",
    rightBorder: "|",
  },
  dashed: {
    topLeft: "+",
    topRight: "+",
    bottomLeft: "+",
    bottomRight: "+",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: ":",
    rightBorder: ":",
  },
  plus: {
    topLeft: "+",
    topRight: "+",
    bottomLeft: "+",
    bottomRight: "+",
    topBorder: "+",
    bottomBorder: "+",
    leftBorder: "+",
    rightBorder: "+",
  },
  minus: {
    topLeft: "-",
    topRight: "-",
    bottomLeft: "-",
    bottomRight: "-",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: "-",
    rightBorder: "-",
  },
  dotted: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    topBorder: "┄",
    bottomBorder: "┄",
    leftBorder: "┆",
    rightBorder: "┆",
  },
  doubleDotted: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    topBorder: "╌",
    bottomBorder: "╌",
    leftBorder: "╎",
    rightBorder: "╎",
  },
  star: {
    topLeft: "*",
    topRight: "*",
    bottomLeft: "*",
    bottomRight: "*",
    topBorder: "*",
    bottomBorder: "*",
    leftBorder: "*",
    rightBorder: "*",
  },
  arrow: {
    topLeft: "↖",
    topRight: "↗",
    bottomLeft: "↙",
    bottomRight: "↘",
    topBorder: "→",
    bottomBorder: "←",
    leftBorder: "↑",
    rightBorder: "↓",
  },
  braces: {
    topLeft: "{",
    topRight: "}",
    bottomLeft: "{",
    bottomRight: "}",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: "|",
    rightBorder: "|",
  },
  wave: {
    topLeft: "~",
    topRight: "~",
    bottomLeft: "~",
    bottomRight: "~",
    topBorder: "~",
    bottomBorder: "~",
    leftBorder: "~",
    rightBorder: "~",
  },
  unicodeBox: {
    topLeft: "🭽",
    topRight: "🭾",
    bottomLeft: "🭼",
    bottomRight: "🭿",
    topBorder: "▔",
    bottomBorder: "▁",
    leftBorder: "▏",
    rightBorder: "▕",
  },
  curved: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╯",
    bottomRight: "╰",
    topBorder: "─",
    bottomBorder: "─",
    leftBorder: "│",
    rightBorder: "│",
  },
  roundedDots: {
    topLeft: "●",
    topRight: "●",
    bottomLeft: "●",
    bottomRight: "●",
    topBorder: "·",
    bottomBorder: "·",
    leftBorder: "·",
    rightBorder: "·",
  },
  diamond: {
    topLeft: "◈",
    topRight: "◈",
    bottomLeft: "◈",
    bottomRight: "◈",
    topBorder: "◇",
    bottomBorder: "◇",
    leftBorder: "◆",
    rightBorder: "◆",
  },
  slashes: {
    topLeft: "/",
    topRight: "\\",
    bottomLeft: "\\",
    bottomRight: "/",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: "|",
    rightBorder: "|",
  },
  hashes: {
    topLeft: "#",
    topRight: "#",
    bottomLeft: "#",
    bottomRight: "#",
    topBorder: "#",
    bottomBorder: "#",
    leftBorder: "#",
    rightBorder: "#",
  },
  minimal: {
    topLeft: " ",
    topRight: " ",
    bottomLeft: " ",
    bottomRight: " ",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: " ",
    rightBorder: " ",
  },
  brackets: {
    topLeft: "[",
    topRight: "]",
    bottomLeft: "[",
    bottomRight: "]",
    topBorder: "-",
    bottomBorder: "-",
    leftBorder: "|",
    rightBorder: "|",
  },
  doubleWithDots: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    topBorder: "╦",
    bottomBorder: "╩",
    leftBorder: "╠",
    rightBorder: "╣",
  },
  waveDouble: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    topBorder: "≈",
    bottomBorder: "≈",
    leftBorder: "∽",
    rightBorder: "∽",
  },
  binary: {
    topLeft: "0",
    topRight: "1",
    bottomLeft: "0",
    bottomRight: "1",
    topBorder: "0",
    bottomBorder: "1",
    leftBorder: "0",
    rightBorder: "1",
  },
  flowers: {
    topLeft: "❀",
    topRight: "❀",
    bottomLeft: "❀",
    bottomRight: "❀",
    topBorder: "✿",
    bottomBorder: "✿",
    leftBorder: "❁",
    rightBorder: "❁",
  },
};

function createFrame(text, options) {
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
    backgroundColor = null,
  } = options;

  const style =
    typeof borderStyle === "object" && borderStyle !== null
      ? borderStyle
      : styles[borderStyle] || styles.single;

  const lines = text.split("\n");
  const contentWidth = Math.max(...lines.map((line) => line.length));
  const totalWidth = contentWidth + paddingLeft + paddingRight;

  const top =
    style.topLeft + style.topBorder.repeat(totalWidth) + style.topRight;
  const bottom =
    style.bottomLeft +
    style.bottomBorder.repeat(totalWidth) +
    style.bottomRight;

  const emptyLine =
    style.leftBorder + " ".repeat(totalWidth) + style.rightBorder;

  const emptyLinesTop = Array(paddingTop).fill(emptyLine).join("\n");
  const emptyLinesBottom = Array(paddingBottom).fill(emptyLine).join("\n");

  const framedLines = lines.map((line) => {
    const paddingLeftStr = " ".repeat(paddingLeft);
    const paddingRightStr = " ".repeat(totalWidth - paddingLeft - line.length);
    return (
      style.leftBorder +
      paddingLeftStr +
      line +
      paddingRightStr +
      style.rightBorder
    );
  });

  function addHorizontalMargin(str, leftMargin, rightMargin) {
    const left = " ".repeat(leftMargin);
    const right = " ".repeat(rightMargin);
    return str
      .split("\n")
      .map((line) => left + line + right)
      .join("\n");
  }

  const marginTopLines = "\n".repeat(marginTop);
  const marginBottomLines = "\n".repeat(marginBottom);

  let frameContent =
    top +
    "\n" +
    emptyLinesTop +
    (emptyLinesTop ? "\n" : "") +
    framedLines.join("\n") +
    (emptyLinesBottom ? "\n" + emptyLinesBottom : "") +
    "\n" +
    bottom;

  frameContent = addHorizontalMargin(frameContent, marginLeft, marginRight);

  const result = marginTopLines + frameContent + marginBottomLines;

  return result;
}

module.exports = { createFrame };
