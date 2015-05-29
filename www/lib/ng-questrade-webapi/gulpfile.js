var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var karma = require('karma').server;
var path = require('path');
var karmaConfig = require('./karma.config.js');
var jsHintStylish = require('jshint-stylish');

var SOURCE_PATH = path.join(__dirname, 'src');
var SOURCE_FILES = [
	path.join(SOURCE_PATH, '**/*.module.js'),
	path.join(SOURCE_PATH, '**/*.service.js'),
]
var DIST_FOLDER = path.join(__dirname, 'dist');
var KARMA_CONFIG_PATH = path.join(__dirname, 'karma.config.js');

gulp.task('js:hint', function() {
	return gulp.src(path.join(SOURCE_PATH, '**/*.js'))
			.pipe($.jshint('.jshintrc'))
			.pipe($.jshint.reporter(jsHintStylish));
});


gulp.task('js:test', ['js:hint'], function(done) {
	var karmaConfig = {
		configFile: KARMA_CONFIG_PATH
	};

	karma.start(karmaConfig, done);
});

gulp.task('js:tdd', ['js:hint'], function(done) {
	var karmaConfig = {
		configFile: KARMA_CONFIG_PATH,
		singleRun: false,
		autoWatch: true
	};

	karma.start(karmaConfig, done);
});

//gulp.task('build', ['js:test'], function() {
gulp.task('build', function() {
	return gulp.src(SOURCE_FILES)
		.pipe($.concat('ng-questrade-webapi.js'))
		.pipe(gulp.dest(DIST_FOLDER))
		.pipe($.uglify())
		.pipe($.rename('ng-questrade-webapi.min.js'))
		.pipe(gulp.dest(DIST_FOLDER));
});
