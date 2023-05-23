

var Canvas_width = 500;
var Canvas_height = 500;
var Gen_Margin = 5;
var paper;
window.onload = function(){
	paper = Raphael("preview", Canvas_width, Canvas_height);
	Regenerate()
}


function menu_changed()
{
	document.getElementById("param_repere").classList.add("hiddenparam")
	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
		document.getElementById("param_repere").classList.remove("hiddenparam")
	Regenerate()
}


function Regenerate()
{
	Canvas_width = document.getElementById("gen_width").valueAsNumber;
	Canvas_height = document.getElementById("gen_height").valueAsNumber;
	Gen_Margin = document.getElementById("gen_margin").valueAsNumber;

	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
		RepereGradue();
}


function RepereGradue()
{
	let hor_pri_nbr = document.getElementById("hor_pri_nbr").valueAsNumber;
	let hor_sec_nbr = document.getElementById("hor_sec_nbr").valueAsNumber;
	let hor_start = document.getElementById("hor_start").valueAsNumber;
	let hor_pas = document.getElementById("hor_pas").valueAsNumber;
	let hor_text = document.getElementById("hor_text").checked;
	let hor_text_pos = document.getElementById("hor_text_pos").selectedIndex;
	let hor_text_size = document.getElementById("hor_text_size").valueAsNumber;
	let hor_text_offset = document.getElementById("hor_text_offset").valueAsNumber;

	let ver_pri_nbr = document.getElementById("ver_pri_nbr").valueAsNumber;
	let ver_sec_nbr = document.getElementById("ver_sec_nbr").valueAsNumber;
	let ver_start = document.getElementById("ver_start").valueAsNumber;
	let ver_pas = document.getElementById("ver_pas").valueAsNumber;
	let ver_text = document.getElementById("ver_text").checked;
	let ver_text_pos = document.getElementById("ver_text_pos").selectedIndex;
	let ver_text_size = document.getElementById("ver_text_size").valueAsNumber;
	let ver_text_offset = document.getElementById("ver_text_offset").valueAsNumber;

	let line_pry_stroke = document.getElementById("line_pry_stroke").valueAsNumber;
	let line_pry_color = document.getElementById("line_pry_color").value;
	let line_pry_pin_size = document.getElementById("line_pry_pin_size").valueAsNumber;
	let line_pry_arrow = document.getElementById("line_pry_arrow").valueAsNumber;
	let line_pry_grid = document.getElementById("line_pry_grid").checked;
	let line_pry_grid_stroke = document.getElementById("line_pry_grid_stroke").valueAsNumber;
	let line_pry_grid_color = document.getElementById("line_pry_grid_color").value;

	let line_sec_stroke = document.getElementById("line_sec_stroke").valueAsNumber;
	let line_sec_color = document.getElementById("line_sec_color").value;
	let line_sec_pin_size = document.getElementById("line_sec_pin_size").valueAsNumber;
	let line_sec_grid = document.getElementById("line_sec_grid").checked;
	let line_sec_grid_stroke = document.getElementById("line_sec_grid_stroke").valueAsNumber;
	let line_sec_grid_color = document.getElementById("line_sec_grid_color").value;
	
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
			element = draw_line(
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
			element = draw_line(
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
				element = draw_line(
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
				element = draw_line(
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
			element = draw_line(
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
				element = draw_line(
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
			element = draw_line(
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
				element = draw_line(
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
	element = draw_line(Gen_Margin, hy, hx, hy);
	element.attr(
		{
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)
	element = draw_line(vx, Canvas_height - Gen_Margin, vx, vy);
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
	element = draw_polygone(points);
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
	element = draw_polygone(points);
	element.attr(
		{
			fill: line_pry_color,
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

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
			let text = hor_start + hor_pas * i 
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
			element = draw_line(
				vx - line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy,
				vx + line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy);
			let x = 0;
			let y = Canvas_height - Gen_Margin - 5 - i * pdy;
			if (ver_text_pos == 0)
				x = vx - line_pry_pin_size / 2.0 - ver_text_size - ver_text_offset;
			else
				x = vx + line_pry_pin_size / 2.0 + ver_text_size + ver_text_offset;
			let text = ver_start + ver_pas * i 
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


function draw_line(sx, sy, ex, ey)
{
	return paper.path("M" + sx + " " + sy + "L" + ex + " " + ey);
}

function draw_polygone(points)
{
	let txt = "M" + points[0].x + " " + points[0].y;
	for(let i = 1; i < points.length; i++){
		txt += "L" + points[i].x + " " + points[i].y;
	}
	return paper.path(txt + "Z");
}



function Save()
{
	var svg = paper.toSVG();
	navigator.clipboard.writeText(svg);

	// Alert the copied text
	//alert("SVG copied");
	
	let filename = "Forme.svg"
	let type = ".svg"
	var file = new Blob([svg], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
				url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}
}

function SavePNG() {
	var svg = paper.toSVG();
	let img = document.createElement("img");
	let url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
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
		URL.revokeObjectURL(url);
	};
	document.body.appendChild(img);
}