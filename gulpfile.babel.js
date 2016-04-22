import gulp from 'gulp';
import requireDir from 'require-dir';

gulp.paths = {
  src: 'src',
  dist: 'build',
  tmp: '.tmp',
  resources: 'resources'
};

requireDir('./gulp');

gulp.task('default', ['build']);
