class F_Quadrillage extends F_Base
{
	constructor(em)
	{
		if (em == undefined)
			return;
		super(em);
		
		this.GetData();
		this.SetEvents();
	}


	GetData()
	{
		this.Parameters["quad_gen_margin"] = document.getElementById("quad_gen_margin").valueAsNumber;
		this.Parameters["c_hor_nbr"] = document.getElementById("c_hor_nbr").valueAsNumber;
		this.Parameters["c_ver_nbr"] = document.getElementById("c_ver_nbr").valueAsNumber;
		this.Parameters["c_size_x"] = document.getElementById("c_size_x").valueAsNumber;
		this.Parameters["c_size_y"] = document.getElementById("c_size_y").valueAsNumber;
		this.Parameters["c_line_color"] = document.getElementById("c_line_color").getAttribute("data-color");
		this.Parameters["c_line_style"] = document.getElementById("c_line_style").value;
		this.Parameters["c_line_stroke"] = document.getElementById("c_line_stroke").valueAsNumber;
		this.Parameters["c_int"] = document.getElementById("c_int").checked;
		this.Parameters["c_points"] = document.getElementById("c_points").checked;
		this.Parameters["c_int_hor_nbr"] = document.getElementById("c_int_hor_nbr").valueAsNumber;
		this.Parameters["c_int_ver_nbr"] = document.getElementById("c_int_ver_nbr").valueAsNumber;
		this.Parameters["c_int_line_color"] = document.getElementById("c_int_line_color").getAttribute("data-color");
		this.Parameters["c_int_line_style"] = document.getElementById("c_int_line_style").value;
		this.Parameters["c_int_line_stroke"] = document.getElementById("c_int_line_stroke").valueAsNumber;
		this.Parameters["objects"] = [];
	}

	SetEvents()
	{
		document.getElementById("quad_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("c_hor_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("c_ver_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("c_size_x").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("c_size_y").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("c_int").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("c_points").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("c_int_hor_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("c_int_ver_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		
		document.getElementById("c_line_stroke").addEventListener("input", (e) => {
			this.Parameters["c_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Prim_Grid"].attr({"stroke-width": e.target.valueAsNumber})
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("c_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["c_line_color"] = color;
			this.svg_group["Prim_Grid"].attr({"stroke": color})
		})
		document.getElementById("c_line_style").addEventListener("input", (e) => {
			this.Parameters["c_line_style"] = e.target.value;
			this.svg_group["Prim_Grid"].attr({"stroke-dasharray": e.target.value})
		})

		document.getElementById("c_int_line_stroke").addEventListener("input", (e) => {
			this.Parameters["c_int_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Seco_Grid"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("c_int_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["c_int_line_color"] = color;
			this.svg_group["Seco_Grid"].attr({"stroke": color})
		})
		document.getElementById("c_int_line_style").addEventListener("input", (e) => {
			this.Parameters["c_int_line_style"] = e.target.value;
			this.svg_group["Seco_Grid"].attr({"stroke-dasharray": e.target.value})
		})
	}

	ox; oy;
	w; h; pdx; sdx; pdy; sdy; hy; hx; vx; vy;

	Recreate()
	{
		let w = this.Parameters["c_size_x"] * this.Parameters["c_hor_nbr"] + 10
		let h = this.Parameters["c_size_y"] * this.Parameters["c_ver_nbr"] + 10
		this.EM.SetSize(w, h);
		this.EM.SetMargin(this.Parameters["quad_gen_margin"]);
		this.EM.Clear()

		var Seco_Grid = this.EM.SVG_Draw.group();
		var Prim_Grid = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Prim_Grid"] = Prim_Grid;
		this.svg_group["Seco_Grid"] = Seco_Grid;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Prim_Grid"].clear()
		this.svg_group["Seco_Grid"].clear()
		this.svg_group["Objects"].clear()
		

		this.size = {
			grad: {
				width: w - 10,
				height: h - 10, 
				left_x: 5,
				top_y: 5,
				right_x: w- 5,
				bottom_y: h - 5
			},
			base: {
				width: w, 
				height: h, 
				left_x: 0,
				top_y: 0,
				right_x: w,
				bottom_y: h
			},
			reel: {
				x_start: 0,
				x_end: this.Parameters["c_hor_nbr"],
				y_start: this.Parameters["c_ver_nbr"],
				y_end: 0,
			}
		}


		this.svg_group["Prim_Grid"].attr(
			{
				stroke: this.Parameters["c_line_color"],
				"stroke-width": this.Parameters["c_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["c_line_style"],
			}
		)
		this.svg_group["Seco_Grid"].attr(
			{
				stroke: this.Parameters["c_int_line_color"],
				"stroke-width": this.Parameters["c_int_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["c_int_line_style"],
			}
		)

		this.Grille();
		super.DrawObjects(this.svg_group["Objects"], this.Parameters["objects"]);

		Prim_Grid.dmove(this.EM.Margin, this.EM.Margin);
		Seco_Grid.dmove(this.EM.Margin, this.EM.Margin);
	}

	Grille()
	{
		if(this.Parameters["c_int"])
		{
			var x_s = this.Parameters["c_size_x"] * 1.0 / this.Parameters["c_int_hor_nbr"];
			var y_s = this.Parameters["c_size_y"] * 1.0 / this.Parameters["c_int_ver_nbr"];
			
			for (let i = 0; i <= this.Parameters["c_hor_nbr"] * this.Parameters["c_int_hor_nbr"]; i++) 
			{
				if (!this.Parameters["c_points"] && i % this.Parameters["c_int_hor_nbr"] == 0) continue;
				this.svg_group["Seco_Grid"].line( 
					5 + i * x_s, 5, 
					5 + i * x_s, this.EM.Size.h - 5);
			}
			for (let i = 0; i <= this.Parameters["c_ver_nbr"] * this.Parameters["c_int_ver_nbr"]; i++) 
			{
				if (!this.Parameters["c_points"] && i % this.Parameters["c_int_ver_nbr"] == 0) continue;
				this.svg_group["Seco_Grid"].line( 
					5, 5 + i * y_s, 
					this.EM.Size.w - 5, 5 + i * y_s);
			}
		}

		if (this.Parameters["c_points"])
		{
			for (let i = 0; i <= this.Parameters["c_hor_nbr"]; i++) 
			{
				for (let j = 0; j <= this.Parameters["c_ver_nbr"]; j++) 
				{
					this.svg_group["Prim_Grid"].circle(this.Parameters["c_line_stroke"]).center(
						5 + i * this.Parameters["c_size_x"],
						5 + j * this.Parameters["c_size_y"]).fill(this.Parameters["c_line_color"]).stroke("none");
				}
			}
		}
		else
		{
			for (let i = 0; i <= this.Parameters["c_hor_nbr"]; i++) 
			{
				this.svg_group["Prim_Grid"].line(
					5 + i * this.Parameters["c_size_x"], 5,
					5 + i * this.Parameters["c_size_x"], this.EM.Size.h - 5);
			}
			for (let i = 0; i <= this.Parameters["c_ver_nbr"]; i++) 
			{
				this.svg_group["Prim_Grid"].line( 
					5, 5 + i * this.Parameters["c_size_y"], 
					this.EM.Size.w - 5, 5 + i * this.Parameters["c_size_y"]);
			}
		}
	}

}