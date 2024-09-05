var Canvas_width = 480;
var Canvas_height = 360;
var Gen_Margin = 5;
var Gen_font = "Arial";
var paper = null;
var nbr_simulation = 6000;
var objects = [
];
window.onload = function(){
	paper = Raphael("preview", "100%", "100%");
	Regenerate()
}

function Regenerate()
{
	paper.clear();
	nbr_simulation = document.getElementById("nbr_tirage").valueAsNumber;
	var proba = 1.0 / document.getElementById("proba_tirage").valueAsNumber;
	
	var ymax = Math.min(Math.max(proba * 3.33333,0.1), 1);
	var pasy = ymax / 10.0;
	var ymin = 0;
	var yspacecount = (ymax-ymin)/pasy
	var pasx = nbr_simulation / 20;

	var txts = 12;
	var txtw = 30;
	var txth = 40;

	var maxy = (Canvas_height - txth - 10)
	var yspace = maxy / yspacecount

	var element;

	var style = {
		stroke: "lightgray",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round"}
	
	for(let i = 0; i < yspacecount; i++)
	{
		let y = maxy / yspacecount * i + 5
		element = draw_line(txtw + 7, y, Canvas_width - 5, y);
		element.attr(style);

		element = paper.text(txtw / 2 + 5, y, Math.round((ymax - ymin - pasy * i) * 100) / 100.0);
		element.attr(
			{
				fill: "black",
				"font-size": txts,
			}
		)
	}

	for(let i = 0; i < 20; i++)
	{
		let x = txtw+ 10 +  (Canvas_width - txtw - 17) / 20 * (i + 1)
		element = draw_line(x, maxy + 5, x, maxy + 8);
		element.attr(style);

		element = paper.text(x, maxy + 5 + txth / 2.0, Math.trunc(pasx * (i+1)));
		element.attr({
				fill: "black",
				"font-size": txts,})
		element.rotate(-90)
	}
	style.stroke = "black"

	element = draw_line(txtw+ 10, maxy + 5, Canvas_width - 5, maxy + 5);
	element.attr(style);

	element = draw_line(txtw + 10, maxy + 5, txtw + 10, 5);
	element.attr(style);

	style.stroke = "red"

	let y = (ymax - proba + ymin) / (ymax - ymin) * maxy + 5

	element = draw_line(txtw + 7, y, Canvas_width - 5, y);
	element.attr(style);

	let points = [];
	points.push(
		{
			x: txtw + 10,
			y: maxy
		}
	)
	var count = 0;
	var total = 0;
	var totalx = Canvas_width - 15 - txtw;
	var dx = Math.max(Math.floor(nbr_simulation / totalx), 1)
	for(let i = 0; i < nbr_simulation; i++)
	{
		total += 1;
		let v= Math.random();
		if (v <= proba){ count += 1}
		if (total % dx == 0)
		{
			points.push(
				{
					x: txtw + 10 + i / nbr_simulation * totalx,
					y: (ymax - count / total) / ymax * maxy + 5
				}
			)
		}
	}
	points.push(
		{
			x: txtw + 10 + totalx,
			y: (ymax - count / total) / ymax * maxy + 5
		}
	)
	style.stroke = "green"

	element = draw_polygone(points, false);
	element.attr(style)
	
    paper.setViewBox(0, 0, Canvas_width, Canvas_height, true)
}

function draw_line(sx, sy, ex, ey)
{
	return paper.path("M" + sx + " " + sy + "L" + ex + " " + ey);
}

function draw_polygone(points, close = true)
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