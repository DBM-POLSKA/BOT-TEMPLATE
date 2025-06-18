function getOptionsObject(interaction) {
  const options = {};
  interaction.options.data.forEach((option) => {
    options[option.name] = option.value;
  });
  return options;
}

module.exports = getOptionsObject;
