var cubeTable = {
	"standardWidthsDepths": [18, 23],
	"standardHeights" : [18, 23],
	"generator": function () {	

		for (var m = 0; m < melamines.length; m++){
			
			calcVersion = pedestal.melaminePriceCalc;
			starter = "CUBE";
			color = melamines[m];
			cubeTable.tableBuilder();
			
		} // Melamines Loop End
		
		for (var l = 0; l < laminates.length; l++){
			
			calcVersion = pedestal.laminatePriceCalc;
			starter = "CUBE";
			color = laminates[l];
			cubeTable.tableBuilder();
		} // Laminates Loop End
		
		for (var b = 0; b < aluminums.length; b++){
			
			calcVersion = pedestal.aluminumPriceCalc;
			starter = "CUBE";
			color = aluminums[b];
			cubeTable.tableBuilder();
	
		} // Brushed Aluminum Loop End		
	
		for (var v = 0; v < veneers.length; v++){
			
			calcVersion = pedestal.veenerPriceCalc;
			starter = "CUBE";
			color = veneers[v];
			cubeTable.tableBuilder();

		} // Venner Loop End
		// Event Handler add for the new elements
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
	}, // Generater End
	
	"tableBuilder": function(){
		
		for (var i = 0; i < pedestal.standardWidthsAndDepths.length; i++) {
				
				/* Iterate through the heights for each for the width depth */
				width = cubeTable.standardWidthsAndDepths[i];
				depth = cubeTable.standardWidthsAndDepths[i];

				for (var h = 0; h < cubeTable.standardHeights.length; h++) {
					// Iterate through the hieghts
					
					for (var top = 0; top < pedestal.topOptions.length; top++) {
						// Top Options Interation
						
						for (var bottom = 0; bottom < pedestal.bottomOptions.length; bottom++) {
							// Bottom Options Iterations
		
							
								/* Calculate the price of all each hieght widht depth combonations */
								var x = calcVersion(width, depth, pedestal.standardHeights[h]),
												topAddOnPrice = pedestal[pedestal.topOptions[top]].price(width),
												bottomAddOnPrice = pedestal[pedestal.bottomOptions[bottom]].price(width),
												skuSuffix = pedestal[pedestal.topOptions[top]].suffix,
												skuPrefix = pedestal[pedestal.bottomOptions[bottom]].prefix,
												tbody = $("#price-table"),
												row = $("<tr>").addClass("row-" + h),
												sku = $("<td>").addClass("sku"),
												size = $("<td>").addClass("size"),
												price = $("<td>").addClass("price");						

								sku.text(starter + skuSuffix + "-" + (Math.ceil(width)).toString() + (Math.ceil(depth)).toString() + color + "-" + (cubeTable.standardHeights[h]).toString() + skuPrefix);
								price.text(x + topAddOnPrice + bottomAddOnPrice);
								size.text( width + " x " + depth + " x " + cubeTable.standardHeights[h]);
								row.append(sku);
								row.append(size);
								row.append(price);
								tbody.append(row);
								
						} // Bottom Options End 
					} // Top Options End 
				} // Inside For Loop End
			} // Outisde For Loop End	
	}, // tableBuilder End
}