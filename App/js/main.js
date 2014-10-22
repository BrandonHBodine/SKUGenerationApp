/* Global DOM Variables should relocate */
var types = $("#types"),
		footprints = $("#footprints"),
		heights = $("#heights"),
		finishes = $("#finishes"),
		generate = $(".generate"),
		generateTapered = $(".generate-tapered"),
		generateCylinder = $(".generate-cylinder"),
		generateDustCover = $(".generate-dust-cover"),
		generateCubeTable = $(".generate-cube-table"),
		clearTable = $(".clear-table"),
		tr = $("tr"),
		melamines = ["BL", "WH"],
		laminates = ["BSG", "BLAL", "AT", "ST", "GT", "BGL", "WGL"],
		aluminums = ["BAL", "CFL"],
		veneers = ["WL", "CH", "OK", "MH", "EBWL", "ML", "ZB", "BN", "BC"],
		selectedType = "",
		width,
		depth,
		height,
		material,
		starter,
		color,
		option,
		calcVersion,
		globalSizes = "";
		
$( document ).ready(function() {
	
	"use strict";
	
	/* First Ajax Request to populate Types Dropdown */
	$.getJSON("json/type.json",function(data){
		
		for (var i = 0; i < data.types.length; i++) {
			var option = $("<option>").addClass("typeOptions");
			option.text(data.types[i]);
			option.val(data.types[i]);
			types.append(option);
		}
	});
	
	/* Event listener for send a request to get heights, footprints, prices, options, etc*/
	types.on("click", function(){
		event.stopPropagation();
		selectedType = types.val().toLowerCase().replace(/ /g,'');
		$("option.temp").remove();
		
		if(selectedType !== "typeofpedestal") { 
			
			$.getJSON("json/size.json", function(size){
		
				var heightsOptions = size.heights[selectedType],
						footPrintOptions = size.footprints[selectedType];
					
				for (var i = 0; i < heightsOptions.length; i++) {
					var option = $("<option>").addClass("heightOptions temp");
					option.text(size.heights[selectedType][i]);
					option.val(size.heights[selectedType][i]);
					heights.append(option);
				}
				
				for (var i = 0; i < footPrintOptions.length; i++) {
					var option = $("<option>").addClass("footPrintOptions temp");
					option.text(footPrintOptions[i]);
					option.val(footPrintOptions[i]);
					footprints.append(option);
				}
			});
			
			$.getJSON("json/finish.json", function(data) {
					
					var finish = data.finish;
					console.log(finish);
					console.log(finish.length);
				
					for (var i = 0; i < finish.length; i++) {
						var option = $("<option>").addClass("finishOptions temp");
						option.text(finish[i]);
						option.val(finish[i]);
						finishes.append(option);
					}
			});
		}
	});
	
/* Event Listener for Gnerator functions */
	generate.on("click", function(){
		pedestal.generator();
	});
	
	generateCylinder.on("click", function(){
		cylinder.generator();
	});
	
	generateTapered.on("click", function(){
		taperedColumn.generator();
	});
	
	generateDustCover.on("click", function(){
		dustCover.generator();
	});
	
		generateCubeTable.on("click", function(){
		cubeTable.generator();
	});
	
	$( "tr" ).on("click", function(){
		$( this ).toggleClass("success");
	});
	
	clearTable.on("click", function(){	
		
		var row = $("<tr>").addClass("header"),
				sku = $("<th>").addClass("sku").text("SKU"),
				size = $("<th>").addClass("size").text("SIZE"),
				price = $("<th>").addClass("price").text("PRICE");
		
		$("#price-table").empty();		
		
		row.append(sku);
		row.append(size);
		row.append(price);
		
		$("#price-table").append(row);
		
	});
	
	$("#types").on("change", function() {
		console.log("Drop Down has been change");
		var choiceArray = $("#types").val().toLowerCase().split(" "),
				selector = [],
				fivesiderDimensions = $(".fivesiderDimensions"),
				cylinderDimensions  = $(".cylinderDimensions");
		
		choiceArray.push("Dimensions");
		selector = choiceArray.join("");
		console.log(selector);
		if(selector === "fivesiderDimensions" || selector === "cubetableDimensions") {
			cylinderDimensions.hide();
			fivesiderDimensions.show();
		} else if (selector === "cylinderDimensions") {
			fivesiderDimensions.hide();
			cylinderDimensions.show();
		}
		
	})
	
							
});

	

			
	