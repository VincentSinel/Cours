class F_Obj_Sector extends F_Obj
{
	E_tile;
	E_weight;
	E_txt_type;
	E_txt_size;
	E_txt_color;
	E_txt_dist;
	E_fill;
	E_filloptions;
	E_fillcolor;
	E_fillpattern;

	Index = 0;

	DrawGroup_stroke;
	DrawGroup_fill;
	DrawGroup_text;

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("weight")) parameters["weight"] = 1;
		if (!parameters.hasOwnProperty("txt_type")) parameters["txt_type"] = 0;
		if (!parameters.hasOwnProperty("txt_size")) parameters["txt_size"] = this.ParentObject.Parameters["frac_txt_size"]
		if (!parameters.hasOwnProperty("txt_color")) parameters["txt_color"] = "black";
		if (!parameters.hasOwnProperty("txt_dist")) parameters["txt_dist"] = 70;
		if (!parameters.hasOwnProperty("fill")) parameters["fill"] = false;
		if (!parameters.hasOwnProperty("fill_type")) parameters["fill_type"] = 0;
		if (!parameters.hasOwnProperty("fill_color")) parameters["fill_color"] = "black";

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
		this.E_tile.innerHTML = "Secteur 0";
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { let newobj = new F_Obj_Sector(this.ParentObject, 
			{
				weight: this.E_weight.valueAsNumber,
				txt_type: this.E_txt_type.selectedIndex,
				txt_size: this.E_txt_size.valueAsNumber,
				txt_color: this.E_txt_color.getAttribute("data-color"),
				txt_dist: this.E_txt_dist.valueAsNumber,
				fill: this.E_fill.checked,
				fill_type: this.E_fillpattern.selectedIndex,
				fill_color: this.E_fillcolor.getAttribute("data-color"),
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

		var div_weight = document.createElement("div");
		div_weight.classList.add("tool-axe");
		div.appendChild(div_weight);

		var img = document.createElement("img");
		img.src = "/Images/Icons/Weight.svg"
		div_weight.appendChild(img);

		this.E_weight = document.createElement("input");
		this.E_weight.type = "number";
		this.E_weight.min = 0
		this.E_weight.value = parameters["weight"];
		this.E_weight.onchange = (e) => { this.ParentObject.Recreate(); }
		div_weight.appendChild(this.E_weight);

		var hr = document.createElement("hr");
		div.appendChild(hr);

		var div_text = document.createElement("div");
		div_text.classList.add("tool-axe")
		div.appendChild(div_text)

		img = document.createElement("img");
		img.src = "/Images/Icons/Text.svg"
		div_text.appendChild(img);

		this.E_txt_type = document.createElement("select");
		this.E_txt_type.onchange = () => { this.Recreate(this.ParentObject.svg_group["Objects"], this.Index); }
		div_text.appendChild(this.E_txt_type);

		var option = document.createElement("option"); option.value = 0; option.innerHTML = "Hérité"; this.E_txt_type.appendChild(option);
		option = document.createElement("option"); option.value = 1; option.innerHTML = "Aucun"; this.E_txt_type.appendChild(option);
		option = document.createElement("option"); option.value = 2; option.innerHTML = "Pourcentage"; this.E_txt_type.appendChild(option);
		option = document.createElement("option"); option.value = 3; option.innerHTML = "Fraction"; this.E_txt_type.appendChild(option);
		option = document.createElement("option"); option.value = 4; option.innerHTML = "Décimal"; this.E_txt_type.appendChild(option);

		this.E_txt_type.selectedIndex = parameters["txt_type"];

		var div_text_param = document.createElement("div");
		div_text_param.classList.add("subsection")
		div.appendChild(div_text_param)

		var div_text_param2 = document.createElement("div");
		div_text_param2.classList.add("tool-axe")
		div_text_param.appendChild(div_text_param2)

		img = document.createElement("img");
		img.src = "/Images/Icons/Font Size.svg"
		div_text_param2.appendChild(img);

		this.E_txt_size = document.createElement("input");
		this.E_txt_size.type = "number";
		this.E_txt_size.step = 2
		this.E_txt_size.min = 0
		this.E_txt_size.value = parameters["txt_size"];
		this.E_txt_size.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"], this.Index); }
		div_text_param2.appendChild(this.E_txt_size);

		img = document.createElement("img");
		img.src = "/Images/Icons/Fill.svg"
		div_text_param2.appendChild(img);

		this.E_txt_color = document.createElement("button");
		this.E_txt_color.setAttribute("data-color", parameters["txt_color"]);
		this.E_txt_color.style.setProperty("--cp-size", "24px");
		div_text_param2.appendChild(this.E_txt_color);
		var color_picker = new ColorPicker(this.E_txt_color, base_options_colorpicker)
		color_picker.on('pick', (color) => { this.DrawGroup_text.attr({"fill": color}); } );

		img = document.createElement("img");
		img.src = "/Images/Icons/Pourcent.svg"
		div_text_param2.appendChild(img);

		this.E_txt_dist = document.createElement("input");
		this.E_txt_dist.type = "number";
		this.E_txt_dist.step = 5
		this.E_txt_dist.min = 0
		this.E_txt_dist.value = parameters["txt_dist"];
		this.E_txt_dist.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"], this.Index); }
		div_text_param2.appendChild(this.E_txt_dist);

		var label = document.createElement("label")
		label.innerHTML = "%"
		div_text_param2.appendChild(label);

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

	SetTitle(index)
	{
		this.E_tile.innerHTML = "Secteur " + index.toString();
	}
	

	SetFillColor()
	{
		if (this.E_fill.checked)
			this.DrawGroup_fill.attr({"fill": this.E_fillcolor.getAttribute("data-color")});
		else
			this.DrawGroup_fill.attr({"fill": "none"});
	}

	Recreate(Object_Group, index)
	{
		this.Index = index;
		this.DrawGroup.remove();
		this.DrawGroup = Object_Group.group();
		this.DrawGroup_fill = this.DrawGroup.group();
		this.DrawGroup_stroke = this.DrawGroup.group();
		this.DrawGroup_text= this.DrawGroup.group();

		let size = this.ParentObject.size;

		let weight = this.E_weight.valueAsNumber;
		let total_weight = this.ParentObject.GetTotalWeight();
		let base_weight = this.ParentObject.GetWeightTo(index);
		
		let txt_type = this.E_txt_type.selectedIndex;
		let txt_size = this.E_txt_size.valueAsNumber;
		let txt_color = this.E_txt_color.getAttribute("data-color");
		let txt_dist = this.E_txt_dist.valueAsNumber;
		let fill = this.E_fill.checked;
		let fill_color = this.E_fillcolor.getAttribute("data-color");
		let fill_pattern = this.E_fillpattern.selectedIndex;

		if (txt_type == 0) // hérité
		{
			if (!this.ParentObject.Parameters["frac_txt"])
				txt_type = 1;
			else 
				txt_type = this.ParentObject.Parameters["frac_txt_type"] + 2;
		}
		this.DrawGroup_text.attr(
			{
				"fill": txt_color,
				"stroke": "none",
				"font-size": txt_size,
				"font-family": "Bahnschrift",
				"text-anchor": "middle",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)
		if (txt_type == 1)
		{
			this.DrawGroup_text.attr({"fill": "none"});
		}

		this.DrawGroup_stroke.attr(
			{
				fill: "none",
				stroke: this.ParentObject.Parameters["frac_color"],
				"stroke-width": this.ParentObject.Parameters["frac_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.ParentObject.Parameters["frac_style"],
			}
		)
		this.DrawGroup_fill.attr({
			"fill": fill ? fill_color : "none",
			"stroke": "none",
		});
		if (fill_pattern > 0)
			this.DrawGroup_fill.maskWith(this.ParentObject.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.DrawGroup_fill.unmask()

		let as = base_weight / total_weight * 360.0
		let ae = (base_weight + weight) / total_weight * 360.0

		this.DrawEllipseArc(this.DrawGroup_fill, {x: size.base.width / 2, y: size.base.height / 2}, as, ae, size.grad.width / 2, size.grad.height / 2, true);
		this.DrawEllipseArc(this.DrawGroup_stroke, {x: size.base.width / 2, y: size.base.height / 2}, as, ae, size.grad.width / 2, size.grad.height / 2, true);

		let px = size.base.width / 2  + txt_dist / 100.0 * size.base.width / 2 * Math.cos((as + ae) / 2 * Math.PI / 180.0);
		let py = size.base.height / 2  + txt_dist / 100.0 * size.base.width / 2 * Math.sin((as + ae) / 2 * Math.PI / 180.0);

		if (this.ParentObject.Object.size == 1)
		{
			px = size.base.width / 2;
			py = size.base.height / 2;
		}

		if (txt_type == 2) // pourcentage
		{
			let value = Math.round(weight / total_weight * 1000.0) / 10.0
			let text = value.toString() + "%"
			this.DrawText(this.DrawGroup_text, text, px, py)
		}
		else if (txt_type == 3) // fraction
		{
			let gcd_ = this.GCD(weight, total_weight);
			let value1 = weight / gcd_;
			let value2 = total_weight / gcd_;

			this.DrawText(this.DrawGroup_text, value1, px, py - txt_size * 0.7, txt_size)
			this.DrawText(this.DrawGroup_text, value2, px, py + txt_size * 0.7, txt_size)
			this.DrawGroup_stroke.line(px - txt_size / 2.0, py, px + txt_size / 2.0, py).attr({"stroke-width": Math.max(2, txt_size / 10)});
		}
		else if (txt_type == 4) // décimal
		{
			let value = Math.round((weight / total_weight) * 100.0) / 100.0
			let text = value.toString()
			this.DrawText(this.DrawGroup_text, text, px, py)
		}

		this.DrawGroup.dmove(this.ParentObject.EM.Margin, this.ParentObject.EM.Margin)
	}

	GCD(a,b) {
		a = Math.abs(a);
		b = Math.abs(b);
		if (b > a) {var temp = a; a = b; b = temp;}
		while (true) {
				if (b == 0) return a;
				a %= b;
				if (a == 0) return b;
				b %= a;
	}
}

}