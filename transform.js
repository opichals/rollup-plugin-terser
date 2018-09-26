const { minify } = require("terser");

const transform = (code, options) => {
  const result = minify(code, options);
  if (result.error) {
    throw result.error;
  } else {
    return result;
  }
};

exports.transform = (code, options) => new Promise((resolve) => resolve(transform(code, options)));
