const gulp            = require('gulp');
const eslint          = require('gulp-eslint');
const mocha           = require('gulp-mocha-simple');
const SpecWithRetries = require('./src/index');

gulp.task('lint', () => {
    return gulp
        .src([
            'src/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('preview', () => {
    return gulp
        .src('test/*.js')
        .pipe(mocha({
            reporter: SpecWithRetries,
            timeout:  typeof v8debug === 'undefined' ? 2000 : Infinity // NOTE: disable timeouts in debug
        }));
});

gulp.task('test', gulp.series('lint', 'preview'));
