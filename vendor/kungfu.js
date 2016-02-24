;( function (factory) {

    if (typeof define === "function" && define.amd) {
       
        define([], function(){

            return factory( false );

        });

    } else {

        factory( true );

    }
    
}( function( global ) {

	var kungfu = function( name ){

		return secret.apply( this, arguments );
	};

	var nameList = {};

	kungfu.find = function( name ) {

		return nameList[name] || null;

	}

	kungfu.prototype = {

		hit: function( fn , timeout ){

			typeof fn === 'function' && this.fnQueue.push({

				fn: fn,

				timeout: timeout

			});

			return this;

		},

		rest: function( timeout ) {

			var plainFn = function(){ };
				plainFn.type = 'rest';

			this.fnQueue.push({

				fn: plainFn,

				timeout: timeout

			});

			return this;

		},

		die: function( ) {

			return go_To_Hell.call( this );

		},

		perform: function( Fn_end ){
			
			var queue = this.fnQueue,
				queueLength = this.fnQueue.length,
				result;

			if ( typeof Fn_end === 'function' ) {

				queue.push({

					fn: Fn_end

				});

			}

			queue.push({

				fn: function(){

					this.status = 'completed';

				}

			});

			result = this.fnQueue.length > 1 ? this.fnQueue.reduceRight( function( last, prev, index ) {

				return {

					fn: bind( prev.fn, prev.timeout, last.fn , last.timeout ),

				};	

			}) : { 

				fn: function(){ 

					setTimeout( this.fnQueue[0].fn.bind( this ) , this.fnQueue[0].timeout ); 

					return this; 

				} 

			};

			queue.pop();

			if ( typeof Fn_end === 'function' ) {

				queue.pop();

			}

			this.status = 'performing';

			return result.fn.call( this ), this;

		}

	};

	if( global ) {

	   	window.kungfu = kungfu;

	}
	
	return kungfu;

	function bind( fn , to , nfn, nto ) {

		var _fn = function( passedVal ){

			var returnVal,
				passingVal;

			this.sto = setTimeout( function() {

				returnVal = fn.type === 'rest' ? passedVal : fn.call( this , passedVal ) ;

				if( this.status === 'dead' ) return ;

				this.sto = setTimeout( function() {

					nfn.call( this , returnVal );

				}.bind( this ) , nfn.type == 'combo' ? 0 : nto );

			}.bind( this ) , to );

			return passingVal;

		}

		_fn.type = 'combo';

		return _fn;
	
	}

	function secret( name ){

		if( !( this instanceof kungfu ) ) return new kungfu( name );

		if( name !== undefined ) {

			for( var n in nameList ){

				if( n === name ) {
					
					throw new Error( 'Unable to create kungfu, because the name "' + name + '" is used');

				} 

			}

			nameList[name] = this;

			this.name = name;

		}

		this.fnQueue = [];

		this.sto = null;

		this.status = 'unstart';

		return this;

	}
    
    function go_To_Hell() {

    	if　( this.status != 'dead' ){

    		clearTimeout( this.sto );

    		this.status = this.status == 'performing' ? 'dead' : this.status ;

    	}

    	return this;

    }

}));