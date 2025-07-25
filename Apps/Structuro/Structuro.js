document.addEventListener('contextmenu', event => event.preventDefault());
Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};


var View_Front
var View_Right
var View_Top
var View_Iso
var View_Cav

var View_Front_flip = false;
var View_Right_flip = true;
var View_Top_flip = false;

var Cubes = [[[0]]]

function Cube_w()
{
	return Cubes.length;
}
function Cube_h()
{
	return Cubes[0].length;
}
function Cube_d()
{
	return Cubes[0][0].length;
}


var grid_style = {
		stroke: "black",
		"stroke-width": 1,
		"stroke-opacity": 0.5,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
	}
var grid_style_2 = {
		stroke: "black",
		"stroke-width": 0.5,
		"stroke-opacity": 0.5,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
	}
var stroke_style = {
		stroke: "black",
		"stroke-width": 3,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
	}
var front_face = {
		stroke: "none",
		fill: "red",
	}
var side_face = {
		stroke: "none",
		fill: "blue",
	}
var top_face = {
		stroke: "none",
		fill: "yellow",
	}


function Init()
{
	window.onresize = () => {
		RecreateGrid()
	}

	View_Right = SVG().addTo('#grid_container');
	View_Front = SVG().addTo('#grid_container');
	View_Top   = SVG().addTo('#grid_container');
	View_Iso   = SVG().addTo('#grid_container');
	View_Cav   = SVG().addTo('#grid_container');

	View_Front.mouseup(function(event) {
		Clic_Grid_Front(event);
	})

	View_Right.mouseup(function(event) {
		Clic_Grid_Right(event);
	})

	View_Top.mouseup(function(event) {
		Clic_Grid_Top(event);
	})

	ChangeCubeSize()
}

function ChangeCubeSize()
{
	let new_w = parseInt(document.getElementById("structuro_width").value);
	let new_h = parseInt(document.getElementById("structuro_height").value);
	let new_d = parseInt(document.getElementById("structuro_depth").value);

	while (new_w < Cube_w())
	{ Cubes.pop(); }
	while (new_w > Cube_w())
	{ Cubes.push(structuredClone(Cubes[0])); }
	
	while (new_h < Cube_h())
	{ 
		for (let i = 0; i < Cube_w(); i++) {
			Cubes[i].pop();
	}}
	while (new_h > Cube_h())
	{
		for (let i = 0; i < Cube_w(); i++) {
			Cubes[i].push(structuredClone(Cubes[0][0]));
		
	}}
	
	while (new_d < Cube_d())
	{ 
		for (let i = 0; i < Cube_w(); i++) {
			for (let j = 0; j < Cube_h(); j++) {
				Cubes[i][j].pop();
	}}}
	while (new_d > Cube_d())
	{
		for (let i = 0; i < Cube_w(); i++) {
			for (let j = 0; j < Cube_h(); j++) {
				Cubes[i][j].push(0);
	}}}
	RecreateGrid()
}

function RecreateGrid()
{
	Resize()
	DrawFront()
	DrawRight()
	DrawTop()
	DrawIso()
	DrawCav()
}

function Resize()
{
	let w = document.getElementById("grid_container").clientWidth;
	let h = document.getElementById("grid_container").clientHeight;
	let dw = Math.floor((w - 10) / 3.0);
	let dh = Math.floor((h - 5) / 2.0);
	let size = Math.min(dw, dh);

	View_Front.size(size, size);
	View_Right.size(size, size);
	View_Top.size(size, size);
	View_Iso.size(size, size);
	View_Cav.size(size, size);
	View_Front.viewbox(0, 0, size, size);
	View_Right.viewbox(0, 0, size, size);
	View_Top.viewbox(0, 0, size, size);
	View_Iso.viewbox(0, 0, size, size);
	View_Cav.viewbox(0, 0, size, size);
}


function DrawFront()
{
	View_Front.clear()

	let w = View_Front.width() - 10;
	let cube_size = w / Math.max(Cube_w(),	Cube_h())

	let offset = {
		x: (w - (Cube_w() * cube_size)) / 2 + 5,
		y: (w - (Cube_h() * cube_size)) / 2 + 5
	}

	let lines = []
	// Create grid
	for (let x = 0; x <= Cube_w() * 2; x++) {
		let line = View_Front.line(x * cube_size / 2, 0, x * cube_size / 2, cube_size * Cube_h())
		line.dmove(offset.x, offset.y)
		if (x % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}
	for (let y = 0; y <= Cube_h() * 2; y++) {
		let line = View_Front.line(0, y * cube_size / 2, cube_size * Cube_w(), y * cube_size / 2)
		line.dmove(offset.x, offset.y)
		if (y % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}

	let layer = View_Front_flip ? "back" : "front";
	// Create cubes
	for (let x = -1; x < Cube_w(); x++) {
		for (let y = -1; y < Cube_h(); y++) {
			let current = GetTopDepth(x,y, layer)
			if (current > 0)
			{
				let rect = View_Front.rect(cube_size, cube_size)
				rect.move(x * cube_size, y * cube_size)
				rect.dmove(offset.x, offset.y)
				rect.attr(front_face)
			}
			if (GetTopDepth(x + 1,y, layer) != current)
			{
				let line = View_Front.line((x + 1) * cube_size, y * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
			if (GetTopDepth(x,y + 1, layer) != current)
			{
				let line = View_Front.line(x * cube_size, (y + 1) * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
		}
	}

	lines.forEach(line => {
		line.front()
	});

	let title = View_Front.text(View_Front_flip ? "Vue de dos" : "Vue de face")
	title.move(5,5).font({ stroke:"white", 'stroke-width': 5, family: 'courrier', weight: "bold", size: 12 })
	title = View_Front.text(View_Front_flip ? "Vue de dos" : "Vue de face")
	title.move(5,5).font({ fill: 'black', family: 'courrier', weight: "bold", size: 12 })
}

function DrawRight()
{
	View_Right.clear()

	let w = View_Right.width() - 10;
	let cube_size = w / Math.max(Cube_h(),	Cube_d())

	let offset = {
		x: (w - (Cube_d() * cube_size)) / 2 + 5,
		y: (w - (Cube_h() * cube_size)) / 2 + 5
	}

	let lines = []
	// Create grid
	for (let x = 0; x <= Cube_d() * 2; x++) {
		let line = View_Right.line(x * cube_size / 2, 0, x * cube_size / 2, cube_size * Cube_h())
		line.dmove(offset.x, offset.y)
		if (x % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}
	for (let y = 0; y <= Cube_h() * 2; y++) {
		let line = View_Right.line(0, y * cube_size / 2, cube_size * Cube_d(), y * cube_size / 2)
		line.dmove(offset.x, offset.y)
		if (y % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}

	let layer = View_Right_flip ? "left" : "right";
	// Create cubes
	for (let x = -1; x < Cube_d(); x++) {
		for (let y = -1; y < Cube_h(); y++) {
			let current = GetTopDepth(x,y, layer)
			if (current > 0)
			{
				let rect = View_Right.rect(cube_size, cube_size)
				rect.move(x * cube_size, y * cube_size)
				rect.dmove(offset.x, offset.y)
				rect.attr(side_face)
			}
			if (GetTopDepth(x + 1,y, layer) != current)
			{
				let line = View_Right.line((x + 1) * cube_size, y * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
			if (GetTopDepth(x,y + 1, layer) != current)
			{
				let line = View_Right.line(x * cube_size, (y + 1) * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
		}
	}

	lines.forEach(line => {
		line.front()
	});

	let title = View_Right.text(View_Right_flip ? "Vue de gauche" : "Vue de droite")
	title.move(5,5).font({ stroke:"white", 'stroke-width': 5, family: 'courrier', weight: "bold", size: 12 })
	title = View_Right.text(View_Right_flip ? "Vue de gauche" : "Vue de droite")
	title.move(5,5).font({ fill: 'black', family: 'courrier', weight: "bold", size: 12 })
}

function DrawTop()
{
	View_Top.clear()

	let w = View_Top.width() - 10;
	let cube_size = w / Math.max(Cube_w(),	Cube_d())

	let offset = {
		x: (w - (Cube_w() * cube_size)) / 2 + 5,
		y: (w - (Cube_d() * cube_size)) / 2 + 5
	}

	let lines = []
	// Create grid
	for (let x = 0; x <= Cube_w() * 2; x++) {
		let line = View_Top.line(x * cube_size / 2, 0, x * cube_size / 2, cube_size * Cube_d())
		line.dmove(offset.x, offset.y)
		if (x % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}
	for (let y = 0; y <= Cube_d() * 2; y++) {
		let line = View_Top.line(0, y * cube_size / 2, cube_size * Cube_w(), y * cube_size / 2)
		line.dmove(offset.x, offset.y)
		if (y % 2 === 0)
			line.attr(grid_style)
		else 
			line.attr(grid_style_2)
		lines.push(line);
	}

	let layer = View_Top_flip ? "bottom" : "top";
	// Create cubes
	for (let x = -1; x < Cube_w(); x++) {
		for (let y = -1; y < Cube_d(); y++) {
			let current = GetTopDepth(x,y, layer)
			if (current > 0)
			{
				let rect = View_Top.rect(cube_size, cube_size)
				rect.move(x * cube_size, y * cube_size)
				rect.dmove(offset.x, offset.y)
				rect.attr(top_face)
			}	
			if (GetTopDepth(x + 1,y, layer) != current)
			{
				let line = View_Top.line((x + 1) * cube_size, y * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
			if (GetTopDepth(x,y + 1, layer) != current)
			{
				let line = View_Top.line(x * cube_size, (y + 1) * cube_size, (x + 1) * cube_size, (y + 1) * cube_size)
				line.dmove(offset.x, offset.y)
				line.attr(stroke_style)
				lines.push(line);
			}
		}
	}

	lines.forEach(line => {
		line.front()
	});

	let title = View_Top.text(View_Top_flip ? "Vue de dessous" : "Vue de dessus")
	title.move(5,5).font({ stroke:"white", 'stroke-width': 5, family: 'courrier', weight: "bold", size: 12 })
	title = View_Top.text(View_Top_flip ? "Vue de dessous" : "Vue de dessus")
	title.move(5,5).font({ fill: 'black', family: 'courrier', weight: "bold", size: 12 })
}

function DrawIso()
{
	View_Iso.clear()

	let sin60 = Math.sin(Math.PI / 3.0)

	let w = View_Iso.width() - 10;
	let pot_h = (Cube_d() + Cube_w()) * 0.5 +  Cube_h()
	let pot_w =  (Cube_w() + Cube_d()) * sin60
	let cube_size = w / Math.max(pot_h, pot_w)

	let r_w = (Cube_w() + Cube_d()) * cube_size * sin60;

	let offset = {
		x: (w - r_w) / 2 + 5,
		y: (w - (pot_h * cube_size)) / 2 + 5
	}

	let dx = Cube_d() * cube_size * sin60;
	let dy = (Cube_w() + Cube_d()) * cube_size / 2.0 

	let lines = []
	// Create grid
	for (let x = 0; x <= (Cube_w() + Cube_d()); x++) {
		let line = View_Iso.line(x * cube_size * sin60, 0, x * cube_size * sin60, cube_size * pot_h)
		line.dmove(offset.x, offset.y)
		line.attr(grid_style)
		lines.push(line);
	}
	let sy = Cube_w() * cube_size / 2.0 - (Cube_w() + Cube_d()) * cube_size;
	let more = Cube_d() % 2 * cube_size / 2
	while (sy < pot_h * cube_size)
	{
		let x1 = 0; let x2 = r_w; let y1 = sy; let y2 = sy + (Cube_w() + Cube_d()) * cube_size / 2.0
		if (y2 <= 0)
		{
			sy += cube_size;
			continue;
		} 
		if (sy < 0)
		{
			x1 = (-sy) * sin60 * 2;
			y1 = 0;
		}
		if (y2 > pot_h * cube_size)
		{
			y2 = pot_h * cube_size;
			x2 = (pot_h * cube_size - sy) * sin60 * 2;
		}
		let line = View_Iso.line(x1, y1, x2, y2)
		line.dmove(offset.x, offset.y)
		line.attr(grid_style)
		lines.push(line);
		
		y1 = y1 + more - (Cube_w() % 2) * cube_size / 2
		y2 = y2 + more - (Cube_w() % 2) * cube_size / 2
		if (y1 == more && x1 > 1)
		{
			y1 = 0;
			x1 -= cube_size * sin60;
		}
		if (y2 > pot_h * cube_size)
		{
			x2 -= cube_size * sin60;
			y2 = pot_h * cube_size;
		}
		let line2 = View_Iso.line(r_w - x1, y1, r_w - x2, y2)
		line2.dmove(offset.x, offset.y)
		line2.attr(grid_style)
		lines.push(line2);

		sy += cube_size;
	}
	

	function _local_line(x1, y1, x2, y2)
	{
		let line = View_Iso.line(x1, y1, x2, y2)
		line.dmove(offset.x, offset.y)
		line.attr(stroke_style)
	}

	function _get_cubes(x,y,z)
	{
		if (x < 0 || y < 0 || z < 0 || x >= Cube_w() || y >= Cube_h() || z >= Cube_d()) return 0;
		return Cubes[x][y][z];
	}

	//Create cubes
	for (let x = Cube_w() - 1; x >= -1; x--) {
		for (let y = Cube_h() - 1; y >= -1; y--) {
			for (let z = Cube_d() - 1; z >= -1; z--) {
				
				let px = dx + (x - z) * cube_size * sin60;
				let py = dy - (z + x) * cube_size * 0.5 + y * cube_size;
				
				let a = _get_cubes(x+1,y,z+1);
				let b = _get_cubes(x+1,y,z);
				let c = _get_cubes(x,y,z+1);
				let d = _get_cubes(x,y,z);
				let e = _get_cubes(x,y+1,z);
				let f = _get_cubes(x+1,y+1,z);
				let g = _get_cubes(x,y+1,z+1);

				if (((b*c + (a+b+c+d)% 2) * (1-d)) > 0)
					_local_line(px, py, px, py - cube_size)
				if (((e*b + (f+e+b+d)% 2) * (1-d)) > 0)
					_local_line(px, py, px + cube_size * sin60, py + cube_size / 2)
				if (((e*c + (g+e+c+d)% 2) * (1-d)) > 0)
					_local_line(px, py, px - cube_size * sin60, py + cube_size / 2)
					

				if (d > 0)
				{
					let face_front = View_Iso.polygon([[0, cube_size / 2], [cube_size * sin60, 0], [cube_size * sin60, cube_size], [0,cube_size * 1.5]])
					face_front.move(px, py - cube_size / 2)
					face_front.dmove(offset.x, offset.y)
					face_front.attr(front_face)
	
					let face_left = View_Iso.polygon([[0,0], [cube_size * sin60, cube_size / 2], [cube_size * sin60,cube_size * 1.5], [0,cube_size]])
					face_left.move(px - cube_size * sin60, py - cube_size / 2)
					face_left.dmove(offset.x, offset.y)
					face_left.attr(side_face)
	
					let face_top = View_Iso.polygon([[0,cube_size / 2], [cube_size * sin60, cube_size], [cube_size * sin60 * 2, cube_size / 2], [cube_size * sin60, 0]])
					face_top.move(px - cube_size * sin60, py - cube_size)
					face_top.dmove(offset.x, offset.y)
					face_top.attr(top_face)
				}
			}
		}
	}

	lines.forEach(line => {
		line.front()
	});

	let title = View_Iso.text("Perspective isométrique")
	title.move(5,5).font({ stroke:"white", 'stroke-width': 5, family: 'courrier', weight: "bold", size: 12 })
	title = View_Iso.text("Perspective isométrique")
	title.move(5,5).font({ fill: 'black', family: 'courrier', weight: "bold", size: 12 })
}

function DrawCav()
{
	View_Cav.clear()

	let w = View_Cav.width() - 10;
	let cube_size = w / Math.max(Cube_h() + Cube_d() * 0.5, Cube_w() + Cube_d() * 0.5)

	let offset = {
		x: (w - ((Cube_w() + Cube_d() * 0.5) * cube_size)) / 2 + 5,
		y: (w - ((Cube_h() + Cube_d() * 0.5) * cube_size)) / 2 + 5
	}

	let lines = []
	// Create grid
	for (let x = 0; x <= Cube_w() * 2 + Cube_d(); x++) {
		let line = View_Cav.line(x * cube_size / 2, 0, x * cube_size / 2, cube_size * (Cube_h() + Cube_d() * 0.5))
		line.dmove(offset.x, offset.y)
		line.attr(grid_style)
		lines.push(line);
	}
	for (let y = 0; y <= Cube_h() * 2 + Cube_d(); y++) {
		let line = View_Cav.line(0, y * cube_size / 2, cube_size * (Cube_w() + Cube_d() * 0.5), y * cube_size / 2)
		line.dmove(offset.x, offset.y)
		line.attr(grid_style)
		lines.push(line);
	}

	function _local_line(x1, y1, x2, y2)
	{
		let line = View_Cav.line(x1, y1, x2, y2)
		line.dmove(offset.x, offset.y)
		line.attr(stroke_style)
	}

	function _get_cubes(x,y,z)
	{
		if (x < 0 || y < 0 || z < 0 || x >= Cube_w() || y >= Cube_h() || z >= Cube_d()) return 0;
		return Cubes[x][y][z];
	}

	//Create cubes
	for (let x = Cube_w() - 1; x >= -1; x--) {
		for (let y = Cube_h() - 1; y >= -1; y--) {
			for (let z = Cube_d() - 1; z >= -1; z--) {
				
				let px = x * cube_size + (Cube_d() - 1 - z) * cube_size / 2;
				let py = y * cube_size + (Cube_d() - 1 - z) * cube_size / 2;
				
				let a = _get_cubes(x+1,y,z+1);
				let b = _get_cubes(x+1,y,z);
				let c = _get_cubes(x,y,z+1);
				let d = _get_cubes(x,y,z);
				let e = _get_cubes(x,y+1,z);
				let f = _get_cubes(x+1,y+1,z);
				let g = _get_cubes(x,y+1,z+1);

				if (((b*c + (a+b+c+d)% 2) * (1-d)) > 0)
					_local_line(px + cube_size, py, px + cube_size, py + cube_size)
				if (((e*b + (f+e+b+d)% 2) * (1-d)) > 0)
					_local_line(px + cube_size, py + cube_size, px + cube_size * 1.5, py + cube_size * 1.5)
				if (((e*c + (g+e+c+d)% 2) * (1-d)) > 0)
					_local_line(px , py  + cube_size, px + cube_size , py + cube_size)
					

				if (d > 0)
				{
					let face_front = View_Cav.rect(cube_size, cube_size)
					face_front.move(px + cube_size / 2, py + cube_size / 2)
					face_front.dmove(offset.x, offset.y)
					face_front.attr(front_face)
	
					let face_left = View_Cav.polygon([[0,0], [cube_size / 2,cube_size / 2], [cube_size / 2,cube_size * 1.5], [0,cube_size]])
					face_left.move(px, py)
					face_left.dmove(offset.x, offset.y)
					face_left.attr(side_face)
	
					let face_top = View_Cav.polygon([[0,0], [cube_size,0], [cube_size * 1.5,cube_size / 2], [cube_size / 2,cube_size / 2]])
					face_top.move(px, py)
					face_top.dmove(offset.x, offset.y)
					face_top.attr(top_face)
				}
			}
		}
	}

	lines.forEach(line => {
		line.front()
	});

	let title = View_Cav.text("Perspective cavalière")
	title.move(5,5).font({ stroke:"white", 'stroke-width': 5, family: 'courrier', weight: "bold", size: 12 })
	title = View_Cav.text("Perspective cavalière")
	title.move(5,5).font({ fill: 'black', family: 'courrier', weight: "bold", size: 12 })
}

function GetTopDepth(x, y, view)
{
	if (x < 0 || y < 0) return 0;
	switch (view) {
		case "front":
			if (x >= Cube_w() || y >= Cube_h()) return 0;
			return Cube_d() - (Cubes[x][y].findIndex((depth) => depth > 0).mod(Cube_d() + 1));
		case "back":
			if (x >= Cube_w() || y >= Cube_h()) return 0;
			return Cubes[Cube_w() - 1 - x][y].findLastIndex((depth) => depth > 0) + 1;
		case "right":
			if (x >= Cube_d() || y >= Cube_h()) return 0;
			for (let i = 0; i < Cube_w(); i++) {
				if (Cubes[Cube_w() - 1 - i][y][x] > 0)
					return Cube_w() - i;
			}
			return 0;
		case "left":
			if (x >= Cube_d() || y >= Cube_h()) return 0;
			for (let i = 0; i < Cube_w(); i++) {
				if (Cubes[i][y][Cube_d() - 1 - x] > 0)
					return Cube_w() - i;
			}
			return 0;
		case "top":
			if (x >= Cube_w() || y >= Cube_d()) return 0;
			for (let i = 0; i < Cube_h(); i++) {
				if (Cubes[x][i][Cube_d() - 1 - y] > 0)
					return Cube_h() - i;
			}
			return 0;
		case "bottom":
			if (x >= Cube_w() || y >= Cube_d()) return 0;
			for (let i = 0; i < Cube_h(); i++) {
				if (Cubes[x][Cube_h() - 1 - i][y] > 0)
					return Cube_h() - i;
			}
			return 0;
		default:
			break;
	}
}

function AddFrom(x, y, view)
{
	let count = GetTopDepth(x, y, view)
	switch (view) {
		case "front":
			return SetCubeValue(x,y,Cube_d() - count - 1, 1);
		case "back":
			return SetCubeValue(Cube_w() - 1 - x,y,count, 1);
		case "right":
			return SetCubeValue(count,y,x, 1);
		case "left":
			return SetCubeValue(Cube_w() - count - 1,y,Cube_d() - 1 - x, 1);
		case "top":
			return SetCubeValue(x,Cube_h() - 1 - count,Cube_d() - 1 - y, 1);
		case "bottom":
			return SetCubeValue(x,count,y, 1);
		default:
			break;
	}
}

function RemoveFrom(x, y, view)
{
	let count = GetTopDepth(x, y, view)
	switch (view) {
		case "front":
			return SetCubeValue(x,y,Cube_d() - count, 0);
		case "back":
			return SetCubeValue(Cube_w() - 1 - x,y,count - 1, 0);
		case "right":
			return SetCubeValue(count - 1,y,x, 0);
		case "left":
			return SetCubeValue(Cube_w() - count,y,Cube_d() - 1 - x, 0);
		case "top":
			return SetCubeValue(x,Cube_h() - count,Cube_d() - 1 - y, 0);
		case "bottom":
			return SetCubeValue(x,count - 1,y, 0);
		default:
			break;
	}
}

function SetCubeValue(x, y, z, value)
{
	Cubes[Math.min(Cube_w() - 1, Math.max(0, x))][Math.min(Cube_h() - 1, Math.max(0, y))][Math.min(Cube_d() - 1, Math.max(0, z))] = value;
}



function Clic_Grid_Front(event)
{
	let w = View_Front.width() - 10;
	let cube_size = w / Math.max(Cube_w(),	Cube_h())
	let ox = w - cube_size * Cube_w();
	let oy = w - cube_size * Cube_h();
	let x = Math.floor((event.offsetX - 5 - ox / 2) / cube_size)
	let y = Math.floor((event.offsetY - 5 - oy / 2) / cube_size)
	if (x < 0 || y < 0 || x >= Cube_w() || y >= Cube_h()) return;
	
	let layer = View_Front_flip ? "back" : "front";
	if (event.button === 0)
		AddFrom(x,y, layer)
	if (event.button === 2)
		RemoveFrom(x,y, layer)
	if (event.button === 1) // Return view
	{
		View_Front_flip = !View_Front_flip;
	}

	RecreateGrid()
}

function Clic_Grid_Right(event)
{
	let w = View_Right.width() - 10;
	let cube_size = w / Math.max(Cube_d(),	Cube_h())
	let ox = w - cube_size * Cube_d();
	let oy = w - cube_size * Cube_h();
	let x = Math.floor((event.offsetX - 5 - ox / 2) / cube_size)
	let y = Math.floor((event.offsetY - 5 - oy / 2) / cube_size)
	if (x < 0 || y < 0 || x >= Cube_d() || y >= Cube_h()) return;

	let layer = View_Right_flip ? "left" : "right";
	if (event.button === 0)
		AddFrom(x,y, layer)
	if (event.button === 2)
		RemoveFrom(x,y, layer)
	if (event.button === 1) // Return view
	{
		View_Right_flip = !View_Right_flip;
	}

	RecreateGrid()
}

function Clic_Grid_Top(event)
{
	let w = View_Right.width() - 10;
	let cube_size = w / Math.max(Cube_d(),	Cube_w())
	let ox = w - cube_size * Cube_w();
	let oy = w - cube_size * Cube_d();
	let x = Math.floor((event.offsetX - 5 - ox / 2) / cube_size)
	let y = Math.floor((event.offsetY - 5 - oy / 2) / cube_size)
	if (x < 0 || y < 0 || x >= Cube_w() || y >= Cube_d()) return;

	let layer = View_Top_flip ? "bottom" : "top";
	if (event.button === 0)
		AddFrom(x,y, layer)
	if (event.button === 2)
		RemoveFrom(x,y, layer)
	if (event.button === 1) // Return view
	{
		View_Top_flip = !View_Top_flip;
	}

	RecreateGrid()
}


function Save()
{
	var zip = new JSZip();
	if (View_Front_flip)
		zip.file("Face_arriere.svg", View_Front.node.outerHTML);
	else
		zip.file("Face_avant.svg", View_Front.node.outerHTML);
	if (View_Right_flip)
		zip.file("Face_droite.svg", View_Right.node.outerHTML);
	else
		zip.file("Face_gauche.svg", View_Right.node.outerHTML);
	if (View_Top_flip)
		zip.file("Face_dessous.svg", View_Top.node.outerHTML);
	else
		zip.file("Face_dessus.svg", View_Top.node.outerHTML);
	zip.file("Vue_isometrique.svg", View_Iso.node.outerHTML);
	zip.file("Vue_cavaliere.svg", View_Cav.node.outerHTML);

	zip.generateAsync({type:"blob"})
	.then(function(content) {
			// see FileSaver.js
			saveAs(content, "Structuro.zip");
	});
}