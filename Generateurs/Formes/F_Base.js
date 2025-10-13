class F_Base
{
	EM;

	Parameters = {};
	svg_group = {};

	Object = new Set();

	size

	constructor(em)
	{
		if (em == undefined)
			return;
		this.EM = em;
		
		this.EM.SVG_Draw.clear();
	}

	DrawObjects(drawing_droup)
	{
		this.Object.forEach(obj => {
			obj.Recreate(drawing_droup);
		});
	}

	// Courbe(parent, context, data)
	// {
	// 	let width = context["width"];
	// 	let height = context["height"];
	// 	let xs = context["xs"];
	// 	let xe = context["xe"];
	// 	let ys = context["ys"];
	// 	let ye = context["ye"];
	// 	let formule = data["formule"];
	// 	let stroke = data["stroke"];
	// 	let strokecolor = data["strokecolor"];
	// 	let dashstyle = data["dashstyle"];
	// 	let start = data["start"];
	// 	let end = data["end"];
		
	// 	if (formule == "" || formule == " ") return;
	// 	let dx = (xe - xs) / width;
	// 	let points = [[]];
	// 	let index = 0
	// 	let inside = false
	// 	x = Math.max(start, xs)
	// 	let y;
	// 	try {
	// 		y = Function('"use strict";return (' + formule + ')')()
	// 	} catch (error) {
	// 		alert("La formule entrée n'est pas correct : " + error)
	// 		return;
	// 	}

	// 	if (y > ys && y < ye)
	// 	{
	// 			points[index].push({
	// 					x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
	// 					y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
	// 			inside = true;
	// 	}
		
	// 	for(let px = 0; px < width; px++)
	// 	{
	// 			x = xs + dx * px;
	// 			if (x > start && x < end)
	// 			{
	// 					y = Function('"use strict";return (' + formule + ')')();
	// 					if (y > ys && y < ye)
	// 					{
	// 							points[index].push({
	// 									x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
	// 									y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
	// 							inside = true;
	// 					}
	// 					else if (inside)
	// 					{
	// 							y = Math.max(ys, Math.min(ye, y))
	// 							points[index].push({
	// 									x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
	// 									y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
	// 							points.push([])
	// 							index += 1;
	// 							inside = false;
	// 					}
	// 			}
	// 	}
	// 	x = Math.min(end, xe)
	// 	y = Function('"use strict";return (' + formule + ')')()
	// 	if (y > ys && y < ye)
	// 	{
	// 			points[index].push({
	// 					x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
	// 					y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
	// 	}
	// 	points.forEach(poly => {
	// 			if (poly.length > 1)
	// 			{
	// 					element = draw_polygone(paper,poly, false);
	// 					element.attr(
	// 							{
	// 									stroke: strokecolor,
	// 									"stroke-width": stroke,
	// 									"stroke-linecap": "round",
	// 									"stroke-linejoin": "round",
	// 									"stroke-dasharray": dashstyle
	// 							}
	// 					)
	// 			}
	// 	})
	// }
    
	// Point(parent, context, data)
	// {
	// 		let width = context["width"];
	// 		let height = context["height"];
	// 		let xs = context["xs"];
	// 		let xe = context["xe"];
	// 		let ys = context["ys"];
	// 		let ye = context["ye"];
	// 		let px = data["px"];
	// 		let py = data["py"];
	// 		let name = data["name"];
	// 		let tx = data["tx"];
	// 		let ty = data["ty"];
	// 		let txt_size = data["txt_size"];
	// 		let type = data["type_point"];
	// 		let size = data["size"];
	// 		let stroke = data["stroke"];
	// 		let strokecolor = data["strokecolor"];
	// 		let dashstyle = data["dashstyle"];

	// 		let p = {
	// 	x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
	// 				y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
	// 		}
	// if (ye == ys)
	// 	p.y = Canvas_height * 0.5
	
	// 		if(type == 0)
	// 		{
	// 				let line = draw_line(paper, p.x, p.y - size / 2.0, p.x, p.y + size / 2.0);
	// 				line.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 				line = draw_line(paper, p.x - size / 2.0, p.y, p.x + size / 2.0, p.y);
	// 				line.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	// 		else if (type == 1)
	// 		{
	// 				let line = draw_line(paper, p.x - size / 2.0, p.y - size / 2.0, p.x + size / 2.0, p.y + size / 2.0);
	// 				line.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 				line = draw_line(paper, p.x - size / 2.0, p.y + size / 2.0, p.x + size / 2.0, p.y - size / 2.0);
	// 				line.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	// 		else if (type == 2)
	// 		{
	// 				let c = paper.circle(p.x, p.y, size / 2.0);
	// 				c.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	// 		else if (type == 3)
	// 		{
	// 				let c = paper.circle(p.x, p.y, size / 2.0);
	// 				c.attr(
	// 						{
	// 								fill: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	// 		else if (type == 4)
	// 		{
	// 				let c = paper.circle(p.x, p.y, 1.0);
	// 				c.attr(
	// 						{
	// 								fill: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	
	// 		if (name != "")
	// 		{
	// 				element = paper.text( p.x + tx, p.y + ty, name);
	// 				element.attr(
	// 						{
	// 								fill: "white",
	// 								stroke: "white",
	// 								"stroke-width": 5,
	// 								"font-size": txt_size,
	// 								"text-anchor": "middle",
	// 								"font-weight": "bold"
	// 						}
	// 				)
	// 				element = paper.text( p.x + tx, p.y + ty, name);
	// 				element.attr(
	// 						{
	// 								fill: strokecolor,
	// 								"font-size": txt_size,
	// 								"text-anchor": "middle",
	// 						}
	// 				)
	// 		}
	// }
	
	// Polygone(parent, context, data)
	// {
	// 		let width = context["width"];
	// 		let height = context["height"];
	// 		let xs = context["xs"];
	// 		let xe = context["xe"];
	// 		let ys = context["ys"];
	// 		let ye = context["ye"];
	// 		let points_not = data["points"];
	// 		let fill_color = data["fill_color"];
	// 		let fill = data["fill"];
	// 		let stroke = data["stroke"];
	// 		let strokecolor = data["strokecolor"];
	// 		let dashstyle = data["dashstyle"];
	
	// 		let points = [];
	// 		for (var i = 0; i < points_not.length; i++) {
	// 				let x = points_not[i].x
	// 				let y = points_not[i].y
	// 				points.push({
	// 						x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width, 
	// 						y: Canvas_height - (Gen_Margin + 5 + (y - ys)/(ye - ys) * height)});
	// 		}
	
	// 		let polygone = draw_polygone(paper,points, points.length > 2);
	// 		if (fill)
	// 		{
	// 				polygone.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle,
	// 								"fill": fill_color
	// 						}
	// 				)
	// 		}
	// 		else
	// 		{
	// 				polygone.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	// }
	
	// Circle(parent, context, data)
	// {
	// 		let width = context["width"];
	// 		let height = context["height"];
	// 		let xs = context["xs"];
	// 		let xe = context["xe"];
	// 		let ys = context["ys"];
	// 		let ye = context["ye"];
	// 		let px = data["px"];
	// 		let py = data["py"];
	// 		let as = data["as"];
	// 		let ae = data["ae"];
	// 		let radius = data["radius"];
	// 		let fill_color = data["fill_color"];
	// 		let fill = data["fill"];
	// 		let stroke = data["stroke"];
	// 		let strokecolor = data["strokecolor"];
	// 		let dashstyle = data["dashstyle"];
	
	// 		let p = {
	// 				x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
	// 				y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
	// 		}
	// 		var rx = (radius - Math.min(xs, xe))/Math.abs(xe - xs) * width
	// 		var ry = (radius - Math.min(ys, ye))/Math.abs(ye - ys) * height
	// 		if (ye < ys) {as *= -1;ae *= -1;}
	// 		var element = draw_ellipse_arc(paper,p, as, ae, rx, ry, fill);
	// 		if (fill)
	// 		{
	// 				element.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle,
	// 								"fill": fill_color
	// 						}
	// 				)
	// 		}
	// 		else
	// 		{
	// 				element.attr(
	// 						{
	// 								stroke: strokecolor,
	// 								"stroke-width": stroke,
	// 								"stroke-linecap": "round",
	// 								"stroke-linejoin": "round",
	// 								"stroke-dasharray": dashstyle
	// 						}
	// 				)
	// 		}
	
	// }

	// Line(parent, context, data)
	// {
	// 		let width = context["width"];
	// 		let height = context["height"];
	// 		let xs = context["xs"];
	// 		let xe = context["xe"];
	// 		let ys = context["ys"];
	// 		let ye = context["ye"];
	// 		let stroke = data["stroke"];
	// 		let strokecolor = data["strokecolor"];
	// 		let dashstyle = data["dashstyle"];

	// 		let dxs = Gen_Margin + 5 + (data["xs"] - xs)/(xe - xs) * width;
	// 		let dxe = Gen_Margin + 5 + (data["xe"] - xs)/(xe - xs) * width;
	// 		let dys = Canvas_height - (Gen_Margin + 5 + (data["ys"] - ys)/(ye - ys) * height);
	// 		let dye = Canvas_height - (Gen_Margin + 5 + (data["ye"] - ys)/(ye - ys) * height);
	
	// 		let line = draw_line(paper, dxs, dys, dxe, dye);
	// 		line.attr(
	// 				{
	// 						stroke: strokecolor,
	// 						"stroke-width": stroke,
	// 						"stroke-linecap": "round",
	// 						"stroke-linejoin": "round",
	// 						"stroke-dasharray": dashstyle,
	// 				}
	// 		)
	// }

	// Segment(parent, context, data)
	// {
	// 		let width = context["width"];
	// 		let height = context["height"];
	// 		let xs = context["xs"];
	// 		let xe = context["xe"];
	// 		let ys = context["ys"];
	// 		let ye = context["ye"];
	// 		let pxs = data["psx"];
	// 		let pys = data["psy"];
	// 		let pxe = data["pex"];
	// 		let pye = data["pey"];
	// 		let style_s = data["ss"];
	// 		let style_e = data["se"];
	// 		let style_s_size = data["sss"];
	// 		let style_e_size = data["ses"];
	// 		let stroke = data["stroke"];
	// 		let strokecolor = data["strokecolor"];
	// 		let dashstyle = data["dashstyle"];

	// 		let dxs = Gen_Margin + 5 + (pxs - xs)/(xe - xs) * width;
	// 		let dxe = Gen_Margin + 5 + (pxe - xs)/(xe - xs) * width;
	// 		let dys = Canvas_height - (Gen_Margin + 5 + (pys - ys)/(ye - ys) * height);
	// 		let dye = Canvas_height - (Gen_Margin + 5 + (pye - ys)/(ye - ys) * height);
	
	// 		let dx1 = 0; let dy1 = 0;
	// 		let dx2 = 0; let dy2 = 0;
	// 		if (style_s == 2 || style_s == 5)
	// 		{
	// 			dx = dxe - dxs;
	// 			dy = dye - dys;
	// 			let l = Math.sqrt(dx * dx + dy * dy);
	// 			dx1 = dx / l * style_s_size / 10.0;
	// 			dy1 = dy / l * style_s_size / 10.0;
	// 		}
	// 		if (style_e == 2 || style_e == 5)
	// 		{
	// 			dx = dxs - dxe;
	// 			dy = dys - dye;
	// 			let l = Math.sqrt(dx * dx + dy * dy);
	// 			dx2= dx / l * style_s_size / 10.0;
	// 			dy2 = dy / l * style_s_size / 10.0;
	// 		}
	// 		let line = draw_line(paper, dxs + dx1, dys + dy1, dxe + dx2, dye + dy2);
	// 		line.attr(
	// 				{
	// 						stroke: strokecolor,
	// 						"stroke-width": stroke,
	// 						"stroke-linecap": "round",
	// 						"stroke-linejoin": "round",
	// 						"stroke-dasharray": dashstyle,
	// 				}
	// 		)

	// let poly = draw_fleche(style_s, dxs, dys, dxe, dye, style_s_size);
	// switch (style_s) {
	// 	case 1:
	// 	case 2:
	// 	case 4:
	// 	case 5:
	// 		poly.attr(
	// 			{
	// 				stroke: strokecolor,
	// 				"stroke-width": stroke,
	// 				"stroke-linecap": "round",
	// 				"stroke-linejoin": "round",
	// 			}
	// 		)
	// 		break;
	// 	case 3:
	// 		poly.attr(
	// 			{
	// 				stroke: strokecolor,
	// 				"fill": strokecolor
	// 			}
	// 		)
	// 	default:
	// 		break;
	// }
	// poly = draw_fleche(style_e, dxe, dye, dxs, dys, style_e_size);
	// switch (style_e) {
	// 	case 1:
	// 	case 2:
	// 	case 4:
	// 	case 5:
	// 		poly.attr(
	// 			{
	// 				stroke: strokecolor,
	// 				"stroke-width": stroke,
	// 				"stroke-linecap": "round",
	// 				"stroke-linejoin": "round",
	// 			}
	// 		)
	// 		break;
	// 	case 3:
	// 		poly.attr(
	// 			{
	// 				stroke: strokecolor,
	// 				"fill": strokecolor
	// 			}
	// 		)
	// 	default:
	// 		break;
	// }
	// }

	// Texte(parent, context, data)
	// {
	// 	let width = context["width"];
	// 	let height = context["height"];
	// 	let xs = context["xs"];
	// 	let xe = context["xe"];
	// 	let ys = context["ys"];
	// 	let ye = context["ye"];
	// 	let px = data["px"];
	// 	let py = data["py"];
	// 	let name = data["name"];
	// 	let angle = data["angle"];
	// 	let txt_size = data["txt_size"];
	// 	let strokecolor = data["strokecolor"];

	// 	let p = {
	// 		x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
	// 		y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
	// 	}

	// 	if (name != "")
	// 	{
	// 		element = paper.text( p.x, p.y, name);
	// 		element.attr(
	// 			{
	// 				fill: "white",
	// 				stroke: "white",
	// 				"stroke-width": 5,
	// 				"font-size": txt_size,
	// 				"text-anchor": "middle",
	// 				"font-weight": "bold",
	// 			}
	// 		)
	// 		element.rotate(angle);
	// 		element = paper.text( p.x, p.y, name);
	// 		element.attr(
	// 			{
	// 				fill: strokecolor,
	// 				"font-size": txt_size,
	// 				"text-anchor": "middle",
	// 			}
	// 		)
	// 		element.rotate(angle);
	// 	}
	// }

	// Section(parent, context, data)
	// {
	// 	let center = {x: context["cx"], y: context["cy"]};
	// 	let rx = context["rx"];
	// 	let ry = context["ry"];
	// 	let total_weight = context["total_weight"];

	// 	let mainstyle = context["mainstyle"]
	// 	let txt_style = context["txtstyle"]

	// 	let id = data["index"];
	// 	let weight_list = context["weight_list"]

	// 	let as = weight_list[id] / total_weight * 360.0;
	// 	let ae = as + data["weight"] / total_weight * 360.0;

	// 	var element = draw_ellipse_arc(paper,center, as, ae, rx, ry, true);
	// 	var partsvg = element["0"].cloneNode();
	// 	var svgmain = element["0"].ownerSVGElement;
		
	// 	//console.log(context)

	// 	let fill = data["fill"]
	// 	let fill_color = data["fill_color"]
	// 	let fill_size = data["fill_size"]
	// 	let fill_stroke = data["fill_stroke"]
	// 	let fill_type = data["fill_type"]
	// 	let txt = data[""]

	// 	// Fill section
	// 	if (fill)
	// 	{
	// 		let attr = {
	// 			stroke: mainstyle["stroke"],
	// 			"stroke-width": mainstyle["stroke-width"],
	// 			"stroke-linecap": "round",
	// 			"stroke-linejoin": "round",
	// 			"stroke-dasharray": mainstyle["stroke-dasharray"]
	// 		}
	// 		if (fill_type == 0)
	// 		{
	// 			attr["fill"] = fill_color;

	// 		}
	// 		else
	// 		{
	// 			let clippath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
	// 			clippath.id = "Section" + id.toString();
	// 			clippath.appendChild(partsvg)
	// 			svgmain.getElementsByTagName("defs")[0].appendChild(clippath);

	// 			let attr_fill = {
	// 				stroke: fill_color,
	// 				"stroke-width": fill_stroke,
	// 				"stroke-linecap": "round",
	// 				"stroke-linejoin": "round",
	// 			}
	// 			let dx = Math.ceil(center.x / fill_size)
	// 			let dy = Math.ceil(center.y / fill_size)

	// 			if (fill_type == 1)
	// 			{
	// 				for(let i = (1-dy); i < dy; i++)
	// 				{
	// 					let h = i * fill_size;
	// 					let xsquare = (1 - (h*h)/(ry*ry))
	// 					if (xsquare > 0)
	// 					{
	// 						let p1 = {x: 0, y: center.y + h}
	// 						let p2 = {x: center.x * 2, y: center.y + h}
	// 						let line = draw_linev(paper, p1, p2)
	// 						line.attr(attr_fill)
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 			else if (fill_type == 2)
	// 			{
	// 				for(let i = (1-dx); i < dx; i++)
	// 				{
	// 					let h = i * fill_size;
	// 					let ysquare = (1 - (h*h)/(rx*rx))
	// 					if (ysquare > 0)
	// 					{
	// 						let p1 = {y: 0, x: center.x + h}
	// 						let p2 = {y: center.y * 2, x: center.x + h}
	// 						let line = draw_linev(paper, p1, p2)
	// 						line.attr(attr_fill)
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 			else if (fill_type == 3)
	// 			{
	// 				let max = Math.max(dx, dy) * 2;
	// 				for(let i = (1-max); i < max; i++)
	// 				{
	// 					let h = i * fill_size / Math.SQRT2;
	// 					let p1 = {x: 0 - h, y: 0 + h}
	// 					let p2 = {x: center.x * 2 - h, y: center.y * 2 + h}
	// 					let line = draw_linev(paper, p1, p2)
	// 					line.attr(attr_fill)
	// 					line.toBack()
	// 					line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 				}
	// 			}
	// 			else if (fill_type == 4)
	// 			{
	// 				let max = Math.max(dx, dy) * 2;
	// 				for(let i = (1-max); i < max; i++)
	// 				{
	// 					let h = i * fill_size * Math.SQRT2;
	// 					let p1 = {x: 0, y: center.y * 2 + h}
	// 					let p2 = {x: center.x * 2 + h, y: 0}
	// 					let line = draw_linev(paper, p1, p2)
	// 					line.attr(attr_fill)
	// 					line.toBack()
	// 					line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 				}
	// 			}
	// 			else if (fill_type == 5)
	// 			{
	// 				let dx = Math.ceil(center.x / fill_size / Math.SQRT2)
	// 				let dy = Math.ceil(center.y / fill_size / Math.SQRT2) *2
	// 				for(let j = (1-dy); j < dy; j++)
	// 				{
	// 					let hy = j * fill_size * Math.SQRT2 / 2.0;
	// 					for(let i = (1-dx); i < dx; i++)
	// 					{
	// 						let hx = i * fill_size * Math.SQRT2;
	// 						if (j % 2 != 0) hx += fill_size * Math.SQRT2 / 2.0
	// 						let p1 = {x: center.x + hx, y: center.y + hy}
	// 						let line = paper.ellipse(p1.x, p1.y, fill_stroke, fill_stroke);
	// 						line.attr({fill: fill_color, stroke: "none"})
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 			else if (fill_type == 6)
	// 			{
	// 				for(let i = (1-dy); i < dy; i++)
	// 				{
	// 					let h = i * fill_size;
	// 					let xsquare = (1 - (h*h)/(ry*ry))
	// 					if (xsquare > 0)
	// 					{
	// 						let p1 = {x: 0, y: center.y + h}
	// 						let p2 = {x: center.x * 2, y: center.y + h}
	// 						let line = draw_linev(paper, p1, p2)
	// 						line.attr(attr_fill)
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 				for(let i = (1-dx); i < dx; i++)
	// 				{
	// 					let h = i * fill_size;
	// 					let ysquare = (1 - (h*h)/(rx*rx))
	// 					if (ysquare > 0)
	// 					{
	// 						let p1 = {y: 0, x: center.x + h}
	// 						let p2 = {y: center.y * 2, x: center.x + h}
	// 						let line = draw_linev(paper, p1, p2)
	// 						line.attr(attr_fill)
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 			else if (fill_type == 7)
	// 			{
	// 				let max = Math.max(dx, dy) * 2;
	// 				for(let i = (1-max); i < max; i++)
	// 				{
	// 					let h = i * fill_size / Math.SQRT2;
	// 					let p1 = {x: 0 - h, y: 0 + h}
	// 					let p2 = {x: center.x * 2 - h, y: center.y * 2 + h}
	// 					let line = draw_linev(paper, p1, p2)
	// 					line.attr(attr_fill)
	// 					line.toBack()
	// 					line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 				}
	// 				max = Math.max(dx, dy) * 2;
	// 				for(let i = (1-max); i < max; i++)
	// 				{
	// 					let h = i * fill_size * Math.SQRT2;
	// 					let p1 = {x: 0, y: center.y * 2 + h}
	// 					let p2 = {x: center.x * 2 + h, y: 0}
	// 					let line = draw_linev(paper, p1, p2)
	// 					line.attr(attr_fill)
	// 					line.toBack()
	// 					line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 				}
	// 			}
	// 			else if (fill_type == 8)
	// 			{
	// 				for(let i = (1-dx); i < dx; i++)
	// 				{
	// 					for(let j = (1-dy); j < dy; j++)
	// 					{
	// 						if ((i + j) % 2 == 0) continue;
	// 						let hx = i * fill_size;
	// 						let hy = j * fill_size;

	// 						let p1 = {x: center.x + hx, y: center.y + hy}
	// 						let line = paper.rect(p1.x, p1.y, fill_size, fill_size);
	// 						line.attr({fill: fill_color, stroke: "none"})
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 			else if (fill_type == 9)
	// 			{
	// 				for(let i = (0-dx); i < dx; i++)
	// 				{
	// 					for(let j = (0-dy); j < dy; j++)
	// 					{
	// 						if ((i + j) % 2 == 0) continue;
	// 						let d = fill_size * Math.SQRT1_2
	// 						let hx = i * d;
	// 						let hy = j * d;

	// 						let p1 = {x: center.x + hx - hy, y: center.y + hx + hy}
	// 						let p2 = {x: center.x + hx - hy + d, y: center.y + hx + hy + d}
	// 						let p3 = {x: center.x + hx - hy, y: center.y + hx + hy + d * 2}
	// 						let p4 = {x: center.x + hx - hy - d, y: center.y + hx + hy + d}
	// 						let line = draw_polygone(paper, [p1, p2, p3, p4], true);
	// 						line.attr({fill: fill_color, stroke: "none"})
	// 						line.toBack()
	// 						line["0"].setAttribute("clip-path", "url('#" + clippath.id + "')")
	// 					}
	// 				}
	// 			}
	// 		}

	// 		element.attr(attr)
	// 	}
	// 	else
	// 	{
	// 			element.attr(mainstyle)
	// 	}


	// 	//Add text
	// 	let txt_style_data = data["txt_type"];
	// 	if (txt_style_data != 1)
	// 	{
	// 		if (!txt_style.exist && txt_style_data == 0) return;

	// 		let txt_size = data["txt_size"]
	// 		if (txt_size == -1) txt_size = txt_style.size

	// 		let attr_white = {
	// 				fill: "white",
	// 				stroke: "white",
	// 				"stroke-width": 7,
	// 				"font-size": txt_size,
	// 				"text-anchor": "middle",
	// 				"font-weight": "bold",
	// 				"stroke-linejoin": "round",
	// 		}
	// 		let attr_black = {
	// 			fill: data["txt_color"],
	// 			"font-size": txt_size,
	// 			"text-anchor": "middle",
	// 		}

	// 		let type = txt_style_data;
	// 		if (type == 0) type = txt_style.type + 2

	// 		let txt_dist = data["txt_dist"] / 100.0;

	// 		if (type == 2) // Pourcentage
	// 		{
	// 			let value = Math.round(data["weight"] / total_weight * 1000.0) / 10.0
				
	// 			let da = (as + ae) / 2.0
	// 			let p = {
	// 				x: Round(center.x + rx * Math.cos(da * Math.PI / 180.0) * txt_dist, 3),
	// 				y: Round(center.y + ry * Math.sin(da * Math.PI / 180.0) * txt_dist, 3)
	// 			}
	// 			if (weight_list.length == 2) p = center;
	// 			element = paper.text(p.x, p.y, value.toString() + "%");
	// 			element.attr(attr_white)
	// 			element = paper.text(p.x, p.y, value.toString() + "%");
	// 			element.attr(attr_black)
	// 		}
	// 		else if (type == 3) // Fraction
	// 		{
	// 			let gcd_ = gcd(data["weight"], total_weight);
	// 			let value1 = data["weight"] / gcd_;
	// 			let value2 = total_weight / gcd_;
				
	// 			let da = (as + ae) / 2.0
	// 			let p = {
	// 				x: Round(center.x + rx * Math.cos(da * Math.PI / 180.0) * txt_dist, 3),
	// 				y: Round(center.y + ry * Math.sin(da * Math.PI / 180.0) * txt_dist, 3)
	// 			}
	// 			if (weight_list.length == 2) p = center;
	// 			element = paper.text(p.x, p.y - txt_size * 0.7, value1.toString());
	// 			element.attr(attr_white)
	// 			element = paper.text(p.x, p.y - txt_size * 0.7, value1.toString());
	// 			element.attr(attr_black)
	// 			element = paper.text(p.x, p.y + txt_size * 0.7, value2.toString());
	// 			element.attr(attr_white)
	// 			element = paper.text(p.x, p.y + txt_size * 0.7, value2.toString());
	// 			element.attr(attr_black)
	// 			element = paper.text(p.x, p.y + txt_size * 0.7, value2.toString());
	// 			element.attr(attr_black)

	// 			let line = draw_line(paper, p.x - txt_size / 2.0, p.y, p.x + txt_size / 2.0, p.y);
	// 			line.attr(
	// 					{
	// 							stroke: data["txt_color"],
	// 							"stroke-width": txt_size / 8.0,
	// 							"stroke-linecap": "round",
	// 							"stroke-linejoin": "round",
	// 					}
	// 			)
			
	// 		}
	// 		else if (type == 4) // Décimal
	// 		{
	// 			let value = Math.round(data["weight"] / total_weight * 1000.0) / 1000.0
				
	// 			let da = (as + ae) / 2.0
	// 			let p = {
	// 				x: Round(center.x + rx * Math.cos(da * Math.PI / 180.0) * txt_dist, 3),
	// 				y: Round(center.y + ry * Math.sin(da * Math.PI / 180.0) * txt_dist, 3)
	// 			}
	// 			if (weight_list.length == 2) p = center;
	// 			element = paper.text(p.x, p.y, value.toString());
	// 			element.attr(attr_white)
	// 			element = paper.text(p.x, p.y, value.toString());
	// 			element.attr(attr_black)
	// 		}
	// 	}


	// }
}