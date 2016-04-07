import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import uglifySaveLicense from 'uglify-save-license';
import source from 'vinyl-source-stream';
import browserify from 'browserify';

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

gulp.task('scripts:bundle', ['scripts:compile'], () => {
  const mainFile = 'signature-widget.js';
  
  return browserify({ basedir: paths.tmp + '/scripts' })
    .add(mainFile)
    .bundle()
    .pipe($.plumber())
    .pipe(source(mainFile))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size({ title: paths.dist, showFiles: true }));
});

gulp.task('scripts:compile', () => {
  const tsProject = $.typescript.createProject('tsconfig.json', { sortOutput: true });
  
  return gulp.src(paths.src + '/**/*.{ts,js}')
    .pipe($.plumber())
    .pipe($.typescript(tsProject))
    .pipe(gulp.dest(paths.tmp + '/scripts'))
    .pipe($.size({ title: paths.tmp + '/scripts', showFiles: true }));
});
