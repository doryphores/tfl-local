const LEVELS = {
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

module.exports = Object.keys(LEVELS).reduce((funcs, level) => {
  return Object.assign(funcs, {
    [level]: function(msg) {
      console.log(`<${LEVELS[level]}>${msg}`);
    },
  });
}, {});
