
const { src, dest } = require("gulp");
const fileinclude = require("gulp-file-include");




 // PLUGINS

 // PLUGINS

// HTML



const html = () => {
    console.log("HTML");
   return src("./{*, html}/*.html")




    .pipe(fileinclude())
    .pipe(dest("./dist"))

}


exports.html = html;

