var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
  return gulp.src('static/images/resp/origin/**/*.{jpg,png}')
    .pipe($.responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '*.jpg': [{
        width: 200,
        rename: { suffix: '-200' },
      },{
        width: 200 * 2,
        rename: { suffix: '-200-2x' },
      }, {
        width: 600,
        rename: { suffix: '-600' },
      },{
        width: 600 * 2,
        rename: { suffix: '-600-2x' },
      }, {
        // Compress, strip metadata, and rename original image
        rename: { suffix: '-original' },
      }],
      // Resize all PNG images to be retina ready
      '*.png': [{
        width: 250,
      }, {
        width: 250 * 2,
        rename: { suffix: '-2x' },
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
    }))
    .pipe(gulp.dest('static/images/resp'));
});


