const { codeFrameColumns } = require("@babel/code-frame");
const { transform } = require("./transform.js");

function terser(userOptions = {}) {
  if (userOptions.sourceMap != null) {
    throw Error("sourceMap option is removed, use sourcemap instead");
  }

  const minifierOptions = (
    Object.assign({}, userOptions, {
      sourceMap: userOptions.sourcemap !== false,
    })
  );
  delete minifierOptions.sourcemap;

  return {
    name: "terser",

    renderChunk(code) {
      return transform(code, minifierOptions).catch(error => {
        const { message, line, col: column } = error;
        console.error(
          codeFrameColumns(code, { start: { line, column } }, { message })
        );
        throw error;
      });
    }
  };
}

exports.terser = terser;
