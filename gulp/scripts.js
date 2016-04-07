import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import uglifySaveLicense from 'uglify-save-license';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import tsify from 'tsify';
import babelify from 'babelify';

const paths = gulp.paths;
const $ = loadPlugins();

gulp.task('scripts', ['scripts:uglify']);

gulp.task('scripts:uglify', ['scripts:bundle'], () => {
  return gulp.src(paths.dist + '/signature-widget.js')
    .pipe($.plumber())
    .pipe($.uglify({ preserveComments: uglifySaveLicense }))
    .pipe($.rename('signature-widget.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size({ title: paths.dist, showFiles: true }));
});

gulp.task('scripts:bundle', () => {
  const mainFile = 'signature-widget';

  return browserify({ basedir: paths.src })
    .add(`${mainFile}.ts`)
    .plugin(tsify)
    .transform(babelify, { extensions: ['.js', '.ts'] })
    .bundle()
    .pipe($.plumber())
    .pipe(source(`${mainFile}.js`))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size({ title: paths.dist, showFiles: true }));
});
