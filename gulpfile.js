const { src, dest, watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//imagenes//
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin'); //npm install --save-dev gulp-imagemin@7.1.0//
const avif = require('gulp-avif'); //npm install --save-dev gulp-avif//

gulp.task('sass', () =>
    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
);

gulp.task('webp', function () {
    const opciones = {
        quality: 50
    }
    return gulp.src('./assets/img/*.{jpg,png}')
        .pipe(webp( opciones ))
        .pipe(gulp.dest('build/img'));
});

gulp.task('avif', function () {
    const opciones = {
        quality: 50
    }
    return gulp.src('./assets/img/*.{jpg,png}')
        .pipe(avif())
        .pipe(gulp.dest('build/img'));
});

gulp.task('imagemin', function () {
    return gulp.src('./assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./assets/img/*.{jpg,png}', gulp.series('webp'));
    gulp.watch('./assets/*', gulp.series('imagemin'));
});

gulp.task('default', gulp.series('sass', 'webp', 'avif', 'imagemin', 'watch'));