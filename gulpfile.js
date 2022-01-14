
const browserSync = require("browser-sync").create();
const { src, dest, watch, series, parallel } = require("gulp");
const fileinclude = require("gulp-file-include");
const del = require("del");




 // PLUGINS

 // PLUGINS

// HTML


const watcher = () => {
watch("./src/html/**/*.html", html);

}

// del

const removedir = () => {
    return del("./dist");
}

const html = () => {
    console.log("HTML");
   return src("./src/html/*.html")




    .pipe(fileinclude())
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());

}

// SERVER

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
}

// Build
exports.html = html;
exports.watch = watcher;
exports.removedir = removedir;
exports.dev = series(
    removedir,
    html,
  parallel (watcher, server)
);

