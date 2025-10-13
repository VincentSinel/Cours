class F_Obj_Text extends F_Obj
{
	E_tile;
	E_function;
	E_xstart;
	E_xend;
	E_strokewidth;
	E_strokecolor;
	E_strokestyle;

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("function")) parameters["function"] = "Math.sin(x)";
		if (!parameters.hasOwnProperty("xstart")) parameters["xstart"] = parent.Parameters["hor_start"] - 1;
		if (!parameters.hasOwnProperty("xend")) parameters["xend"] = parent.Parameters["hor_end"] + 1;
		if (!parameters.hasOwnProperty("strokewidth")) parameters["strokewidth"] = 2;
		if (!parameters.hasOwnProperty("strokecolor")) parameters["strokecolor"] = "red";
		if (!parameters.hasOwnProperty("stroketype")) parameters["stroketype"] = "";

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
		this.E_tile.innerHTML = "Courbe " + parameters["function"];
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { let newobj = new F_Obj_Courbe(this.ParentObject, 
			{
				function: this.E_function.value,
				xstart: this.E_xstart.valueAsNumber,
				xend: this.E_xend.valueAsNumber,
				strokewidth: this.E_strokewidth.valueAsNumber,
				strokecolor: this.E_strokecolor.getAttribute("data-color"),
				stroketype: this.E_strokestyle.value
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

		var label = document.createElement("label")
		label.innerHTML = "Formule (en JavaScript) :"
		div.appendChild(label)

		this.E_function = document.createElement("input");
		this.E_function.type = "text";
		this.E_function.value = parameters["function"];
		this.E_function.onchange = (e) => { this.Recreate(this.ParentObject.svg_group["Objects"]); this.E_tile.innerHTML = "Courbe " + e.target.value; }
		div.appendChild(this.E_function);

		var hr = document.createElement("hr");
		div.appendChild(hr);

		var div2 = document.createElement("div");
		div2.classList.add("flexparameters")
		div.appendChild(div2)

		var label2 = document.createElement("label")
		label2.innerHTML = "$x \\in $ ["
		div2.appendChild(label2);

		MathJax.typesetPromise();

		this.E_xstart = document.createElement("input");
		this.E_xstart.classList.add("input_coord")
		this.E_xstart.type = "number";
		this.E_xstart.step = 1
		this.E_xstart.value = parameters["xstart"];
		this.E_xstart.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		div2.appendChild(this.E_xstart);

		var label3 = document.createElement("label")
		label3.innerHTML = ";"
		div2.appendChild(label3);

		this.E_xend = document.createElement("input");
		this.E_xend.classList.add("input_coord")
		this.E_xend.type = "number";
		this.E_xend.step = 1
		this.E_xend.value = parameters["xend"];
		this.E_xend.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		div2.appendChild(this.E_xend);

		var label4 = document.createElement("label")
		label4.innerHTML = "]"
		div2.appendChild(label4);

		var hr2 = document.createElement("hr");
		div.appendChild(hr2);

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
		this.E_strokewidth.oninput = (e) => { this.DrawGroup.attr({"stroke-width": e.target.valueAsNumber}); }
		div3.appendChild(this.E_strokewidth);

		var img2 = document.createElement("img");
		img2.src = "/Images/Icons/Stroke.svg"
		div3.appendChild(img2);

		this.E_strokecolor = document.createElement("button");
		this.E_strokecolor.setAttribute("data-color", parameters["strokecolor"]);
		this.E_strokecolor.style.setProperty("--cp-size", "24px");
		div3.appendChild(this.E_strokecolor);
		var color_picker = new ColorPicker(this.E_strokecolor, base_options_colorpicker)
		color_picker.on('pick', (color) => { this.DrawGroup.attr({"stroke": color}); } );

		var img3 = document.createElement("img");
		img3.src = "/Images/Icons/Line Style.svg"
		div3.appendChild(img3);

		this.E_strokestyle = document.createElement("input");
		this.E_strokestyle.type = "text";
		this.E_strokestyle.value = parameters["stroketype"];
		this.E_strokestyle.oninput = (e) => { this.DrawGroup.attr({"stroke-dasharray": e.target.value}); }
		div3.appendChild(this.E_strokestyle);
	}

	Recreate(Object_Group)
	{
		this.DrawGroup.remove();
		this.DrawGroup = Object_Group.group();

		let xs = this.ParentObject.Parameters["hor_start"];
		let xe = this.ParentObject.Parameters["hor_end"];
		let ys = this.ParentObject.Parameters["ver_start"];
		let ye = this.ParentObject.Parameters["ver_end"];

		let size = this.ParentObject.size;

		let formule = this.E_function.value;
		let stroke = this.E_strokewidth.valueAsNumber;
		let strokecolor = this.E_strokecolor.getAttribute("data-color");
		let dashstyle = this.E_strokestyle.value;

		console.log(this.DrawGroup)
		this.DrawGroup.attr(
			{
				"stroke-width": stroke,
				"stroke": strokecolor,
				"stroke-dasharray": dashstyle,
				"fill": "none"
			}
		)

		let start = this.E_xstart.valueAsNumber;
		let end = this.E_xend.valueAsNumber;
		
		if (formule == "" || formule == " ") return;
		let dx = (xe - xs) / size.grad.width;
		let points = [[]];
		let index = 0
		let inside = false
		x = Math.max(start, xs)
		let y;
		// Essaie de formule
		try {
			y = Function('"use strict";return (' + formule + ')')()
		} catch (error) {
			alert("La formule entrée n'est pas correct : " + error)
			return;
		}

		if (y > ys && y < ye)
		{
				points[index].push([
						size.grad.left_x + (x - xs)/(xe - xs) * size.grad.width,
						size.grad.bottom_y - (y - ys)/(ye - ys) * size.grad.height]);
				inside = true;
		}
		
		for(let px = 0; px < size.base.width; px++)
		{
				x = xs + dx * (px - size.grad.left_x);
				if (x > start && x < end)
				{
						y = Function('"use strict";return (' + formule + ')')();
						if (y > ys && y < ye)
						{
								points[index].push([
										size.grad.left_x + (x - xs)/(xe - xs) * size.grad.width,
										size.grad.bottom_y - (y - ys)/(ye - ys) * size.grad.height]);
								inside = true;
						}
						else if (inside)
						{
								y = Math.max(ys, Math.min(ye, y))
								points[index].push([
										size.grad.left_x + (x - xs)/(xe - xs) * size.grad.width,
										size.grad.bottom_y - (y - ys)/(ye - ys) * size.grad.height]);
								points.push([])
								index += 1;
								inside = false;
						}
				}
		}
		x = Math.min(end, xe)
		y = Function('"use strict";return (' + formule + ')')()
		if (y > ys && y < ye)
		{
				points[index].push([
						size.grad.left_x + (x - xs)/(xe - xs) * size.grad.width,
						size.grad.bottom_y - (y - ys)/(ye - ys) * size.grad.height]);
		}
		points.forEach(poly => {
				if (poly.length > 1)
				{
						this.DrawGroup.polyline(poly);
				}

		})
		this.DrawGroup.dmove(this.ParentObject.EM.Margin, this.ParentObject.EM.Margin)
	}

}