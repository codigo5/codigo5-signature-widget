import gulp from 'gulp';

const paths = gulp.paths;

gulp.task('watch', ['styles', 'scripts'], () => {
  gulp.watch(paths.src + '/**/*.scss', ['styles']);
  gulp.watch(paths.src + '/**/*.{ts,js}', ['scripts'])
});
