
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
    watch("./src/html/**/*.html", html).on("all", browserSync.reload);
    watch("./src/style/**/*.scss", style).on("all", browserSync.reload);
    watch("./src/js/**/*.js", javascript).on("all", browserSync.reload);
    watch("./src/src/img/*.{jpg,png,jpeg}", images).on("all", browserSync.reload);
    watch("./src/src/img/svg/*.svg", svg).on("all", browserSync.reload);
    watch("./src/src/fonts/*.*", fonts).on("all", browserSync.reload);
    watch("./src/src/img/icons/*.*", icons).on("all", browserSync.reload);
    watch("./src/src/img/favicon/**/*.*", favicon).on("all", browserSync.reload);

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
// FAVICON

const favicon = () => {
    console.log("FAVICON");
    return src("./src/src/img/favicon/**/*.*")

        .pipe(dest("./dist/src/img/favicon"))
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

const icons = () => {
    console.log("ICONS");
    return src("./src/src/img/icons/**/*.*")
        .pipe(newer("./dist/src/img/icons/*.*"))
        .pipe(fonter({
            formats: ["ttf", "woff", "eot", "svg"]
        }))
        .pipe(dest("./dist/src/img/icons"))
        .pipe(ttf2woff2())
        .pipe(dest("./dist/src/img/icons"))
}

// Build
exports.html = html;
exports.style = style;
exports.javascript = javascript;
exports.images = images;
exports.svg = svg;
exports.fonts = fonts;
exports.icons = icons;
exports.favicon = favicon;
exports.watch = watcher;
exports.removedir = removedir;
exports.dev = series(
    parallel(html, style, javascript, images, svg, fonts, icons, favicon),
    parallel(watcher, server),
    removedir
);

