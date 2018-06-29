let gulp         = require('gulp'),
    uglify       = require('gulp-uglify')
    rename       = require('gulp-rename')
    sass         = require('gulp-sass')
    autoprefixer = require('gulp-autoprefixer')
    purifyCSS    = require('gulp-purifycss')

gulp.task('build', () => {
  return gulp.src('./src/scroll-incr.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', () => {
    return gulp.src('./demo/sass/main.sass')
        .pipe(sass())
        .pipe(purifyCSS(['./demo/**/*.html']))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(gulp.dest('./demo/css'))
})
