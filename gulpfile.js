var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var prompt = require('gulp-prompt');


gulp.task('start', function() {

return gulp.src('gulpfile.js')
   .pipe(prompt.prompt({
       type: 'checkbox',
       name: 'bump',
       message: 'Which process do you want to run ?',
       choices: ['minifyJS', 'uglifyJS','minifyCSS']
   }, function(res){
       for(var i in res.bump){
         gulp.start(res.bump[i]);
       }
   }));
});

gulp.task('uglifyJS', function() {
    return gulp.src('script/**/*.js')
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bundle'));
});

gulp.task('minifyJS', function() {
    return gulp.src('script/**/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('bundle'));
});

gulp.task('minifyCSS', function() {
    return gulp.src('style/**/*.css')
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('bundle/css'));
});
