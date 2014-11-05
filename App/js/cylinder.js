var cylinder = {
	// Variables set by Brad 
	"laborRate" : 100,
	"materialProfit" : 30 / 100,
	"laminatePrice" : 1.92,
	"veneerPrice" : 5.10,
	"P95": 142.00,
	"PD" : 19.60,
	"DW" : 5.87,
	"EPS" : 24.20,
	"kerfkore" : 180,
	"standardDiameters" : [12.5, 14.5, 18.5, 20.5, 24.5],
	"standardHeights": [3, 6, 12, 18, 24, 30, 36, 42],
	"landingCostTubes": 83,
	"topOptions" : ["N", "T", "L", "SL"],
	"bottomOptions" : ["N", "TK", "TKBL"],
	//=((B27+20)*0.0411)+(B27*D27*0.00112)
	"boxedLaborHours" : function (diameter, height) {
		//GOOD
		// Standard Size Check  
		if (cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			console.log("Standard size");
			return ((diameter + 20) * 0.0411) + (diameter * height * 0.00112);
		} else {
			// Check which Diameter Function to use
			// There might be sizes that are to big or to small to compute but that will be fixed later
			if (diameter <= 23.5) {
				console.log("Small size");
				// Function for the smaller sizes
				return ((diameter + 27.5) * 0.057) + ((diameter - 3) * (height * 0.0026));
			} else {
				console.log("Large size");
				//Function for the larger sizes
				return ((diameter + 8) * 0.0955) + ((diameter + 85) * (height * 0.00047));
			}
		}
	},
	
	//=E27*N1
	"laborDollars" : function (diameter, height) {
		var labor = cylinder.boxedLaborHours(diameter, height) * cylinder.laborRate;
		return labor;
	},
	//((B27*3.142*D27)*(N4/115.2)+((B27*B27)*(N4/115.2))+(N9*D27*0.01198)+(2*B27*B27*0.00553))*(1+N2)
	//((B29*3.142*D29)*(N$3/115.2)+((B29*B29)*(N$3/115.2))+(N$9*D29*0.01198)+(2*B29*B29*0.00553))*(1+N$2)
	
	"laminateMaterialCost" : function (diameter, height) {
		var materialCost = 0;
		
		if (cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			console.log("Is a standard diameter and height");
				materialCost = ((diameter * 3.142 * height) * (cylinder.laminatePrice / 115.2)+((diameter * diameter) *(cylinder.laminatePrice / 115.2)) + (cylinder.landingCostTubes * height * 0.01198) + (2 * diameter * diameter * 0.00553)) *(1 + cylinder.materialProfit);

		
		} else {
			
			materialCost = (diameter*3.142*height)*(cylinder.laminatePrice/115.2)+((diameter*diameter)*(cylinder.laminatePrice/115.2))+(cylinder.kerfkore*diameter*height*0.0009)+(2*diameter*diameter*0.00553)
		}
		
		return materialCost;
	},
	
	"veneerMaterialCost" : function(diameter, height){
		var materialCost = 0;
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			console.log("Is a standard diameter and height");
			materialCost = ((diameter*3.142*height)*(cylinder.veneerPrice/115.2)+((diameter*diameter)*(cylinder.veneerPrice/115.2))+(cylinder.landingCostTubes*height*0.01198)+(2*diameter*diameter*0.00553))*(1+cylinder.materialProfit);
		
		} else {
			materialCost = (diameter*3.142*height)*(cylinder.veneerPrice/115.2)+((diameter*diameter)*(cylinder.veneerPrice/115.2))+(cylinder.kerfkore*diameter*height*0.0009)+(2*diameter*diameter*0.00553);
		}
		 return materialCost;
	},
	
	"packagingCost": function(diameter, height){
		var packaging = 0;
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			console.log("Standard Size");
			packaging = (((diameter*diameter+200)+height*diameter)*cylinder.EPS*0.000353)+(((diameter*diameter+200)+height*diameter)*cylinder.DW*0.001412);
		} else {
			console.log("Custom Size");
			packaging =(((diameter*diameter+200)+height*diameter)*cylinder.EPS*0.0007)+(((diameter*diameter+200)+height*diameter)*cylinder.DW*0.002);
		}
		return packaging;
	},
	/** PRICE CALCS **/
	"laminatePriceCalc": function(diameter, height){	
		var laminate = (cylinder.laborDollars(diameter, height) + cylinder.laminateMaterialCost(diameter, height) + cylinder.packagingCost(diameter, height));
		return laminate; 
	},
	
	"aluminumPriceCalc": function(diameter, height){
		
		var brushedaluminum = cylinder.laminateCalc(diameter, height)+(((diameter+16)*(height+95))*0.00027*cylinder.laborRate)+(((diameter*diameter)+(diameter*3.1416*height))*(cylinder.laminatePrice*0.003542))*(1+cylinder.materialProfit);
		
		return brushedaluminum;
		
	},
	
	"veneerPriceCalc": function(diameter, height){
		var veneer = 0;
		
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			
				veneer = (cylinder.laborDollars(diameter, height)+60)+cylinder.veneerMaterialCost(diameter, height)+cylinder.packagingCost(diameter,height);
				
		} else {
			
			veneer = cylinder.laborDollars(diameter, height) + cylinder.veneerMaterialCost(diameter,height) + cylinder.packagingCost(diameter, height);
		
		}
		
		return veneer;
	},
	
	"dyedVeneerPriceCalc": function(diameter, height){
		var dyedVeneer = 0;
		
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			
			dyedVeneer = (cylinder.laborDollars(diameter,height)+80)+(cylinder.veneerMaterialCost(diameter, height))+(diameter*height*0.045)+cylinder.packagingCost(diameter, height);
			
		} else {
			
			dyedVeneer = (cylinder.laborDollars(diameter,height)+80)+(cylinder.veneerMaterialCost(diameter, height))+(diameter*height*0.045)+cylinder.packagingCost(diameter, height);
		
		}	
		
		return dyedVeneer;
	},
	
	"zebraPriceCalc": function(diameter, height){
		var zebra = 0;
		
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			
			zebra = cylinder.veneerCalc(diameter, height)+(((diameter*diameter)+(diameter*3.1416*height))*(cylinder.veneerPrice*0.003542))*(1+cylinder.materialProfit)+(((diameter*diameter)+(diameter*3.1416*height))*(cylinder.veneerPrice*0.003542))*(1+cylinder.materialProfit);
		
		} else {
			
			zebra = cylinder.veneerCalc(diameter, height)+(((diameter*diameter)+(diameter*3.1416*height))*(cylinder.veneerPrice*0.003542))*(1+cylinder.materialProfit)+(((diameter*diameter)+(diameter*3.1416*height))*(cylinder.veneerPrice*0.003542))*(1+cylinder.materialProfit);
		
		
		}
		
		return zebra;
	
	},
	"ambient": function(diameter, height){
		var ambient = 0;
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			ambient = (((diameter+15)*0.045455)*cylinder.laborRate)+((diameter-2.8)*0.010704*cylinder.P95);
		} else {
			ambient = (((diameter+15)*0.045455)*cylinder.laborRate)+((diameter-2.8)*0.010704*cylinder.P95);
		}
		
		return ambient;
		
	},
	
	"spotLight": function(diameter, height){
		var spot = 0;
		
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			spot = 150;
		} else {
			
			spot = 165;	
		}
		
		return spot;
		
	},
	"turntable": function(diameter, height){
		var turntable = 0;
		
		if(cylinder.standardDiameters.indexOf(diameter) > -1 && cylinder.standardHeights.indexOf(height) > -1) {
			
			turntable = (cylinder.laborRate*(diameter+40))*0.023;
		
		} else {
			
			turntable = (cylinder.laborRate*(diameter+40))*0.023;
		
		}
		
		return turntable;
		
	},
	
	"generator": function(){		
		for (var m = 0; m < melamines.length; m++){
			
			calcVersion = cylinder.laminateCalc;
			starter = "PDCL";
			color = melamines[m];
			cylinder.tableBuilder();
			
		} // Melamines Loop End
		
		for (var l = 0; l < laminates.length; l++){
			
			calcVersion = cylinder.laminateCalc;
			starter = "PDCL";
			color = laminates[l];
			cylinder.tableBuilder();
		} // Laminates Loop End
		
		for (var b = 0; b < aluminums.length; b++){
			
			calcVersion = cylinder.brushedAluminumCalc;
			starter = "PDCL";
			color = aluminums[b];
			cylinder.tableBuilder();
	
		} // Brushed Aluminum Loop End		
	
		for (var v = 0; v < veneers.length; v++){
			
			calcVersion = cylinder.veneerCalc;
			starter = "PDCV";
			color = veneers[v];
			cylinder.tableBuilder();

		} // Venner Loop End
		
		// Event Handler add for the new elements
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
	}, // Generater End
	
	"addItemToTable" : function (){
		var width = $('#Five_Sider_DimensionsWidth').val(),
				depth = $('#Five_Sider_DimensionsDepth').val(),
				height = $('#Five_Sider_DimensionsHeight').val(),
//			Need to Isolate which calc will be used based on the material selected
				calcVersion = "";
	
	}, //End Add Item
	
	"tableBuilder": function(){
		
		for (var i = 0; i < cylinder.standardDiameters.length; i++) {
				
				/* Iterate through the heights for each for the diameter depth */
				diameter = cylinder.standardDiameters[i];

				for (var h = 0; h < cylinder.standardHeights.length; h++) {
					// Iterate through the hieghts
					
						for (var top = 0; top < cylinder.topOptions.length; top++) {
						// Top Options Interation
						
							for (var bottom = 0; bottom < cylinder.bottomOptions.length; bottom++) {
							// Bottom Options Iterations
		
							
								/* Calculate the price of all each hieght widht depth combonations */
								var x = calcVersion(diameter, cylinder.standardHeights[h]),
												topAddOnPrice = cylinder[cylinder.topOptions[top]].price(diameter),
												bottomAddOnPrice = cylinder[cylinder.bottomOptions[bottom]].price(diameter),
												skuSuffix = cylinder[cylinder.topOptions[top]].suffix,
												skuPrefix = cylinder[cylinder.bottomOptions[bottom]].prefix,
												sizeString = (diameter).toString().replace(".", ""),
												tbody = $("#price-table"),
												row = $("<tr>").addClass("row-" + h),
												sku = $("<td>").addClass("sku"),
												size = $("<td>").addClass("size"),
												price = $("<td>").addClass("price");						

								sku.text(starter + skuSuffix + "-" + sizeString + color + "-" + (cylinder.standardHeights[h]).toString() + skuPrefix);
								price.text(x + topAddOnPrice + bottomAddOnPrice);
								size.text( diameter + " x " + cylinder.standardHeights[h]);
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
		"price" : function(diameter) {
								return 0;
		}
	},	
	"T": {
		"suffix": "T",
		"price" : function(diameter){
			return ( cylinder.laborRate * (diameter + 40)) * 0.023;								
							}
	},	
	"L":  {
		"suffix": "L",
		"price" : function(diameter){
			return (((diameter + 15) * 0.045455) * cylinder.laborRate) + ((diameter - 2.8) * 0.010704 * cylinder.P95);								
							}
	},	
	"SL":   {
		"suffix": "SL",
		"price" : function(diameter) {
								return (cylinder.EPS * 1) + (1 + cylinder.materialProfit) * ( cylinder.P95 * 0.23474);
							}
	},
	
	"TK":   {
		"prefix": "TK",
		"price" : function(diameter) {
								if (15 > diameter) {
										return 72.00;
									} else if ( diameter >= 15 && diameter < 18) {
										return 77.00;
									} else if ( diameter >= 18 && diameter < 20) {
										return 82.00;
									} else if  (diameter >= 20 && diameter < 23) {
										return 87.00;
									} else if (diameter >= 23){
										return 92.00;
									}
								}
	},
	"TKBL":   {
		"prefix": "TKBL",
		"price" : function(diameter) {
								if (15 > diameter) {
										return 72.00;
									} else if ( diameter >= 15 && diameter < 18) {
										return 77.00;
									} else if ( diameter >= 18 && diameter < 20) {
										return 82.00;
									} else if  (diameter >= 20 && diameter < 23) {
										return 87.00;
									} else if (diameter >= 23){
										return 92.00;
									}
								}

	}
	
};