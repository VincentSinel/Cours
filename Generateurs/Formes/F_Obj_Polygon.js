class F_Obj_Polygon extends F_Obj
{
	E_tile;
	E_pointlist;
	E_points = new Set();
	E_strokewidth;
	E_strokecolor;
	E_stroketype;
	E_fill;
	E_filloptions;
	E_fillcolor;
	E_fillpattern;

	DrawGroup_stroke;
	DrawGroup_fill;

	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("points")) parameters["points"] = [[0,0], [2,1] , [1,2]]
		if (!parameters.hasOwnProperty("strokewidth")) parameters["strokewidth"] = 2
		if (!parameters.hasOwnProperty("strokecolor")) parameters["strokecolor"] = "red"
		if (!parameters.hasOwnProperty("stroketype")) parameters["stroketype"] = ""
		if (!parameters.hasOwnProperty("fill")) parameters["fill"] = false;
		if (!parameters.hasOwnProperty("fillcolor")) parameters["fillcolor"] = "black";
		if (!parameters.hasOwnProperty("fillpattern")) parameters["fillpattern"] = 0;

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
		this.E_tile.innerHTML = "Polygone";
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { 
			let points = []
			this.E_points.forEach(point => {
				points.push([
					point.x.valueAsNumber,
					point.y.valueAsNumber
				])
			});
			let newobj = new F_Obj_Polygon(this.ParentObject, 
			{
				points: points,
				strokewidth: this.E_strokewidth.valueAsNumber,
				strokecolor: this.E_strokecolor.getAttribute("data-color"),
				stroketype: this.E_stroketype.value,
				fill: this.E_fill.checked,
				fillcolor: this.E_fillcolor.getAttribute("data-color"),
				fillpattern: this.E_fillpattern.selectedIndex
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

		var label = document.createElement("label")
		label.innerHTML = "Points :"
		divcoord.appendChild(label)

		this.E_pointlist = document.createElement("div");
		this.E_pointlist.classList.add("coord_poly")
		div.appendChild(this.E_pointlist);

		for (let i = 0; i < parameters["points"].length; i++) {
			const p = parameters["points"][i];
			this.CreatePointElement(p[0], p[1]);
		}

		var div_addbutton1 = document.createElement("div");
		div_addbutton1.classList.add("center");
		div.appendChild(div_addbutton1);

		var div_addbutton2 = document.createElement("div");
		div_addbutton2.classList.add("iconbutton");
		div_addbutton1.appendChild(div_addbutton2);
		div_addbutton2.onclick = () => {
			this.CreatePointElement(0,0);
		}

		var img = document.createElement("img");
		img.src = "/Images/Icons/Add.svg"
		div_addbutton2.appendChild(img);

		var hr = document.createElement("hr");
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

	CreatePointElement(x,y)
	{
		var resume = {
			root: document.createElement("div"),
			title: document.createElement("label"),
			x: document.createElement("input"),
			y: document.createElement("input"),
		}
		this.E_pointlist.appendChild(resume.root);
		this.E_points.add(resume);

		resume.title.classList.add("first_child")
		resume.root.appendChild(resume.title)

		let label = document.createElement("label");
		label.innerHTML = "("
		resume.root.appendChild(label)

		resume.x.classList.add("input_coord_poly")
		resume.x.type = "number";
		resume.x.value = x;
		resume.x.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		resume.root.appendChild(resume.x)
		
		label = document.createElement("label");
		label.innerHTML = ";"
		resume.root.appendChild(label)
		
		resume.y.classList.add("input_coord_poly")
		resume.y.type = "number";
		resume.y.value = y;
		resume.y.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		resume.root.appendChild(resume.y)

		label = document.createElement("label");
		label.innerHTML = ")"
		resume.root.appendChild(label)

		let deletebutton = document.createElement("button");
		deletebutton.classList.add("coord_poly_delete")
		deletebutton.innerHTML = "❌"
		deletebutton.onclick = () => {
			this.E_points.delete(resume);
			this.E_pointlist.removeChild(resume.root);
			this.ResetPointsName();
			this.Recreate(this.ParentObject.svg_group["Objects"]);
		}
		resume.root.appendChild(deletebutton)

		this.ResetPointsName()
	}

	ResetPointsName()
	{
		let i = 1;
		this.E_points.forEach(point => {
			point.title.innerHTML = "Point " + i.toString() + " :";
			i++
		});
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

		let points = [];
		this.E_points.forEach(point => {
			points.push([
				(point.x.valueAsNumber - xs)/(xe - xs) * size.grad.width + size.grad.left_x + 5,
				(1 - (point.y.valueAsNumber - ys)/(ye - ys)) * size.grad.height + size.grad.top_y + 5
			])
		});
		
		let fill = this.E_fill.checked;
		let fill_color = this.E_fillcolor.getAttribute("data-color");
		let fill_pattern = this.E_fillpattern.selectedIndex;
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
			"fill": fill ? fill_color : "none",
			"stroke": "none",
		});
		if (fill_pattern > 0)
			this.DrawGroup_fill.maskWith(this.ParentObject.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.DrawGroup_fill.unmask()

		this.DrawGroup_stroke.polygon(points);
		this.DrawGroup_fill.polygon(points);
		
	}

}