class F_Obj_Text extends F_Obj
{
	E_tile;
	E_x;
	E_y;
	E_text;
	E_textsize;
	E_textangle;
	E_fillcolor;

	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("x")) parameters["x"] = 0
		if (!parameters.hasOwnProperty("y")) parameters["y"] = 0
		if (!parameters.hasOwnProperty("text")) parameters["text"] = "A"
		if (!parameters.hasOwnProperty("textsize")) parameters["textsize"] = 12
		if (!parameters.hasOwnProperty("textangle")) parameters["textangle"] = 0
		if (!parameters.hasOwnProperty("fillcolor")) parameters["fillcolor"] = "red"
 
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
			let newobj = new F_Obj_Text(this.ParentObject, 
			{
				x: this.E_x.valueAsNumber,
				y: this.E_y.valueAsNumber,
				text: this.alphabet[id],
				textsize: this.E_textsize.valueAsNumber,
				textangle: this.E_textangle.valueAsNumber,
				fillcolor: this.E_fillcolor.getAttribute("data-color"),
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
		divtext.classList.add("tool-axe")
		div.appendChild(divtext)

		img = document.createElement("img");
		img.src = "/Images/Icons/Name.svg"
		divtext.appendChild(img);

		this.E_text = document.createElement("input");
		this.E_text.type = "text";
		this.E_text.value = parameters["text"];
		this.E_text.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext.appendChild(this.E_text);

		img = document.createElement("img");
		img.src = "/Images/Icons/Font Size.svg"
		divtext.appendChild(img);

		this.E_textsize = document.createElement("input");
		this.E_textsize.type = "number";
		this.E_textsize.step = 2;
		this.E_textsize.min = 0;
		this.E_textsize.value = parameters["textsize"];
		this.E_textsize.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtext.appendChild(this.E_textsize);
		
		hr = document.createElement("hr");
		div.appendChild(hr);

		var divtextstyle = document.createElement("div");
		divtextstyle.classList.add("tool-axe")
		div.appendChild(divtextstyle)

		img = document.createElement("img");
		img.src = "/Images/Icons/Rotation.svg"
		divtextstyle.appendChild(img);

		this.E_textangle = document.createElement("input");
		this.E_textangle.type = "number";
		this.E_textangle.step = 2;
		this.E_textangle.min = -360;
		this.E_textangle.max = 360;
		this.E_textangle.value = parameters["textangle"];
		this.E_textangle.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divtextstyle.appendChild(this.E_textangle);

		var img2 = document.createElement("img");
		img2.src = "/Images/Icons/Fill.svg"
		divtextstyle.appendChild(img2);

		this.E_fillcolor = document.createElement("button");
		this.E_fillcolor.setAttribute("data-color", parameters["fillcolor"]);
		this.E_fillcolor.style.setProperty("--cp-size", "24px");
		divtextstyle.appendChild(this.E_fillcolor);
		var color_picker = new ColorPicker(this.E_fillcolor, base_options_colorpicker)
		color_picker.on('pick', (color) => {
			this.DrawGroup.attr({"fill": color}); 
		} );
	}

	Recreate(Object_Group)
	{
		this.DrawGroup.remove();
		this.DrawGroup = Object_Group.group();

		let size = this.ParentObject.size;

		let xs = size.reel.x_start;
		let xe = size.reel.x_end;
		let ys = size.reel.y_start;
		let ye = size.reel.y_end;

		let x = this.E_x.valueAsNumber;
		let y = this.E_y.valueAsNumber;
		let text = this.E_text.value;
		let textsize = this.E_textsize.valueAsNumber;
		let textangle = this.E_textangle.valueAsNumber;
		let fillcolor = this.E_fillcolor.getAttribute("data-color");
		
		this.DrawGroup.attr({
			"fill": fillcolor,
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
			ry = size.base.height / 2 + 5 + y;
		else
			ry = (1 - (y - ys)/(ye - ys)) * size.grad.height + size.grad.top_y + 5;
		
		if (text != "")
		{
			this.DrawGroup.text(text).center(rx, ry).rotate(textangle).attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
			this.DrawGroup.text(text).center(rx, ry).rotate(textangle)
		}
	}



}