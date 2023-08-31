

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

// Ajout d'objet dans la liste latérale
{
	function Add_courbe()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "courbe")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "courbe",
				id: id,
				hover: false
			}
		)
		var menu = document.createElement("div");
		menu.id = "for" + id;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Courbe " + id;
		titre.onclick = function(){menu_click(menu)};
		menu.appendChild(titre);
		var content = document.createElement("div");
		content.classList.add("formemenu_div");
		var label = document.createElement("label");
		label.innerText = "Formule (en JavaScript) :"
		content.appendChild(label)
		var input = document.createElement("input");
		input.id = "for" + id + "_text";
		input.type = "text";
		input.value = "";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Epaisseur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "for" + id + "_stroke";
		input.type = "number";
		input.value = "2";
		input.step = "1";
		input.min = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Couleur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "for" + id + "_stroke_color";
		input.type = "color";
		input.value = "black";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Style de trait :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "for" + id + "_style";
		input.type = "text";
		input.value = "";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Interval x :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		label = document.createElement("label");
		label.innerText = "["
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "for" + id + "_start";
		input.type = "number";
		input.value = "-3";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "for" + id + "_end";
		input.type = "number";
		input.value = "3";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = "]"
		content.appendChild(label)
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveCourbe('for' + id) };
		label.innerText = "Supprimer"
		label.classList.add("delete")
		content.appendChild(label)
		menu.appendChild(content);
	
		document.getElementById("object_list").appendChild(menu);
		Regenerate();
	}
	
	function Add_point()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "point")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "point",
				id: id,
				hover: false
			}
		)
		var menu = document.createElement("div");
		menu.id = "poi" + id;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Point " + id;
		titre.onclick = function(){menu_click(menu)};
		menu.appendChild(titre);
		var content = document.createElement("div");
		content.classList.add("formemenu_div");
		var label = document.createElement("label");
		label.innerText = "Position :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		label = document.createElement("label");
		label.innerText = "("
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "poi" + id + "_px";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "poi" + id + "_py";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ")"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
	
		label = document.createElement("label");
		label.innerText = "Nom :"
		content.appendChild(label)
		var input = document.createElement("input");
		input.id = "poi" + id + "_text";
		input.type = "text";
		input.value = "A";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Position du texte (pixel relatif) :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		label = document.createElement("label");
		label.innerText = "("
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "poi" + id + "_tx";
		input.type = "number";
		input.value = "0";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = "poi" + id + "_ty";
		input.type = "number";
		input.value = "-15";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ")"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
	
		label = document.createElement("label");
		label.innerText = "Taille du texte :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "poi" + id + "_text_size";
		input.type = "number";
		input.value = "12";
		input.step = "2";
		input.min = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
	
		label = document.createElement("label");
		label.innerText = "Type de symbole :"
		content.appendChild(label)
		input = document.createElement("select");
		input.id = "poi" + id + "_type";
		input.onchange = function(){ Regenerate() };
		let option = document.createElement("option");
		option.value = "1";
		option.innerText = "+";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = "2";
		option.innerText = "×";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = "3";
		option.innerText = "○";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = "4";
		option.innerText = "•";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = "5";
		option.innerText = ".";
		input.appendChild(option);
		content.appendChild(input)
	
		
		label = document.createElement("label");
		label.innerText = "Taille du symbole :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "poi" + id + "_size";
		input.type = "number";
		input.value = "5";
		input.step = "1";
		input.min = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Epaisseur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "poi" + id + "_stroke";
		input.type = "number";
		input.value = "2";
		input.step = "1";
		input.min = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Couleur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "poi" + id + "_stroke_color";
		input.type = "color";
		input.value = "red";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Style de trait :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = "poi" + id + "_style";
		input.type = "text";
		input.value = "";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveCourbe('poi' + id) };
		label.innerText = "Supprimer"
		label.classList.add("delete")
		content.appendChild(label)
		menu.appendChild(content);
	
		document.getElementById("object_list").appendChild(menu);
	
		Regenerate();
	}
	
	function Add_polygone()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "polygone")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "polygone",
				id: id,
				hover: false
			}
		)
	
		var menu = document.createElement("div");
		menu.id = "pol" + id;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Polygone " + id;
		titre.onclick = function(){menu_click(menu)};
		menu.appendChild(titre);
		var content = document.createElement("div");
		content.classList.add("formemenu_div");
		var label = document.createElement("label");
		label.innerText = "Points :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
	
		var points = document.createElement("div");
		points.id = "pol" + id + "points_list";
		points.classList.add("coord_poly");
		for (let i = 0; i < 3; i++) {
			var name = "pol"+ id + "_poi" + i;
			var onepoint = document.createElement("div")
			onepoint.id = name;
			label = document.createElement("label");
			label.innerText = "Point " + i + " :"
			label.classList.add("first_child")
			onepoint.appendChild(label)
			label = document.createElement("label");
			label.innerText = "("
			onepoint.appendChild(label)
	
			input = document.createElement("input");
			input.classList.add("input_coord_poly");
			input.id = name + "_px";
			input.type = "number";
			input.value = "0";
			input.onchange = function(){ Regenerate() };
			onepoint.appendChild(input)
	
			label = document.createElement("label");
			label.innerText = ";"
			onepoint.appendChild(label)
	
			input = document.createElement("input");
			input.classList.add("input_coord_poly");
			input.id = name + "_py";
			input.type = "number";
			input.value = "0";
			input.onchange = function(){ Regenerate() };
			onepoint.appendChild(input)
	
			label = document.createElement("label");
			label.innerText = ")"
			onepoint.appendChild(label)
	
			label = document.createElement("button");
			label.onclick = function(){ Remove_Point_Polygone(id, i) };
			label.innerText = "❌"
			label.classList.add("coord_poly_delete")
			onepoint.appendChild(label)
	
			points.appendChild(onepoint)
		}
		content.appendChild(points)
	
		label = document.createElement("button");
		label.onclick = function(){ Add_Point_Polygone(id) };
		label.innerText = "Ajouter un point"
		content.appendChild(label)
			
		label = document.createElement("label");
		label.innerText = "Epaisseur :"
		content.appendChild(label)
	
		input = document.createElement("input");
		input.id = "pol" + id + "_stroke";
		input.type = "number";
		input.value = "2";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
			
		label = document.createElement("label");
		label.innerText = "Couleur :"
		content.appendChild(label)
	
		input = document.createElement("input");
		input.id = "pol" + id + "_stroke_color";
		input.type = "color";
		input.value = "#FF0000";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Style de trait :"
		content.appendChild(label)
		
		input = document.createElement("input");
		input.id = "pol" + id + "_style";
		input.type = "text";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		input = document.createElement("input");
		input.id = "pol" + id + "_fill";
		input.type = "checkbox";
		input.style.width = "auto";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Remplir la forme"
		label.setAttribute("for", "pol" + id + "_fill")
		label.style.width = "auto";
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
			
		label = document.createElement("label");
		label.innerText = "Couleur de remplissage :"
		content.appendChild(label)
	
		input = document.createElement("input");
		input.id = "pol" + id + "_fill_color";
		input.type = "color";
		input.value = "#FFFFFF";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("button");
		label.onclick = function(){ RemovePolygone('pol' + id) };
		label.innerText = "Supprimer"
		label.classList.add("delete")
		content.appendChild(label)
	
		menu.appendChild(content);
	
		document.getElementById("object_list").appendChild(menu);
	
		Regenerate();
	}
	
	function Add_Point_Polygone(polygone_id)
	{
		var points = document.getElementById("pol" + polygone_id + "points_list");
		
		let ids = []
		let list = points.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			ids.push(list[i].id);
		}
		let id = 1;
		while(ids.indexOf("pol"+ polygone_id + "_poi" + id) >= 0)
			id += 1;
	
		var name = "pol"+ polygone_id + "_poi" + id;
		var onepoint = document.createElement("div")
		onepoint.id = name;
		label = document.createElement("label");
		label.innerText = "Point " + id + " :"
		label.classList.add("first_child")
		onepoint.appendChild(label)
		label = document.createElement("label");
		label.innerText = "("
		onepoint.appendChild(label)
	
		input = document.createElement("input");
		input.classList.add("input_coord_poly");
		input.id = name + "_px";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		onepoint.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = ";"
		onepoint.appendChild(label)
	
		input = document.createElement("input");
		input.classList.add("input_coord_poly");
		input.id = name + "_py";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		onepoint.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = ")"
		onepoint.appendChild(label)
	
		label = document.createElement("button");
		label.onclick = function(){ Remove_Point_Polygone(polygone_id, id) };
		label.innerText = "❌"
		label.classList.add("coord_poly_delete")
		onepoint.appendChild(label)
	
		points.appendChild(onepoint)
	}

	function Add_circle()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "circle")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "circle",
				id: id,
				hover: false
			}
		)
		var name = "cir" + id;

		var menu = document.createElement("div");
		menu.id = name;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Cercle " + id;
		titre.onclick = function(){menu_click(menu)};
		menu.appendChild(titre);
		var content = document.createElement("div");
		content.classList.add("formemenu_div");
		var label = document.createElement("label");
		label.innerText = "Position centre :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		var coord = document.createElement("div");
		coord.classList.add("coord")

		label = document.createElement("label");
		label.innerText = "("
		coord.appendChild(label)
		var input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_px";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_py";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ")"
		coord.appendChild(label)

		content.appendChild(coord)

		label = document.createElement("label");
		label.innerText = "Angle :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)

		coord = document.createElement("div");
		coord.classList.add("coord")

		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_as";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = "->"
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_ae";
		input.type = "number";
		input.value = "360";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)

		content.appendChild(coord)
	
		label = document.createElement("label");
		label.innerText = "Rayon :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_radius";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Epaisseur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_stroke";
		input.type = "number";
		input.value = "2";
		input.step = "1";
		input.min = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Couleur :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_stroke_color";
		input.type = "color";
		input.value = "red";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Style de trait :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_style";
		input.type = "text";
		input.value = "";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)

		input = document.createElement("input");
		input.id = name + "_fill";
		input.type = "checkbox";
		input.style.width = "auto";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Remplir la forme"
		label.setAttribute("for", name+ "_fill")
		label.style.width = "auto";
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
			
		label = document.createElement("label");
		label.innerText = "Couleur de remplissage :"
		content.appendChild(label)
	
		input = document.createElement("input");
		input.id = name + "_fill_color";
		input.type = "color";
		input.value = "#FFFFFF";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveCircle(name) };
		label.innerText = "Supprimer"
		label.classList.add("delete")
		content.appendChild(label)
		menu.appendChild(content);
	
		document.getElementById("object_list").appendChild(menu);
	
		Regenerate();
	}
}

function Remove_Point_Polygone(polygone_id, point_id)
{
	let element = document.getElementById("pol"+ polygone_id + "_poi" + point_id);
	element.parentNode.removeChild(element);
	Regenerate();
}

function RemoveCourbe(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "courbe"), 1);
	Regenerate();
}

function RemovePoint(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "point"), 1);
	Regenerate();
}

function RemovePolygone(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "polygone"), 1);
	Regenerate();
}

function RemoveCircle(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "circle"), 1);
	Regenerate();
}

function menu_changed()
{
	objects = [];
	document.getElementById("object_list").innerHTML = "";
	document.getElementById("param_repere").classList.add("hiddenparam")
	document.getElementById("param_axe").classList.add("hiddenparam")
	document.getElementById("param_quadrillage").classList.add("hiddenparam")
	document.getElementById("object_repere").classList.add("hiddenparam")
	document.getElementById("object_axe").classList.add("hiddenparam")
	document.getElementById("object_quadrillage").classList.add("hiddenparam")
	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
	{
		document.getElementById("param_repere").classList.remove("hiddenparam")
		document.getElementById("object_repere").classList.remove("hiddenparam")
	}
	if (type == 1)
	{
		document.getElementById("param_axe").classList.remove("hiddenparam")
		document.getElementById("object_axe").classList.remove("hiddenparam")
	}
	if (type == 2)
	{
		document.getElementById("param_quadrillage").classList.remove("hiddenparam")
		document.getElementById("object_quadrillage").classList.remove("hiddenparam")
	}
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
	if (type == 1)
		AxeGradue();
	if (type == 2)
		Quadrillage();
}

function Draw_Objects(width, height, xs, xe, ys, ye)
{
	objects.forEach(obj => {
		try{
			if (obj.type == "courbe")
				Courbe(obj, width, height, xs, xe, ys, ye)
			if (obj.type == "point")
				Point(obj, width, height, xs, xe, ys, ye)
			if (obj.type == "polygone")
				Polygone(obj, width, height, xs, xe, ys, ye)
			if (obj.type == "circle")
				Circle(obj, width, height, xs, xe, ys, ye)
		}
		catch(e){
			console.log(e)
		}
	});
}

var x = 0;
function Courbe(obj, width, height, xs, xe, ys, ye)
{
	console.log(obj.id)
	let formule = document.getElementById("for" + obj.id + "_text").value;
	let stroke = document.getElementById("for" + obj.id + "_stroke").valueAsNumber
	let strokecolor = document.getElementById("for" + obj.id + "_stroke_color").value
	let dashstyle = document.getElementById("for" + obj.id + "_style").value
	let start = document.getElementById("for" + obj.id + "_start").valueAsNumber
	let end = document.getElementById("for" + obj.id + "_end").valueAsNumber
	

	
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
			element = draw_polygone(poly, false);
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

function Point(obj, width, height, xs, xe, ys, ye)
{
	let px= document.getElementById("poi" + obj.id + "_px").valueAsNumber
	let py = document.getElementById("poi" + obj.id + "_py").valueAsNumber
	let name = document.getElementById("poi" + obj.id + "_text").value;
	let tx = document.getElementById("poi" + obj.id + "_tx").valueAsNumber;
	let ty = document.getElementById("poi" + obj.id + "_ty").valueAsNumber
	let txt_size = document.getElementById("poi" + obj.id + "_text_size").valueAsNumber
	let type = document.getElementById("poi" + obj.id + "_type").selectedIndex
	let size = document.getElementById("poi" + obj.id + "_size").value
	let stroke = document.getElementById("poi" + obj.id + "_stroke").value
	let strokecolor = document.getElementById("poi" + obj.id + "_stroke_color").value
	let dashstyle = document.getElementById("poi" + obj.id + "_style").value

	let p = {
		x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
		y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
	}

	if(type == 0)
	{
		let line = draw_line(p.x, p.y - size / 2.0, p.x, p.y + size / 2.0);
		line.attr(
			{
				stroke: strokecolor,
				"stroke-width": stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": dashstyle
			}
		)
		line = draw_line(p.x - size / 2.0, p.y, p.x + size / 2.0, p.y);
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
		let line = draw_line(p.x - size / 2.0, p.y - size / 2.0, p.x + size / 2.0, p.y + size / 2.0);
		line.attr(
			{
				stroke: strokecolor,
				"stroke-width": stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": dashstyle
			}
		)
		line = draw_line(p.x - size / 2.0, p.y + size / 2.0, p.x + size / 2.0, p.y - size / 2.0);
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

function Polygone(obj, width, height, xs, xe, ys, ye)
{
	let points_div = document.getElementById("pol" + obj.id + "points_list");
	let points = [];
	let list = points_div.getElementsByTagName("div")
	for (var i = 0; i < list.length; i++) {
		console.log(list[i].id + "_x")
		let x = document.getElementById(list[i].id + "_px").valueAsNumber
		let y = document.getElementById(list[i].id + "_py").valueAsNumber
		points.push({
			x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width, 
			y: Canvas_height - (Gen_Margin + 5 + (y - ys)/(ye - ys) * height)});
	}

	let stroke = document.getElementById("pol" + obj.id + "_stroke").valueAsNumber
	let strokecolor = document.getElementById("pol" + obj.id + "_stroke_color").value
	let dashstyle = document.getElementById("pol" + obj.id + "_style").value
	let fill = document.getElementById("pol" + obj.id + "_fill").checked
	let fill_color = document.getElementById("pol" + obj.id + "_fill_color").value
	
	let polygone = draw_polygone(points, points.length > 2);
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

function Circle(obj, width, height, xs, xe, ys, ye)
{
	var name = "cir" + obj.id
	let px= document.getElementById(name + "_px").valueAsNumber
	let py = document.getElementById(name + "_py").valueAsNumber
	let as = document.getElementById(name + "_as").valueAsNumber;
	let ae = document.getElementById(name + "_ae").valueAsNumber
	let radius = document.getElementById(name + "_radius").valueAsNumber
	let stroke = document.getElementById(name + "_stroke").valueAsNumber
	let strokecolor = document.getElementById(name + "_stroke_color").value
	let dashstyle = document.getElementById(name + "_style").value
	let fill = document.getElementById(name + "_fill").checked
	let fill_color = document.getElementById(name + "_fill_color").value

	let p = {
		x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
		y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
	}
	var rx = (radius - Math.min(xs, xe))/Math.abs(xe - xs) * width
	var ry = (radius - Math.min(ys, ye))/Math.abs(ye - ys) * height
	if (ye < ys) {as *= -1;ae *= -1;}
	var element = draw_ellipse_arc(p, as, ae, rx, ry, fill);
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

	Draw_Objects(w, h, hor_start, hor_start + hor_pri_nbr * hor_pas, ver_start, ver_start + ver_pri_nbr * ver_pas);

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

					element = draw_line(
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
					element = draw_line(
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
		element = draw_line(
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
		element = draw_line(
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
	
	Draw_Objects(c_hor_nbr * c_size_x, c_ver_nbr * c_size_y, 
		0, c_hor_nbr, c_ver_nbr, 0);

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

function Round(value, decimal = 0)
{
	return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

function draw_ellipse_arc(center, stara, enda, rx, ry, close = true)
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