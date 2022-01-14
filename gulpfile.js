
const browserSync = require("browser-sync").create();
const { src, dest, watch, series, parallel } = require("gulp");
const fileinclude = require("gulp-file-include");
const del = require("del");
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require("gulp-shorthand");
const sass = require("gulp-sass")(require("sass"));




// PLUGINS

// PLUGINS



// HTML

const watcher = () => {
    watch("./src/html/**/*.html", html);
    watch("./src/style/**/*.scss", style);
    watch("./src/src/**/*.*", source);

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

// STYLE

const style = () => {
    console.log("STYLE");
    return src("./src/style/*.scss")



        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(dest("./dist/css"));


}

// SERVER

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
}

// SOURCE

const source = () => {
    console.log("SOURCE");
    return src("./src/src/**/*.*")


        .pipe(dest("./dist/src"))


}

// Build
exports.html = html;
exports.style = style;
exports.watch = watcher;
exports.removedir = removedir;
exports.source = source;
exports.dev = series(
    removedir,
    parallel(html, style, source),
    parallel(watcher, server)
);

