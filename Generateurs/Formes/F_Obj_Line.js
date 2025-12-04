class F_Obj_Line extends F_Obj
{
	E_tile;
	E_xstart;
	E_ystart;
	E_xend;
	E_yend;
	E_arrowstart;
	E_arrowstartsize;
	E_arrowend;
	E_arrowendsize;
	E_strokewidth;
	E_strokecolor;
	E_stroketype;

	DrawGroup_stroke;
	DrawGroup_fill;

	constructor(parent, parameters = {})
	{
		super(parent);

		if (!parameters.hasOwnProperty("xstart"))
		{
			if (parameters.hasOwnProperty("hor_start"))
				parameters["xstart"] = parent.Parameters["hor_start"] + 1;
			else
				parameters["xstart"] = 0;
		}
		if (!parameters.hasOwnProperty("ystart"))
		{
			if (parameters.hasOwnProperty("ver_start"))
				parameters["ystart"] = parent.Parameters["ver_start"] + 1;
			else
				parameters["ystart"] = 0;
		}
		if (!parameters.hasOwnProperty("xend"))
		{
			if (parameters.hasOwnProperty("hor_end"))
				parameters["xend"] = parent.Parameters["hor_end"] - 1;
			else
				parameters["xend"] = 1;
		}
		if (!parameters.hasOwnProperty("yend"))
		{
			if (parameters.hasOwnProperty("ver_end"))
				parameters["yend"] = parent.Parameters["ver_end"] - 1;
			else
				parameters["yend"] = 1;
		}
		if (!parameters.hasOwnProperty("arrowstart")) parameters["arrowstart"] = 0;
		if (!parameters.hasOwnProperty("arrowstartsize")) parameters["arrowstartsize"] = 100;
		if (!parameters.hasOwnProperty("arrowend")) parameters["arrowend"] = 0;
		if (!parameters.hasOwnProperty("arrowendsize")) parameters["arrowendsize"] = 100;
		if (!parameters.hasOwnProperty("strokewidth")) parameters["strokewidth"] = 2;
		if (!parameters.hasOwnProperty("strokecolor")) parameters["strokecolor"] = "black";
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
		this.E_tile.innerHTML = "Segment ( " + parameters["xstart"] + " ; " + parameters["ystart"] + " ) -> ( " + parameters["xend"] + " ; " + parameters["yend"] + " )";
		div_title.appendChild(this.E_tile)

		var div_icon_duplicate = document.createElement("div");
		div_icon_duplicate.classList.add("iconbutton")
		div_title.appendChild(div_icon_duplicate)

		var img_duplicate = document.createElement("img");
		img_duplicate.src = "/Images/Icons/Copy.svg"
		div_icon_duplicate.appendChild(img_duplicate)
		img_duplicate.onclick = () => { let newobj = new F_Obj_Line(this.ParentObject, 
			{
				xstart: this.E_xstart.valueAsNumber,
				ystart: this.E_ystart.valueAsNumber,
				xend: this.E_xend.valueAsNumber,
				yend: this.E_yend.valueAsNumber,
				arrowstart: this.E_arrowstart.getSelectedIndex(),
				arrowstartsize: this.E_arrowstartsize.valueAsNumber,
				arrowend: this.E_arrowend.getSelectedIndex(),
				arrowendsize: this.E_arrowendsize.valueAsNumber,
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
		img_delete.onclick = () => { 
			this.ParentObject.Object.delete(this); 
			this.ParentObject.Recreate(); 
			this.Parent.removeChild(this.Root); 
		}

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

		this.E_xstart = document.createElement("input");
		this.E_xstart.type = "number";
		this.E_xstart.value = parameters["xstart"];
		this.E_xstart.classList.add("input_coord");
		this.E_xstart.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]);
			this.E_tile.innerHTML = "Segment ( " + this.E_xstart.valueAsNumber + " ; " + 
															this.E_ystart.valueAsNumber + " ) -> ( " + this.E_xend.valueAsNumber + 
															" ; " + this.E_yend.valueAsNumber + " )";
		 }
		divcoord.appendChild(this.E_xstart);

		label = document.createElement("label")
		label.innerHTML = ";"
		divcoord.appendChild(label)

		this.E_ystart = document.createElement("input");
		this.E_ystart.type = "number";
		this.E_ystart.value = parameters["ystart"];
		this.E_ystart.classList.add("input_coord");
		this.E_ystart.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			this.E_tile.innerHTML = "Segment ( " + this.E_xstart.valueAsNumber + " ; " + 
															this.E_ystart.valueAsNumber + " ) -> ( " + this.E_xend.valueAsNumber + 
															" ; " + this.E_yend.valueAsNumber + " )";
		}
		divcoord.appendChild(this.E_ystart);

		label = document.createElement("label")
		label.innerHTML = ")"
		divcoord.appendChild(label)

		let div_style = document.createElement("div");
		div_style.classList.add("subsection")
		div_style.classList.add("section_icon")
		div.appendChild(div_style);

		let div_stylediv = document.createElement("div");
		div_stylediv.classList.add("tool-axe");
		div_style.appendChild(div_stylediv);

		img = document.createElement("img");
		img.src = "/Images/Icons/Apparence.svg"
		div_stylediv.appendChild(img);

		let div_select = document.createElement("div");
		div_select.id = "seg_ss" + (Math.random() + 1).toString(36).substring(10);
		div_stylediv.appendChild(div_select)
		this.E_arrowstart = new IconSelect(div_select.id, 
				{
					'selectedIconWidth':50,
					'selectedIconHeight':20,
					'selectedBoxPadding':0,
					'iconsWidth':50,
					'iconsHeight':20,
					'boxIconSpace':1,
					'vectoralIconNumber':1,
					'horizontalIconNumber':1,
					'selectionChanged': () => {
						this.Recreate(this.ParentObject.svg_group["Objects"]);
					}
				});

		var icons = [];
		icons.push({'iconFilePath':'Images/SegmentBase.svg', 'iconValue':'1'});
		icons.push({'iconFilePath':'Images/SegmentStart-01.svg', 'iconValue':'2'});
		icons.push({'iconFilePath':'Images/SegmentStart-02.svg', 'iconValue':'3'});
		icons.push({'iconFilePath':'Images/SegmentStart-03.svg', 'iconValue':'4'});
		icons.push({'iconFilePath':'Images/SegmentStart-04.svg', 'iconValue':'5'});
		icons.push({'iconFilePath':'Images/SegmentStart-05.svg', 'iconValue':'6'});

		this.E_arrowstart.refresh(icons);
		this.E_arrowstart.setSelectedIndex(parameters["arrowstart"]);


		img = document.createElement("img");
		img.src = "/Images/Icons/Pourcent.svg"
		div_stylediv.appendChild(img);

		this.E_arrowstartsize = document.createElement("input")
		this.E_arrowstartsize.type = "number";
		this.E_arrowstartsize.min = 0;
		this.E_arrowstartsize.value = parameters["arrowstartsize"];
		this.E_arrowstartsize.step = 5;
		this.E_arrowstartsize.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		div_stylediv.appendChild(this.E_arrowstartsize)

		label = document.createElement("label")
		label.innerHTML = "%"
		div_stylediv.appendChild(label)

		var hr1 = document.createElement("hr");
		div.appendChild(hr1);

		divcoord = document.createElement("div");
		divcoord.classList.add("tool-axe")
		div.appendChild(divcoord);

		img = document.createElement("img");
		img.src = "/Images/Icons/Coordonate.svg"
		divcoord.appendChild(img);

		label = document.createElement("label")
		label.innerHTML = "("
		divcoord.appendChild(label)

		this.E_xend = document.createElement("input");
		this.E_xend.type = "number";
		this.E_xend.value = parameters["xend"];
		this.E_xend.classList.add("input_coord");
		this.E_xend.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]);
			this.E_tile.innerHTML = "Segment ( " + this.E_xstart.valueAsNumber + " ; " + 
															this.E_ystart.valueAsNumber + " ) -> ( " + this.E_xend.valueAsNumber + 
															" ; " + this.E_yend.valueAsNumber + " )";
		 }
		divcoord.appendChild(this.E_xend);

		label = document.createElement("label")
		label.innerHTML = ";"
		divcoord.appendChild(label)

		this.E_yend = document.createElement("input");
		this.E_yend.type = "number";
		this.E_yend.value = parameters["yend"];
		this.E_yend.classList.add("input_coord");
		this.E_yend.oninput = (e) => { 
			this.Recreate(this.ParentObject.svg_group["Objects"]); 
			this.E_tile.innerHTML = "Segment ( " + this.E_xstart.valueAsNumber + " ; " + 
															this.E_ystart.valueAsNumber + " ) -> ( " + this.E_xend.valueAsNumber + 
															" ; " + this.E_yend.valueAsNumber + " )";
		}
		divcoord.appendChild(this.E_yend);

		label = document.createElement("label")
		label.innerHTML = ")"
		divcoord.appendChild(label)

		div_style = document.createElement("div");
		div_style.classList.add("subsection")
		div_style.classList.add("section_icon")
		div.appendChild(div_style);

		div_stylediv = document.createElement("div");
		div_stylediv.classList.add("tool-axe");
		div_style.appendChild(div_stylediv);

		img = document.createElement("img");
		img.src = "/Images/Icons/Apparence.svg"
		div_stylediv.appendChild(img);

		div_select = document.createElement("div");
		div_select.id = "seg_se" + (Math.random() + 1).toString(36).substring(10);
		div_stylediv.appendChild(div_select)
		this.E_arrowend = new IconSelect(div_select.id, 
				{
					'selectedIconWidth':50,
					'selectedIconHeight':20,
					'selectedBoxPadding':0,
					'iconsWidth':50,
					'iconsHeight':20,
					'boxIconSpace':1,
					'vectoralIconNumber':1,
					'horizontalIconNumber':1,
					'selectionChanged': () => {
						this.Recreate(this.ParentObject.svg_group["Objects"]);
					}
				});

		var icons = [];
		icons.push({'iconFilePath':'Images/SegmentBase.svg', 'iconValue':'1'});
		icons.push({'iconFilePath':'Images/SegmentEnd-01.svg', 'iconValue':'2'});
		icons.push({'iconFilePath':'Images/SegmentEnd-02.svg', 'iconValue':'3'});
		icons.push({'iconFilePath':'Images/SegmentEnd-03.svg', 'iconValue':'4'});
		icons.push({'iconFilePath':'Images/SegmentEnd-04.svg', 'iconValue':'5'});
		icons.push({'iconFilePath':'Images/SegmentEnd-05.svg', 'iconValue':'6'});

		this.E_arrowend.refresh(icons);
		this.E_arrowend.setSelectedIndex(parameters["arrowend"]);

		img = document.createElement("img");
		img.src = "/Images/Icons/Pourcent.svg"
		div_stylediv.appendChild(img);

		this.E_arrowendsize = document.createElement("input")
		this.E_arrowendsize.type = "number";
		this.E_arrowendsize.min = 0;
		this.E_arrowendsize.value = parameters["arrowendsize"];
		this.E_arrowendsize.step = 5;
		this.E_arrowendsize.oninput = () => { this.Recreate(this.ParentObject.svg_group["Objects"]); }
		div_stylediv.appendChild(this.E_arrowendsize)

		label = document.createElement("label")
		label.innerHTML = "%"
		div_stylediv.appendChild(label)

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


		let xstart = this.E_xstart.valueAsNumber;
		let ystart = this.E_ystart.valueAsNumber;
		let xend = this.E_xend.valueAsNumber;
		let yend = this.E_yend.valueAsNumber;
		let arrowstart = this.E_arrowstart.getSelectedIndex();
		let arrowstartsize = this.E_arrowstartsize.valueAsNumber;
		let arrowend = this.E_arrowend.getSelectedIndex();
		let arrowendsize = this.E_arrowendsize.valueAsNumber;
		let strokewidth = this.E_strokewidth.valueAsNumber;
		let strokecolor = this.E_strokecolor.getAttribute("data-color");
		let stroketype = this.E_stroketype.value;

		this.DrawGroup_stroke.attr({
			"fill": "none",
			"stroke": strokecolor,
			"stroke-width": strokewidth,
			"stroke-dasharray": stroketype,
		});
		
		this.DrawGroup_fill.attr({
			"fill": strokecolor,
			"stroke": "none"
		});
		
		xstart = (xstart - xs)/(xe - xs) * size.grad.width + size.grad.left_x + 5;
		xend = (xend - xs)/(xe - xs) * size.grad.width + size.grad.left_x + 5;
		ystart = (1 - (ystart - ys)/(ye - ys)) * size.grad.height + size.grad.top_y + 5;
		yend = (1 - (yend - ys)/(ye - ys)) * size.grad.height + size.grad.top_y + 5;

		if (arrowstart >= 1)
		{
			let point = this.Fleche(arrowstart, xstart, ystart, xend, yend, arrowstartsize)
			xstart += point[0];
			ystart += point[1];
		}
		if (arrowend >= 1)
		{
			let point = this.Fleche(arrowend, xend, yend, xstart, ystart, arrowendsize)
			xend += point[0];
			yend += point[1];
		}

		this.DrawGroup_stroke.line( 
					xstart,
					ystart,
					xend,
					yend
				);
	}

	Fleche(type = 1, sx, sy, ex, ey, size)
	{
		let dx = ex - sx;
		let dy = ey - sy;
		let vect_l =  Math.sqrt(dx * dx + dy * dy);
		let vx = dx / vect_l
		let vy = dy / vect_l
		let nx = -vy;
		let ny = vx;
		let coef = size / 10.0;
		let points = [];
		switch (type) {
			case 1:
				points.push([sx + (vx + nx * 0.5) * coef, sy + (vy + ny * 0.5) * coef]);
				points.push([sx, sy]);
				points.push([sx + (vx - nx * 0.5) * coef, sy + (vy - ny * 0.5) * coef]);
				this.DrawGroup_stroke.polyline(points);
				return [0,0];
			case 2:
				points.push([sx + (vx + nx * 0.5) * coef, sy + (vy + ny * 0.5) * coef]);
				points.push([sx, sy]);
				points.push([sx + (vx - nx * 0.5) * coef, sy + (vy - ny * 0.5) * coef]);
				this.DrawGroup_fill.polygon(points);
				return [vx * coef,vy * coef];
			case 3:
				points.push([sx + (vx + nx * 0.5) * coef, sy + (vy + ny * 0.5) * coef]);
				points.push([sx, sy]);
				points.push([sx + (vx - nx * 0.5) * coef, sy + (vy - ny * 0.5) * coef]);
				points.push([sx + (vx * 0.7) * coef, sy + (vy * 0.7) * coef]);
				this.DrawGroup_fill.polygon(points);
				return [vx * 0.7 * coef,vy * 0.7 * coef];
			case 4:
				points.push([sx + nx * coef, sy + ny * coef]);
				points.push([sx - nx * coef, sy - ny * coef]);
				this.DrawGroup_stroke.line(
					sx + nx * coef, 
					sy + ny * coef,
					sx - nx * coef,
					sy - ny * coef
				);
				return [0,0];
			case 5:
				let len = Math.sqrt(nx * nx + ny * ny)
				this.DrawGroup_stroke.circle(len * coef).center(sx, sy);
				return [vx * len * coef * 0.5,vy * len * coef * 0.5];
			default:
				break;
		}
	}

}