const { src, dest, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const minJS = require('gulp-uglify');
const minSCSS = require('gulp-clean-css');
const notify = require('gulp-notify');
const nunjucksRender = require('gulp-nunjucks-render');

const copyImages = () => {
  return src('src/images/*.{webp,jpeg,png,svg}').pipe(
    dest('dist/assets/images')
  );
};

const transferFonts = () => {
  return src('src/fonts/*.{eot,woff,woff2,ttf}').pipe(
    dest('dist/assets/fonts')
  );
};

const customPlumber = (errorTitle) => {
  return plumber({
    errorHandler: notify.onError({
      title: errorTitle || 'Error running Gulp',
      message: 'Error: <%= error.message %>',
      sound: 'Purr',
    }),
  });
};

const compileScss = () => {
  return src('src/scss/styles.scss')
    .pipe(customPlumber('Error Running SASS'))
    .pipe(sass())
    .pipe(minSCSS())
    .pipe(dest('dist/assets/css'));
};

const compileJs = () => {
  return src('src/js/*.js')
    .pipe(customPlumber('Error Running JavaScript'))
    .pipe(minJS())
    .pipe(dest('dist/assets/js'));
};

const njkRender = () => {
  return src('src/templates/pages/**/*.+(html|njk)')
    .pipe(nunjucksRender({ path: ['src/templates'], watch: true }))
    .pipe(dest('dist'));
};

const browserSyncServer = (cb) => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  cb();
};

const browserSyncReload = (cb) => {
  browserSync.reload();
  cb();
};

const watchTasks = () => {
  watch(
    ['src/templates/**/*.+(html|njk)'],
    parallel(njkRender, browserSyncReload)
  );
  watch(
    [
      'src/scss/**/*.scss',
      'src/js/*.js',
      'src/images/*.{webp,jpeg,png,svg}',
      'src/fonts/*.ttf',
    ],
    parallel(
      copyImages,
      transferFonts,
      compileScss,
      compileJs,
      browserSyncReload
    )
  );
};

exports.default = parallel(
  copyImages,
  transferFonts,
  compileScss,
  compileJs,
  njkRender,
  browserSyncServer,
  watchTasks
);
