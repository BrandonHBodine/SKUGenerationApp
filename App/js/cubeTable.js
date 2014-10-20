var cubeTable = {
	"standardWidthsDepths":[11.5, 15, 18, 20, 23],
	"standardHeights" : [12, 18, 24, 30, 36, 42],
	"generator": function(){		

		for (var m = 0; m < melamines.length; m++){
			
			calcVersion = pedestal.melaminePriceCalc;
			starter = "CUBE";
			color = melamines[m];
			pedestal.tableBuilder();
			
		} // Melamines Loop End
		
		for (var l = 0; l < laminates.length; l++){
			
			calcVersion = pedestal.laminatePriceCalc;
			starter = "CUBE";
			color = laminates[l];
			pedestal.tableBuilder();
		} // Laminates Loop End
		
		for (var b = 0; b < aluminums.length; b++){
			
			calcVersion = pedestal.aluminumPriceCalc;
			starter = "CUBE";
			color = aluminums[b];
			pedestal.tableBuilder();
	
		} // Brushed Aluminum Loop End		
	
		for (var v = 0; v < veneers.length; v++){
			
			calcVersion = pedestal.veenerPriceCalc;
			starter = "CUBE";
			color = veneers[v];
			pedestal.tableBuilder();

		} // Venner Loop End
		// Event Handler add for the new elements
		$( "tr" ).on("click", function(){
			$( this ).toggleClass("success");
		});
	}, // Generater End
}