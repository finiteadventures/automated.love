// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// Wire dependencies into SCSS files
gulp.task('wiredep', function() {
  return gulp.src('styles/main.scss')
   .pipe(plugins.wiredep())
   .pipe(gulp.dest('styles'));
});

// Compile SCSS files to CSS
gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
   .pipe(plugins.sass())
   .pipe(gulp.dest('.dev/styles'));
});

// Autoprefix CSS files
gulp.task('autoprefixer', function() {
  return gulp.src('.dev/styles/main.css')
    .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
   .pipe(gulp.dest('.dev/styles'));
});

// Watch files for changes
gulp.task('watch', function(){
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch('src/styles/main.scss', ['sass']);
  gulp.watch('.dev/styles/main.css', ['autoprefixer']);
});

// Run Webserver
gulp.task('webserver', function() {
    gulp.src(['src', '.dev'])
      .pipe(plugins.webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('serve', ['wiredep', 'sass', 'autoprefixer', 'watch', 'webserver']);

gulp.task('default', ['serve']);
