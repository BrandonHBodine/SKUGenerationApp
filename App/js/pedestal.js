var pedestal = {
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
	"standardSizes" : [104,108,112,116,120,158,161,167,173,179,185,191,197,258,261,267,273,279,285,291,297,363,366,372,378,384,390,396,402,443,446,452,458,464,470,476,482,578,581,587,593,599,605,611,617],	
"standardSizesPrice" : [2.25,2.25,2.5,2.75,3,7.65,7.65,7.65,8.16,8.67,9.18,9.69,10.2,11.9,11.9,11.9,11.9,12.72,13.55,14.38,15.2,17.61,17.61,17.61,17.61,19.08,20.55,22.02,23.48,18,18,18,18,19.5,21,22.5,24,21,21,21,21,23.75,25.5,27.75,28],
	"standardWidthsAndDepths" : [11.5, 15, 18, 20, 23],
	"standardHeights" : [3, 6, 12, 18, 24, 30, 36, 42],
	"topOptions" : ["N", "T", "L", "SL", "4L"],
	"bottomOptions" : ["N", "TK", "TKBL"],
	
	"laborHours" : function(width, depth, height) {
		var size = pedestal.isStandard(width, depth, height),
				x;
		
		if(size > -1){
			x = (((((width+depth+50)*1.5)+((width+depth-12.65)*0.24)*height/2.5)+12)/60)/1.9364;
		} else {	
			x = (((((width+depth+10)*2.73)+((width+depth-12.65)*0.24)*height/2.5)+12)/60)/1.8;
		}
		return (Math.round(x * 1000000000))/1000000000;
	},
	
	"materialFoot" : function(width, depth, height){	
		var size = pedestal.isStandard(width, depth, height),
				x;
		if(size > -1){
			x = (((( width + depth ) *2 ) * height ) + ( width * depth)) /120;
		} else {
			x = (((( width + depth ) *2 ) * height ) + ( width * depth)) /95;
		}
		return (Math.round(x * 100))/100;
	},

	"packaging" : function(width, depth, height){		
		var check = pedestal.isStandard(width, depth, height),
				x;
		if (check > -1) {
			return pedestal.standardSizesPrice[(check)];
		} else {
			x = (pedestal.materialFoot(width, depth, height)*0.2)+(pedestal.laborHours(width, depth, height)*3.5)+30;
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
		var laborCalc = ( pedestal.laborHours(width, depth, height) * pedestal.laborRate ),
				materialsCalc = ( pedestal.materialFoot(width, depth, height) * pedestal.melaminePrice ),
				profitCalc = ( 1 + (pedestal.materialProfit)/100 ),
				packagingCalc = ( pedestal.packaging(width, depth, height) ),
				salesCalc = ( 100 / (100 - pedestal.bwAllowance - pedestal.customsSizeVar2)),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * pedestal.nonStandardSizeCorrection(width, depth, height);
		
		return (Math.round( price * 100))/100;
	},
	
	"laminatePriceCalc" : function(width, depth, height, option){		
		var laborCalc = ( pedestal.laborHours(width, depth, height) * pedestal.laborRate ),
				materialsCalc = ( pedestal.materialFoot(width, depth, height) * pedestal.laminatePrice ),
				profitCalc = ( 1 + (pedestal.materialProfit)/100 ),
				packagingCalc = ( pedestal.packaging(width, depth, height) + 12),
				salesCalc = ( 100 / (100 - pedestal.LamAllowance - pedestal.customsSizeVar2 )),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * pedestal.nonStandardSizeCorrection(width, depth, height);		

		return (Math.round( price * 100))/100;
	},
	
	"veenerPriceCalc" : function(width, depth, height, option){
		var laborCalc = ( pedestal.laborHours(width, depth, height) * pedestal.laborRate ),
				materialsCalc = ( pedestal.materialFoot(width, depth, height) * pedestal.veneerPrice ),
				profitCalc = ( 1 + (pedestal.materialProfit)/100 ),
				packagingCalc = ( pedestal.packaging(width, depth, height) + 15),
				salesCalc = ( 100 / (100 - pedestal.woodVeneerAllowance - pedestal.customsSizeVar2 )),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * pedestal.nonStandardSizeCorrection(width, depth, height);


		return (Math.round( price * 100))/100;
	},
	
	"aluminumPriceCalc" : function(width, depth, height, option){
		var laborCalc = ( pedestal.laborHours(width, depth, height) * pedestal.laborRate ),
				materialsCalc = ( pedestal.materialFoot(width, depth, height) * pedestal.laminatePrice * 1.27 ),
				profitCalc = ( 1 + (pedestal.materialProfit)/100 ),
				packagingCalc = ( pedestal.packaging(width, depth, height) + 15),
				salesCalc = ( 100 / (100 - pedestal.alumAllowance - pedestal.customsSizeVar2)),
				price = (laborCalc + materialsCalc * profitCalc + packagingCalc ) * ( salesCalc ) * pedestal.nonStandardSizeCorrection(width, depth, height);
		
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
		var compare = Math.round((width*depth)+(width+depth)+height),
				valueKey = pedestal.standardSizes.indexOf(compare);
		
		if (valueKey >= 0 ) {
			pedestal.customsSizeVar2 = 0;
			console.log("Standard Size located at " + valueKey );
			return valueKey;
		
		} else {
			pedestal.customsSizeVar2 = 13;
			console.log("This is a non standard size");
			return valueKey;
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
			
			calcVersion = pedestal.melaminePriceCalc;
			starter = "PDL";
			color = melamines[m];
			pedestal.tableBuilder();
			
		} // Melamines Loop End
		
		for (var l = 0; l < laminates.length; l++){
			
			calcVersion = pedestal.laminatePriceCalc;
			starter = "PDL";
			color = laminates[l];
			pedestal.tableBuilder();
		} // Laminates Loop End
		
		for (var b = 0; b < aluminums.length; b++){
			
			calcVersion = pedestal.aluminumPriceCalc;
			starter = "PDL";
			color = aluminums[b];
			pedestal.tableBuilder();
	
		} // Brushed Aluminum Loop End		
	
		for (var v = 0; v < veneers.length; v++){
			
			calcVersion = pedestal.veenerPriceCalc;
			starter = "PDV";
			color = veneers[v];
			pedestal.tableBuilder();

		} // Venner Loop End
		// Event Handler add for the new elements
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
	}, // Generater End
	
	"tableBuilder": function(){
		
		for (var i = 0; i < pedestal.standardWidthsAndDepths.length; i++) {
				
				/* Iterate through the heights for each for the width depth */
				width = pedestal.standardWidthsAndDepths[i];
				depth = pedestal.standardWidthsAndDepths[i];

				for (var h = 0; h < pedestal.standardHeights.length; h++) {
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

								sku.text(starter + skuSuffix + "-" + (Math.ceil(width)).toString() + (Math.ceil(depth)).toString() + color + "-" + (pedestal.standardHeights[h]).toString() + skuPrefix);
								price.text(x + topAddOnPrice + bottomAddOnPrice);
								size.text( width + " x " + depth + " x " + pedestal.standardHeights[h]);
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
}; // Pedestal App End

