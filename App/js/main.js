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
		topAddOns = [],
		bottomAddOns = [],
		selectedType = "",
		width,
		depth,
		height,
		material,
		starter,
		color,
		option,
		calcVersion,
		globalSizes = "",
		main = {
			
		};
		
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
		if(selector === "fivesiderDimensions" || selector === "cubetableDimensions" || selector === "taperedpedestalDimensions") {
			cylinderDimensions.hide();
			fivesiderDimensions.show();
		} else if (selector === "cylinderDimensions") {
			fivesiderDimensions.hide();
			cylinderDimensions.show();
		}
		
	})
	
	$("#finishes").on("change", function() {
		console.log("Finishes has been changed");
		var finishChoice = $("#finishes").val().toLowerCase().split(" "),
				selector = [];
				console.log(finishChoice);
	})
	
	/* Export to csv for the table found on stack overflow at http://stackoverflow.com/questions/16078544/export-to-csv-using-jquery-and-html */
	
	function exportTableToCSV($table, filename) {
		
    var $rows = $table.find('tr:has(td)'),

			// Temporary delimiter characters unlikely to be typed by keyboard
			// This is to avoid accidentally splitting the actual contents
			tmpColDelim = String.fromCharCode(11), // vertical tab character
			tmpRowDelim = String.fromCharCode(0), // null character

			// actual delimiter characters for CSV format
			colDelim = '","',
			rowDelim = '"\r\n"',

			// Grab text from table into CSV formatted string
			csv = '"' + $rows.map(function (i, row) {
					var $row = $(row),
							$cols = $row.find('td');

					return $cols.map(function (j, col) {
							var $col = $(col),
									text = $col.text();

							return text.replace('"', '""'); // escape double quotes

					}).get().join(tmpColDelim);

			}).get().join(tmpRowDelim)
					.split(tmpRowDelim).join(rowDelim)
					.split(tmpColDelim).join(colDelim) + '"',

			// Data URI
			csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $(".export").on('click', function (event) {
        // CSV
        exportTableToCSV.apply(this, [$('#dvData>table'), 'export.csv']);

        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
});

	
							


	

			
	