// modified from generator-jekyllized 1.0.0-rc.6
'use strict';

const gulp       = require('gulp');
const requireDir = require('require-dir');
const tasks      = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// 'gulp inject' -- injects CSS and JS into header and footer
gulp.task('inject', gulp.parallel('inject:head', 'inject:footer'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('site:tmp', 'inject', 'site', 'copy:site'));

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts', 'fonts'),
  gulp.series('critical:css', 'images', 'images:feature', 'copy:assets')
));

// 'gulp clean' -- removes assets and gzipped files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:gzip', 'clean:dist', 'clean:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html'));

// 'gulp deploy' -- deploy site to production
gulp.task('deploy', gulp.series('upload'));

// 'gulp rebuild' -- WARNING: removes all assets, images, and built site
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your Jekyll site for errors
gulp.task('check', gulp.series('site:check'));

// 'gulp' -- removes assets and gzipped files, creates assets and injects
// them into includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
