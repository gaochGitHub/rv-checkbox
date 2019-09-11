const { src, dest, parallel, series } = require("gulp")
const babel = require("gulp-babel")
const del = require("del")

const sourcemaps = require("gulp-sourcemaps")

const copyCss = () => src("src/virtualized-checkbox/*.css").pipe(dest("lib"))

const naleDelete = () => del(["lib"])
const babelJs = () =>
  src(["src/virtualized-checkbox/*.js", "src/virtualized-checkbox/*.jsx"])
    .pipe(
      babel({
        presets: ["@babel/env", "@babel/react"],
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-proposal-class-properties"
        ]
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("lib/"))
exports.bale = series(naleDelete, parallel(babelJs, copyCss))
