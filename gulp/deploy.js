import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const paths = gulp.paths;
const $ = loadPlugins();
const deploy = require('../deploy.json');

gulp.task('deploy', ['build'], function() {
  let rsyncOptions = Object.assign({
    clean: true,
    recursive: true,
    root: paths.dist
  }, deploy);

  return gulp.src(paths.dist + '/**/*')
    .pipe($.plumber())
    .pipe($.rsync(rsyncOptions));
});
