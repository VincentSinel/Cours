

var Canvas_width = 500;
var Canvas_height = 500;
var Gen_Margin = 5;
var Gen_font = "Arial";
var paper = null;
var objects = [
];
window.onload = function(){
	paper = Raphael("preview", Canvas_width, Canvas_height);
	Regenerate()
}

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
        let y = Function('"use strict";return (' + formule + ')')()
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
}


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

function AxeGradue()
{

}

function Quadrillage()
{
	let c_hor_nbr = document.getElementById("c_hor_nbr").valueAsNumber;
	let c_ver_nbr = document.getElementById("c_ver_nbr").valueAsNumber;
	let c_size_x = document.getElementById("c_size_x").valueAsNumber;
	let c_size_y = document.getElementById("c_size_y").valueAsNumber;
	let q_line_color = document.getElementById("q_line_color").value;
	let q_line_stroke = document.getElementById("q_line_stroke").valueAsNumber;

	let q_int = document.getElementById("q_int").checked;
	let c_int_hor_nbr = document.getElementById("c_int_hor_nbr").valueAsNumber;
	let c_int_ver_nbr = document.getElementById("c_int_ver_nbr").valueAsNumber;
	let q_int_line_color = document.getElementById("q_int_line_color").value;
	let q_int_line_stroke = document.getElementById("q_int_line_stroke").valueAsNumber;

	Canvas_width = c_hor_nbr * c_size_x + Gen_Margin*2 + 10; 
	Canvas_height = c_ver_nbr * c_size_y + Gen_Margin*2 + 10;
	document.getElementById("gen_width").value = Canvas_width;
	document.getElementById("gen_height").value = Canvas_height;

	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();
	
	if(q_int)
	{
		var x_s = c_size_x * 1.0 / c_int_hor_nbr;
		var y_s = c_size_y * 1.0 / c_int_ver_nbr;
		console.log(x_s)
		console.log(y_s)
		for (let x = 0; x < c_hor_nbr; x++) 
		{
			for (let y = 0; y < c_ver_nbr; y++) 
			{
				for (let i = 1; i < c_int_hor_nbr; i++) {

					element = draw_line(paper, 
						Gen_Margin + 5 + x * c_size_x + i * x_s, Gen_Margin + 5 + y * c_size_y, 
						Gen_Margin + 5 + x * c_size_x + i * x_s, Gen_Margin + 5 + (y+1) * c_size_y);
					element.attr(
						{
							stroke: q_int_line_color,
							"stroke-width": q_int_line_stroke,
							"stroke-linecap": "round",
							"stroke-linejoin": "round"
						})
				}

				for (let j = 1; j < c_int_ver_nbr; j++) {
					element = draw_line(paper, 
						Gen_Margin + 5 + x * c_size_x, Gen_Margin + 5 + y * c_size_y + j * y_s, 
						Gen_Margin + 5 + (x+1) * c_size_x, Gen_Margin + 5 + y * c_size_y + j * y_s);
					element.attr(
						{
							stroke: q_int_line_color,
							"stroke-width": q_int_line_stroke,
							"stroke-linecap": "round",
							"stroke-linejoin": "round"
						})
				}
			}
		}
	}

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

    
	Draw_Objects(paper, objects, {
        "width": c_hor_nbr * c_size_x, 
        "height": c_ver_nbr * c_size_y, "xs": 0, "xe": c_hor_nbr,
        "ys": c_ver_nbr, "ye": 0});

}

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


function Save()
{
	var svgString = document.getElementById('preview').innerHTML;
	a = document.createElement('a');
	a.download = 'Forme.svg';
	a.type = 'image/svg+xml';
	blob = new Blob([svgString], {"type": "image/svg+xml"});
	a.href = (window.URL || webkitURL).createObjectURL(blob);
	a.click();
}

function SavePNG() {
	var svg = document.getElementById('preview').innerHTML;
	let img = document.createElement("img");
	let url = (window.URL || webkitURL).createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
	img.src = url;
	img.setAttribute("style", "position:fixed;left:-200vw;");
	img.onload = function onload() {
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext("2d");
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var link = document.createElement('a');
		link.download = 'Forme.png';
		link.href = canvas.toDataURL("image/png")
		link.click();
		img.remove();
		(window.URL || webkitURL).revokeObjectURL(url);
	};
	document.body.appendChild(img);
}