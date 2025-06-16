var svg_max_size =  {w: 800, h: 600};
var cartes_data;
var container_dic = {"Data": null};
var patterns_mask = {};
var SVG_Draw;

function Init()
{
	var client = new XMLHttpRequest();
	client.open('GET', "Data.json");
	client.onreadystatechange = function() {
		if (client.readyState === 4){
			cartes_data = JSON.parse(client.responseText);
			RecreateList();
		}
	}
	client.send();
}

function RecreateList()
{
	cartes_data["Data"]
	var container = document.getElementById('menu_container');
	container.innerHTML = '';
	container_dic["Data"] = container;
	cartes_data["Data"].forEach(data => {
		AddData(data, "Data");
	});
}

function AddData(data, parent_folder = "")
{
	var name = data["Name"];
	if (data["Type"] === "folder")
	{
		if (!container_dic.hasOwnProperty(parent_folder + "/" + name))
		{
			var container = document.createElement('div');
			container.className = 'formemenu';
			var title = document.createElement('span');
			title.innerHTML = name;
			title.onclick = function(){menu_click(container);};

			container.appendChild(title);
			var inner_div = document.createElement('div');
			inner_div.className = 'formemenu_div';
			inner_div.id = parent_folder + "/" + name;
			container.appendChild(inner_div);

			container_dic[parent_folder].appendChild(container);
			container_dic[parent_folder + "/" + name] = inner_div;
		}
		data["Content"].forEach(data_inside => {
			AddData(data_inside, parent_folder + "/" + name);
		});
	}
	else if (data["Type"] === "carte")
	{
			var title = document.createElement('label');
			title.innerHTML = data["Name"];
			title.classList.add("carte_selectable")
			title.onclick = function() { LoadMap(parent_folder + "/" + name, data); };

			container_dic[parent_folder].appendChild(title);
	}
}



// var LoadedMap_Colors = {};
var LoadedMap_Files = [];
var LoadCheck = 0;
var LoadedMap_Options = "";
var LoadedMap_Folder = "";
var LoadedMap_Size = {w: 0, h: 0};
var LoadedMap_SVGElements = {};

function LoadMap(parent_folder, data)
{
	document.getElementById("title_SelectedMap").innerHTML = data["Name"];
	LoadedMap_Folder = parent_folder;
	// LoadedMap_Colors = {"none": "none"};
	// data["Colors"].forEach(color => {
	// 	LoadedMap_Colors[color["Name"]] = color["Color"];
	// });
	
	LoadedMap_Options = data["Options"];
	LoadedMap_Files = data["Files"];
	LoadedMap_Size.w = data["Size"]["Width"];
	LoadedMap_Size.h = data["Size"]["Height"];
	LoadCheck = LoadedMap_Files.length;

	for (let index = 0; index < LoadedMap_Files.length; index++) {
		const file = LoadedMap_Files[index];

		let client = new XMLHttpRequest();
		client.open('GET', LoadedMap_Folder + "/" + file["Name"] + "." + file["Type"]);
		client.onreadystatechange = function() {
			if (client.readyState === 4){ 
				file["Data"] = client.responseText;
				EndLoad();
			}
		}
		client.send();
	}
}

function ResetSize(off_x, off_y, size_w, size_h)
{
	let coef = svg_max_size.w / size_w;
	if (svg_max_size.h / size_h < coef)
		coef = svg_max_size.h / size_h;

	SVG_Draw.size(size_w * coef, size_h * coef);
	SVG_Draw.viewbox(off_x, off_y, size_w, size_h);
}


function EndLoad()
{
	LoadCheck--;
	if (LoadCheck > 0)
		return;

	document.getElementById('svg_holder').innerHTML = '';

	SVG_Draw = SVG().addTo('#svg_holder');
	SVG_Draw.attr("xml:space", "preserve");
	ResetSize(0,0, LoadedMap_Size.w, LoadedMap_Size.h);

	CreatePatterns();

	LoadedMap_Files.forEach(file => {
		if (file["Type"] === "svg")
		{
			SVG_Draw.svg(file["Data"]);
			let element = SVG_Draw.find("#" + file["Name"])[0];
			
			if (file.hasOwnProperty("OffSet"))
				element.move(file["OffSet"]["x"],file["OffSet"]["y"]);

			if (file.hasOwnProperty("Parameters"))
			{
				let groups = element.find("g")
				for (let i = 0; i < groups.length; i++)
				{
					groups[i].attr(file["Parameters"][i]);
					groups[i].attr({"visibility": "visible"});
					LoadedMap_SVGElements[file["Name"] + "/" + i.toString()] = groups[i];
				}
			}
			LoadedMap_SVGElements[file["Name"]] = element;
		}
	});

	MoveFrontElement();

	Create_Options();
	Create_Menu();
}

function MoveFrontElement()
{
	for (let key in LoadedMap_SVGElements) {
		let element = LoadedMap_SVGElements[key];
		if (element.attr('class') == 'front')
		{
			element.toRoot().front()
		}
	}
}

function Create_Options()
{
	var menu_div = document.getElementById("menu_container_actions");
	menu_div.innerHTML = ""

	LoadedMap_Options.forEach(action => {
		var button = document.createElement("button");
		button.innerHTML = action["Boutton"];
		button.onclick = () => {eval(action["Action"])};
		menu_div.appendChild(button);
	})
}



function Create_Menu()
{
	var menu_div = document.getElementById("menu_container_carte");
	menu_div.innerHTML = ""
	LoadedMap_Files.forEach(file => {
		if (file["Type"] === "svg")
		{
			if (file.hasOwnProperty("Parameters"))
			{
				var couche = CreateCouche(file["Section"])
				menu_div.appendChild(couche);


				var groupes_div = couche.querySelector("#groupes");
				for (let i = 0; i < file["Parameters"].length; i++)
				{
					var svg_element = LoadedMap_SVGElements[file["Name"] + "/" + i.toString()] 
					var group_div = CreateGroup(svg_element, file["Parameters"][i], i)
					groupes_div.appendChild(group_div);
				}
			}
		}
	})
	UpdateCustomSelect()
}

function CreateCouche(name)
{
	var main = document.createElement("div");
	main.classList.add("formemenu");

	var title = document.createElement("div");
	title.classList.add("couche");
	title.onclick = function(){menu_click(main);};
	main.appendChild(title);

	var span = document.createElement("span");
	span.innerHTML = name;
	title.appendChild(span);

	//TODO ajouter la suppression/création de couche supplémentaire et la réorganisation
	
	// var icon = document.createElement("div");
	// icon.classList.add("iconbutton");
	// icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" stroke="currentColor" d="M283-130q-30.938 0-52.969-22.031Q208-174.062 208-205v-512h-39v-75h193v-38h237v38h193v75h-39v512q0 30.938-22.031 52.969Q708.938-130 678-130H283Zm395-587H283v512h395v-512ZM365-283.5h75v-355h-75v355Zm156 0h75v-355h-75v355ZM283-717v512-512Z"/></svg>'
	// title.appendChild(icon);

	var content = document.createElement("div");
	content.classList.add("formemenu_div");

	var groupes = document.createElement("div");
	groupes.id = "groupes";
	content.appendChild(groupes);

	main.appendChild(content);

	return main
}

function CreateGroup(svg_element, parameters, id)
{
	var main = document.createElement("div");
	main.classList.add("groupe");

	var title = document.createElement("div");
	title.classList.add("groupe-title");
	main.appendChild(title);
	var title_name = document.createElement("span");
	if (parameters.hasOwnProperty("name"))
		title_name.innerHTML = parameters["name"];
	else
		title_name.innerHTML = "Groupe " + id.toString();
	title.appendChild(title_name);
	var title_check = document.createElement("input");
	title_check.type = "checkbox";
	title_check.checked = true;
	title.appendChild(title_check);
	title_check.oninput = () => {
		if (svg_element.visible())
			svg_element.hide()
		else
			svg_element.show()}

	var content = document.createElement("div");
	content.classList.add("groupe-content");
	main.appendChild(content);


	if (parameters.hasOwnProperty("fill"))
	{
		if (parameters["fill"] != "none")
		{
			CreateTool_Fill(content, svg_element, parameters)
		}
	}
	if (parameters.hasOwnProperty("stroke"))
	{
		if (parameters["stroke"] != "none")
		{
			CreateTool_Stroke(content, svg_element, parameters)
		}
	}
	if (parameters.hasOwnProperty("font-family"))
	{
		CreateTool_Font(content, svg_element, parameters)
	}

	return main;
}


function CreateTool_Fill(parent, svgelement, parameters)
{
	var base = document.createElement("div");
	base.classList.add("tool-fill");

	var title = document.createElement("label");
	title.innerHTML = "Remplissage";
	base.appendChild(title);

	var pattern = document.createElement("div");
	pattern.classList.add("pattern");

	var pat_title = document.createElement("label");
	pat_title.innerHTML = "Pattern :";

	var pat_select = document.createElement("div");
	pat_select.classList.add("custom-select");

	var pat_select_inner = document.createElement("select");
	for (let i = 0; i < 12; i++) {
		var pat_option = document.createElement("option");
		pat_option.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
		pat_option.value = i;
		pat_select_inner.appendChild(pat_option);
	}
	pat_select.appendChild(pat_select_inner);
	pat_select_inner.oninput = () => {
		if (pat_select_inner.selectedIndex > 0)
			svgelement.maskWith(patterns_mask["pattern" + pat_select_inner.selectedIndex.toString()])
		else
			svgelement.unmask()
	}

	pattern.appendChild(pat_title)
	pattern.appendChild(pat_select)
	base.appendChild(pattern);

	var color = document.createElement("input");
	color.type = "color";
	color.value = parameters["fill"];
	base.appendChild(color);
	color.oninput = () => { svgelement.attr({"fill": color.value}); }

	var transparent = document.createElement("div");
	var transparent_range = document.createElement("input");
	transparent_range.type = "range"
	transparent_range.min = 0
	transparent_range.max = 1
	transparent_range.value = parameters["fill-opacity"];
	transparent_range.step = "0.01"
	var transparent_number = document.createElement("input");
	transparent_number.type = "number"
	transparent_number.min = 0
	transparent_number.max = 1
	transparent_number.value = parameters["fill-opacity"];
	transparent_number.step = "0.01"
	transparent.appendChild(transparent_range)
	transparent.appendChild(transparent_number)
	base.appendChild(transparent);

	transparent_number.oninput = () => { 
		transparent_range.value = transparent_number.value
		svgelement.attr({"fill-opacity": transparent_number.value});
	}
	transparent_range.oninput = () => { 
		transparent_number.value = transparent_range.value
		svgelement.attr({"fill-opacity": transparent_number.value});
	}

	parent.appendChild(base);
}

function CreateTool_Stroke(parent, svgelement, parameters)
{
	var base = document.createElement("div");
	base.classList.add("tool-stroke");
	parent.appendChild(base);

	var title = document.createElement("label");
	title.innerHTML = "Contour";
	base.appendChild(title);

	var color = document.createElement("input");
	color.type = "color";
	color.value = parameters["stroke"];
	base.appendChild(color);
	color.oninput = () => { svgelement.attr({"stroke": color.value}); }

	var largeur = document.createElement("input");
	largeur.type = "number";
	largeur.min = 0;
	if (parameters.hasOwnProperty("stroke-width"))
		largeur.value = parameters["stroke-width"];
	else
		largeur.value = 1
	largeur.step = 0.1
	base.appendChild(largeur);
	largeur.oninput = () => { svgelement.attr({"stroke-width": largeur.value}); }

	return base
}

function CreateTool_Font(parent, svgelement, parameters)
{
	var base = document.createElement("div");
	base.classList.add("tool-font");
	parent.appendChild(base);

	var title = document.createElement("label");
	title.innerHTML = "Text";
	base.appendChild(title);

	var font_div = document.createElement("div");
	base.appendChild(font_div);
	var font_title = document.createElement("label");
	font_title.innerHTML = "Font :"
	font_div.appendChild(font_title);
	var font = document.createElement("input");
	font.type = "text";
	font.value = parameters["font-family"];
	font_div.appendChild(font);
	font.oninput = () => { svgelement.attr({"font-family": font.value}); }

	var size_div = document.createElement("div");
	base.appendChild(size_div);
	var size_title = document.createElement("label");
	size_title.innerHTML = "Taille :"
	size_div.appendChild(size_title);
	var size = document.createElement("input");
	size.type = "number";
	size.min = 0;
	size.step = 0.1
	if (parameters.hasOwnProperty("font-size"))
		size.value = parameters["font-size"].substring(0, parameters["font-size"].length - 2);
	else
		size.value = 5.5
	size_div.appendChild(size);
	size.oninput = () => { svgelement.attr({"font-size": size.value.toString() + "px"}); }

	var space_div = document.createElement("div");
	base.appendChild(space_div);
	var space_title = document.createElement("label");
	space_title.innerHTML = "Espace lettre :"
	space_div.appendChild(space_title);
	var space = document.createElement("input");
	space.type = "number";
	space.step = 0.01
	if (parameters.hasOwnProperty("letter-spacing"))
		space.value = parameters["letter-spacing"].substring(0, parameters["letter-spacing"].length - 2);
	else
		space.value = 0
	space_div.appendChild(space)
	space.oninput = () => { svgelement.attr({"letter-spacing": space.value.toString() + "em"}); }

	return base
}


function CreatePatterns()
{
	var coef = 0.5; // A changer pour adpater la taille des patternes
	patterns_mask["pattern1"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.rect(5 * coef, 5 * coef).fill('#fff')
  			add.rect(5 * coef, 5 * coef).move(5 * coef, 5 * coef).fill('#fff')
			}).url()
			)
	)

	patterns_mask["pattern2"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.line(0,0,0,10 * coef).stroke('#fff')
				add.line(5 * coef,0,5 * coef,10 * coef).stroke('#fff') 
				add.line(10 * coef,0,10 * coef,10 * coef).stroke('#fff')
			}).url()
			)
	)

	patterns_mask["pattern3"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.line(0,0,10 * coef,0).stroke('#fff')
				add.line(0,5 * coef,10 * coef,5 * coef).stroke('#fff') 
				add.line(0,10 * coef,10 * coef,10 * coef).stroke('#fff')
			}).url()
			)
	)

	patterns_mask["pattern4"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.line(0,0,10 * coef,10 * coef).stroke('#fff')
				add.line(5 * coef,-5 * coef,15 * coef, 5 * coef).stroke('#fff') 
				add.line(-5 * coef, 5 * coef,5 * coef,15 * coef).stroke('#fff')
			}).url()
			)
	)

	patterns_mask["pattern5"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.line(0,10 * coef,10 * coef,0).stroke('#fff')
				add.line(-5 * coef, 5 * coef,5 * coef,-5 * coef).stroke('#fff') 
				add.line(5 * coef,15 * coef,15 * coef, 5 * coef).stroke('#fff')
			}).url()
			)
	)

	patterns_mask["pattern6"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.circle(4 * coef).move(5 * coef, 5 * coef).fill('#fff')
			}).url()
			)
	)

	patterns_mask["pattern7"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.circle(2 * coef).move(0,0).fill('#fff')
				add.circle(2 * coef).move(10 * coef,0).fill('#fff')
				add.circle(2 * coef).move(0,10 * coef).fill('#fff')
				add.circle(2 * coef).move(10 * coef,10 * coef).fill('#fff')
				add.circle(2 * coef).move(5 * coef, 5 * coef).fill('#fff')
			}).url()
			)
	)

	patterns_mask["pattern8"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.polygon('0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2').transform({scale: coef}).fill('#fff')
			}).url()
			)
	)

	patterns_mask["pattern9"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.circle(1 * coef).move(5 * coef, 5 * coef).fill('#fff')
			}).url()
			)
	)

	patterns_mask["pattern10"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.path("M 0,5 A 5,5,90,0,0,5,0 M 5,0 A 5,5,90,0,0,10,5 M 0,5 A 5,5,180,0,0,10,5 M 0,-5 A 5,5,180,0,0,10,-5").transform({scale: coef}).fill("none").stroke('#fff')
			}).url()
			)
	)

	patterns_mask["pattern11"] = SVG_Draw.mask().add(
		SVG_Draw.rect("100%", "100%").fill(
			SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
				add.polygon('0,0 2.5,0 0,2.5').transform({scale: coef}).fill('#fff')
				add.polygon('10,10 7.5,10 10,7.5').transform({scale: coef}).fill('#fff')
				add.polygon('10,0 10,5 5,10 5,7.5 7.5,5 5,5 5,2.5 2.5,5 0,5 5,0').transform({scale: coef}).fill('#fff')
			}).url()
			)
	)
}



function UpdateCustomSelect()
{
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/* For each element, create a new DIV that will act as the selected item: */
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/* For each element, create a new DIV that will contain the option list: */
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 0; j < ll; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
					/* When an item is clicked, update the original select box,
					and the selected item: */
					var y, i, k, s, h, sl, yl;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					sl = s.length;
					h = this.parentNode.previousSibling;
					for (i = 0; i < sl; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							yl = y.length;
							for (k = 0; k < yl; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							var event = new Event('input');
							s.dispatchEvent(event);
							break;
						}
					}
					h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			/* When the select box is clicked, close any other select boxes,
			and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
	except the current select box: */
	var x, y, i, xl, yl, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 


{ // Save functions

	function Save()
	{
		var svgString = document.getElementById('svg_holder').innerHTML;
		a = document.createElement('a');
		a.download = 'Carte.svg';
		a.type = 'image/svg+xml';
		blob = new Blob([svgString], {"type": "image/svg+xml"});
		a.href = (window.URL || webkitURL).createObjectURL(blob);
		a.click();
	}

	function SavePNG() {
		var svg = document.getElementById('svg_holder').innerHTML;
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
			link.download = 'Carte.png';
			link.href = canvas.toDataURL("image/png")
			link.click();
			img.remove();
			(window.URL || webkitURL).revokeObjectURL(url);
		};
		document.body.appendChild(img);
	}

}