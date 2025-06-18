const colors = {
  reset: "\x1b[0m",

  black: "#000000", // czarny
  red: "#FF0000", // czerwony
  bgRed: "#FF0000", // czerwony
  green: "#00FF00", // zielony
  yellow: "#FFFF00", // żółty
  blue: "#0000FF", // niebieski
  magenta: "#FF00FF", // magenta/fioletowy
  cyan: "#00FFFF", // cyjan/niebiesko-zielony
  white: "#CCCCCC", // jasnoszary / biały
  orange: "#FFA500", // pomarańczowy
  purple: "#800080", // ciemny fiolet
  pink: "#FFC0CB", // różowy
  lime: "#32CD32", // limonkowy zielony
  teal: "#008080", // morski niebiesko-zielony
  navy: "#000080", // granatowy
  maroon: "#800000", // bordowy
  olive: "#808000", // oliwkowy
  silver: "#C0C0C0", // srebrny (jasnoszary)
  gold: "#FFD700", // złoty
  crimson: "#DC143C", // intensywny ciemnoczerwony
  darkorange: "#FF8C00", // ciemnopomarańczowy
  deepskyblue: "#00BFFF", // jasny niebieski
  firebrick: "#B22222", // ceglasty czerwony
  forestgreen: "#228B22", // ciemna zieleń leśna
  hotpink: "#FF69B4", // żywy różowy
  khaki: "#F0E68C", // jasny żółto-brązowy
  lavenderblush: "#FFF0F5", // bardzo jasny różowy
  mediumslateblue: "#7B68EE", // średni niebiesko-fioletowy
  midnightblue: "#191970", // bardzo ciemny niebieski
  oliveDrab: "#6B8E23", // oliwkowo-zielony szarawy
  peru: "#CD853F", // ciepły brąz
  plum: "#DDA0DD", // jasny fioletowo-różowy
  royalblue: "#4169E1", // klasyczny głęboki niebieski
  sandybrown: "#F4A460", // jasny ciepły brąz
  skyblue: "#87CEEB", // jasny błękit
  tomato: "#FF6347", // intensywny pomarańczowo-czerwony
  wheat: "#F5DEB3", // jasny żółto-beżowy
  yellowgreen: "#9ACD32", // żółto-zielony żywy
  beige: "#F5F5DC", // bardzo jasny kremowy
  cadetblue: "#5F9EA0", // szaroniebieski
  chocolate: "#D2691E", // ciepły brąz, ciemna czekolada
  darkcyan: "#008B8B", // ciemny turkus
  darkgoldenrod: "#B8860B", // ciemny złoto-brązowy
  darkmagenta: "#8B008B", // ciemny magenta/fiolet
  darkslategray: "#2F4F4F", // ciemnoszary z zielonkawym odcieniem
  deeppink: "#FF1493", // bardzo intensywny różowy
  lightseagreen: "#20B2AA", // jasny morski zielono-niebieski
  mediumorchid: "#BA55D3", // średni odcień orchidei
};

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (hex.length !== 6) return null;
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToAnsi(r, g, b, isBg = false) {
  return `\x1b[${isBg ? 48 : 38};2;${r};${g};${b}m`;
}

function applyColor(text, color = "white", bgColor = null) {
  const resetCode = colors.reset;

  const fgHex = colors[color] || color;

  let colorCode = "";
  let bgColorCode = "";

  if (bgColor) {
    const bgHex = colors[bgColor] || bgColor;
    const bgRgb = hexToRgb(bgHex);
    if (bgRgb) bgColorCode = rgbToAnsi(bgRgb[0], bgRgb[1], bgRgb[2], true);
  }

  const fgRgb = hexToRgb(fgHex);
  if (fgRgb) colorCode = rgbToAnsi(fgRgb[0], fgRgb[1], fgRgb[2], false);

  return `${bgColorCode}${colorCode}${text}${resetCode}`;
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { applyColor };
