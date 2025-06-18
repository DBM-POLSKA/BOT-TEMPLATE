const betterConsole = require("../lib/index");

const output = betterConsole("test1 test2", {
  borderStyle: "single",
  margin: 0,
  paddingLeft: 1,
  paddingRight: 1,

  color: "red",
});

console.log(output);
