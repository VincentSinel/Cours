class F_Obj_Circle extends F_Obj
{
	E_tile;
	E_cx;
	E_cy;
	E_anglestart;
	E_angleend;
	E_radius;
	E_strokewidth;
	E_strokecolor;
	E_strokestyle;
	E_fill;
	E_filloptions;
	E_fillcolor;
	E_fillpattern;

	DrawGroup_stroke;
	DrawGroup_fill;

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("cx")) parameters["cx"] = 0;
		if (!parameters.hasOwnProperty("cy")) parameters["cy"] = 0;
		if (!parameters.hasOwnProperty("anglestart")) parameters["anglestart"] = 0;
		if (!parameters.hasOwnProperty("angleend")) parameters["angleend"] = 360;
		if (!parameters.hasOwnProperty("radius")) parameters["radius"] = 1;
		if (!parameters.hasOwnProperty("strokewidth")) parameters["strokewidth"] = 3;
		if (!parameters.hasOwnProperty("strokecolor")) parameters["strokecolor"] = "black";
		if (!parameters.hasOwnProperty("strokestyle")) parameters["strokestyle"] = "";
		if (!parameters.hasOwnProperty("fill")) parameters["fill"] = false;
		if (!parameters.hasOwnProperty("fillcolor")) parameters["fillcolor"] = "black";
		if (!parameters.hasOwnProperty("fillpattern")) parameters["fillpattern"] = 0;

		this.CreateElements(parameters);
	}

	CreateElements(parameters)
	{

		var div_title = document.createElement("div");
		div_title.classList.add("formetitle")
		this.Root.appendChild(div_title)

		this.E_tile = document.createElement("span");
		this.E_tile.classList.add("Object_title");
		this.E_tile.onclick = () => {this.Root.classList.toggle("show")}
		this.E_tile.innerHTML = "Cercle ( " + parameters["cx"] + " ; " + parameters["cy"] + " ) R: " + parameters["radius"];
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { let newobj = new F_Obj_Courbe(this.ParentObject, 
			{
				cx: this.E_cx.valueAsNumber,
				cy: this.E_cy.valueAsNumber,
				anglestart: this.E_anglestart.valueAsNumber,
				angleend: this.E_angleend.valueAsNumber,
				radius: this.E_radius.valueAsNumber,
				strokewidth: this.E_strokewidth.valueAsNumber,
				strokecolor: this.E_strokecolor.getAttribute("data-color"),
				strokestyle: this.E_strokestyle.value,
				fill: this.E_fill.checked,
				fillcolor: this.E_fillcolor.getAttribute("data-color"),
				fillpattern: this.E_fillpattern.selectedIndex
			}
		); this.ParentObject.Object.push(newobj); this.ParentObject.Recreate(); }

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

		var img0 = document.createElement("img");
		img0.src = "/Images/Icons/Coordonate.svg"
		divcoord.appendChild(img0);

		var label = document.createElement("label")
		label.innerHTML = "("
		divcoord.appendChild(label)

		this.E_cx = document.createElement("input");
		this.E_cx.type = "number";
		this.E_cx.value = parameters["cx"];
		this.E_cx.classList.add("input_coord");
		this.E_cx.onchange = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]);
			this.E_tile.innerHTML = "Cercle ( " + this.E_cx.value + " ; " + this.E_cy.value + " ) R: " + this.E_radius.value; 
		 }
		divcoord.appendChild(this.E_cx);

		label = document.createElement("label")
		label.innerHTML = ";"
		divcoord.appendChild(label)

		this.E_cy = document.createElement("input");
		this.E_cy.type = "number";
		this.E_cy.value = parameters["cy"];
		this.E_cy.classList.add("input_coord");
		this.E_cy.onchange = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			this.E_tile.innerHTML = "Cercle ( " + this.E_cx.value + " ; " + this.E_cy.value + " ) R: " + this.E_radius.value; 
		}
		divcoord.appendChild(this.E_cy);

		label = document.createElement("label")
		label.innerHTML = ")"
		divcoord.appendChild(label)

		var hr = document.createElement("hr");
		div.appendChild(hr);

		var divangle = document.createElement("div");
		divangle.classList.add("tool-axe")
		div.appendChild(divangle)

		label = document.createElement("label")
		label.innerHTML = "$\\theta \\in $ ["
		divangle.appendChild(label);

		MathJax.typesetPromise();

		this.E_anglestart = document.createElement("input");
		this.E_anglestart.classList.add("input_coord")
		this.E_anglestart.type = "number";
		this.E_anglestart.value = parameters["anglestart"];
		this.E_anglestart.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divangle.appendChild(this.E_anglestart);

		label = document.createElement("label")
		label.innerHTML = ";"
		divangle.appendChild(label);

		this.E_angleend = document.createElement("input");
		this.E_angleend.classList.add("input_coord")
		this.E_angleend.type = "number";
		this.E_angleend.value = parameters["angleend"];
		this.E_angleend.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		divangle.appendChild(this.E_angleend);

		label = document.createElement("label")
		label.innerHTML = "]"
		divangle.appendChild(label); 

		hr = document.createElement("hr");
		div.appendChild(hr);

		var divradius = document.createElement("div");
		divradius.classList.add("tool-axe")
		div.appendChild(divradius)

		var img1 = document.createElement("img");
		img1.src = "/Images/Icons/Radius.svg"
		divradius.appendChild(img1);

		this.E_radius = document.createElement("input");
		this.E_radius.classList.add("input_coord")
		this.E_radius.type = "number";
		this.E_radius.min = 0;
		this.E_radius.value = parameters["radius"];
		this.E_radius.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			this.E_tile.innerHTML = "Cercle ( " + this.E_cx.value + " ; " + this.E_cy.value + " ) R: " + this.E_radius.value; 
		}
		divradius.appendChild(this.E_radius);

		hr = document.createElement("hr");
		div.appendChild(hr);

		var divline = document.createElement("div");
		divline.classList.add("tool-line")
		div.appendChild(divline)

		var img2 = document.createElement("img");
		img2.src = "/Images/Icons/Stroke Width.svg"
		divline.appendChild(img2);

		this.E_strokewidth = document.createElement("input");
		this.E_strokewidth.type = "number";
		this.E_strokewidth.value = parameters["strokewidth"];
		this.E_strokewidth.step = "1";
		this.E_strokewidth.min = "1";
		this.E_strokewidth.oninput = (e) => { this.DrawGroup_stroke.attr({"stroke-width": e.target.valueAsNumber}); }
		divline.appendChild(this.E_strokewidth);

		var img3 = document.createElement("img");
		img3.src = "/Images/Icons/Stroke.svg"
		divline.appendChild(img3);

		this.E_strokecolor = document.createElement("button");
		this.E_strokecolor.setAttribute("data-color", parameters["strokecolor"]);
		this.E_strokecolor.style.setProperty("--cp-size", "24px");
		divline.appendChild(this.E_strokecolor);
		var color_picker = new ColorPicker(this.E_strokecolor, base_options_colorpicker)
		color_picker.on('pick', (color) => { this.DrawGroup_stroke.attr({"stroke": color}); } );

		var img4 = document.createElement("img");
		img4.src = "/Images/Icons/Line Style.svg"
		divline.appendChild(img4);

		this.E_strokestyle = document.createElement("input");
		this.E_strokestyle.type = "text";
		this.E_strokestyle.value = parameters["strokestyle"];
		this.E_strokestyle.oninput = (e) => { this.DrawGroup_stroke.attr({"stroke-dasharray": e.target.value}); }
		divline.appendChild(this.E_strokestyle);

		hr = document.createElement("hr");
		div.appendChild(hr);
		
		var divfill = document.createElement("div");
		divfill.classList.add("tool")
		div.appendChild(divfill)

		var img5 = document.createElement("img");
		img5.src = "/Images/Icons/Fill.svg"
		divfill.appendChild(img5);

		this.E_fill = document.createElement("input");
		this.E_fill.type = "checkbox";
		this.E_fill.style.width = "auto";
		this.E_fill.checked = parameters["fill"];
		divfill.appendChild(this.E_fill);

		this.E_filloptions = document.createElement("div");
		this.E_filloptions.classList.add("subsection")
		if (!parameters["fill"])
			this.E_filloptions.classList.add("hiddenparam")
		divfill.appendChild(this.E_filloptions);

		this.E_fill.oninput = (e) => { 
			this.SetFillColor(); 
			if (e.target.checked)
				this.E_filloptions.classList.remove("hiddenparam");
			else
				this.E_filloptions.classList.add("hiddenparam");
			}
		
		var divfilloptions = document.createElement("div");
		divfilloptions.classList.add("tool-axe");
		this.E_filloptions.appendChild(divfilloptions);

		this.E_fillcolor = document.createElement("button");
		this.E_fillcolor.setAttribute("data-color", parameters["fillcolor"]);
		this.E_fillcolor.style.setProperty("--cp-size", "24px");
		divfilloptions.appendChild(this.E_fillcolor);
		var color_picker2 = new ColorPicker(this.E_fillcolor, base_options_colorpicker)
		color_picker2.on('pick', (color) => { this.SetFillColor(); } );

		var img6 = document.createElement("img");
		img6.src = "/Images/Icons/Pattern.svg"
		divfilloptions.appendChild(img6);

		var divpatternselect = document.createElement("div");
		divpatternselect.classList.add("custom-select")
		divfilloptions.appendChild(divpatternselect)

		this.E_fillpattern = document.createElement("select");
		this.E_fillpattern.selectedIndex = parameters["fillpattern"]
		divpatternselect.appendChild(this.E_fillpattern);

		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (let i = 0; i < 12; i++) {
			
			let select_option = document.createElement("option");
			select_option.innerHTML = alphabet[i];
			select_option.value = i+1;
			this.E_fillpattern.appendChild(select_option);
		}

		CustomSelect(divpatternselect, {"class": "tool-fill", "width": "44px","obj-width": "16px"})

		this.E_fillpattern.oninput = () => {
			if (this.E_fillpattern.selectedIndex > 0)
				this.DrawGroup_fill.maskWith(this.ParentObject.EM.PatternsMask["pattern" + this.E_fillpattern.selectedIndex.toString()])
			else
				this.DrawGroup_fill.unmask()
		}
	}

	SetFillColor()
	{
		if (this.E_fill.checked)
			this.DrawGroup_fill.attr({"fill": this.E_fillcolor.getAttribute("data-color")});
		else
			this.DrawGroup_fill.attr({"fill": "none"});
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

		let cx = this.E_cx.valueAsNumber;
		let cy = this.E_cy.valueAsNumber;
		let as = this.E_anglestart.valueAsNumber;
		let ae = this.E_angleend.valueAsNumber;
		let radius = this.E_radius.valueAsNumber;
		let fill = this.E_fill.checked;
		let fill_color = this.E_fillcolor.getAttribute("data-color");
		let fill_pattern = this.E_fillpattern.selectedIndex;
		let stroke = this.E_strokewidth.valueAsNumber;
		let strokecolor = this.E_strokecolor.getAttribute("data-color");
		let dashstyle = this.E_strokestyle.value;

		let rx = (radius)/Math.abs(xe - xs) * this.ParentObject.size.grad.width;
		let ry = (radius)/Math.abs(ye - ys) * this.ParentObject.size.grad.height;

		cx = (cx - xs)/(xe - xs) * this.ParentObject.size.grad.width + this.ParentObject.size.grad.left_x + 5;
		cy = (1 - (cy - ys)/(ye - ys)) * this.ParentObject.size.grad.height + this.ParentObject.size.grad.top_y + 5;
		
		this.DrawGroup_stroke.attr({
			"fill": "none",
			"stroke": strokecolor,
			"stroke-width": stroke,
			"stroke-dasharray": dashstyle,
		});
		
		this.DrawGroup_fill.attr({
			"fill": fill ? fill_color : "none",
			"stroke": "none"
		});
		if (fill_pattern > 0)
			this.DrawGroup_fill.maskWith(this.ParentObject.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.DrawGroup_fill.unmask()


		this.DrawEllipseArc(this.DrawGroup_fill, {x: cx, y: cy}, as, ae, rx, ry, fill);
		this.DrawEllipseArc(this.DrawGroup_stroke, {x: cx, y: cy}, as, ae, rx, ry, fill);

	}

}