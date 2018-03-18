var gulp = require('gulp');
var pug = require('gulp-pug');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var processors = [
	autoprefixer({browsers: ['last 2 version']})
];


gulp.task('html', function(){
	return gulp.src('src/assets/pug/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('docs'))
});

gulp.task('js', function () {
	return gulp.src('src/assets/js/app.js')
		.pipe(gulp.dest('docs'));
});

gulp.task('sass', function () {
	return gulp.src('src/assets/sass/*.sass')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gcmq())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('docs'))
		.pipe(browserSync.stream())
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./docs"
		}
	});
});

var reload = function(done){
	browserSync.reload();
	done();
}

gulp.task('watch', function() {
	gulp.watch('src/assets/pug/index.pug', gulp.series('html', reload));
	gulp.watch('src/assets/sass/*.sass', gulp.series('sass'));
	gulp.watch('src/assets/js/app.js', gulp.series('js', reload));
});


gulp.task('copy', function(){
	return gulp.src(['src/assets/**/*.{jpg,png,jpeg,gif}'])
	.pipe(gulp.dest('docs'))
});

gulp.task('clean', function() {
	return del('docs');
});

gulp.task('build', gulp.parallel('html', 'sass', 'js', 'copy'));

gulp.task('start', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));