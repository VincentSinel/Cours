// import Sortable from 'sortable.js'
var svg_max_size =  {w: 800, h: 600};
var legende_height = 60;
var cartes_data;
var container_dic = {"Data": null};
var patterns_mask = {};
var SVG_Draw;
var SVG_Cadre;
var SVG_Legende;


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

	
	Sortable.create(document.getElementById("menu_container_disponible"), {
		group: {
        name: 'shared',
        pull: 'clone',
        put: false // Do not allow items to be put into this list
    },
		animation: 150,
		sort: false // To disable sorting: set sort to false
	});

	Sortable.create(document.getElementById("menu_container_carte"), {
		group: 'shared',
		handle: '.glyphicon-move',
		animation: 150,
			// Element dragging ended
		onEnd: function (evt) {
			CoucheDragged_Ended(evt)
		},
			// Element is dropped into the list from another list
		onAdd: function (/**Event*/evt) {
			CoucheDragged_Add(evt)
		},
	});
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
var LoadedMap_FilesBase = [];
var LoadCheck = 0;
var LoadedMap_Options = "";
var LoadedMap_Folder = "";
var LoadedMap_Size = {w: 0, h: 0};
var LoadedMap_SVGElements = {};
var LoadedMap_Couches = {}
var LoadedMap_CouchesSelected = {};

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
	LoadedMap_FilesBase = data["Base"];
	LoadedMap_Size.w = data["Size"]["Width"];
	LoadedMap_Size.h = data["Size"]["Height"];
	LoadedMap_Couches = {};
	LoadedMap_SVGElements = {};
	LoadCheck = LoadedMap_Files.length;

	for (let index = 0; index < LoadedMap_Files.length; index++) {
		const file = LoadedMap_Files[index];

		let client = new XMLHttpRequest();
		client.open('GET', LoadedMap_Folder + "/" + file["Name"] + "." + file["Type"]);
		client.onreadystatechange = function() {
			// console.log(client.readyState, LoadCheck)
			if (client.readyState === 4){ 
				if (client.status !== 200) {
					console.log("Erreur lors du chargement du fichier " + file["Name"] + "." + file["Type"] + " (" + client.status.toString() + ")");
					return;
				}
				file["Data"] = client.responseText;
				EndLoad();
			}
		}
		client.send();
	}
}

function ResetSize(off_x, off_y, size_w, size_h)
{
	let doc = document.getElementsByClassName("main_view")[0];
	svg_max_size.w = document.body.clientWidth - 40 - doc.offsetLeft;
	svg_max_size.h = document.body.clientHeight - 110;
	
	//DEBUG
	// svg_max_size.w *= 5;
	// svg_max_size.h *= 5;

	let coef = svg_max_size.w / size_w;
	if (svg_max_size.h / (size_h + legende_height) < coef)
		coef = svg_max_size.h / (size_h + legende_height);

	SVG_Draw.size(size_w * coef, (size_h + legende_height) * coef);
	SVG_Draw.viewbox(off_x, off_y, size_w, size_h + legende_height);
	SVG_Cadre.size(size_w, size_h).move(off_x, off_y);
}


function EndLoad()
{
	LoadCheck--;
	if (LoadCheck > 0)
		return;

	document.getElementById('svg_holder').innerHTML = '';

	SVG_Draw = SVG().addTo('#svg_holder');
	SVG_Draw.attr("xml:space", "preserve");
	SVG_Legende = SVG_Draw.group()
	SVG_Cadre = SVG_Draw.rect(0,0,SVG_Draw.width(), SVG_Draw.height()).attr({"fill": "none", "stroke": "black", "stroke-width": 4})
	ResetSize(0,0, LoadedMap_Size.w, LoadedMap_Size.h);

	CreatePatterns();

	LoadedMap_CouchesSelected = {};

	Create_Options();
	Create_Menu();

	var menu_div = document.getElementById("menu_container_carte"); 
	LoadedMap_FilesBase.forEach(base => {
		var couche = CreateCouche(LoadedMap_Couches[base]);
		if (!LoadedMap_Couches[base].hasOwnProperty("Editable"))
			menu_div.appendChild(couche);
	})

	ReajustePositionCouche();
	Recreate_Legendes()
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
	var menu_div_dispo = document.getElementById("menu_container_disponible");
	menu_div.innerHTML = ""
	menu_div_dispo.innerHTML = ""
	LoadedMap_Files.forEach(file => {
		if (file["Type"] === "svg")
		{
			LoadedMap_Couches[file["Name"] + "-" + file["Section"]] = file;
			if (file.hasOwnProperty("Editable")) return;
				
			if (file.hasOwnProperty("Parameters"))
			{
				var couche_name = CreateCoucheList(file)
				menu_div_dispo.appendChild(couche_name);
			}
		}
	})
}

function CreateCoucheList(file)
{
	var main = document.createElement("div");
	main.setAttribute("couche_name", file["Name"] + "-" + file["Section"])
	main.classList.add("selectable_couche");

	var span = document.createElement("span");
	span.innerHTML = file["Section"];
	main.appendChild(span);

	return main
}

function CreateCouche(file)
{
	let k = 1;
	var prefix = " (0)"
	while (LoadedMap_SVGElements.hasOwnProperty(file["Name"] + prefix))
	{
		prefix = " (" + k.toString() + ")";
		k++;
	}
	LoadedMap_CouchesSelected[file["Name"] + prefix] = file;

	SVG_Draw.svg(file["Data"]);
	let element = SVG_Draw.find("#" + file["Name"])[0];
	element.attr({id: file["Name"] + prefix})
	
	if (file.hasOwnProperty("OffSet"))
		element.move(file["OffSet"]["x"],file["OffSet"]["y"]);

	if (file.hasOwnProperty("Parameters"))
	{
		let groups = element.find("g")
		for (let i = 0; i < groups.length; i++)
		{
			groups[i].attr(file["Parameters"][i]["data"]);
			groups[i].attr({"visibility": "visible"});
			LoadedMap_SVGElements[file["Name"] + prefix + "/" + i.toString()] = groups[i];
		}
	}
	LoadedMap_SVGElements[file["Name"] + prefix] = element;

	var couche = document.createElement("div");
	couche.setAttribute("coucheOriginal", file["Name"])
	couche.setAttribute("id", file["Name"] + prefix)
	couche.classList.add("formemenu");

	var title = document.createElement("div");
	title.classList.add("couche");
	title.onclick = function(){menu_click(couche);};
	couche.appendChild(title);

	var handle = document.createElement("label");
	handle.classList.add("glyphicon-move")
	handle.innerHTML = "≡";
	title.appendChild(handle);

	var span = document.createElement("span");
	if (prefix === " (0)")
		span.innerHTML = file["Section"];
	else
		span.innerHTML = file["Section"] + prefix;
	title.appendChild(span);
	
	var icon = document.createElement("div");
	icon.classList.add("iconbutton");
	icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" stroke="currentColor" d="M283-130q-30.938 0-52.969-22.031Q208-174.062 208-205v-512h-39v-75h193v-38h237v38h193v75h-39v512q0 30.938-22.031 52.969Q708.938-130 678-130H283Zm395-587H283v512h395v-512ZM365-283.5h75v-355h-75v355Zm156 0h75v-355h-75v355ZM283-717v512-512Z"/></svg>'
	icon.onclick = () => { CoucheDeleted(couche) }
	title.appendChild(icon);

	var content = document.createElement("div");
	content.classList.add("formemenu_div");

	var groupes = document.createElement("div");
	groupes.id = "groupes";
	content.appendChild(groupes);

	couche.appendChild(content);

	var groupes_div = couche.querySelector("#groupes");
	for (let i = 0; i < file["Parameters"].length; i++)
	{
		var svg_element = LoadedMap_SVGElements[file["Name"] + prefix + "/" + i.toString()] 
		var group_div = CreateGroup(svg_element, file["Parameters"][i], i)
		groupes_div.appendChild(group_div);
	}

	return couche
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


	var content = document.createElement("div");
	content.classList.add("groupe-content");
	main.appendChild(content);


	title_check.oninput = () => {
		if (svg_element.visible())
		{
			svg_element.hide()
			content.classList.add("hide")
		}
		else
		{
			svg_element.show()
			content.classList.remove("hide")
		}}


	switch (parameters["type_obj"]) {
		case "surface":
			CreateTool_Fill(content, svg_element, parameters["data"]);
			CreateTool_Stroke(content, svg_element, parameters["data"]);
			break;
		case "line":
			CreateTool_Stroke(content, svg_element, parameters["data"]);
			break;
		case "text":
			CreateTool_Font(content, svg_element, parameters["data"]);
			break;
		default:
			break;
	}

	return main;
}


function CreateTool_Fill(parent, svgelement, parameters)
{
	var base = document.createElement("div");
	base.classList.add("tool-fill");
	parent.appendChild(base);

	var img1 = document.createElement("img");
	img1.src = "Img/fill.svg";
	base.appendChild(img1);

	var color_button = document.createElement("button")
	color_button.setAttribute("data-color", parameters["fill"])
	color_button.setAttribute("style", "--cp-size:24px")
	base.appendChild(color_button);
	var color = new ColorPicker(color_button, base_options_colorpicker)
	if (!parameters.hasOwnProperty("fill") || parameters["fill"] === "none")
		color.clear(false)
	color.on('pick', (color) => { 
		if (color == null)
			svgelement.attr({"fill": "none"})
		else
			svgelement.attr({"fill": color}) } );

	var img2 = document.createElement("img");
	img2.src = "Img/pattern.svg";
	base.appendChild(img2);

	var pat_select = document.createElement("div");
	pat_select.classList.add("custom-select");
	base.append(pat_select);

	var pat_select_inner = document.createElement("select");
	for (let i = 0; i < 12; i++) {
		var pat_option = document.createElement("option");
		pat_option.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
		pat_option.value = i;
		pat_select_inner.appendChild(pat_option);
	}
	pat_select.appendChild(pat_select_inner);
	CustomSelect(pat_select, {"class": "tool-fill", "width": "44px","obj-width": "16px"})

	pat_select_inner.oninput = () => {
		if (pat_select_inner.selectedIndex > 0)
			svgelement.maskWith(patterns_mask["pattern" + pat_select_inner.selectedIndex.toString()])
		else
			svgelement.unmask()
	}
}

function CreateTool_Stroke(parent, svgelement, parameters)
{
	var base = document.createElement("div");
	base.classList.add("tool-stroke");
	parent.appendChild(base);

	var img1 = document.createElement("img");
	img1.src = "Img/stroke.svg";
	base.appendChild(img1);
	
	var color_button = document.createElement("button")
	color_button.setAttribute("data-color", parameters["stroke"])
	color_button.setAttribute("style", "--cp-size:24px")
	base.appendChild(color_button);
	var color = new ColorPicker(color_button, base_options_colorpicker)
	if (!parameters.hasOwnProperty("stroke") || parameters["stroke"] === "none")
		color.clear(false)
	color.on('pick', (color) => { 
		if (color == null)
			svgelement.attr({"stroke": "none"})
		else
			svgelement.attr({"stroke": color}) } );

	
	var img2 = document.createElement("img");
	img2.src = "Img/stroke-width.svg";
	base.appendChild(img2);

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

	var img1 = document.createElement("img");
	img1.src = "Img/fill.svg";
	base.appendChild(img1);

	var color_button = document.createElement("button")
	color_button.setAttribute("data-color", parameters["fill"])
	color_button.setAttribute("style", "--cp-size:24px")
	base.appendChild(color_button);
	var color = new ColorPicker(color_button, base_options_colorpicker)
	if (!parameters.hasOwnProperty("fill") || parameters["fill"] === "none")
		color.clear(false)
	color.on('pick', (color) => { 
		if (color == null)
			svgelement.attr({"fill": "none"})
		else
			svgelement.attr({"fill": color}) } );

	img1 = document.createElement("img");
	img1.src = "Img/text.svg";
	base.appendChild(img1);

	var size = document.createElement("input");
	size.type = "number";
	size.min = 0;
	size.step = 0.1
	if (parameters.hasOwnProperty("font-size"))
		size.value = parameters["font-size"].substring(0, parameters["font-size"].length - 2);
	else
		size.value = 5.5
	base.appendChild(size);
	size.oninput = () => { svgelement.attr({"font-size": size.value.toString() + "px"}); }

	img1 = document.createElement("img");
	img1.src = "Img/letter-spacing.svg";
	base.appendChild(img1);

	var space = document.createElement("input");
	space.type = "number";
	space.step = 0.01
	if (parameters.hasOwnProperty("letter-spacing"))
		space.value = parameters["letter-spacing"].substring(0, parameters["letter-spacing"].length - 2);
	else
		space.value = 0
	base.appendChild(space)
	space.oninput = () => { svgelement.attr({"letter-spacing": space.value.toString() + "em"}); }

	img1 = document.createElement("img");
	img1.src = "Img/font.svg";
	base.appendChild(img1);

	var pat_select = document.createElement("div");
	pat_select.classList.add("custom-select");
	base.append(pat_select);

	var pat_select_inner = FontSelector(pat_select, {"font": parameters["font-family"]})
	CustomSelect(pat_select, {"class": "tool-font", "width": "232px","obj-width": "226px", "isfont": true})

	pat_select_inner.oninput = () => {
		if (pat_select_inner.selectedIndex > 0)
			svgelement.attr({"font-family": pat_select_inner.selectedOptions[0].innerText});
	}

	return base
}


var ggl
var Legend_Parameters = {"fill": "#1d1d1b","fill-opacity": "1.0","font-family": "Bahnschrift",
	"font-weight": "700","font-variation-settings": "'wght' 700, 'wdth' 87","font-size": "8px"
}

function Recreate_Legendes()
{
	SVG_Legende.clear()
	
	let box = SVG_Draw.viewbox()
	let ox = box.x + 3
	let oy = box.y2 - legende_height + 5
	let dx = 0;
	let dy = 0;
	let current_max_x = 0;
	for(const [key, value] of Object.entries(LoadedMap_CouchesSelected))
	{
		if (!value.hasOwnProperty("Legende")) continue;
		const parameters = value["Legende"]
		if (!parameters.hasOwnProperty("generation")) continue;
		ggl = SVG_Legende.group();
		eval(parameters["generation"]);
		
		if (ggl.bbox().y2 + dy > legende_height)
		{
			dx = current_max_x
			dy = 0
		}
		
		ggl.dmove(dx, dy - ggl.bbox().y)

		if (!parameters.hasOwnProperty("parts")) continue;
		for (let i = 0; i < parameters["parts"].length; i++){
			const element = parameters["parts"][i]
			SVG_Draw.findOne("[id='" + key + "']").findOne("#" + element["id"]).move(dx + ox + element["offset_x"], dy + oy + element["offset_y"])
		}

		dy += Math.round(ggl.bbox().h * 100) / 100.0 + 3
		current_max_x = Math.max(ggl.bbox().x2 + 5, current_max_x)
	}
	TestSvgLegende()
	SVG_Legende.dmove(box.x + 3, box.y2 - legende_height + 5)
}

function TestSvgLegende()
{
	// SVG_Legende.text("Cours d'eau").attr(Legend_Parameters).dx(25).dy(-3);
	// SVG_Legende.text("Sommets").attr(Legend_Parameters).dx(8).dy(-3);
	// ggl.rect(20,10).stroke('black').fill('none');ggl.text('Mers et océans').attr(Legend_Parameters).dx(25).dy(-3);



	// let settings = {"fill": "#1d1d1b","fill-opacity": "1.0","font-family": "Bahnschrift"};
	// let settings2 = {"font-variation-settings": "'wght' 400, 'wdth' 100","font-size": "5px", "text-anchor": "middle"};
	// SVG_Legende.line( 0,0, 0,13).stroke("black").dy(8);
	// SVG_Legende.line(15,0,15,13).stroke("black").dy(8);
	// SVG_Legende.line(30,0,30,13).stroke("black").dy(8);
	// SVG_Legende.line(45,0,45,13).stroke("black").dy(8);
	// SVG_Legende.rect(60,10).stroke("black").fill("none").dy(11);
	// SVG_Legende.text("0").attr(settings).attr(settings2);
	// SVG_Legende.text("200").attr(settings).attr(settings2).dx(15);
	// SVG_Legende.text("500").attr(settings).attr(settings2).dx(30);
	// SVG_Legende.text("1 500").attr(settings).attr(settings2).dx(45);
	// SVG_Legende.text(function(add) { add.tspan('Altitude').attr(Legend_Parameters); add.tspan('(en mètres)').attr(settings).attr({"font-weight": "700","font-variation-settings": "'wght' 700, 'wdth' 87","font-size": "5px"}).dx(3); }).dx(65).dy(16)

	// let settings = {'fill': '#1d1d1b','fill-opacity': '1.0','font-family': 'Bahnschrift'}; let settings2 = {'font-weight': '400','font-size': '5px', 'text-anchor': 'middle'}; ggl.line( 0,0, 0,13).stroke('black').dy(8);ggl.line(15,0,15,13).stroke('black').dy(8);ggl.line(30,0,30,13).stroke('black').dy(8);ggl.line(45,0,45,13).stroke('black').dy(8);ggl.rect(60,10).stroke('black').fill('none').dy(11);ggl.text('0').attr(settings).attr(settings2);ggl.text('200').attr(settings).attr(settings2).dx(15);ggl.text('500').attr(settings).attr(settings2).dx(30);ggl.text('1 500').attr(settings).attr(settings2).dx(45);ggl.text(function(add) { add.tspan('Altitude').attr(settings).attr({'font-weight': '700','font-size': '8px'}); add.tspan('(en mètres)').attr(settings).attr({'font-weight': '700','font-size': '5px'}).dx(3); }).dx(65).dy(16)
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

function CoucheDragged_Ended(event)
{
	ReajustePositionCouche();
}

function CoucheDragged_Add(event)
{
	var couche = CreateCouche(LoadedMap_Couches[event.item.getAttribute("couche_name")]);
	var menu_div = document.getElementById("menu_container_carte"); 
	menu_div.insertBefore(couche, event.item);
	event.item.remove();
	Recreate_Legendes();
	ReajustePositionCouche();
}

function CoucheDeleted(couche)
{
	for(var key in LoadedMap_SVGElements) {
    if(LoadedMap_SVGElements.hasOwnProperty(key)) {
			if (key.startsWith(couche.id + "/") || key == couche.id)
			{
				LoadedMap_SVGElements[key].remove();
				delete LoadedMap_SVGElements[key]
			}
    }
	}
	
	couche.remove();
	delete LoadedMap_CouchesSelected[couche.getAttribute("id")]
	Recreate_Legendes();
	ReajustePositionCouche();
}

function ReajustePositionCouche()
{
	let menu_div = document.getElementById("menu_container_carte");
	for (let i = menu_div.children.length - 1; i >= 0; i--) {
		const id = menu_div.children[i].id;
		LoadedMap_SVGElements[id].back()
	}
	MoveFrontElement();
}

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