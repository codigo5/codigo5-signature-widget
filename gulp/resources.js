import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const paths = gulp.paths;
const $ = loadPlugins();

gulp.task('resources', ['resources:copy']);

gulp.task('resources:copy', () => {
  return gulp.src(paths.resources + '/**/*')
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/resources/'))
    .pipe($.size({ title: paths.dist + '/resources/', showFiles: true }));
});
