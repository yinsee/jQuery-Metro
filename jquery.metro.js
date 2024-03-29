/*
usage: $('#metro').metro();
*/
(function($){
	// This function adds noise to the background-image attribute of a given element

	var metrolize = function(obj,options) {
		// how many rows can we have?
		var no_of_rows = parseInt(options.containerHeight / options.boxSize);
		if (no_of_rows < 1) on_of_rows = 1;
		var counters = [];
		var lastSpacing = 0;

//		console.log('rows:',no_of_rows);
		for(var i=0;i<no_of_rows;i++) { counters[i] = 0; } // init the row tracker

		var childs = $(obj).children();
		childs.each(function() {
//			console.log('box width:',$(this).outerWidth(true));
			// find the shortest row
			var shortestrow = 0;
			for(var i=1;i<no_of_rows;i++) 
			{ 
				if (counters[shortestrow] > counters[i])
				{
					shortestrow = i;
				}
			}

			// move child to that row
			var style = {
				position: 'absolute', 
				left: counters[shortestrow],
				top: options.boxSize * shortestrow
			};
			counters[shortestrow] += $(this).outerWidth(true);

//			console.log('insert at', shortestrow, 'move item:', style, ' row size now is:', counters[shortestrow]);
			$(this).addClass('metro').css(style);
			
			// if all rows aligned, space them
			var rows_same_length = true;
			for(var i=1;i<no_of_rows;i++) 
			{
				if (counters[i-1] != counters[i])
				{
					rows_same_length = false;
				}
			}
			if (rows_same_length && counters[0]-lastSpacing >= options.spaceEvery*options.boxSize) 
			{
//				console.log('row same lenght!');
				lastSpacing = counters[0];
				for(var i=0;i<no_of_rows;i++) 
				{
					counters[i] += options.spaceSize;	
				}
			}
				
		});
		
		var maxWidth = counters[0];
		for(var i=1;i<no_of_rows;i++) { if (counters[i] > maxWidth) maxWidth = counters[i]; }
		$(obj).css( { position: 'relative', height: options.boxSize*no_of_rows, width: maxWidth });
	};
	
	$.fn.metro = function(options) {
		options = $.extend({}, $.fn.metro.defaults, options);
		// lets do it!
		return this.each(function() {
			metrolize(this,options);
		});
	};	
	
	$.fn.metro.defaults = {
		boxSize: 150,
		containerHeight: $(window).height(),
		spaceEvery: 4,
		spaceSize: 100
	};
})(jQuery);
