var gulp = require('gulp')
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imagemin = require('gulp-imagemin')
var ghpages = require('gh-pages')
var postcss = require ('gulp-postcss')
var concat = require('gulp-concat')

gulp.task("css", function(){
return gulp.src([
    'src/css/reset.css',
    'src/css/typography.css',
    'src/css/style.css'
])
.pipe(sourcemaps.init())
.pipe(
    postcss([
        require('autoprefixer'),
        require('postcss-preset-env')({
            stage: 1,
            browsers: ['IE 11', 'last 2 versions']
        })
    ])
)
.pipe(concat('style.css'))
.pipe(
    cleanCss({
        compatibility: 'ie8'
    })
)
.pipe(sourcemaps.write())
.pipe(gulp.dest("dist"))
.pipe(browserSync.stream())
})

gulp.task("html", function (){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function(){
    return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
    return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function(){
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
    gulp.watch("src/*.html", gulp.series('html')).on("change", browserSync.reload)
    gulp.watch("src/css/*", gulp.series('css'))
    gulp.watch("src/fonts/*", gulp.series('fonts'))
    gulp.watch("src/img/*", gulp.series('images'))
})

gulp.task("deploy", function() {
    ghpages.publish('dist')
})

//var defaultTask = function() {}

gulp.task("default", gulp.series('html', 'css', 'fonts', 'images', 'watch'));

//exports.default = defaultTask*/