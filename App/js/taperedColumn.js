"use strict";

var taperedColumn = {
	"laborRate" : 120,
	"materialProfit" : 10,
	"melaminePrice" : 0.75,
	"laminatePrice1" : 3.77,
	"laminatePrice2" : 4.69,
	"laminatePrice3" : 6.01,
	"veneerPrice" : 6.36,
	"melamineAllowance" : 20,
	"veneerAllowance" : 20,
	"standardWidthsDepths":[11.5, 15, 18, 20, 23],
	"standardHeights" : [12, 18, 24, 30, 36, 42],
	"melamines" : ["BL", "WH"],
	
	"laborHours" : function(width, depth, height) {
		var laborHours = 0;
		
		if (taperedColumn.standardCheck(width, depth, height)) {

			
			laborHours = (((((width+depth+144)*0.74)+((width+depth-12.65)*0.24)*height/3.1)+15)/60)/2;
			console.log("standard Size");
			
		} else {

			laborHours = (((((width+depth+144)*0.74)+((width+depth-12.65)*0.24)*height/3.1)+15)/60)/1.9;
			
			console.log("custom");
		}
			return laborHours;
	},
	
	"materialCost" : function(width, depth, height) {
		var material = 0;
		
		if (taperedColumn.standardCheck(width, depth, height)) {
			// standard
			material = ((((width+depth)*2)*height)+(width*depth))/110;
		
		} else {
		// custom 
			material = ((((width+depth)*2)*height)+(width*depth))/110;
		}
		
		return material;
	},
	"packagingCost" : function(width, depth, height) {
		var packaging = 0;
		if (taperedColumn.standardCheck(width, depth, height)) {
			// standard
			packaging = ((width*depth*(height+32))+110)/1305;
		} else {
			// custom 
			packaging = ((width*depth*(height+32))+110)/1100;
		}
		return packaging;
	},
	"melaminePriceCalc" : function(width, depth, height) {
		var price = 0;
		price = ((taperedColumn.laborHours(width, depth, height)*taperedColumn.laborRate)+(taperedColumn.materialCost(width, depth, height)*taperedColumn.melaminePrice*((taperedColumn.materialProfit+100)/100)+taperedColumn.packagingCost(width, depth, height)))*(100/(100-taperedColumn.melamineAllowance));
		
		return price;
	
	},
	"veneerPriceCalc" : function(width, depth, height) {
		var price = 0;
		
		price = ((taperedColumn.laborHours(width, depth, height)*taperedColumn.laborRate)+(taperedColumn.materialCost(width, depth, height)*taperedColumn.veneerPrice*((taperedColumn.materialProfit+100)/100)+taperedColumn.packagingCost(width, depth, height)))*(100/(100-taperedColumn.veneerAllowance));
		
		return price;
	},
	
	"standardCheck" : function(width, depth, height) {
		var check = false;
		
		if (width === depth && taperedColumn.standardWidthsDepths.indexOf(width) > -1 && taperedColumn.standardHeights.indexOf(height) > -1 ){
			check = true;
			console.log("Standard")
		}
		
		return check;
	},
	
	"generator" : function(width, depth, height){
		
		for (var m = 0; m < taperedColumn.melamines.length; m++){
			
			var calcVersion = taperedColumn.melamineCalc,
					starter = "TPDL",
					color = taperedColumn.melamines[m];
			
			for(var w =  0; w < taperedColumn.standardWidthsDepths.length; w++){
				var width = taperedColumn.standardWidthsDepths[w],
						depth = taperedColumn.standardWidthsDepths[w];
				
				for(var h = 0; h < taperedColumn.standardHeights.length; h++){
					var height = taperedColumn.standardHeights[h], 
					x = calcVersion(width, depth, taperedColumn.standardHeights[h]),
					topAddOnPrice = "",
					bottomAddOnPrice = "",
					skuSuffix = "",
					skuPrefix = "",
					tbody = $("#price-table"),
					row = $("<tr>").addClass("row-" + h),
					sku = $("<td>").addClass("sku"),
					size = $("<td>").addClass("size"),
					price = $("<td>").addClass("price");						

					sku.text(starter + skuSuffix + "-" + (Math.ceil(width)).toString() + (Math.ceil(depth)).toString() + color + "-" + (taperedColumn.standardHeights[h]).toString() + skuPrefix);
					price.text(x + topAddOnPrice + bottomAddOnPrice);
					size.text( width + " x " + depth + " x " + taperedColumn.standardHeights[h]);
					row.append(sku);
					row.append(size);
					row.append(price);
					tbody.append(row);
				}// End Height Loop
			} //End of Width and Depth loop 
		} // Melamines Loop End
		
		//event handler added after the elements are created
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
		
	}, // End Generator
};