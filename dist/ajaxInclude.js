/*! Ajax-Include - v0.1.0 - 2012-08-17
* http://filamentgroup.com/lab/ajax_includes_modular_content/
* Copyright (c) 2012 @scottjehl, Filament Group, Inc.; Licensed MIT */

/*! Ajax-Include - v0.1.0 - 2012-08-17
* http://filamentgroup.com/lab/ajax_includes_modular_content/
* Copyright (c) 2012 @scottjehl, Filament Group, Inc.; Licensed MIT */

(function( $, undefined ){
	$.fn.ajaxInclude = function( proxy ) {
		
		var filelist = [],
			els = this;
		
		return this.each(function( k ) {
			var el			= $( this ),
				w			= window,
				qualify		= el.attr( "data-media" ),
				methods		= [ "append", "replace", "before", "after" ],
				method,
				fixedMethod,
				url;

			if ( !qualify || ( w.matchMedia && w.matchMedia( qualify ).matches ) ) {

				for( var ml = methods.length, i=0; i < ml; i++ ){
					if( el.is( "[data-" + methods[ i ] + "]" ) ){
						method	= fixedMethod = methods[ i ];
						url		= el.attr( "data-" + method );
					}
				}

				if( method === "replace" ){
					fixedMethod += "With";
				}

				if( url && fixedMethod ){
					
					el
						.data( "method", fixedMethod )
						.data( "methodattr", "data-" + method )
						.data( "url", url )
						.bind( "ajaxInclude", function(e, data){
							var content = $(data);
							
							if( $(this).data( "proxy" ) ){
								content = content.filter( "entry[url=\"" + $(this).data( "url" ) + "\"]" ).html();
							}
							$( this )
								[ $(this).data( "method" ) ]( content )
								.removeAttr( $(this).data( "methodattr" ) );								
						});
					
					if( proxy ){
						
						el.data( "proxy", proxy );
						
						if( $.inArray( url, filelist ) === -1 ){
							filelist.push( url );
						}
						
						if( k === els.length - 1 ){
							url = proxy + filelist.join();
						}
					}
					
					if( !proxy || k === els.length-1 ){
						$.get( url, function( data ) {	
							( proxy ? els : el ).trigger( "ajaxInclude", [data] );
						});
					}
				}

			}
		});
	};
}( jQuery ));
