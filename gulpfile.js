var gulp = require( 'gulp' ),
	uglify = require( 'gulp-uglify' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	rename = require( 'gulp-rename' );


gulp.task( 'default' , function(){
	gulp.src( './src/press.js' )
		.pipe( sourcemaps.init() )
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( './dist/' ) );
})