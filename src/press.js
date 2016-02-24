;(function (factory) {

    if (typeof define === "function" && define.amd) {
       
        define([ 'ybase', 'kungfu' ], function( $ , kungfu ){

            factory( $ , kungfu );

        });

    } else {

        factory( window.YBase || window.Zepto || window.Jquery, window.kungfu );

    }
    
}(function( $ , kungfu ) {

   if( typeof $ === 'undefined' )return;
	
	_on = $.fn.on;

	$.fn.on = function( event, fn , capture ) {

		if( event === 'press' ) {

			if( typeof fn !== 'object' ) return ;

			var ua 			  = navigator.userAgent.toLowerCase(),
				options 	  = fn,
				delay		  = +options.delay || 0,
				duration	  = /android/.test(ua) ? ( +options.duration || 0 ) + 300 : +options.duration || 0,
				moveArea	  = +options.moveArea || 7,
				fnPress 	  = typeof options.onpress === 'function' ? options.onpress : function(){},
				fnPressed 	  = typeof options.onpressed === 'function' ? options.onpressed : function(){},
				fnPressCancel = typeof options.onpresscancel === 'function' ? options.onpresscancel : function(){};

			Array.prototype.forEach.call( this, function( elm ) { 

				var isFnStarted = false,

					kf = kungfu().hit( function() {

						isFnStarted = true;

						fnPress.call( elm , this.drinks );

					} , delay ).hit( function( ){

						fnPressed.call( elm , this.drinks );

						isFnStarted = false;

					} , duration ),

					fn_touchStart = function(e) {

						x = e.changedTouches[ 0 ].clientX;
						y = e.changedTouches[ 0 ].clientY;

						e.preventDefault();

						isFnStarted = false;

						kf.perform();

					},

					fn_touchMove = function( e ){

						var _x = e.changedTouches[ 0 ].clientX - x,
							_y = e.changedTouches[ 0 ].clientY - y;
							hasMoved = _x * _x + _y * _y > moveArea * moveArea;

						if( kf.status !== 'dead' && hasMoved ){

							kf.die();

							if( kf.status == 'dead' ) {

								e.reason = 'moved';

								fnPressCancel.call( this , e );

							}	
				
						}

					},

					fn_touchEnd = function(e){

						if( kf.status !== 'dead' ){

							kf.die();

							if( kf.status == 'dead' ) {

								if( isFnStarted ) {
									
									e.reason = 'left';

									fnPressCancel.call( this , e );

								} else {

									this.click();

								}
								

							}	

						}

					},
					
					x, y;

				$( elm ).css({

					'-webkit-touch-callout':'none',
					'touch-callout':'none',
					'-webkit-user-select':'none',
					'-khtml-user-select':'none',
					'-moz-user-select':'none',
					'-ms-user-select':'none',
					'user-select':'none'

				});

				elm.addEventListener( 'touchstart', fn_touchStart );

				elm.addEventListener( 'touchmove' , fn_touchMove );

				elm.addEventListener( 'touchend', fn_touchEnd );

                elm.event || ( elm.event = {} );

		        elm.event[ 'touchstart' ] || ( elm.event[ 'touchstart'] = [] ) ;

		        elm.event[ 'touchmove' ]  || ( elm.event[ 'touchmove'] = [] );

		        elm.event[ 'touchend' ]   || ( elm.event['touchend'] = [] );

		        elm.event[ 'touchstart' ].push( fn_touchStart );

		        elm.event[ 'touchmove' ].push( fn_touchMove );

		        elm.event[ 'touchend' ].push( fn_touchEnd );


			});

		} else {

			_on.apply( this,  arguments ) ;

			return this;

		}

	}

}));