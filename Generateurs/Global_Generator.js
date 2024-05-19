


{ // Objects
    function Draw_Objects(paper, objects, context)
    {
        objects.forEach(obj => {
            try{
                if (obj["type"] == "courbe")
                    Courbe(paper, context, obj)
                if (obj["type"] == "point")
                    Point(paper, context, obj)
                if (obj["type"] == "polygone")
                    Polygone(paper, context, obj)
                if (obj["type"] == "circle")
                    Circle(paper, context, obj)
                if (obj["type"] == "line")
                    Line(paper, context, obj)
				if (obj["type"] == "segment")
					Segment(paper, context, obj)
				if (obj["type"] == "texte")
					Texte(paper, context, obj)
            }
            catch(e){
                console.log(e)
            }
        });
    }
    
    function Courbe(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let formule = data["formule"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
        let start = data["start"];
        let end = data["end"];
        
    
        
        if (formule == "" || formule == " ") return;
        let dx = (xe - xs) / width;
        let points = [[]];
        let index = 0
        let inside = false
        x = Math.max(start, xs)
		try {
			let y = Function('"use strict";return (' + formule + ')')()
		} catch (error) {
			alert("La formule entrée n'est pas correct : " + error)
			return;
		}
        if (y > ys && y < ye)
        {
            points[index].push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
            inside = true;
        }
        
        for(let px = 0; px < width; px++)
        {
            x = xs + dx * px;
            if (x > start && x < end)
            {
                y = Function('"use strict";return (' + formule + ')')();
                if (y > ys && y < ye)
                {
                    points[index].push({
                        x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                        y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
                    inside = true;
                }
                else if (inside)
                {
                    y = Math.max(ys, Math.min(ye, y))
                    points[index].push({
                        x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                        y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
                    points.push([])
                    index += 1;
                    inside = false;
                }
            }
        }
        x = Math.min(end, xe)
        y = Function('"use strict";return (' + formule + ')')()
        if (y > ys && y < ye)
        {
            points[index].push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
        }
        points.forEach(poly => {
            if (poly.length > 1)
            {
                element = draw_polygone(paper,poly, false);
                element.attr(
                    {
                        stroke: strokecolor,
                        "stroke-width": stroke,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-dasharray": dashstyle
                    }
                )
            }
        })
    }
    
    function Point(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let px = data["px"];
        let py = data["py"];
        let name = data["name"];
        let tx = data["tx"];
        let ty = data["ty"];
        let txt_size = data["txt_size"];
        let type = data["type_point"];
        let size = data["size"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let p = {
			x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
            y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
        }
		if (ye == ys)
			p.y = Canvas_height * 0.5
    
        if(type == 0)
        {
            let line = draw_line(paper, p.x, p.y - size / 2.0, p.x, p.y + size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
            line = draw_line(paper, p.x - size / 2.0, p.y, p.x + size / 2.0, p.y);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 1)
        {
            let line = draw_line(paper, p.x - size / 2.0, p.y - size / 2.0, p.x + size / 2.0, p.y + size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
            line = draw_line(paper, p.x - size / 2.0, p.y + size / 2.0, p.x + size / 2.0, p.y - size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 2)
        {
            let c = paper.circle(p.x, p.y, size / 2.0);
            c.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 3)
        {
            let c = paper.circle(p.x, p.y, size / 2.0);
            c.attr(
                {
                    fill: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 4)
        {
            let c = paper.circle(p.x, p.y, 1.0);
            c.attr(
                {
                    fill: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    
        if (name != "")
        {
            element = paper.text( p.x + tx, p.y + ty, name);
            element.attr(
                {
                    fill: "white",
                    stroke: "white",
                    "stroke-width": 5,
                    "font-size": txt_size,
                    "text-anchor": "middle",
                    "font-weight": "bold"
                }
            )
            element = paper.text( p.x + tx, p.y + ty, name);
            element.attr(
                {
                    fill: strokecolor,
                    "font-size": txt_size,
                    "text-anchor": "middle",
                }
            )
        }
    }
    
    function Polygone(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let points_not = data["points"];
        let fill_color = data["fill_color"];
        let fill = data["fill"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
    
        let points = [];
        for (var i = 0; i < points_not.length; i++) {
            let x = points_not.x
            let y = points_not.y
            points.push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width, 
                y: Canvas_height - (Gen_Margin + 5 + (y - ys)/(ye - ys) * height)});
        }
    
        let polygone = draw_polygone(paper,points, points.length > 2);
        if (fill)
        {
            polygone.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle,
                    "fill": fill_color
                }
            )
        }
        else
        {
            polygone.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    }
    
    function Circle(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let px = data["px"];
        let py = data["py"];
        let as = data["as"];
        let ae = data["ae"];
        let radius = data["radius"];
        let fill_color = data["fill_color"];
        let fill = data["fill"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
    
        let p = {
            x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
            y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
        }
        var rx = (radius - Math.min(xs, xe))/Math.abs(xe - xs) * width
        var ry = (radius - Math.min(ys, ye))/Math.abs(ye - ys) * height
        if (ye < ys) {as *= -1;ae *= -1;}
        var element = draw_ellipse_arc(paper,p, as, ae, rx, ry, fill);
        if (fill)
        {
            element.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle,
                    "fill": fill_color
                }
            )
        }
        else
        {
            element.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    
    }

    function Line(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let dxs = Gen_Margin + 5 + (data["xs"] - xs)/(xe - xs) * width;
        let dxe = Gen_Margin + 5 + (data["xe"] - xs)/(xe - xs) * width;
        let dys = Canvas_height - (Gen_Margin + 5 + (data["ys"] - ys)/(ye - ys) * height);
        let dye = Canvas_height - (Gen_Margin + 5 + (data["ye"] - ys)/(ye - ys) * height);
    
        let line = draw_line(paper, dxs, dys, dxe, dye);
        line.attr(
            {
                stroke: strokecolor,
                "stroke-width": stroke,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-dasharray": dashstyle,
            }
        )
    }

	function Segment(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let pxs = data["psx"];
        let pys = data["psy"];
        let pxe = data["pex"];
        let pye = data["pey"];
		let style_s = data["ss"];
		let style_e = data["se"];
		let style_s_size = data["sss"];
		let style_e_size = data["ses"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let dxs = Gen_Margin + 5 + (pxs - xs)/(xe - xs) * width;
        let dxe = Gen_Margin + 5 + (pxe - xs)/(xe - xs) * width;
        let dys = Canvas_height - (Gen_Margin + 5 + (pys - ys)/(ye - ys) * height);
        let dye = Canvas_height - (Gen_Margin + 5 + (pye - ys)/(ye - ys) * height);
    
		let dx1 = 0; let dy1 = 0;
		let dx2 = 0; let dy2 = 0;
		if (style_s == 2 || style_s == 5)
		{
			dx = dxe - dxs;
			dy = dye - dys;
			let l = Math.sqrt(dx * dx + dy * dy);
			dx1 = dx / l * style_s_size / 10.0;
			dy1 = dy / l * style_s_size / 10.0;
		}
		if (style_e == 2 || style_e == 5)
		{
			dx = dxs - dxe;
			dy = dys - dye;
			let l = Math.sqrt(dx * dx + dy * dy);
			dx2= dx / l * style_s_size / 10.0;
			dy2 = dy / l * style_s_size / 10.0;
		}
        let line = draw_line(paper, dxs + dx1, dys + dy1, dxe + dx2, dye + dy2);
        line.attr(
            {
                stroke: strokecolor,
                "stroke-width": stroke,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-dasharray": dashstyle,
            }
        )

		console.log(data)

		let poly = draw_fleche(style_s, dxs, dys, dxe, dye, style_s_size);
		switch (style_s) {
			case 1:
			case 2:
			case 4:
			case 5:
				poly.attr(
					{
						stroke: strokecolor,
						"stroke-width": stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
					}
				)
				break;
			case 3:
				poly.attr(
					{
						stroke: strokecolor,
						"fill": strokecolor
					}
				)
			default:
				break;
		}
		poly = draw_fleche(style_e, dxe, dye, dxs, dys, style_e_size);
		switch (style_e) {
			case 1:
			case 2:
			case 4:
			case 5:
				poly.attr(
					{
						stroke: strokecolor,
						"stroke-width": stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
					}
				)
				break;
			case 3:
				poly.attr(
					{
						stroke: strokecolor,
						"fill": strokecolor
					}
				)
			default:
				break;
		}
    }

	function Texte(paper, context, data)
	{
		let width = context["width"];
		let height = context["height"];
		let xs = context["xs"];
		let xe = context["xe"];
		let ys = context["ys"];
		let ye = context["ye"];
		let px = data["px"];
		let py = data["py"];
		let name = data["name"];
		let angle = data["angle"];
		let txt_size = data["txt_size"];
		let strokecolor = data["strokecolor"];

		let p = {
			x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
			y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
		}

		if (name != "")
		{
			element = paper.text( p.x, p.y, name);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": txt_size,
					"text-anchor": "middle",
					"font-weight": "bold",
				}
			)
			element.rotate(angle);
			element = paper.text( p.x, p.y, name);
			element.attr(
				{
					fill: strokecolor,
					"font-size": txt_size,
					"text-anchor": "middle",
				}
			)
			element.rotate(angle);
		}
	}
}

{ // Type

function RepereGradue(paper, data)
{
    let Canvas_width = data["Canvas_width"];
    let Canvas_height = data["Canvas_height"];
    let Gen_Margin = data["Gen_Margin"];
    let objects = data["objects"];
    let hor_pri_nbr = data["hor_pri_nbr"];
    let hor_sec_nbr = data["hor_sec_nbr"];
    let hor_start = data["hor_start"];
    let hor_pas = data["hor_pas"];
    let hor_text = data["hor_text"];
    let hor_text_pos = data["hor_text_pos"];
	let hor_text_size = data["hor_text_size"];
	let hor_text_offset = data["hor_text_offset"];
	let ver_pri_nbr = data["ver_pri_nbr"];
	let ver_sec_nbr = data["ver_sec_nbr"];
	let ver_start = data["ver_start"];
	let ver_pas = data["ver_pas"];
	let ver_text = data["ver_text"];
	let ver_text_pos = data["ver_text_pos"];
	let ver_text_size = data["ver_text_size"];
	let ver_text_offset = data["ver_text_offset"];
	let line_pry_stroke = data["line_pry_stroke"];
	let line_pry_color = data["line_pry_color"];
	let line_pry_pin_size = data["line_pry_pin_size"];
	let line_pry_arrow = data["line_pry_arrow"];
	let line_pry_grid = data["line_pry_grid"];
	let line_pry_grid_stroke = data["line_pry_grid_stroke"];
	let line_pry_grid_color = data["line_pry_grid_color"];
	let line_sec_stroke = data["line_sec_stroke"];
	let line_sec_color = data["line_sec_color"];
	let line_sec_pin_size = data["line_sec_pin_size"];
	let line_sec_grid = data["line_sec_grid"];
	let line_sec_grid_stroke = data["line_sec_grid_stroke"];
	let line_sec_grid_color = data["line_sec_grid_color"];
	
	let w = Canvas_width - Gen_Margin * 2 - line_pry_arrow - 10;
	let h = Canvas_height - Gen_Margin * 2 - line_pry_arrow - 10;

	let pdx = w * 1.0 / hor_pri_nbr;
	let sdx = pdx * 1.0 / hor_sec_nbr;

	let pdy = h * 1.0 / ver_pri_nbr;
	let sdy = pdy * 1.0 / ver_sec_nbr;

	let hy = 0;
	let hx = Canvas_width -  Gen_Margin - line_pry_arrow;

	let vx = 0;
	let vy = Gen_Margin + line_pry_arrow;

	if (ver_start >= 0)
		hy = Canvas_height - Gen_Margin - 5
	else if (ver_start + ver_pri_nbr * ver_pas <= 0)
		hy = Gen_Margin + line_pry_arrow + 5
	else
		hy = Canvas_height - Gen_Margin - 5 + (ver_start / ver_pas) * pdy
	
	if (hor_start >= 0)
		vx = Gen_Margin + 5
	else if (hor_start + hor_pri_nbr * hor_pas <= 0)
		vx = Canvas_width - Gen_Margin - line_pry_arrow - 5
	else
		vx = Gen_Margin + 5 - (hor_start / hor_pas) * pdx

	// axe horizontale
	
	let element;


	//Grilles
	
	
	if (line_pry_grid)
	{
		for(let i = 0; i <= hor_pri_nbr; i++)
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * pdx, Gen_Margin + line_pry_arrow, 
				Gen_Margin + 5 + i * pdx, Canvas_height - Gen_Margin);
			element.attr(
				{
					stroke: line_pry_grid_color,
					"stroke-width": line_pry_grid_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		for(let i = 0; i <= ver_pri_nbr; i++)
		{
			element = draw_line(paper, 
				Gen_Margin, Canvas_height - Gen_Margin - 5 - i * pdy,
				Canvas_width - Gen_Margin - line_pry_arrow, Canvas_height - Gen_Margin - 5 - i * pdy);
			element.attr(
				{
					stroke: line_pry_grid_color,
					"stroke-width": line_pry_grid_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
	}

	if (line_sec_grid)
	{
		for(let i = 0; i < hor_pri_nbr; i++)
		{
			for(let j = 1; j < hor_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, Gen_Margin + line_pry_arrow, 
					Gen_Margin + 5 + i * pdx + j * sdx, Canvas_height - Gen_Margin);
				element.attr(
					{
						stroke: line_sec_grid_color,
						"stroke-width": line_sec_grid_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
		for(let i = 0; i < ver_pri_nbr; i++)
		{
			for(let j = 1; j < ver_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy,
					Canvas_width - Gen_Margin - line_pry_arrow, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy);
				element.attr(
					{
						stroke: line_sec_grid_color,
						"stroke-width": line_sec_grid_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}


	// Tiret
	for(let i = 0; i <= hor_pri_nbr; i++)
	{
		if (hor_start + hor_pas * i  != 0)
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * pdx, hy - line_pry_pin_size / 2.0, 
				Gen_Margin + 5 + i * pdx, hy + line_pry_pin_size / 2.0);
			element.attr(
				{
					stroke: line_pry_color,
					"stroke-width": line_pry_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		if (i < hor_pri_nbr)
		{
			for(let j = 1; j < hor_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy - line_sec_pin_size / 2.0, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy + line_sec_pin_size / 2.0);
				element.attr(
					{
						stroke: line_sec_color,
						"stroke-width": line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}
	for(let i = 0; i <= ver_pri_nbr; i++)
	{
		if (ver_start + ver_pas * i  != 0)
		{
			element = draw_line(paper, 
				vx - line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy,
				vx + line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy);
			element.attr(
				{
					stroke: line_pry_color,
					"stroke-width": line_pry_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		if(i < ver_pri_nbr)
		{
			for(let j = 1; j < ver_sec_nbr; j++)
			{
				element = draw_line(paper, 
					vx - line_sec_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy,
					vx + line_sec_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy);
				element.attr(
					{
						stroke: line_sec_color,
						"stroke-width": line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}

	// Axes
	element = draw_line(paper, Gen_Margin, hy, hx, hy);
	element.attr(
		{
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)
	element = draw_line(paper, vx, Canvas_height - Gen_Margin, vx, vy);
	element.attr(
		{
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	// Fleche
	let points = [{x: hx,y: hy}, {x: hx + 0.25 * line_pry_arrow,y: hy}, 
		{x: hx + 0.25 * line_pry_arrow,y: hy + 0.5 * line_pry_arrow},
		{x: hx + line_pry_arrow,y: hy},
		{x: hx + 0.25 * line_pry_arrow,y: hy - 0.5 * line_pry_arrow},
		{x: hx + 0.25 * line_pry_arrow,y: hy}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: line_pry_color,
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)
	points = [{x: vx,y: vy}, {x: vx,y: vy - 0.25 * line_pry_arrow}, 
		{x: vx + 0.5 * line_pry_arrow,y: vy - 0.25 * line_pry_arrow},
		{x: vx,y: vy - line_pry_arrow},
		{x: vx - 0.5 * line_pry_arrow,y: vy - 0.25 * line_pry_arrow},
		{x: vx,y: vy - 0.25 * line_pry_arrow}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: line_pry_color,
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	Draw_Objects(paper, objects, {
        "width": w, "height": h, "xs": hor_start, "xe": hor_start + hor_pri_nbr * hor_pas,
        "ys": ver_start, "ye": ver_start + ver_pri_nbr * ver_pas});

	// Draw text
	for(let i = 0; i <= hor_pri_nbr; i++)
	{
		if (hor_text && hor_start + hor_pas * i != 0)
		{
			let x = Gen_Margin + 5 + i * pdx
			let y = 0;
			if (hor_text_pos == 0)
				y = hy + line_pry_pin_size / 2.0 + 2 + hor_text_size + hor_text_offset;
			else
				y = hy - line_pry_pin_size / 2.0 - hor_text_size - hor_text_offset;
			let text = Round(hor_start + hor_pas * i, 5) 
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": hor_text_size,
					"text-anchor": "middle",
					"font-weight": "bold"
				}
			)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: line_pry_color,
					"font-size": hor_text_size,
					"text-anchor": "middle",
				}
			)
		}
	}
	for(let i = 0; i <= ver_pri_nbr; i++)
	{
		if (ver_text && ver_start + ver_pas * i != 0 )
		{
			element = draw_line(paper, 
				vx - line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy,
				vx + line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy);
			let x = 0;
			let y = Canvas_height - Gen_Margin - 5 - i * pdy;
			if (ver_text_pos == 0)
				x = vx - line_pry_pin_size / 2.0 - ver_text_size - ver_text_offset;
			else
				x = vx + line_pry_pin_size / 2.0 + ver_text_size + ver_text_offset;
			let text = Round(ver_start + ver_pas * i , 5)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": ver_text_size,
					"text-anchor": "middle",
					"font-weight": "bold"
				}
			)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: line_pry_color,
					"font-size": ver_text_size,
					"text-anchor": "middle",
				}
			)
		}
	}
}

function AxeGradue(paper, data)
{
	let Canvas_width = data["Canvas_width"];
    let Canvas_height = data["Canvas_height"];
    let Gen_Margin = data["Gen_Margin"];
    let objects = data["objects"];
	
	let axe_pri_nbr = data["axe_pri_nbr"];
	let axe_sec_nbr = data["axe_sec_nbr"];
	let axe_start = data["axe_start"];
	let axe_pas = data["axe_pas"];
	let axe_text = data["axe_text"];
	let axe_text_pos = data["axe_text_pos"];
	let axe_text_size = data["axe_text_size"];
	let axe_text_offset = data["axe_text_offset"];
	let axe_line_pry_stroke = data["axe_line_pry_stroke"];
	let axe_line_pry_color = data["axe_line_pry_color"];
	let axe_line_pry_pin_size = data["axe_line_pry_pin_size"];
	let axe_line_pry_arrow = data["axe_line_pry_arrow"];
	let axe_line_sec_stroke = data["axe_line_sec_stroke"];
	let axe_line_sec_color = data["axe_line_sec_color"];
	let axe_line_sec_pin_size = data["axe_line_sec_pin_size"];
	
	let w = Canvas_width - Gen_Margin * 2 - axe_line_pry_arrow - 10;
	let h = Canvas_height - Gen_Margin * 2;

	let pdx = w * 1.0 / axe_pri_nbr;
	let sdx = pdx * 1.0 / axe_sec_nbr;

	let hy = h / 2.0 + Gen_Margin;
	let hx = Canvas_width -  Gen_Margin - axe_line_pry_arrow;

	let element;



	// Tiret
	for(let i = 0; i <= axe_pri_nbr; i++)
	{
		element = draw_line(paper, 
			Gen_Margin + 5 + i * pdx, hy - axe_line_pry_pin_size / 2.0, 
			Gen_Margin + 5 + i * pdx, hy + axe_line_pry_pin_size / 2.0);
		element.attr(
			{
				stroke: axe_line_pry_color,
				"stroke-width": axe_line_pry_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}
		)
		if (i < axe_pri_nbr)
		{
			for(let j = 1; j < axe_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy - axe_line_sec_pin_size / 2.0, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy + axe_line_sec_pin_size / 2.0);
				element.attr(
					{
						stroke: axe_line_sec_color,
						"stroke-width": axe_line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}

	// Axe
	element = draw_line(paper, Gen_Margin, hy, hx, hy);
	element.attr(
		{
			stroke: axe_line_pry_color,
			"stroke-width": axe_line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	// Fleche
	let points = [{x: hx,y: hy}, {x: hx + 0.25 * axe_line_pry_arrow,y: hy}, 
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy + 0.5 * axe_line_pry_arrow},
		{x: hx + axe_line_pry_arrow,y: hy},
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy - 0.5 * axe_line_pry_arrow},
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: axe_line_pry_color,
			stroke: axe_line_pry_color,
			"stroke-width": axe_line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	Draw_Objects(paper, objects, {
        "width": w, "height": h, "xs": axe_start, "xe": axe_start + axe_pri_nbr * axe_pas,
        "ys": 0, "ye": 0});

	// Draw text
	for(let i = 0; i <= axe_pri_nbr; i++)
	{
		let x = Gen_Margin + 5 + i * pdx
		let y = 0;
		if (axe_text_pos == 0)
			y = hy + axe_line_pry_pin_size / 2.0 + 2 + axe_text_size + axe_text_offset;
		else
			y = hy - axe_line_pry_pin_size / 2.0 - axe_text_size - axe_text_offset;
		let text = Round(axe_start + axe_pas * i, 5) 
		element = paper.text( x, y, text);
		element.attr(
			{
				fill: "white",
				stroke: "white",
				"stroke-width": 5,
				"font-size": axe_text_size,
				"text-anchor": "middle",
				"font-weight": "bold"
			}
		)
		element = paper.text( x, y, text);
		element.attr(
			{
				fill: axe_line_pry_color,
				"font-size": axe_text_size,
				"text-anchor": "middle",
			}
		)
	}
}

function Quadrillage(paper, data)
{
    let Canvas_width = data["Canvas_width"];
    let Canvas_height = data["Canvas_height"];
    let Gen_Margin = data["Gen_Margin"];
    let objects = data["objects"];

	let c_hor_nbr = data["c_hor_nbr"];
	let c_ver_nbr = data["c_ver_nbr"];
	let c_size_x = data["c_size_x"];
	let c_size_y = data["c_size_y"];
	let q_points = data["q_points"];
	let q_line_color = data["q_line_color"];
	let q_line_stroke = data["q_line_stroke"];
	let q_int = data["q_int"];
	let c_int_hor_nbr = data["c_int_hor_nbr"];
	let c_int_ver_nbr = data["c_int_ver_nbr"];
	let q_int_line_color = data["q_int_line_color"];
	let q_int_line_stroke = data["q_int_line_stroke"];

	Canvas_width = c_hor_nbr * c_size_x + Gen_Margin*2 + 10; 
	Canvas_height = c_ver_nbr * c_size_y + Gen_Margin*2 + 10;

	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();
	
	if(q_int)
	{
		var x_s = c_size_x * 1.0 / c_int_hor_nbr;
		var y_s = c_size_y * 1.0 / c_int_ver_nbr;
		var start = 1;
		if (q_points) start = 0;
		
		for (let i = 0; i <= c_hor_nbr * c_int_hor_nbr; i++) 
		{
			if (!q_points && i % c_int_hor_nbr == 0) continue;
			element = draw_line(paper, 
				Gen_Margin + 5 + i * x_s, Gen_Margin + 5, 
				Gen_Margin + 5 + i * x_s, Canvas_height - Gen_Margin - 5);
			element.attr(
				{
					stroke: q_int_line_color,
					"stroke-width": q_int_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				})
		}
		for (let i = 0; i <= c_ver_nbr * c_int_ver_nbr; i++) 
		{
			if (!q_points && i % c_int_ver_nbr == 0) continue;
			element = draw_line(paper, 
				Gen_Margin + 5, Gen_Margin + 5 + i * y_s, 
				Canvas_width - Gen_Margin - 5, Gen_Margin + 5 + i * y_s);
			element.attr(
				{
					stroke: q_int_line_color,
					"stroke-width": q_int_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				})
		}
	}

	if (q_points)
	{
		for (let i = 0; i <= c_hor_nbr; i++) 
		{
			for (let j = 0; j <= c_ver_nbr; j++) 
			{
				element = paper.circle(
					Gen_Margin + 5 + i * c_size_x,
					Gen_Margin + 5 + j * c_size_y,
					q_line_stroke / 2.0
				)
				element.attr(
					{
						fill: q_line_color,
					}
				)
			}
		}
	}
	else
	{
		for (let i = 0; i <= c_hor_nbr; i++) 
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * c_size_x, Gen_Margin + 5, 
				Gen_Margin + 5 + i * c_size_x, Canvas_height - Gen_Margin - 5);
			element.attr(
				{
					stroke: q_line_color,
					"stroke-width": q_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		for (let i = 0; i <= c_ver_nbr; i++) 
		{
			element = draw_line(paper, 
				Gen_Margin + 5, Gen_Margin + 5 + i * c_size_y, 
				Canvas_width - Gen_Margin - 5, Gen_Margin + 5 + i * c_size_y);
			element.attr(
				{
					stroke: q_line_color,
					"stroke-width": q_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
	}

    
	Draw_Objects(paper, objects, {
        "width": c_hor_nbr * c_size_x, 
        "height": c_ver_nbr * c_size_y, "xs": 0, "xe": c_hor_nbr,
        "ys": c_ver_nbr, "ye": 0});
	
	return [Canvas_width, Canvas_height]

}

function Solide(paper, data)
{
	
}

}

{ //TOOLS

function draw_line(paper, sx, sy, ex, ey)
{
	return paper.path("M" + sx + " " + sy + "L" + ex + " " + ey);
}

function draw_polygone(paper, points, close = true)
{
	let txt = "M" + points[0].x + " " + points[0].y;
	for(let i = 1; i < points.length; i++){
		txt += "L" + points[i].x + " " + points[i].y;
	}
	if (close)
		return paper.path(txt + "Z");
	else
		return paper.path(txt);
}

function Round(value, decimal = 0)
{
	return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

function draw_ellipse_arc(paper, center, stara, enda, rx, ry, close = true)
{
	let sx = Round(center.x + rx * Math.cos(stara * Math.PI / 180.0),3);
	let sy = Round(center.y + ry * Math.sin(stara * Math.PI / 180.0),3);

	let ex = Round(center.x + rx * Math.cos(enda * Math.PI / 180.0),3);
	let ey = Round(center.y + ry * Math.sin(enda * Math.PI / 180.0),3);

	let txt = "M" + sx + " " + sy + " A ";
	txt += Round(rx,3) + " " + Round(ry,3) + " 0 ";
	if (Math.abs(enda - stara) < 360)
	{
		if (Math.abs(enda - stara) > 180)
			txt += "1 "
		else
			txt += "0 "
		if (enda < stara)
			txt += "0 "
		else
			txt += "1 " 
		
		txt += ex + " " + ey
		if (close)
		{
			txt += "L" + center.x + " " + center.y;
			return paper.path(txt + "Z");
		}
		else
			return paper.path(txt);
	}
	else
	{
		return paper.ellipse(center.x, center.y, rx, ry);
	}
}

function draw_fleche(type = 0, px, py, dx, dy, size)
{
	dx = dx - px;
	dy = dy - py;
	let l = Math.sqrt(dx * dx + dy * dy);
	let vx = dx / l;
	let vy = dy / l;
	let nx = -vy;
	let ny = vx;
	let c = size / 10.0;
	let p1; let p2; let p3; let p4;
	switch (type) {
		case 1:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3], false);
		case 2:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3], true);
		case 3:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			p4 = {x: px + (vx * 0.5) * c,y: py + (vy * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3,p4], true);
		case 4:
			p1 = {x: px + nx * c,y: py + ny * c};
			p2 = {x: px - nx * c,y: py - ny * c};
			return draw_line(paper, p1.x, p1.y, p2.x, p2.y);
		case 5:
			p1 = {x: px,y: py};
			return draw_ellipse_arc(paper, p1, 0, 360, c, c, true);
		default:
			break;
	}
}

}