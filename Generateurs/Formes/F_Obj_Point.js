class F_Obj_Point extends F_Obj
{
	E_tile;
	E_x;
	E_y;
	E_istext;
	E_istextoptions;
	E_text;
	E_textsize;
	E_textoffsetx;
	E_textoffsety;
	E_pointtype;
	E_pointsize;
	E_strokewidth;
	E_strokecolor;
	E_stroketype;

	DrawGroup_stroke;
	DrawGroup_fill;

	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("x")) parameters["x"] = 0
		if (!parameters.hasOwnProperty("y")) parameters["y"] = 0
		if (!parameters.hasOwnProperty("istext")) parameters["istext"] = true
		if (!parameters.hasOwnProperty("text")) parameters["text"] = "A"
		if (!parameters.hasOwnProperty("textsize")) parameters["textsize"] = 12
		if (!parameters.hasOwnProperty("textoffsetx")) parameters["textoffsetx"] = 0
		if (!parameters.hasOwnProperty("textoffsety")) parameters["textoffsety"] = -10
		if (!parameters.hasOwnProperty("pointtype")) parameters["pointtype"] = 0
		if (!parameters.hasOwnProperty("pointsize")) parameters["pointsize"] = 10
		if (!parameters.hasOwnProperty("strokewidth")) parameters["strokewidth"] = 2
		if (!parameters.hasOwnProperty("strokecolor")) parameters["strokecolor"] = "red"
		if (!parameters.hasOwnProperty("stroketype")) parameters["stroketype"] = ""

		this.CreateElements(parameters);
	}

	CreateElements(parameters)
	{

		var div_title = document.createElement("div");
		div_title.classList.add("flexparameters")
		this.Root.appendChild(div_title)

		this.E_tile = document.createElement("span");
		this.E_tile.classList.add("Object_title");
		this.E_tile.onclick = () => {this.Root.classList.toggle("show")}
		this.E_tile.innerHTML = "Point " + parameters["text"] + " ( " + parameters["x"] + " ; " + parameters["y"] + " )";
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { 
			let id = (this.alphabet.indexOf(this.E_text.value) + 1) % this.alphabet.length
			let newobj = new F_Obj_Point(this.ParentObject, 
			{
				x: this.E_x.valueAsNumber,
				y: this.E_y.valueAsNumber,
				istext: this.E_istext.checked,
				text: this.alphabet[id],
				textsize: this.E_textsize.valueAsNumber,
				textoffsetx: this.E_textoffsetx.valueAsNumber,
				textoffsety: this.E_textoffsety.valueAsNumber,
				pointtype: this.E_pointtype.selectedIndex,
				pointsize: this.E_pointsize.valueAsNumber,
				strokewidth: this.E_strokewidth.valueAsNumber,
				strokecolor: this.E_strokecolor.getAttribute("data-color"),
				stroketype: this.E_stroketype.value
			}
		); this.ParentObject.Object.add(newobj); this.ParentObject.Recreate(); }

		var div_icon_delete = document.createElement("div");
		div_icon_delete.classList.add("iconbutton")
		div_title.appendChild(div_icon_delete)

		var img_delete = document.createElement("img");
		img_delete.src = "/Images/Icons/Delete.svg"
		div_icon_delete.appendChild(img_delete)
		img_delete.onclick = () => { this.ParentObject.Object.delete(this); this.ParentObject.Recreate(); this.Parent.removeChild(this.Root); }

		var div = document.createElement("div");
		div.classList.add("formemenu_div")
		this.Root.appendChild(div);

		var divcoord = document.createElement("div");
		divcoord.classList.add("tool-axe")
		div.appendChild(divcoord);

		var img = document.createElement("img");
		img.src = "/Images/Icons/Coordonate.svg"
		divcoord.appendChild(img);

		var label = document.createElement("label")
		label.innerHTML = "("
		divcoord.appendChild(label)

		this.E_x = document.createElement("input");
		this.E_x.type = "number";
		this.E_x.value = parameters["x"];
		this.E_x.classList.add("input_coord");
		this.E_x.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]);
			this.E_tile.innerHTML = "Point " + this.E_text.value + " ( " + this.E_x.valueAsNumber + " ; " + 
															this.E_y.valueAsNumber + " )";
		 }
		divcoord.appendChild(this.E_x);

		label = document.createElement("label")
		label.innerHTML = ";"
		divcoord.appendChild(label)

		this.E_y = document.createElement("input");
		this.E_y.type = "number";
		this.E_y.value = parameters["y"];
		this.E_y.classList.add("input_coord");
		this.E_y.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			this.E_tile.innerHTML = "Point " + this.E_text.value + " ( " + this.E_x.valueAsNumber + " ; " + 
															this.E_y.valueAsNumber + " )";
		}
		divcoord.appendChild(this.E_y);

		label = document.createElement("label")
		label.innerHTML = ")"
		divcoord.appendChild(label)

		var hr = document.createElement("hr");
		div.appendChild(hr);

		var divtext = document.createElement("div");
		divtext.classList.add("tool")
		div.appendChild(divtext)

		img = document.createElement("img");
		img.src = "/Images/Icons/Text.svg"
		divtext.appendChild(img);

		this.E_istext = document.createElement("input");
		this.E_istext.type = "checkbox";
		this.E_istext.style.width = "auto";
		this.E_istext.checked = parameters["istext"];
		divtext.appendChild(this.E_istext);

		this.E_istextoptions = document.createElement("div");
		this.E_istextoptions.classList.add("subsection")
		if (!parameters["istext"])
			this.E_istextoptions.classList.add("hiddenparam")
		divtext.appendChild(this.E_istextoptions);

		this.E_istext.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			if (e.target.checked)
				this.E_istextoptions.classList.remove("hiddenparam");
			else
				this.E_istextoptions.classList.add("hiddenparam");
			}
		
		var divtext_options = document.createElement("div");
		divtext_options.classList.add("tool-axe")
		this.E_istextoptions.appendChild(divtext_options);

		img = document.createElement("img");
		img.src = "/Images/Icons/Name.svg"
		divtext_options.appendChild(img);

		this.E_text = document.createElement("input");
		this.E_text.type = "text";
		this.E_text.value = parameters["text"];
		this.E_text.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext_options.appendChild(this.E_text);

		img = document.createElement("img");
		img.src = "/Images/Icons/Font Size.svg"
		divtext_options.appendChild(img);

		this.E_textsize = document.createElement("input");
		this.E_textsize.type = "number";
		this.E_textsize.step = 2;
		this.E_textsize.min = 0;
		this.E_textsize.value = parameters["textsize"];
		this.E_textsize.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext_options.appendChild(this.E_textsize);

		var divtext_position = document.createElement("div");
		divtext_position.classList.add("tool-axe")
		this.E_istextoptions.appendChild(divtext_position);

		img = document.createElement("img");
		img.src = "/Images/Icons/X Pos.svg"
		divtext_position.appendChild(img);

		this.E_textoffsetx = document.createElement("input");
		this.E_textoffsetx.classList.add("input_coord")
		this.E_textoffsetx.type = "number";
		this.E_textoffsetx.step = 5;
		this.E_textoffsetx.value = parameters["textoffsetx"];
		this.E_textoffsetx.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext_position.appendChild(this.E_textoffsetx);

		img = document.createElement("img");
		img.src = "/Images/Icons/Y Pos.svg"
		divtext_position.appendChild(img);

		this.E_textoffsety = document.createElement("input");
		this.E_textoffsety.classList.add("input_coord")
		this.E_textoffsety.type = "number";
		this.E_textoffsety.step = 5;
		this.E_textoffsety.value = parameters["textoffsety"];
		this.E_textoffsety.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext_position.appendChild(this.E_textoffsety);

		hr = document.createElement("hr");
		div.appendChild(hr);

		var divapparence = document.createElement("div");
		divapparence.classList.add("tool-axe");
		div.appendChild(divapparence);

		img = document.createElement("img");
		img.src = "/Images/Icons/Apparence.svg";
		divapparence.appendChild(img);

		this.E_pointtype = document.createElement("select");
		divapparence.appendChild(this.E_pointtype)
		this.E_pointtype.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		var opt;
		opt = document.createElement("option"); opt.value = 1; opt.innerHTML = "+"; this.E_pointtype.appendChild(opt);
		opt = document.createElement("option"); opt.value = 2; opt.innerHTML = "×"; this.E_pointtype.appendChild(opt);
		opt = document.createElement("option"); opt.value = 3; opt.innerHTML = "○"; this.E_pointtype.appendChild(opt);
		opt = document.createElement("option"); opt.value = 4; opt.innerHTML = "•"; this.E_pointtype.appendChild(opt);
		opt = document.createElement("option"); opt.value = 6; opt.innerHTML = "Aucun"; this.E_pointtype.appendChild(opt);
		this.E_pointtype.selectedIndex = parameters["pointtype"];

		img = document.createElement("img");
		img.src = "/Images/Icons/Pourcent.svg";
		divapparence.appendChild(img);

		this.E_pointsize = document.createElement("input");
		this.E_pointsize.type = "number";
		this.E_pointsize.step = 2.5;
		this.E_pointsize.value = parameters["pointsize"];
		this.E_pointsize.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divapparence.appendChild(this.E_pointsize);

		hr = document.createElement("hr");
		div.appendChild(hr);

		var div3 = document.createElement("div");
		div3.classList.add("tool-line")
		div.appendChild(div3)
		
		var img1 = document.createElement("img");
		img1.src = "/Images/Icons/Stroke Width.svg"
		div3.appendChild(img1);

		this.E_strokewidth = document.createElement("input");
		this.E_strokewidth.type = "number";
		this.E_strokewidth.value = "3";
		this.E_strokewidth.step = "1";
		this.E_strokewidth.min = "1";
		this.E_strokewidth.value = parameters["strokewidth"];
		this.E_strokewidth.oninput = (e) => { this.DrawGroup_stroke.attr({"stroke-width": e.target.valueAsNumber}); }
		div3.appendChild(this.E_strokewidth);

		var img2 = document.createElement("img");
		img2.src = "/Images/Icons/Stroke.svg"
		div3.appendChild(img2);

		this.E_strokecolor = document.createElement("button");
		this.E_strokecolor.setAttribute("data-color", parameters["strokecolor"]);
		this.E_strokecolor.style.setProperty("--cp-size", "24px");
		div3.appendChild(this.E_strokecolor);
		var color_picker = new ColorPicker(this.E_strokecolor, base_options_colorpicker)
		color_picker.on('pick', (color) => { 
			this.DrawGroup_stroke.attr({"stroke": color}); 
			this.DrawGroup_fill.attr({"fill": color}); 
		} );

		var img3 = document.createElement("img");
		img3.src = "/Images/Icons/Line Style.svg"
		div3.appendChild(img3);

		this.E_stroketype = document.createElement("input");
		this.E_stroketype.type = "text";
		this.E_stroketype.value = parameters["stroketype"];
		this.E_stroketype.oninput = (e) => { this.DrawGroup_stroke.attr({"stroke-dasharray": e.target.value}); }
		div3.appendChild(this.E_stroketype);
	}

	Recreate(Object_Group)
	{
		this.DrawGroup.remove();
		this.DrawGroup = Object_Group.group();
		this.DrawGroup_fill = this.DrawGroup.group();
		this.DrawGroup_stroke = this.DrawGroup.group();

		let size = this.ParentObject.size;

		let xs = size.reel.x_start;
		let xe = size.reel.x_end;
		let ys = size.reel.y_start;
		let ye = size.reel.y_end;

		let x = this.E_x.valueAsNumber;
		let y = this.E_y.valueAsNumber;
		let istext = this.E_istext.checked;
		let text = this.E_text.value;
		let textsize = this.E_textsize.valueAsNumber;
		let textoffsetx = this.E_textoffsetx.valueAsNumber;
		let textoffsety = this.E_textoffsety.valueAsNumber;
		let pointtype = this.E_pointtype.selectedIndex;
		let pointsize = this.E_pointsize.valueAsNumber;
		let strokewidth = this.E_strokewidth.valueAsNumber;
		let strokecolor = this.E_strokecolor.getAttribute("data-color");
		let stroketype = this.E_stroketype.value;

		this.DrawGroup_stroke.attr({
			"fill": "none",
			"stroke": strokecolor,
			"stroke-width": strokewidth,
			"stroke-dasharray": stroketype,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		});
		
		this.DrawGroup_fill.attr({
			"fill": strokecolor,
			"stroke": "none",
			"font-size": textsize,
			"font-family": "Bahnschrift",
			"text-anchor": "middle",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
		});

		let rx = (x - xs)/(xe - xs) * size.grad.width + size.grad.left_x + 5;
		let ry;
		if (ye == ys)
			ry = size.base.height / 2 + 5;
		else
			ry = (1 - (y - ys)/(ye - ys)) * size.grad.height + size.grad.top_y + 5;

		if (pointtype == 0)
		{
			this.DrawGroup_stroke.line(rx, ry - pointsize / 2.0, rx, ry + pointsize / 2.0)
			this.DrawGroup_stroke.line(rx - pointsize / 2.0, ry, rx + pointsize / 2.0, ry)
		}
		else if (pointtype == 1)
		{
			this.DrawGroup_stroke.line(rx - pointsize / 2.0, ry - pointsize / 2.0, rx + pointsize / 2.0, ry + pointsize / 2.0)
			this.DrawGroup_stroke.line(rx - pointsize / 2.0, ry + pointsize / 2.0, rx + pointsize / 2.0, ry - pointsize / 2.0)
		}
		else if (pointtype == 2)
		{
			this.DrawGroup_stroke.circle(pointsize / 2.0).center(rx, ry)
		}
		else if (pointtype == 3)
		{
			this.DrawGroup_fill.circle(pointsize / 2.0).center(rx, ry)
		}
		
		if (text != "" && istext)
		{
			this.DrawGroup_fill.text(text).center(rx + textoffsetx, ry + textoffsety).attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
			this.DrawGroup_fill.text(text).center(rx + textoffsetx, ry + textoffsety)
		}
	}



}