

var Canvas_width = 500;
var Canvas_height = 500;
var Gen_Margin = 5;
var Gen_font = "Arial";
var paper = null;
var objects = [
];
window.onload = function(){
	paper = Raphael("preview", Canvas_width, Canvas_height);
	menu_changed()
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

		var name = "for" + id;
		
		var menu = document.createElement("div");
		menu.id = name;
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
		input.id = name + "_text";
		input.type = "text";
		input.value = "";
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
		input.value = "black";
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
		input.id = name + "_start";
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
		input.id = name + "_end";
		input.type = "number";
		input.value = "3";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = "]"
		content.appendChild(label)
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveCourbe(name) };
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

		var name = "poi" + id

		var menu = document.createElement("div");
		menu.id = name;
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
		input.id = name + "_px";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_py";
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
		input.id = name + "_text";
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
		input.id = name + "_tx";
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
		input.id = name + "_ty";
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
		input.id = name + "_text_size";
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
		input.id = name + "_type";
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
		input.id = name + "_size";
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
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveCourbe(name) };
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

		var name = "pol" + id
	
		var menu = document.createElement("div");
		menu.id = name;
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
		points.id = name + "points_list";
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
		input.id = name + "_stroke";
		input.type = "number";
		input.value = "2";
		input.step = "1";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
			
		label = document.createElement("label");
		label.innerText = "Couleur :"
		content.appendChild(label)
	
		input = document.createElement("input");
		input.id = name + "_stroke_color";
		input.type = "color";
		input.value = "#FF0000";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
		label = document.createElement("label");
		label.innerText = "Style de trait :"
		content.appendChild(label)
		
		input = document.createElement("input");
		input.id = name + "_style";
		input.type = "text";
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
		label.setAttribute("for", name + "_fill")
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
		label.onclick = function(){ RemovePolygone(name) };
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

	function Add_segment()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "segment")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "segment",
				id: id,
				hover: false
			}
		)
		var name = "seg" + id;

		var menu = document.createElement("div");
		menu.id = name;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Segment " + id;
		titre.onclick = function(){menu_click(menu)};
		menu.appendChild(titre);
		var content = document.createElement("div");
		content.classList.add("formemenu_div");

		// POSITION DEPART
		var label = document.createElement("label");
		label.innerText = "Position départ :"
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
		input.id = name + "_psx";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_psy";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ")"
		coord.appendChild(label)

		content.appendChild(coord)

		// POSITION D ARRIVEE
		label = document.createElement("label");
		label.innerText = "Position d'arrivée :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		coord = document.createElement("div");
		coord.classList.add("coord")

		label = document.createElement("label");
		label.innerText = "("
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_pex";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_pey";
		input.type = "number";
		input.value = "1";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = ")"
		coord.appendChild(label)

		content.appendChild(coord)

		//STYLE DEBUT
		label = document.createElement("label");
		label.innerText = "Style début :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		coord = document.createElement("div");
		coord.classList.add("coord")

		input = document.createElement("select");
		input.id = name + "_ss";
		input.onchange = function(){ Regenerate() };
		let option = document.createElement("option");
		option.value = 0;
		option.innerHTML = "Aucun";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 1;
		option.innerHTML = "Flêche 1";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 2;
		option.innerHTML = "Flêche 2";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 3;
		option.innerHTML = "Flêche 3";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 4;
		option.innerHTML = "Segment";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 5;
		option.innerHTML = "Rond";
		input.appendChild(option);
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = " - "
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_sss";
		input.type = "number";
		input.value = "100";
		input.step = "5";
		input.min = "0";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = "%"
		coord.appendChild(label)
		
		content.appendChild(coord)

		//STYLE FIN
		label = document.createElement("label");
		label.innerText = "Style fin :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		
		coord = document.createElement("div");
		coord.classList.add("coord")

		input = document.createElement("select");
		input.id = name + "_se";
		input.onchange = function(){ Regenerate() };
		option = document.createElement("option");
		option.value = 0;
		option.innerHTML = "Aucun";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 1;
		option.innerHTML = "Flêche 1";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 2;
		option.innerHTML = "Flêche 2";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 3;
		option.innerHTML = "Flêche 3";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 4;
		option.innerHTML = "Segment";
		input.appendChild(option);
		option = document.createElement("option");
		option.value = 5;
		option.innerHTML = "Rond";
		input.appendChild(option);
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = " - "
		coord.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_ses";
		input.type = "number";
		input.value = "100";
		input.step = "5";
		input.min = "0";
		input.onchange = function(){ Regenerate() };
		coord.appendChild(input)
		label = document.createElement("label");
		label.innerText = "%"
		coord.appendChild(label)
		
		content.appendChild(coord)
		
		// EPAISSEUR
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

	
		label = document.createElement("button");
		label.onclick = function(){ RemoveSegment(name) };
		label.innerText = "Supprimer"
		label.classList.add("delete")
		content.appendChild(label)
		menu.appendChild(content);
	
		document.getElementById("object_list").appendChild(menu);
	
		Regenerate();
	}
	
	function Add_texte()
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "texte")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "texte",
				id: id,
				hover: false
			}
		)
		var name = "txt" + id;

		var menu = document.createElement("div");
		menu.id = name;
		menu.classList.add("formemenu");
		var titre = document.createElement("span");
		titre.innerText = "Texte " + id;
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
		input.id = name + "_px";
		input.type = "number";
		input.value = "0";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
		label = document.createElement("label");
		label.innerText = ";"
		content.appendChild(label)
		input = document.createElement("input");
		input.classList.add("input_coord");
		input.id = name + "_py";
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
		input.id = name + "_text";
		input.type = "text";
		input.value = "A";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)

		
		label = document.createElement("label");
		label.innerText = "Angle :"
		content.appendChild(label)
		label = document.createElement("br");
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_angle";
		input.type = "number";
		input.value = "0";
		input.step = "5";
		input.min = "-360";
		input.max = "360";
		input.onchange = function(){ Regenerate() };
		content.appendChild(input)
	
	
		label = document.createElement("label");
		label.innerText = "Taille du texte :"
		content.appendChild(label)
		input = document.createElement("input");
		input.id = name + "_text_size";
		input.type = "number";
		input.value = "12";
		input.step = "2";
		input.min = "0";
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
	
	
		label = document.createElement("button");
		label.onclick = function(){ RemoveTexte(name) };
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

function RemoveSegment(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "segment"), 1);
	Regenerate();
}

function RemoveTexte(name)
{
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
	let id = parseInt(name.substring(3));
	objects.splice(objects.findIndex(element => element.id == id && element.type == "texte"), 1);
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

	let data = {};
    data["Canvas_width"] = Canvas_width;
    data["Canvas_height"] = Canvas_height;
    data["Gen_Margin"] = Gen_Margin;
    data["objects"] = Get_Objects();

	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
		Draw_RepereGradue(data);
	if (type == 1)
		Draw_AxeGradue(data);
	if (type == 2)
		Draw_Quadrillage(data);
}

function Get_Objects()
{
	let data = [];
	objects.forEach(obj => {
		try{
			if (obj.type == "courbe")
				data.push(Get_Courbe(obj))
			if (obj.type == "point")
				data.push(Get_Point(obj))
			if (obj.type == "polygone")
				data.push(Get_Polygone(obj))
			if (obj.type == "circle")
				data.push(Get_Circle(obj))
			if (obj.type == "segment")
				data.push(Get_Segment(obj))
			if (obj.type == "texte")
				data.push(Get_Texte(obj))
		}
		catch(e){
			console.log(e)
		}
	});
	return data;
}

function Get_Courbe(obj)
{
	var name = "for" + obj.id;
	data = {
		"type": "courbe",
		"formule": document.getElementById(name + "_text").value,
		"stroke": document.getElementById(name + "_stroke").valueAsNumber,
		"strokecolor": document.getElementById(name + "_stroke_color").value,
		"dashstyle": document.getElementById(name + "_style").value,
		"start": document.getElementById(name + "_start").valueAsNumber,
		"end": document.getElementById(name + "_end").valueAsNumber,
	};
	return data;
}

function Get_Point(obj)
{
	var name = "poi" + obj.id;
	let data = {
		"type": "point",
		"px": document.getElementById(name + "_px").valueAsNumber,
		"py": document.getElementById(name + "_py").valueAsNumber,
		"name": document.getElementById(name + "_text").value,
		"tx": document.getElementById(name + "_tx").valueAsNumber,
		"ty": document.getElementById(name + "_ty").valueAsNumber,
		"txt_size": document.getElementById(name + "_text_size").valueAsNumber,
		"type_point": document.getElementById(name + "_type").selectedIndex,
		"size": document.getElementById(name + "_size").value,
		"stroke": document.getElementById(name + "_stroke").value,
		"strokecolor": document.getElementById(name + "_stroke_color").value,
		"dashstyle": document.getElementById(name + "_style").value,
	}
	return data;
}

function Get_Polygone(obj)
{
	var name = "pol" + obj.id;
	let points_div = document.getElementById(name + "points_list");
	let points = [];
	let list = points_div.getElementsByTagName("div")
	for (var i = 0; i < list.length; i++) {
		let x = document.getElementById(list[i].id + "_px").valueAsNumber
		let y = document.getElementById(list[i].id + "_py").valueAsNumber
		points.push({ x: x, y: y});
	}
	let data = {
		"type": "polygone",
        "points": points,
        "fill_color": document.getElementById(name + "_fill_color").value,
        "fill": document.getElementById(name + "_fill").checked,
        "stroke": document.getElementById(name + "_stroke").valueAsNumber,
        "strokecolor": document.getElementById(name + "_stroke_color").value,
        "dashstyle": document.getElementById(name + "_style").value,
	}
	return data;
}

function Get_Circle(obj)
{
	var name = "cir" + obj.id
	let data = {
		"type": "circle",
		"px": document.getElementById(name + "_px").valueAsNumber,
		"py": document.getElementById(name + "_py").valueAsNumber,
		"as": document.getElementById(name + "_as").valueAsNumber,
		"ae": document.getElementById(name + "_ae").valueAsNumber,
		"radius": document.getElementById(name + "_radius").valueAsNumber,
		"stroke": document.getElementById(name + "_stroke").valueAsNumber,
		"strokecolor": document.getElementById(name + "_stroke_color").value,
		"dashstyle": document.getElementById(name + "_style").value,
		"fill": document.getElementById(name + "_fill").checked,
		"fill_color": document.getElementById(name + "_fill_color").value,
	}
	return data;

}

function Get_Segment(obj)
{
	var name = "seg" + obj.id
	let data = {
		"type": "segment",
		"psx": document.getElementById(name + "_psx").valueAsNumber,
		"psy": document.getElementById(name + "_psy").valueAsNumber,
		"pex": document.getElementById(name + "_pex").valueAsNumber,
		"pey": document.getElementById(name + "_pey").valueAsNumber,
		"ss": document.getElementById(name + "_ss").selectedIndex,
		"sss": document.getElementById(name + "_sss").valueAsNumber,
		"se": document.getElementById(name + "_se").selectedIndex,
		"ses": document.getElementById(name + "_ses").valueAsNumber,
		"stroke": document.getElementById(name + "_stroke").valueAsNumber,
		"strokecolor": document.getElementById(name + "_stroke_color").value,
		"dashstyle": document.getElementById(name + "_style").value,
	}
	return data;
}

function Get_Texte(obj)
{
	var name = "txt" + obj.id;
	let data = {
		"type": "texte",
		"px": document.getElementById(name + "_px").valueAsNumber,
		"py": document.getElementById(name + "_py").valueAsNumber,
		"name": document.getElementById(name + "_text").value,
		"angle": document.getElementById(name + "_angle").valueAsNumber,
		"txt_size": document.getElementById(name + "_text_size").valueAsNumber,
		"strokecolor": document.getElementById(name + "_stroke_color").value,
	}
	return data;
}

function Draw_RepereGradue(data)
{
	data["hor_pri_nbr"] = document.getElementById("hor_pri_nbr").valueAsNumber;
	data["hor_sec_nbr"] = document.getElementById("hor_sec_nbr").valueAsNumber;
	data["hor_start"] = document.getElementById("hor_start").valueAsNumber;
	data["hor_pas"] = document.getElementById("hor_pas").valueAsNumber;
	data["hor_text"] = document.getElementById("hor_text").checked;
	data["hor_text_pos"] = document.getElementById("hor_text_pos").selectedIndex;
	data["hor_text_size"] = document.getElementById("hor_text_size").valueAsNumber;
	data["hor_text_offset"] = document.getElementById("hor_text_offset").valueAsNumber;
	data["ver_pri_nbr"] = document.getElementById("ver_pri_nbr").valueAsNumber;
	data["ver_sec_nbr"] = document.getElementById("ver_sec_nbr").valueAsNumber;
	data["ver_start"] = document.getElementById("ver_start").valueAsNumber;
	data["ver_pas"] = document.getElementById("ver_pas").valueAsNumber;
	data["ver_text"] = document.getElementById("ver_text").checked;
	data["ver_text_pos"] = document.getElementById("ver_text_pos").selectedIndex;
	data["ver_text_size"] = document.getElementById("ver_text_size").valueAsNumber;
	data["ver_text_offset"] = document.getElementById("ver_text_offset").valueAsNumber;
	data["line_pry_stroke"] = document.getElementById("line_pry_stroke").valueAsNumber;
	data["line_pry_color"] = document.getElementById("line_pry_color").value;
	data["line_pry_pin_size"] = document.getElementById("line_pry_pin_size").valueAsNumber;
	data["line_pry_arrow"] = document.getElementById("line_pry_arrow").valueAsNumber;
	data["line_pry_grid"] = document.getElementById("line_pry_grid").checked;
	data["line_pry_grid_stroke"] = document.getElementById("line_pry_grid_stroke").valueAsNumber;
	data["line_pry_grid_color"] = document.getElementById("line_pry_grid_color").value;
	data["line_sec_stroke"] = document.getElementById("line_sec_stroke").valueAsNumber;
	data["line_sec_color"] = document.getElementById("line_sec_color").value;
	data["line_sec_pin_size"] = document.getElementById("line_sec_pin_size").valueAsNumber;
	data["line_sec_grid"] = document.getElementById("line_sec_grid").checked;
	data["line_sec_grid_stroke"] = document.getElementById("line_sec_grid_stroke").valueAsNumber;
	data["line_sec_grid_color"] = document.getElementById("line_sec_grid_color").value;

    RepereGradue(paper, data);
}

function Draw_AxeGradue(data)
{
	data["axe_pri_nbr"] = document.getElementById("axe_pri_nbr").valueAsNumber;
	data["axe_sec_nbr"] = document.getElementById("axe_sec_nbr").valueAsNumber;
	data["axe_start"] = document.getElementById("axe_start").valueAsNumber;
	data["axe_pas"] = document.getElementById("axe_pas").valueAsNumber;
	data["axe_text"] = document.getElementById("axe_text").checked;
	data["axe_text_pos"] = document.getElementById("axe_text_pos").selectedIndex;
	data["axe_text_size"] = document.getElementById("axe_text_size").valueAsNumber;
	data["axe_text_offset"] = document.getElementById("axe_text_offset").valueAsNumber;
	data["axe_line_pry_stroke"] = document.getElementById("axe_line_pry_stroke").valueAsNumber;
	data["axe_line_pry_color"] = document.getElementById("axe_line_pry_color").value;
	data["axe_line_pry_pin_size"] = document.getElementById("axe_line_pry_pin_size").valueAsNumber;
	data["axe_line_pry_arrow"] = document.getElementById("axe_line_pry_arrow").valueAsNumber;
	data["axe_line_sec_stroke"] = document.getElementById("axe_line_sec_stroke").valueAsNumber;
	data["axe_line_sec_color"] = document.getElementById("axe_line_sec_color").value;
	data["axe_line_sec_pin_size"] = document.getElementById("axe_line_sec_pin_size").valueAsNumber;
	
	AxeGradue(paper, data);
}

function Draw_Quadrillage(data)
{
	data["c_hor_nbr"] = document.getElementById("c_hor_nbr").valueAsNumber;
	data["c_ver_nbr"] = document.getElementById("c_ver_nbr").valueAsNumber;
	data["c_size_x"] = document.getElementById("c_size_x").valueAsNumber;
	data["c_size_y"] = document.getElementById("c_size_y").valueAsNumber;
	data["q_line_color"] = document.getElementById("q_line_color").value;
	data["q_line_stroke"] = document.getElementById("q_line_stroke").valueAsNumber;
	data["q_int"] = document.getElementById("q_int").checked;
	data["c_int_hor_nbr"] = document.getElementById("c_int_hor_nbr").valueAsNumber;
	data["c_int_ver_nbr"] = document.getElementById("c_int_ver_nbr").valueAsNumber;
	data["q_int_line_color"] = document.getElementById("q_int_line_color").value;
	data["q_int_line_stroke"] = document.getElementById("q_int_line_stroke").valueAsNumber;

    let newsize = Quadrillage(paper, data);
	document.getElementById("gen_width").value = newsize[0];
	document.getElementById("gen_height").value = newsize[1];
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