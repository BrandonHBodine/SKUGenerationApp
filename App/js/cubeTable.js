var cubeTable = {
	"laborRate" : 90,
	"materialProfit" : 10.00,
	"melaminePrice" : 0.75,
	"laminatePrice" : 3.28,
	"veneerPrice" : 5.30,
	"customsSizeVar" : 1.80,
	"customsSizeVar2": 13,
	"standardSizeVar" : 1.9364,
	"bwAllowance" : 30,
	"LamAllowance" : 30,
	"woodVeneerAllowance" : 20,
	"alumAllowance" : 30,
	"standardSizes" : [],	
	"standardSizesPrice" : [],
	"standardWidthsDepths" : [18, 23],
	"standardHeights" : [18, 23],
	"topOptions" : ["N", "T", "L", "SL", "4L"],
	"bottomOptions" : ["N", "TK", "TKBL"],
	
	"laborHours" : function(width, depth, height) {
		var size = cubeTable.isStandard(width, depth, height),
				x;
		
		if(size > -1){
			x = (((((width+depth+50)*1.5)+((width+depth-12.65)*0.24)*height/2.5)+12)/60)/1.9364;
		} else {	
			x = (((((width+depth+10)*2.73)+((width+depth-12.65)*0.24)*height/2.5)+12)/60)/1.8;
		}
		return (Math.round(x * 1000000000))/1000000000;
	},
	
	"materialFoot" : function(width, depth, height){	
		var size = cubeTable.isStandard(width, depth, height),
				x;
		if(size > -1){
			x = (((( width + depth ) *2 ) * height ) + ( width * depth)) /120;
		} else {
			x = (((( width + depth ) *2 ) * height ) + ( width * depth)) /95;
		}
		return (Math.round(x * 100))/100;
	},

	"packaging" : function(width, depth, height){		
		var check = cubeTable.isStandard(width, depth, height),
				x;
		if (check > -1) {
			return cubeTable.standardSizesPrice[(check)];
		} else {
			x = (cubeTable.materialFoot(width, depth, height)*0.2)+(cubeTable.laborHours(width, depth, height)*3.5)+30;
			return (Math.round(x * 100000))/100000;
		}
	},
	
	"nonStandardSizeCorrection": function(width, depth, height) {
		var percentRate = 1;
			percentRate = (Math.sqrt(Math.sqrt(Math.sqrt(depth /width ))));
		return percentRate;
	},
		/********************************************************************************************************************Pricing Calculators Based on Material	********************************************************************************************************************/
	
	"melaminePriceCalc" : function(width, depth, height, option){
		var laborCalc = ( cubeTable.laborHours(width, depth, height) * cubeTable.laborRate ),
				materialsCalc = ( cubeTable.materialFoot(width, depth, height) * cubeTable.melaminePrice ),
				profitCalc = ( 1 + (cubeTable.materialProfit)/100 ),
				packagingCalc = ( cubeTable.packaging(width, depth, height) ),
				salesCalc = ( 100 / (100 - cubeTable.bwAllowance -cubeTable.customsSizeVar2)),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * cubeTable.nonStandardSizeCorrection(width, depth, height);
		
		return (Math.round( price * 100))/100;
	},
	
	"laminatePriceCalc" : function(width, depth, height, option){		
		var laborCalc = ( cubeTable.laborHours(width, depth, height) * cubeTable.laborRate ),
				materialsCalc = ( cubeTable.materialFoot(width, depth, height) * cubeTable.laminatePrice ),
				profitCalc = ( 1 + (cubeTable.materialProfit)/100 ),
				packagingCalc = ( cubeTable.packaging(width, depth, height) + 12),
				salesCalc = ( 100 / (100 - cubeTable.LamAllowance -cubeTable.customsSizeVar2 )),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * cubeTable.nonStandardSizeCorrection(width, depth, height);		

		return (Math.round( price * 100))/100;
	},
	
	"veenerPriceCalc" : function(width, depth, height, option){
		var laborCalc = ( cubeTable.laborHours(width, depth, height) * cubeTable.laborRate ),
				materialsCalc = ( cubeTable.materialFoot(width, depth, height) * cubeTable.veneerPrice ),
				profitCalc = ( 1 + (cubeTable.materialProfit)/100 ),
				packagingCalc = ( cubeTable.packaging(width, depth, height) + 15),
				salesCalc = ( 100 / (100 - cubeTable.woodVeneerAllowance -cubeTable.customsSizeVar2 )),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * cubeTable.nonStandardSizeCorrection(width, depth, height);


		return (Math.round( price * 100))/100;
	},
	
	"aluminumPriceCalc" : function(width, depth, height, option){
		var laborCalc = ( cubeTable.laborHours(width, depth, height) * cubeTable.laborRate ),
				materialsCalc = ( cubeTable.materialFoot(width, depth, height) * cubeTable.laminatePrice * 1.27 ),
				profitCalc = ( 1 + (cubeTable.materialProfit)/100 ),
				packagingCalc = ( cubeTable.packaging(width, depth, height) + 15),
				salesCalc = ( 100 / (100 - cubeTable.alumAllowance - cubeTable.customsSizeVar2)),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * cubeTable.nonStandardSizeCorrection(width, depth, height);
		
		return (Math.round( price * 100))/100;
	},
/********************************************************************************************************************Add on pricing Calculators	********************************************************************************************************************/

	/* Lighting Functions */
	"addAmbient" : function(width){
	},
	"addSpotlight" : function(){
		},
	"addTwoCornerLights" : function(){},
	"addFourCornerLights" : function(){},

	/* Turn Table Functions */
	"addManualTurntable" : function(width){},

	/* Toe Kick Functions */
	"addMatchingToeKick" : function(width){},
	"addBlackToeKick" : function(width, depth){},
	
	/***********************************************************************************************************************
Standard Sizes need to be calculated by Math.floor((width*depth)+(width+depth)+height) to ensure that the value is unique	***********************************************************************************************************************/
	"isStandard" : function(width, depth, height) {	
		if (width === depth && cubeTable.standardWidthsDepths.indexOf(width) > -1 && cubeTable.standardHeights.indexOf(height) > -1 ) {
			cubeTable.customsSizeVar2 = 0;
			console.log("Standard Size");
			return true;
		
		} else {
			cubeTable.customsSizeVar2 = 13;
			console.log("This is a non standard size");
			return false;
		}
	},
/******************************************************************************************************************************
Event Functions
******************************************************************************************************************************/
	"generator": function(){		
		/*
		event.preventDefault();
		event.stopPropagation();
		*/

		for (var m = 0; m < melamines.length; m++){
			
			calcVersion = cubeTable.melaminePriceCalc;
			starter = "CUBE";
			color = melamines[m];
			cubeTable.tableBuilder();
			
		} // Melamines Loop End
		
		for (var l = 0; l < laminates.length; l++){
			
			calcVersion = cubeTable.laminatePriceCalc;
			starter = "CUBE";
			color = laminates[l];
			cubeTable.tableBuilder();
		} // Laminates Loop End
		
		for (var b = 0; b < aluminums.length; b++){
			
			calcVersion = cubeTable.aluminumPriceCalc;
			starter = "CUBE";
			color = aluminums[b];
			cubeTable.tableBuilder();
	
		} // Brushed Aluminum Loop End		
	
		for (var v = 0; v < veneers.length; v++){
			
			calcVersion = cubeTable.veenerPriceCalc;
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
		
		for (var i = 0; i < cubeTable.standardWidthsDepths.length; i++) {
				
				/* Iterate through the heights for each for the width depth */
				width = cubeTable.standardWidthsDepths[i];
				depth = cubeTable.standardWidthsDepths[i];

				for (var h = 0; h < cubeTable.standardHeights.length; h++) {
					// Iterate through the hieghts
					
					for (var top = 0; top < cubeTable.topOptions.length; top++) {
						// Top Options Interation
						
						for (var bottom = 0; bottom < cubeTable.bottomOptions.length; bottom++) {
							// Bottom Options Iterations
		
							
								/* Calculate the price of all each hieght widht depth combonations */
								var x = calcVersion(width, depth, cubeTable.standardHeights[h]),
												topAddOnPrice = cubeTable[cubeTable.topOptions[top]].price(width),
												bottomAddOnPrice = cubeTable[cubeTable.bottomOptions[bottom]].price(width),
												skuSuffix = cubeTable[cubeTable.topOptions[top]].suffix,
												skuPrefix = cubeTable[cubeTable.bottomOptions[bottom]].prefix,
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
	"N": {
		"suffix": "",
		"prefix": "",
		"price" : function(width) {
								return 0;
		}
	},	
	"T": {
		"suffix": "T",
		"price" : function(width){
								if (15 > width) {
									return 100.00;
								} else if ( width >= 15 && width < 18) {
									return 110.00;
								} else if ( width >= 18 && width < 20) {
									return 120.00;
								} else if  (width >= 20 && width < 23) {
									return 130.00;
								} else if (width >= 23){
									return 140.00;
								}
							}
	},	
	"L":  {
		"suffix": "L",
		"price" : function(width) {
								if (15 > width) {
										return 142.00;
									} else if ( width >= 15 && width < 18) {
										return 150.00;
									} else if ( width >= 18 && width < 20) {
										return 165.00;
									} else if  (width >= 20 && width < 23) {
										return 180.00;
									} else if (width >= 23){
										return 182.00;
									}
								}
	},	
	"SL":   {
		"suffix": "SL",
		"price" : function(width) {
								return 150;
							}
	},
	"4L":   {
		"suffix": "4L",
		"price" : function(width) {
								return 245;
							}
	},
	"TK":   {
		"prefix": "TK",
		"price" : function(width) {
								if (15 > width) {
										return 72.00;
									} else if ( width >= 15 && width < 18) {
										return 77.00;
									} else if ( width >= 18 && width < 20) {
										return 82.00;
									} else if  (width >= 20 && width < 23) {
										return 87.00;
									} else if (width >= 23){
										return 92.00;
									}
								}
	},
	"TKBL":   {
		"prefix": "TKBL",
		"price" : function(width) {
								if (15 > width) {
										return 72.00;
									} else if ( width >= 15 && width < 18) {
										return 77.00;
									} else if ( width >= 18 && width < 20) {
										return 82.00;
									} else if  (width >= 20 && width < 23) {
										return 87.00;
									} else if (width >= 23){
										return 92.00;
									}
								}

	}
}; // cubeTable App End