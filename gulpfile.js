let gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
var browserSync = require('browser-sync').create();

gulp.task('sass', () => {
  return gulp.src('./src/assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./src/assets/css'))
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/assets/sass/**/*.scss', gulp.series('sass'))
})

gulp.task('postcss', () => {
  return gulp.src('./src/assets/css/*.css')
  .pipe(postcss([ autoprefixer(), cssnano]))
  .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('copy-html', () => {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./dist/'))
})

gulp.task('build', gulp.parallel('postcss', 'copy-html'))

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./src"
      }
  });
});