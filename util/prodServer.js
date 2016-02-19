var browserSync = require('browser-sync').create();

browserSync.init({
  port: 3000,
  server: {
    baseDir: 'build'
  }
});
