            var width = 460;
            var height = 400;
            
            var color = d3.scale.threshold()
                            .domain([10, 20, 30, 40, 50])
                            .range(["#FF9B0D", "#E86D0C", "#FF4B00", "#E82D0C", "#FF0E0D"]);
              
            //TopoJSON Map
            //new projection
	    var projection = d3.geo.mercator()
                                .center([36.8000, 1.2667])
				.scale([1000])
                                .translate([width/2, height/2]);
                        
                        
            var path = d3.geo.path().projection(projection);
    
    
             var svg = d3.select("div#Map1")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("fill", "steelblue");
                        
            var g = svg.append("g")
                        .call(d3.behavior.zoom()
                              .scaleExtent([1, 10])
                              .on("zoom", zoom));
                        
            d3.json("js/output.json", function(error, topology) {
                g.selectAll("path")
                .data(topojson.feature(topology, topology.objects.kenya).features)
                .enter()
                .append("path")
                .attr("d", path);
            
            svg.append(
                       ("rect").attr("width", width).attr("height", height).style("stroke", "black").style("fill", "none")
                       );
            
            function zoom() {
                g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")}