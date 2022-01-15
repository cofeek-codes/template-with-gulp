
const browserSync = require("browser-sync").create();
const { src, dest, watch, series, parallel } = require("gulp");
const fileinclude = require("gulp-file-include");
const del = require("del");
const autoprefixer = require('gulp-autoprefixer');
const sass = require("gulp-sass")(require("sass"));
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const shorthand = require("gulp-shorthand");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");





// PLUGINS

// PLUGINS



// HTML

const watcher = () => {
    watch("./src/**/*.*", removedir);
    watch("./src/html/**/*.html", html);
    watch("./src/style/**/*.scss", style);
    watch("./src/js/**/*.js", javascript);
    watch("./src/src/img/*.{jpg,png,jpeg}", images);
    watch("./src/src/img/svg/*.svg", svg);
    watch("./src/src/fonts/*.*", fonts);

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
        .pipe(groupCssMediaQueries())
        .pipe(shorthand())
        .pipe(dest("./dist/css"));


}
// JAVASCRIPT

const javascript = () => {
    console.log("STYLE");
    return src("./src/js/*.js")




        .pipe(dest("./dist/js"));


}

// SERVER

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
}





// IMAGES

const images = () => {
    console.log("IMAGES");
    return src("./src/src/img/*.{jpg,png,jpeg}")

        .pipe(newer("./dist/src/img"))
        .pipe(dest("./dist/src/img"))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest("./dist/src/img"))
}


// SVG

const svg = () => {
    console.log("SVG");
    return src("./src/src/img/svg/*.svg")
        .pipe(newer("./dist/src/img/svg"))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest("./dist/src/img/svg"))
}

// FONTS

const fonts = () => {
    console.log("FONTS");
    return src("./src/src/fonts/*.*")
        .pipe(newer("./dist/src/fonts"))
        .pipe(fonter({
            formats: ["ttf", "woff", "eot", "svg"]
        }))
        .pipe(dest("./dist/src/fonts"))
        .pipe(ttf2woff2())
        .pipe(dest("./dist/src/fonts"))
}

// Build
exports.html = html;
exports.style = style;
exports.javascript = javascript;
exports.images = images;
exports.svg = svg;
exports.fonts = fonts;
exports.watch = watcher;
exports.removedir = removedir;
exports.dev = series(
    removedir,
    parallel(html, style, javascript, images, svg, fonts),
    parallel(watcher, server)
);

