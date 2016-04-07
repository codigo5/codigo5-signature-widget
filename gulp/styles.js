import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const paths = gulp.paths;
const $ = loadPlugins();

gulp.task('styles', ['styles:uglify']);

gulp.task('styles:uglify', ['styles:compile'], () => {
  return gulp.src(paths.dist + '/signature-widget.css')
    .pipe($.plumber())
    .pipe($.csso())
    .pipe($.rename('signature-widget.min.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size({ title: paths.dist, showFiles: true }));
});

gulp.task('styles:compile', () => {
  const mainFile = paths.src + '/signature-widget.scss';
  const sassOptions = {
    style: 'expanded'
  };

  return gulp.src(mainFile)
    .pipe($.plumber())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1'
      ]
    }))
    .pipe($.rename('signature-widget.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size({ title: paths.dist, showFiles: true }));
});
