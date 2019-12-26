$(function(){
	width = 932;
	data = {
	    "name": "flare",
	    "children": [{
	        "name": "analytics",
	        "children": [{
	            "name": "cluster",
	            "children": [{
	                "name": "AgglomerativeCluster",
	                "value": 3938
	            }, {
	                "name": "CommunityStructure",
	                "value": 3812
	            }, {
	                "name": "HierarchicalCluster",
	                "value": 6714
	            }, {
	                "name": "MergeEdge",
	                "value": 743
	            }]
	        }, {
	            "name": "graph",
	            "children": [{
	                "name": "BetweennessCentrality",
	                "value": 3534
	            }, {
	                "name": "LinkDistance",
	                "value": 5731
	            }, {
	                "name": "MaxFlowMinCut",
	                "value": 7840
	            }, {
	                "name": "ShortestPaths",
	                "value": 5914
	            }, {
	                "name": "SpanningTree",
	                "value": 3416
	            }]
	        }, {
	            "name": "optimization",
	            "children": [{
	                "name": "AspectRatioBanker",
	                "value": 7074
	            }]
	        }]
	    },  {
	        "name": "display",
	        "children": [{
	            "name": "DirtySprite",
	            "value": 8833
	        }]
	    }, {
	        "name": "flex",
	        "children": [{
	            "name": "FlareVis",
	            "value": 4116
	        }]
	    },  ]
	}
tree = data => {
  const root = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
};
//chart = {
//  const root = tree(data);

//}

const root = tree(data);

  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });
   var bodySelection = d3.select("#svg_preview")

  const svg = bodySelection.append("svg")
      .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

  const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

  const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
    .clone(true).lower()
      .attr("stroke", "white");

   console.log(svg.node())


})
