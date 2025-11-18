var Canvas_width = 500;
var Canvas_height = 500;
var editor;

var Formes = {};


window.onload = function(){
	editor = new EM("#preview", {size:{w:Canvas_width, h:Canvas_height}});

	var a = document.getElementsByClassName("formemenu");
	for(let i = 0 ; i < a.length; i++)
	{
		let element = a[i];
		element.children[0].onclick = function(){menu_click(element)};
	}

	Formes["repere"] = new F_Repere(editor);
	Formes["axe"] = new F_Axe(editor);
	Formes["quadrillage"] = new F_Quadrillage(editor);
	Formes["solide"] = new F_Solide(editor);
	Formes["fraction"] = new F_Fraction(editor);
	Formes["diagramme"] = new F_Diagramme(editor);


	menu_solid_changed()
	menu_diag_changed()
	menu_changed()
	Regenerate()
}


function menu_click(element){
	element.classList.toggle("show")
}

function show_hide_param(element_name)
{
	let a = document.getElementById(element_name).checked;
	if (a)
	{
		document.getElementById(element_name + '_section').classList.remove("hiddenparam");
	}
	else
	{
		document.getElementById(element_name + '_section').classList.add("hiddenparam");
	}
}

function menu_solid_changed()
{
	let elements = [];
	elements.push(document.getElementById("sol_pavdrt_param"))
	elements.push(document.getElementById("sol_prmdrt_param"))
	elements.push(document.getElementById("sol_cylind_param"))
	elements.push(document.getElementById("sol_pyrami_param"))
	elements.push(document.getElementById("sol_cone_param"))
	elements.push(document.getElementById("sol_sphere_param"))
	let type = document.getElementById("sol_type").selectedIndex;

	for (let i = 0; i < elements.length; i++) {
		if (type == i)
			elements[i].classList.remove("hiddenparam");
		else
			elements[i].classList.add("hiddenparam");
		
	}

	Regenerate();
}

function menu_diag_changed()
{
	let elements = [];
	elements.push(document.getElementById("diag_baton_param"))
	elements.push(document.getElementById("diag_carte_param"))
	elements.push(document.getElementById("diag_circu_param"))
	elements.push(document.getElementById("diag_histo_param"))
	let type = document.getElementById("diag_type").selectedIndex;

	for (let i = 0; i < elements.length; i++) {
		if (type == i)
			elements[i].classList.remove("hiddenparam");
		else
			elements[i].classList.add("hiddenparam");
		
	}

	Regenerate();
}

function menu_changed()
{
	document.getElementById("param_repere").classList.add("hiddenparam")
	document.getElementById("param_axe").classList.add("hiddenparam")
	document.getElementById("param_quadrillage").classList.add("hiddenparam")
	document.getElementById("param_solide").classList.add("hiddenparam")
	document.getElementById("param_fraction").classList.add("hiddenparam")
	document.getElementById("param_diagramme").classList.add("hiddenparam")
	document.getElementById("object_repere").classList.add("hiddenparam")
	document.getElementById("object_axe").classList.add("hiddenparam")
	document.getElementById("object_quadrillage").classList.add("hiddenparam")
	document.getElementById("object_solide").classList.add("hiddenparam")
	document.getElementById("object_fraction").classList.add("hiddenparam")
	document.getElementById("object_diagramme").classList.add("hiddenparam")
	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
	{
		document.getElementById("param_repere").classList.remove("hiddenparam")
		document.getElementById("object_repere").classList.remove("hiddenparam")
	}
	else if (type == 1)
	{
		document.getElementById("param_axe").classList.remove("hiddenparam")
		document.getElementById("object_axe").classList.remove("hiddenparam")
	}
	else if (type == 2)
	{
		document.getElementById("param_quadrillage").classList.remove("hiddenparam")
		document.getElementById("object_quadrillage").classList.remove("hiddenparam")
	}
	else if (type == 3)
	{
		document.getElementById("param_solide").classList.remove("hiddenparam")
		document.getElementById("object_solide").classList.remove("hiddenparam")
	}
	else if (type == 4)
	{
		document.getElementById("param_fraction").classList.remove("hiddenparam")
		document.getElementById("object_fraction").classList.remove("hiddenparam")
	}
	else if (type == 5)
	{
		document.getElementById("param_diagramme").classList.remove("hiddenparam")
		document.getElementById("object_diagramme").classList.remove("hiddenparam")
	}
	Regenerate()
}


function Regenerate()
{
	if (editor == undefined) return;

	let data = {};

	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
		Formes["repere"].Recreate();
	if (type == 1)
		Formes["axe"].Recreate();
	if (type == 2)
		Formes["quadrillage"].Recreate();
	if (type == 3)
		Formes["solide"].Recreate();
	if (type == 4)
		Formes["fraction"].Recreate();
	if (type == 5)
		Formes["diagramme"].Recreate();
}




{ // Ajout d'objet dans la liste latérale

	function AddObject(type)
	{
		let formetype = document.getElementById("gen_type").selectedIndex;
		if (formetype == 0)
			Formes["repere"].Object.add(CreateObjet(type, Formes["repere"]));
		if (formetype == 1)
			Formes["axe"].Object.add(CreateObjet(type, Formes["axe"]));
		if (formetype == 2)
			Formes["quadrillage"].Object.add(CreateObjet(type, Formes["quadrillage"]));
		if (formetype == 3)
			console.log("no option for solide")
		if (formetype == 4)
			Formes["fraction"].Object.add(CreateObjet(type, Formes["fraction"]));
		if (formetype == 5)
			console.log("no option for diagramme")
		
		Regenerate();
	}

	function CreateObjet(type, forme)
	{
		if (type == "circle")
			return new F_Obj_Circle(forme);
		if (type == "courbe")
			return new F_Obj_Courbe(forme);
		if (type == "line")
			return new F_Obj_Line(forme);
		if (type == "point")
			return new F_Obj_Point(forme);
		if (type == "polygon")
			return new F_Obj_Polygon(forme);
		if (type == "sector")
			return new F_Obj_Sector(forme);
		if (type == "text")
			return new F_Obj_Text(forme);
		throw "Impossible de créer ce type d'objet"
	}


}




{ // Save functions

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

}
