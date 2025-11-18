class F_Diagramme extends F_Base
{

	Bars = [];
	Points = [];
	Sector = [];

	constructor(em)
	{
		if (em == undefined)
			return;
		super(em);
		
		document.getElementById("diag_baton_listbarre").innerHTML = "";
		document.getElementById("diag_carte_listpoint").innerHTML = "";
		document.getElementById("diag_circu_listsection").innerHTML = "";

		this.GetData();
		this.AddBar({"name": "Valeur 1"});
		this.AddSector({"name": "Valeur 1"});
		this.SetEvents();
	}


	GetData()
	{
		this.Parameters["diag_type"] = document.getElementById("diag_type").selectedIndex;

		switch (this.Parameters["diag_type"])
		{
			case 0: // Diagramme à baton
				this.Parameters["element_id"] = ""
				this.Parameters["margin_up"] = 10
				this.Parameters["margin_down"] = 10
				this.Parameters["margin_left"] = 10
				this.Parameters["margin_right"] = 10
				this.Parameters["width"] = document.getElementById("diag_gen_width").valueAsNumber;
				this.Parameters["height"] = document.getElementById("diag_gen_height").valueAsNumber;
				this.Parameters["max_eff"] = document.getElementById("diag_baton_maxeff").valueAsNumber;
				this.Parameters["pas"] = document.getElementById("diag_baton_pas").valueAsNumber;
				this.Parameters["title"] = document.getElementById("diag_baton_title").value;
				this.Parameters["Haxe_name"] = document.getElementById("diag_baton_haxe_name").value;
				this.Parameters["Vaxe_name"] = document.getElementById("diag_baton_vaxe_name").value;
				this.Parameters["grid"] = document.getElementById("diag_baton_grid").checked;
				this.Parameters["bar_width"] = document.getElementById("diag_baton_bar_width").valueAsNumber;
				this.Parameters["grid_color"] = document.getElementById("diag_baton_gridcolor").getAttribute("data-color");
				this.Parameters["etiq_offset_x"] = document.getElementById("diag_baton_px").valueAsNumber;
				this.Parameters["etiq_offset_y"] = document.getElementById("diag_baton_py").valueAsNumber;
				this.Parameters["etiq_offset_angle"] = document.getElementById("diag_baton_txt_angle").valueAsNumber;
				this.Parameters["text_size"] = document.getElementById("diag_baton_txt_size").valueAsNumber;
				this.Parameters["graduation_size"] = document.getElementById("diag_baton_grad_size").valueAsNumber;
				this.Parameters["stroke_width"] = document.getElementById("diag_baton_stroke").valueAsNumber;
				this.Parameters["grid_width"] = document.getElementById("diag_baton_stroke").valueAsNumber;
				this.Parameters["show_value_bar"] = document.getElementById("diag_baton_text").checked;
				this.Parameters["draw_surface"] = this.EM.SVG_Draw;
				
				this.Parameters["diag_gen_margin"] = document.getElementById("diag_gen_margin").valueAsNumber;
				this.Parameters["objects"] = [];

				this.GetBars();
				break;
			case 1: // Diagramme cartésien
				this.Parameters["element_id"] = ""
				this.Parameters["margin_up"] = 10
				this.Parameters["margin_down"] = 10
				this.Parameters["margin_left"] = 10
				this.Parameters["margin_right"] = 10
				this.Parameters["width"] = document.getElementById("diag_gen_width").valueAsNumber;
				this.Parameters["height"] = document.getElementById("diag_gen_height").valueAsNumber;
				this.Parameters["Hstart"] = document.getElementById("diag_carte_Xstart").valueAsNumber;
				this.Parameters["Hpas"] = document.getElementById("diag_carte_Xpas").valueAsNumber;
				this.Parameters["Hsection"] = document.getElementById("diag_carte_Xsec").valueAsNumber;
				this.Parameters["Hsubsection"] = document.getElementById("diag_carte_Xsubsec").valueAsNumber;
				this.Parameters["Vstart"] = document.getElementById("diag_carte_Ystart").valueAsNumber;
				this.Parameters["Vpas"] = document.getElementById("diag_carte_Ypas").valueAsNumber;
				this.Parameters["Vsection"] = document.getElementById("diag_carte_Ysec").valueAsNumber;
				this.Parameters["Vsubsection"] = document.getElementById("diag_carte_Ysubsec").valueAsNumber;
				this.Parameters["title"] = document.getElementById("diag_carte_title").value;
				this.Parameters["Haxe_name"] = document.getElementById("diag_carte_haxe_name").value;
				this.Parameters["Vaxe_name"] = document.getElementById("diag_carte_vaxe_name").value;
				this.Parameters["grid"] = document.getElementById("diag_carte_grid").checked;
				this.Parameters["grid_width"] = document.getElementById("diag_carte_grid_width").valueAsNumber;
				this.Parameters["grid_color"] = document.getElementById("diag_carte_gridcolor").getAttribute("data-color");
				this.Parameters["text_size"] = document.getElementById("diag_carte_txt_size").valueAsNumber;
				this.Parameters["stroke_width"] = document.getElementById("diag_carte_stroke").valueAsNumber;
				this.Parameters["stroke_color"] = document.getElementById("diag_carte_strokecolor").getAttribute("data-color");
				this.Parameters["graduation_size"] = document.getElementById("diag_carte_grad_size").valueAsNumber;
				this.Parameters["point_size"] = document.getElementById("diag_carte_point_size").valueAsNumber;
				this.Parameters["draw_surface"] = this.EM.SVG_Draw;
				
				this.Parameters["diag_gen_margin"] = document.getElementById("diag_gen_margin").valueAsNumber;
				this.Parameters["objects"] = [];

				this.GetPoints();
				break;
			case 2: // Diagramme circulaire
				this.Parameters["element_id"] = ""
				this.Parameters["margin_up"] = 10
				this.Parameters["margin_down"] = 10
				this.Parameters["margin_left"] = 10
				this.Parameters["margin_right"] = 10
				this.Parameters["width"] = document.getElementById("diag_gen_width").valueAsNumber;
				this.Parameters["height"] = document.getElementById("diag_gen_height").valueAsNumber;
				this.Parameters["diag_width"] = document.getElementById("diag_circu_width").valueAsNumber;
				this.Parameters["diag_angle"] = document.getElementById("diag_circu_offset").valueAsNumber;
				this.Parameters["legende_space"] = document.getElementById("diag_circu_legende_space").valueAsNumber;
				this.Parameters["title"] = document.getElementById("diag_circu_title").value;
				this.Parameters["text_size"] = document.getElementById("diag_circu_txt_size").valueAsNumber;
				this.Parameters["legende_square_size"] = document.getElementById("diag_circu_legende_size").valueAsNumber;
				this.Parameters["stroke_width"] = document.getElementById("diag_circu_stroke").valueAsNumber;
				this.Parameters["border"] = document.getElementById("diag_circu_border").checked
				this.Parameters["draw_surface"] = this.EM.SVG_Draw;
				
				this.Parameters["diag_gen_margin"] = document.getElementById("diag_gen_margin").valueAsNumber;
				this.Parameters["objects"] = [];

				this.GetSectors();
				break;
			case 3: // Histogramme
				// To do
				break;
		}
	}

	SetEvents()
	{
		document.getElementById("diag_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_gen_width").addEventListener("input", (e) => { this.Parameters["width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_gen_height").addEventListener("input", (e) => { this.Parameters["height"] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("diag_baton_maxeff").addEventListener("input", (e) => { this.Parameters["max_eff"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_pas").addEventListener("input", (e) => { this.Parameters["pas"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_title").addEventListener("input", (e) => { this.Parameters["title"] = e.target.value; this.Recreate()})
		document.getElementById("diag_baton_haxe_name").addEventListener("input", (e) => { this.Parameters["Haxe_name"] = e.target.value; this.Recreate()})
		document.getElementById("diag_baton_vaxe_name").addEventListener("input", (e) => { this.Parameters["Vaxe_name"] = e.target.value; this.Recreate()})
		document.getElementById("diag_baton_grid").addEventListener("input", (e) => { this.Parameters["grid"] = e.target.checked; this.Recreate()})
		document.getElementById("diag_baton_bar_width").addEventListener("input", (e) => { this.Parameters["bar_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_px").addEventListener("input", (e) => { this.Parameters["etiq_offset_x"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_py").addEventListener("input", (e) => { this.Parameters["etiq_offset_y"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_txt_angle").addEventListener("input", (e) => { this.Parameters["etiq_offset_angle"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_txt_size").addEventListener("input", (e) => { this.Parameters["text_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_grad_size").addEventListener("input", (e) => { this.Parameters["graduation_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_stroke").addEventListener("input", (e) => { this.Parameters["stroke_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_baton_text").addEventListener("input", (e) => { this.Parameters["show_value_bar"] = e.target.checked; this.Recreate()})
		document.getElementById("diag_baton_add_baton").addEventListener("click", (e) => { this.AddBar(); })
	
		var color = new ColorPicker(document.getElementById("diag_baton_gridcolor"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["grid_color"] = color;
			this.Recreate();
		})

		
		document.getElementById("diag_carte_Xstart").addEventListener("input", (e) => { this.Parameters["Hstart"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Xpas").addEventListener("input", (e) => { this.Parameters["Hpas"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Xsec").addEventListener("input", (e) => { this.Parameters["Hsection"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Xsubsec").addEventListener("input", (e) => { this.Parameters["Hsubsection"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Ystart").addEventListener("input", (e) => { this.Parameters["Vstart"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Ypas").addEventListener("input", (e) => { this.Parameters["Vpas"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Ysec").addEventListener("input", (e) => { this.Parameters["Vsection"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_Ysubsec").addEventListener("input", (e) => { this.Parameters["Vsubsection"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_title").addEventListener("input", (e) => { this.Parameters["title"] = e.target.value; this.Recreate()})
		document.getElementById("diag_carte_haxe_name").addEventListener("input", (e) => { this.Parameters["Haxe_name"] = e.target.value; this.Recreate()})
		document.getElementById("diag_carte_vaxe_name").addEventListener("input", (e) => { this.Parameters["Vaxe_name"] = e.target.value; this.Recreate()})
		document.getElementById("diag_carte_grid").addEventListener("input", (e) => { this.Parameters["grid"] = e.target.checked; this.Recreate()})
		document.getElementById("diag_carte_grid_width").addEventListener("input", (e) => { this.Parameters["grid_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_txt_size").addEventListener("input", (e) => { this.Parameters["text_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_grad_size").addEventListener("input", (e) => { this.Parameters["graduation_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_stroke").addEventListener("input", (e) => { this.Parameters["stroke_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_point_size").addEventListener("input", (e) => { this.Parameters["point_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_carte_add_point").addEventListener("click", (e) => { this.AddPoint(
			this.Points.length > 0 ? {x: this.Points[this.Points.length - 1]["x"].valueAsNumber + 1, y: 0} : {}
		); })


		var color = new ColorPicker(document.getElementById("diag_carte_gridcolor"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["grid_color"] = color;
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("diag_carte_strokecolor"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["stroke_color"] = color;
			this.Recreate();
		})
		

		document.getElementById("diag_circu_width").addEventListener("input", (e) => { this.Parameters["diag_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_offset").addEventListener("input", (e) => { this.Parameters["diag_angle"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_legende_space").addEventListener("input", (e) => { this.Parameters["legende_space"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_title").addEventListener("input", (e) => { this.Parameters["title"] = e.target.value; this.Recreate()})
		document.getElementById("diag_circu_txt_size").addEventListener("input", (e) => { this.Parameters["text_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_legende_size").addEventListener("input", (e) => { this.Parameters["legende_square_size"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_stroke").addEventListener("input", (e) => { this.Parameters["stroke_width"] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("diag_circu_border").addEventListener("input", (e) => { this.Parameters["border"] = e.target.checked; this.Recreate()})
		document.getElementById("diag_circu_add_sector").addEventListener("click", (e) => { this.AddSector(); })
	}


	GetBars()
	{
		this.Parameters["etiquettes"] = []
		this.Parameters["effectifs"] = []
		this.Parameters["colors"] = []
		this.Bars.forEach(bar => {
			this.Parameters["etiquettes"].push(bar.name.value);
			this.Parameters["effectifs"].push(bar.eff.valueAsNumber);
			this.Parameters["colors"].push(bar.color.getAttribute("data-color"));
		});
		this.Parameters["bar"] = this.Parameters["etiquettes"].length;
	}

	AddBar(parameters = {})
	{
		var bar = {};

		let maindiv = document.createElement("div");
		maindiv.classList.add("tool-axe")
		bar["main"] = maindiv;

		let img = document.createElement("img");
		img.src = "/Images/Icons/Name.svg"
		img.title = "Nom de la valeur"
		maindiv.appendChild(img);

		let input1 = document.createElement("input");
		input1.type = "text"
		input1.value = parameters.hasOwnProperty("name") ? parameters["name"] : "";
		input1.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input1);
		bar["name"] = input1;

		img = document.createElement("img");
		img.src = "/Images/Icons/Size.svg"
		img.title = "Effectif de la valeur"
		maindiv.appendChild(img);

		let input2 = document.createElement("input");
		input2.type = "number"
		input2.value = parameters.hasOwnProperty("eff") ? parameters["eff"] : 5;
		input2.step = 1;
		input2.min = 0;
		input2.style.width = "30px"
		input2.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input2);
		bar["eff"] = input2;

		img = document.createElement("img");
		img.src = "/Images/Icons/Fill.svg"
		img.title = "Couleur de la valeur"
		maindiv.appendChild(img);
		
		let input3 = document.createElement("button");
		input3.setAttribute("data-color", parameters.hasOwnProperty("color") ? parameters["color"] : this.colors[this.Bars.length % this.colors.length]);
		input3.style.setProperty("--cp-size", "24px");
		maindiv.appendChild(input3);
		var color_picker = new ColorPicker(input3, base_options_colorpicker)
		color_picker.on('pick', (color) => { this.Recreate(); } );
		bar["color"] = input3;

		let div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Copy.svg"
		img.title = "Dupliquer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.CopyBar(bar); }

		div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Delete.svg"
		img.title = "Supprimer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.RemoveBar(bar); }

		document.getElementById("diag_baton_listbarre").appendChild(maindiv);

		this.Bars.push(bar);

		this.Recreate();
	}

	RemoveBar(element)
	{
		this.Bars = this.Bars.filter(bar => bar != element);
		document.getElementById("diag_baton_listbarre").removeChild(element["main"]);
		this.Recreate();
	}

	CopyBar(element)
	{
		this.AddBar({
			name: element.name.value,
			eff: element.eff.valueAsNumber,
			color: element.color.getAttribute("data-color")
		})
		this.Recreate();
	}


	GetPoints()
	{
		this.Parameters["points"] = []
		this.Points.forEach(point => {
			this.Parameters["points"].push([
				point.x.valueAsNumber,
				point.y.valueAsNumber
			]);
		});
	}

	AddPoint(parameters = {})
	{
		console.log(this.Points.length > 0 ? this.Points[this.Points.length - 1]["x"] : {})
		var point = {};

		let maindiv = document.createElement("div");
		maindiv.classList.add("tool-axe")
		point["main"] = maindiv;

		let img = document.createElement("img");
		img.src = "/Images/Icons/Coordonate.svg"
		img.title = "Coordonnée du point"
		maindiv.appendChild(img);

		let label = document.createElement("label")
		label.innerHTML = "("
		maindiv.appendChild(label)

		let input1 = document.createElement("input");
		input1.classList.add("input_coord");
		input1.type = "number"
		input1.value = parameters.hasOwnProperty("x") ? parameters["x"] : 0;
		input1.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input1);
		point["x"] = input1;

		label = document.createElement("label")
		label.innerHTML = ";"
		maindiv.appendChild(label)

		let input2 = document.createElement("input");
		input2.classList.add("input_coord");
		input2.type = "number"
		input2.value = parameters.hasOwnProperty("y") ? parameters["y"] : 0;
		input2.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input2);
		point["y"] = input2;

		label = document.createElement("label")
		label.innerHTML = ")"
		maindiv.appendChild(label)

		let div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Copy.svg"
		img.title = "Dupliquer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.CopyPoint(point); }

		div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Delete.svg"
		img.title = "Supprimer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.RemovePoint(point); }

		document.getElementById("diag_carte_listpoint").appendChild(maindiv);

		this.Points.push(point);

		this.Recreate();
	}

	RemovePoint(element)
	{
		this.Points = this.Points.filter(point => point != element);
		document.getElementById("diag_carte_listpoint").removeChild(element["main"]);
		this.Recreate();
	}

	CopyPoint(element)
	{
		this.AddPoint({
			x: element.x.valueAsNumber,
			y: element.y.valueAsNumber,
		})
		this.Recreate();
	}


	GetSectors()
	{
		this.Parameters["etiquettes"] = []
		this.Parameters["effectifs"] = []
		this.Parameters["colors"] = []
		this.Sector.forEach(sector => {
			this.Parameters["etiquettes"].push(sector.name.value);
			this.Parameters["effectifs"].push(sector.eff.valueAsNumber);
			this.Parameters["colors"].push(sector.color.getAttribute("data-color"));
		});
	}

	AddSector(parameters = {})
	{
		var sector = {};

		let maindiv = document.createElement("div");
		maindiv.classList.add("tool-axe")
		sector["main"] = maindiv;

		let img = document.createElement("img");
		img.src = "/Images/Icons/Name.svg"
		img.title = "Nom de la valeur"
		maindiv.appendChild(img);

		let input1 = document.createElement("input");
		input1.type = "text"
		input1.value = parameters.hasOwnProperty("name") ? parameters["name"] : "";
		input1.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input1);
		sector["name"] = input1;

		img = document.createElement("img");
		img.src = "/Images/Icons/Size.svg"
		img.title = "Effectif de la valeur"
		maindiv.appendChild(img);

		let input2 = document.createElement("input");
		input2.type = "number"
		input2.value = parameters.hasOwnProperty("eff") ? parameters["eff"] : 5;
		input2.step = 1;
		input2.min = 0;
		input2.style.width = "30px"
		input2.addEventListener("input", (e) => {this.Recreate()})
		maindiv.appendChild(input2);
		sector["eff"] = input2;

		img = document.createElement("img");
		img.src = "/Images/Icons/Fill.svg"
		img.title = "Couleur de la valeur"
		maindiv.appendChild(img);
		
		let input3 = document.createElement("button");
		input3.setAttribute("data-color", parameters.hasOwnProperty("color") ? parameters["color"] : this.colors[this.Sector.length % this.colors.length]);
		input3.style.setProperty("--cp-size", "24px");
		maindiv.appendChild(input3);
		var color_picker = new ColorPicker(input3, base_options_colorpicker)
		color_picker.on('pick', (color) => { this.Recreate(); } );
		sector["color"] = input3;

		let div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Copy.svg"
		img.title = "Dupliquer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.CopySector(sector); }

		div = document.createElement("div");
		div.classList.add("iconbutton");
		maindiv.appendChild(div);

		img = document.createElement("img");
		img.src = "/Images/Icons/Delete.svg"
		img.title = "Supprimer la valeur"
		div.appendChild(img);
		img.onclick = () => { 
			this.RemoveSector(sector); }

		document.getElementById("diag_circu_listsection").appendChild(maindiv);

		this.Sector.push(sector);

		this.Recreate();
	}

	RemoveSector(element)
	{
		this.Sector = this.Sector.filter(sector => sector != element);
		document.getElementById("diag_circu_listsection").removeChild(element["main"]);
		this.Recreate();
	}

	CopySector(element)
	{
		this.AddSector({
			name: element.name.value,
			eff: element.eff.valueAsNumber,
			color: element.color.getAttribute("data-color")
		})
		this.Recreate();
	}


	
	ox; oy;
	w; h; pdx; sdx; pdy; sdy; hy; hx; vx; vy;

	Recreate()
	{
		let w = this.Parameters["width"] + 10
		let h = this.Parameters["height"] + 10
		this.EM.SetSize(w, h);
		this.EM.SetMargin(this.Parameters["diag_gen_margin"]);
		this.EM.Clear()

		this.GetData();

		
		switch (this.Parameters["diag_type"])
		{
			case 0: // Diagramme à baton
				var diag = new Diagramme_Baton(this.Parameters);
				break;
			case 1: // Diagramme cartésien
				var diag = new Diagramme_Cartesien(this.Parameters);
				break;
			case 2: // Diagramme circulaire
				var diag = new Diagramme_Circulaire(this.Parameters);
				break;
			case 3: // Histogramme
				var diag = new Histogramme(this.Parameters);
				break;
		}

		this.EM.SVG_Draw.dmove(this.EM.Margin, this.EM.Margin);
	}

}