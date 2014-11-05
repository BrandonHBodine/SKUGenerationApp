var dustCover = {
	"laborRate" : 120,
	"materialProfit" : 0.20,
	"acrylicPrice" : 59.08,
	"DWBoxPrice" : 3.37,
	"EPSPrice" : 15.60,
	"acrylicWaste" : 1.21,
	"acrylicAllowance" : 20,
	"polycarbAllowance": 20,
	"uvAllowance" : 20,
	"standardWidthsDepths":[11.5, 15, 18, 20, 23],
	"standardHeights" : [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
	"standardCheck" : function(width, depth, height) {
		var check = false;
		
		if (width === depth && dustCover.standardWidthsDepths.indexOf(width) > -1 && dustCover.standardHeights.indexOf(height) > -1 ){
			check = true;
			console.log("Standard");
		}
		
		return check;
	},
	"standardFootprintCheck" : function(width, depth, height) {
		var check = false;
		if (width === depth && dustCover.standardWidthsDepths.indexOf(width) > -1) {
			check = true;
		}
		return check;
		
	},
	"laborHours" : function(width, depth, height) {
		var laborHours = 0;
		
		if (dustCover.standardCheck(width, depth, height)) { 
			labor = (((width+depth+115)*0.67)+((width+depth-12.65)*0.24)*(height/4)+12) / 90;
			console.log("standard labor");
		
		} else if (dustCover.standardFootprintCheck(width, depth, height)) {
			// custom height
			labor = ((((width+depth+115)*0.67)+((width+depth-12.65)*0.24)*height/4)+12)/90;
		} else{
			labor = (((((width+depth+115)*0.67)+((width+depth-12.65)*0.24)*height/4)+12)/60)*1.1;
		}
		return labor;
	},
	"laborDollars" : function(width, depth, height) {
		// function is the same for all dimensions 
		var laborDollars = (dustCover.laborHours(width, depth, height) * dustCover.laborRate);
		
		return laborDollars;
	},
	
	"materialCost" : function(width, depth, height) {
		var cost = 0;
		// standard
		if (dustCover.standardCheck(width, depth, height)) {
			cost = ((2*(width+depth)*(height))+(width*depth))*(dustCover.acrylicWaste)*(dustCover.acrylicPrice/4608)*(1+(dustCover.materialProfit));
		} else if (dustCover.standardFootprintCheck(width, depth, height)) { 
		// custom height
			cost = ((2*(width+depth)*(height))+(width*depth))*(dustCover.acrylicWaste)*(dustCover.acrylicPrice/4608)*(1+(dustCover.materialProfit));
		} else {
		//custom foot print
			cost = (((2*(width+depth)*(height))+(width*depth))*(dustCover.acrylicWaste)*(dustCover.acrylicPrice/4608)*(1+(dustCover.materialProfit)))*1.1;
		}
		return cost;
	},
	"packagingCost" : function(width, depth, height) {
		var packaging = 0;
		// standard
		if (dustCover.standardCheck(width, depth, height)) {
		packaging = ((width+depth-15.2)*(height+12)*dustCover.DWBoxPrice*0.0034)+(width*depth*dustCover.EPSPrice*0.00047)+(height*dustCover.EPSPrice*0.01033);
			
		} else if (dustCover.standardFootprintCheck(width, depth, height)) { 
		// custom height
		packaging = ((width+depth-15.2)*(height+12)*dustCover.DWBoxPrice*0.0034)+(width*depth*dustCover.EPSPrice*0.00047)+(height*dustCover.EPSPrice*0.01033);
		} else {
		//custom foot print
		packaging = (((width+depth-15.2)*(height+12)*dustCover.DWBoxPrice*0.0034)+(width*depth*dustCover.EPSPrice*0.00047)+(height*dustCover.EPSPrice*0.01033))*1.2;
		}
			return packaging;
	},
	"acrylicCalc" : function(width, depth, height) {
		//function is the same for all dimensions 
		// var acrylic = acrylic = (G15+H15+I15)*(100/(100-J$10));
		var acrylic = (dustCover.laborDollars(width, depth, height)+dustCover.materialCost(width, depth, height)+dustCover.packagingCost(width, depth, height))*(100/(100-dustCover.acrylicAllowance));
		
		return acrylic;
	},
	"polycarbCalc" : function(width, depth, height) {
		//function is the same for all dimensions
		//(($G25+(0.25*$M$1))+($H25*1.26)+$I25)*(100/(100-K$10))
		var polycarb = ((dustCover.laborDollars(width, depth, height)+(0.25*dustCover.laborRate))+(dustCover.materialCost(width, depth, height)*1.26)+dustCover.packagingCost(width, depth, height))*(100/(100-dustCover.polycarbAllowance));
		
		return polycarb;
	},
	"uvCalc" : function(width, depth, height) {
		//function is the same for all dimensions
		//((G25+(0.25*$M$1))+(H25*2.6)+I25)*(100/(100-L$10))
		var uv = ((dustCover.laborDollars(width, depth, height) +(0.25*dustCover.laborRate))+(dustCover.materialCost(width, depth, height) *2.6)+dustCover.packagingCost(width, depth, height) )*(100/(100-dustCover.uvAllowance));
		
		return uv;
	
	},
	"generator" : function(width, depth, height){
					
			var calcVersion = dustCover.acrylicCalc,
					starter = "CADC",
					color ="";
			
			for(var w =  0; w < dustCover.standardWidthsDepths.length; w++){
				var width = dustCover.standardWidthsDepths[w],
						depth = dustCover.standardWidthsDepths[w];
				
				for(var h = 0; h < dustCover.standardHeights.length; h++){
					var height = dustCover.standardHeights[h], 
					x = calcVersion(width, depth, dustCover.standardHeights[h]),
					topAddOnPrice = "",
					bottomAddOnPrice = "",
					skuSuffix = "",
					skuPrefix = "",
					tbody = $("#price-table"),
					row = $("<tr>").addClass("row-" + h),
					sku = $("<td>").addClass("sku"),
					size = $("<td>").addClass("size"),
					price = $("<td>").addClass("price");						

					sku.text(starter + skuSuffix + "-" + (Math.ceil(width)).toString() + (Math.ceil(depth)).toString() + color + "-" + (dustCover.standardHeights[h]).toString() + skuPrefix);
					price.text(x + topAddOnPrice + bottomAddOnPrice);
					size.text( width + " x " + depth + " x " + dustCover.standardHeights[h]);
					row.append(sku);
					row.append(size);
					row.append(price);
					tbody.append(row);
				}// End Height Loop
			} //End of Width and Depth loop
		
		// Event Handler add for the new elements
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
		
	}, // End Generator
	
	"addItemToTable" : function (){
		var width = $('#Five_Sider_DimensionsWidth').val(),
				depth = $('#Five_Sider_DimensionsDepth').val(),
				height = $('#Five_Sider_DimensionsHeight').val(),
//			Need to Isolate which calc will be used based on the material selected
				calcVersion = "";
	
	}, //End Add Item
};
	