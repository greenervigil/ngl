const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoPrefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const argv = require('yargs').argv;

gulp.task('styles', ()=>{
    try{
        if(argv.elt || argv.school) {
            const catalog = argv.elt ? 'elt' : 'school';
            return gulp.src(['public/css/common_libs/**/*.css', `public/css/${catalog}/custom/*.css`,'public/css/primaryhome/*.css'])
                .pipe(plumber((err) => {
                    console.log(err);
                    this.emit('end');
                }))
                .pipe(autoPrefixer())
                .pipe(concat(`ngl${catalog}common.min.css`))
                .pipe(minifyCss())
                .pipe(gulp.dest(`public/css/${catalog}/dist`))
        } else{
            throw "Invalid arguments";
        }
    } catch(error) {
        console.log(error);
    }
});