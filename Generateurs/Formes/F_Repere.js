class F_Repere extends F_Base
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
		this.Parameters["repere_gen_width"] = document.getElementById("repere_gen_width").valueAsNumber;
		this.Parameters["repere_gen_height"] = document.getElementById("repere_gen_height").valueAsNumber;
		this.Parameters["repere_gen_margin"] = document.getElementById("repere_gen_margin").valueAsNumber;
		this.Parameters["hor_start"] = document.getElementById("hor_start").valueAsNumber;
		this.Parameters["hor_end"] = document.getElementById("hor_end").valueAsNumber;
		this.Parameters["hor_pas"] = document.getElementById("hor_pas").valueAsNumber;
		this.Parameters["hor_sec_nbr"] = document.getElementById("hor_sec_nbr").valueAsNumber;
		this.Parameters["hor_text"] = document.getElementById("hor_text").checked;
		this.Parameters["hor_text_size"] = document.getElementById("hor_text_size").valueAsNumber;
		this.Parameters["hor_text_offset"] = document.getElementById("hor_text_offset").valueAsNumber;
		this.Parameters["ver_start"] = document.getElementById("ver_start").valueAsNumber;
		this.Parameters["ver_end"] = document.getElementById("ver_end").valueAsNumber;
		this.Parameters["ver_pas"] = document.getElementById("ver_pas").valueAsNumber;
		this.Parameters["ver_sec_nbr"] = document.getElementById("ver_sec_nbr").valueAsNumber;
		this.Parameters["ver_text"] = document.getElementById("ver_text").checked;
		this.Parameters["ver_text_size"] = document.getElementById("ver_text_size").valueAsNumber;
		this.Parameters["ver_text_offset"] = document.getElementById("ver_text_offset").valueAsNumber;
		this.Parameters["line_pri_stroke"] = document.getElementById("line_pri_stroke").valueAsNumber;
		this.Parameters["line_pri_color"] = document.getElementById("line_pri_color").getAttribute("data-color");
		this.Parameters["line_pri_style"] = document.getElementById("line_pri_style").value;
		this.Parameters["line_pri_pin_size"] = document.getElementById("line_pri_pin_size").valueAsNumber;
		this.Parameters["line_pri_arrow"] = document.getElementById("line_pri_arrow").valueAsNumber;
		this.Parameters["line_pri_grid"] = document.getElementById("line_pri_grid").checked;
		this.Parameters["line_pri_grid_stroke"] = document.getElementById("line_pri_grid_stroke").valueAsNumber;
		this.Parameters["line_pri_grid_color"] = document.getElementById("line_pri_grid_color").getAttribute("data-color");
		this.Parameters["line_sec_stroke"] = document.getElementById("line_sec_stroke").valueAsNumber;
		this.Parameters["line_sec_color"] = document.getElementById("line_sec_color").getAttribute("data-color");
		this.Parameters["line_sec_style"] = document.getElementById("line_sec_style").value;
		this.Parameters["line_sec_pin_size"] = document.getElementById("line_sec_pin_size").valueAsNumber;
		this.Parameters["line_sec_grid"] = document.getElementById("line_sec_grid").checked;
		this.Parameters["line_sec_grid_stroke"] = document.getElementById("line_sec_grid_stroke").valueAsNumber;
		this.Parameters["line_sec_grid_color"] = document.getElementById("line_sec_grid_color").getAttribute("data-color");
		this.Parameters["objects"] = [];
	}

	SetEvents()
	{
		document.getElementById("repere_gen_width").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("repere_gen_height").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("repere_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("hor_start").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("hor_end").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("hor_pas").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("hor_sec_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("hor_text").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("hor_text_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("hor_text_offset").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		
		document.getElementById("ver_start").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("ver_end").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("ver_pas").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("ver_sec_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("ver_text").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("ver_text_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("ver_text_offset").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})


		document.getElementById("line_pri_pin_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("line_sec_pin_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("line_pri_arrow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("line_pri_grid").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("line_sec_grid").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		
		document.getElementById("line_pri_stroke").addEventListener("input", (e) => {
			this.Parameters["line_pri_stroke"] = e.target.valueAsNumber;
			this.svg_group["Prim_Line"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("line_pri_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["line_pri_color"] = color;
			this.svg_group["Prim_Line"].attr({"stroke": color})
		})
		document.getElementById("line_pri_style").addEventListener("input", (e) => {
			this.Parameters["line_pri_style"] = e.target.value;
			this.svg_group["Prim_Line"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("line_pri_grid_stroke").addEventListener("input", (e) => {
			this.Parameters["line_pri_grid_stroke"] = e.target.valueAsNumber;
			this.svg_group["Prim_Grid"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("line_pri_grid_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["line_pri_grid_color"] = color;
			this.svg_group["Prim_Grid"].attr({"stroke": color})
		})

		document.getElementById("line_sec_stroke").addEventListener("input", (e) => {
			this.Parameters["line_sec_stroke"] = e.target.valueAsNumber;
			this.svg_group["Seco_Line"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("line_sec_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["line_sec_color"] = color;
			this.svg_group["Seco_Line"].attr({"stroke": color})
		})
		document.getElementById("line_sec_style").addEventListener("input", (e) => {
			this.Parameters["line_sec_style"] = e.target.value;
			this.svg_group["Seco_Line"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("line_sec_grid_stroke").addEventListener("input", (e) => {
			this.Parameters["line_sec_grid_stroke"] = e.target.valueAsNumber;
			this.svg_group["Seco_Grid"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("line_sec_grid_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["line_sec_grid_color"] = color;
			this.svg_group["Seco_Grid"].attr({"stroke": color})
		})
	}

	ox; oy;
	w; h; pdx; sdx; pdy; sdy; hy; hx; vx; vy;

	Recreate()
	{
		this.EM.SetSize(this.Parameters["repere_gen_width"], this.Parameters["repere_gen_height"]);
		this.EM.SetMargin(this.Parameters["repere_gen_margin"]);
		this.EM.Clear()

		var Seco_Grid = this.EM.SVG_Draw.group();
		var Prim_Grid = this.EM.SVG_Draw.group();
		var Seco_Line = this.EM.SVG_Draw.group();
		var Prim_Line = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		var Text_Hor = this.EM.SVG_Draw.group();
		var Text_Ver = this.EM.SVG_Draw.group();
		
		this.svg_group["Prim_Line"] = Prim_Line;
		this.svg_group["Prim_Grid"] = Prim_Grid;
		this.svg_group["Seco_Grid"] = Seco_Grid;
		this.svg_group["Seco_Line"] = Seco_Line;
		this.svg_group["Objects"] = Objects;
		this.svg_group["Text_Hor"] = Text_Hor;
		this.svg_group["Text_Ver"] = Text_Ver;

	
		this.svg_group["Prim_Line"].clear()
		this.svg_group["Prim_Grid"].clear()
		this.svg_group["Seco_Line"].clear()
		this.svg_group["Seco_Grid"].clear()
		this.svg_group["Objects"].clear()
		this.svg_group["Text_Hor"].clear()
		this.svg_group["Text_Ver"].clear()
		
			
		this.svg_group["Prim_Line"].attr(
			{
				stroke: this.Parameters["line_pri_color"],
				"stroke-width": this.Parameters["line_pri_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["line_pri_style"],
				"text-anchor": "middle",
			}
		)
		this.svg_group["Prim_Grid"].attr(
			{
				stroke: this.Parameters["line_pri_grid_color"],
				"stroke-width": this.Parameters["line_pri_grid_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["line_pri_grid_style"],
			}
		)
		this.svg_group["Seco_Line"].attr(
			{
				stroke: this.Parameters["line_sec_color"],
				"stroke-width": this.Parameters["line_sec_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["line_sec_style"],
			}
		)
		this.svg_group["Seco_Grid"].attr(
			{
				stroke: this.Parameters["line_sec_grid_color"],
				"stroke-width": this.Parameters["line_sec_grid_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["line_sec_grid_style"],
			}
		)
		this.svg_group["Text_Hor"].attr(
			{
				fill: this.Parameters["line_pri_color"],
				"font-size": this.Parameters["hor_text_size"],
				"font-family": "Bahnschrift",
				"text-anchor": "middle",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)
		this.svg_group["Text_Ver"].attr(
			{
				fill: this.Parameters["line_pri_color"],
				"font-size": this.Parameters["ver_text_size"],
				"font-family": "Bahnschrift",
				"text-anchor": "middle",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)

		this.size = {
			grad: {
				width: this.EM.Size.w - this.Parameters["line_pri_arrow"] - 10,
				height: this.EM.Size.h - this.Parameters["line_pri_arrow"] - 10, 
				left_x: 5,
				top_y: this.Parameters["line_pri_arrow"] + 5,
				right_x: this.EM.Size.w - this.Parameters["line_pri_arrow"] - 5,
				bottom_y: this.EM.Size.h - 5
			},
			base: {
				width: this.EM.Size.w - this.Parameters["line_pri_arrow"], 
				height: this.EM.Size.h - this.Parameters["line_pri_arrow"], 
				left_x: 0,
				top_y: this.Parameters["line_pri_arrow"],
				right_x: this.EM.Size.w - this.Parameters["line_pri_arrow"],
				bottom_y: this.EM.Size.h
			},
			reel: {
				x_start: this.Parameters["hor_start"],
				x_end: this.Parameters["hor_end"],
				y_start: this.Parameters["ver_start"],
				y_end: this.Parameters["ver_end"],
			}
		}


		let a = this.Parameters["hor_start"];
		let b = this.Parameters["hor_end"];
		if (a == b || this.Parameters["hor_pas"] == 0) return;
		this.ox = - this.size.grad.width * 1.0 / (b-a) * a;
		a = this.Parameters["ver_start"];
		b = this.Parameters["ver_end"];
		if (a == b || this.Parameters["ver_pas"] == 0) return;
		this.oy = this.size.grad.height * (1.0 + 1.0 / (b-a) * a);

		let hor_nbr = (this.Parameters["hor_end"] - this.Parameters["hor_start"]);
		if (hor_nbr == 0)
			this.hor_nbr = 1;

		let ver_nbr = (this.Parameters["ver_end"] - this.Parameters["ver_start"]);
		if (ver_nbr == 0)
			this.ver_nbr = 1;


		this.pdx = this.size.grad.width * 1.0 / hor_nbr;
		this.sdx = this.pdx * 1.0 / this.Parameters["hor_sec_nbr"] * this.Parameters["hor_pas"];

		this.pdy = this.size.grad.height * 1.0 / ver_nbr;
		this.sdy = this.pdy * 1.0 / this.Parameters["ver_sec_nbr"] * this.Parameters["ver_pas"];


		this.hy = 0;
		this.vx = 0;

		if (this.Parameters["ver_start"] >= 0)
			this.hy = this.size.grad.bottom_y;
		else if (this.Parameters["ver_end"] <= 0)
			this.hy = this.size.grad.top_y;
		else
			this.hy = this.size.grad.bottom_y + (this.Parameters["ver_start"]) * this.pdy
		
		if (this.Parameters["hor_start"] >= 0)
			this.vx = this.size.grad.left_x;
		else if (this.Parameters["hor_end"] <= 0)
			this.vx = this.size.grad.right_x;
		else
			this.vx = this.size.grad.left_x - (this.Parameters["hor_start"]) * this.pdx

		this.Grille();
		this.Tirets();
		this.Axes();
		super.DrawObjects(this.svg_group["Objects"]);
		this.Textes();

		Prim_Line.dmove(this.EM.Margin, this.EM.Margin);
		Prim_Grid.dmove(this.EM.Margin, this.EM.Margin);
		Seco_Line.dmove(this.EM.Margin, this.EM.Margin);
		Seco_Grid.dmove(this.EM.Margin, this.EM.Margin);
		// this.svg_group["Objects"].dmove(this.EM.Margin, this.EM.Margin);
		Text_Hor.dmove(this.EM.Margin, this.EM.Margin);
		Text_Ver.dmove(this.EM.Margin, this.EM.Margin);
	}

	Grille()
	{
		if (this.Parameters["line_sec_grid"])
		{
			let a = this.Parameters["hor_start"];
			let b = this.Parameters["hor_end"];
			let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["hor_pas"];
			let i = 0;

			while( this.ox + i <= this.size.grad.width || (this.ox - i) >= 0)
			{
				if ((this.ox + i) <= this.size.grad.width && (this.ox + i) >= 0)
				{
					for(let j = 1; j < this.Parameters["hor_sec_nbr"]; j++)
					{
						if ((this.ox + i + j * this.sdx) <= this.size.grad.width && (this.ox + i + j * this.sdx) >= 0)
						{
							this.svg_group["Seco_Grid"].line( 
								this.size.grad.left_x + this.ox + i + j * this.sdx,
								this.size.base.top_y,
								this.size.grad.left_x + this.ox + i + j * this.sdx,
								this.size.base.bottom_y
							);
						}
					}
				}
				if ((this.ox - i) <= this.size.grad.width && (this.ox - i) >= 0)
				{
					for(let j = 1; j < this.Parameters["hor_sec_nbr"]; j++)
					{
						if ((this.ox - i - j * this.sdx) <= this.size.grad.width && (this.ox - i - j * this.sdx) >= 0)
						{
							this.svg_group["Seco_Grid"].line( 
								this.size.grad.left_x + this.ox - i - j * this.sdx,
								this.size.base.top_y,
								this.size.grad.left_x + this.ox - i - j * this.sdx,
								this.size.base.bottom_y
							);
						}
					}
				}
				i += dx
			}

			a = this.Parameters["ver_start"];
			b = this.Parameters["ver_end"];
			let dy = this.size.grad.height * 1.0 / (b-a) * this.Parameters["ver_pas"];
			i = 0;

			while(this.oy + i <= this.size.grad.height || (this.oy - i) >= 0)
			{
				if ((this.oy + i) <= this.size.grad.height && (this.oy + i) >= 0)
				{
					for(let j = 1; j < this.Parameters["ver_sec_nbr"]; j++)
					{
						if ((this.oy + i + j * this.sdy) <= this.size.grad.height && (this.oy + i + j * this.sdy) >= 0)
						{
							this.svg_group["Seco_Grid"].line(
								this.size.base.left_x, 
								this.size.grad.top_y + this.oy + i + j * this.sdy,
								this.size.base.right_x, 
								this.size.grad.top_y + this.oy + i + j * this.sdy,
							);
						}
					}
				}
				if ((this.oy - i) <= this.size.grad.height && (this.oy - i) >= 0)
				{
					for(let j = 1; j < this.Parameters["ver_sec_nbr"]; j++)
					{
						if ((this.oy - i - j * this.sdy) <= this.size.grad.height && (this.oy - i - j * this.sdy) >= 0)
						{
							this.svg_group["Seco_Grid"].line( 
								this.size.base.left_x, 
								this.size.grad.top_y + this.oy - i - j * this.sdy,
								this.size.base.right_x, 
								this.size.grad.top_y + this.oy - i - j * this.sdy,
							);
						}
					}
				}
				i += dy
			}
		}

		if (this.Parameters["line_pri_grid"])
		{
			let a = this.Parameters["hor_start"];
			let b = this.Parameters["hor_end"];
			let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["hor_pas"];
			let i = 0;

			while( this.ox + i <= this.size.grad.width || (this.ox - i) >= 0)
			{
				if (this.ox + i <= this.size.grad.width && (this.ox + i) >= 0)
				{
					this.svg_group["Prim_Grid"].line( 
						this.size.grad.left_x + this.ox + i, 
						this.size.base.top_y,
						this.size.grad.left_x + this.ox + i,
						this.size.base.bottom_y,
					);
				}
				if (this.ox - i <= this.size.grad.width && (this.ox - i) >= 0)
				{
					this.svg_group["Prim_Grid"].line( 
						this.size.grad.left_x + this.ox - i, 
						this.size.base.top_y,
						this.size.grad.left_x + this.ox - i,
						this.size.base.bottom_y,
					);
				}
				i += dx
			}

			a = this.Parameters["ver_start"];
			b = this.Parameters["ver_end"];
			let dy = this.size.grad.height * 1.0 / (b-a) * this.Parameters["ver_pas"];
			i = 0;

			while(this.oy + i <= this.size.grad.height || (this.oy - i) >= 0)
			{
				if (this.oy + i <= this.size.grad.height && (this.oy + i) >= 0)
				{
					this.svg_group["Prim_Grid"].line( 
						this.size.base.left_x, 
						this.size.grad.top_y + this.oy + i,
						this.size.base.right_x, 
						this.size.grad.top_y + this.oy + i
					);
				}
				if (this.oy - i <= this.size.grad.height && (this.oy - i) >= 0)
				{
					this.svg_group["Prim_Grid"].line( 
						this.size.base.left_x, 
						this.size.grad.top_y + this.oy - i,
						this.size.base.right_x, 
						this.size.grad.top_y + this.oy - i
					);
				}
				i += dy
			}
		}
	}

	Tirets()
	{
		// Axe horizontal
		let a = this.Parameters["hor_start"];
		let b = this.Parameters["hor_end"];
		let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["hor_pas"];
		let i = 0;

		let hor_pri_y1 = this.hy - this.Parameters["line_pri_pin_size"] / 2.0;
		let hor_pri_y2 = this.hy + this.Parameters["line_pri_pin_size"] / 2.0;

		let hor_sec_y1 = this.hy - this.Parameters["line_sec_pin_size"] / 2.0;
		let hor_sec_y2 = this.hy + this.Parameters["line_sec_pin_size"] / 2.0;

		while( this.ox + i <= this.size.grad.width || (this.ox - i) >= 0)
		{
			if ((this.ox + i) <= this.size.grad.width && (this.ox + i) >= 0)
			{
				this.svg_group["Prim_Line"].line( 
					this.size.grad.left_x + this.ox + i,
					hor_pri_y1,
					this.size.grad.left_x + this.ox + i,
					hor_pri_y2
				);
				for(let j = 1; j < this.Parameters["hor_sec_nbr"]; j++)
				{
					if ((this.ox + i + j * this.sdx) <= this.size.grad.width && (this.ox + i + j * this.sdx) >= 0)
					{
						this.svg_group["Seco_Line"].line( 
							this.size.grad.left_x + this.ox + i + j * this.sdx,
							hor_sec_y1,
							this.size.grad.left_x + this.ox + i + j * this.sdx,
							hor_sec_y2
						);
					}
				}
			}
			if ((this.ox - i) <= this.size.grad.width && (this.ox - i) >= 0)
			{
				this.svg_group["Prim_Line"].line( 
					this.size.grad.left_x + this.ox - i,
					hor_pri_y1,
					this.size.grad.left_x + this.ox - i,
					hor_pri_y2
				);
				for(let j = 1; j < this.Parameters["hor_sec_nbr"]; j++)
				{
					if ((this.ox - i - j * this.sdx) <= this.size.grad.width && (this.ox - i - j * this.sdx) >= 0)
					{
						this.svg_group["Seco_Line"].line( 
							this.size.grad.left_x + this.ox - i - j * this.sdx,
							hor_sec_y1,
							this.size.grad.left_x + this.ox - i - j * this.sdx,
							hor_sec_y2
						);
					}
				}
			}
			i += dx
		}
		
		// Axe vertical
		a = this.Parameters["ver_start"];
		b = this.Parameters["ver_end"];
		let dy = this.size.grad.height * 1.0 / (b-a) * this.Parameters["ver_pas"];
		i = 0;

		let ver_pri_x1 = this.vx  - this.Parameters["line_pri_pin_size"] / 2.0;
		let ver_pri_x2 = this.vx + this.Parameters["line_pri_pin_size"] / 2.0;

		let ver_sec_x1 = this.vx - this.Parameters["line_sec_pin_size"] / 2.0;
		let ver_sec_x2 = this.vx + this.Parameters["line_sec_pin_size"] / 2.0;

		while(this.oy + i <= this.size.grad.height || (this.oy - i) >= 0)
		{
			if (this.oy + i <= this.size.grad.height && (this.oy + i) >= 0)
			{
				this.svg_group["Prim_Line"].line(
					ver_pri_x1, 
					this.size.grad.top_y + this.oy + i,
					ver_pri_x2, 
					this.size.grad.top_y + this.oy + i,
				);
				for(let j = 1; j < this.Parameters["ver_sec_nbr"]; j++)
				{
					if ((this.oy + i + j * this.sdy) <= this.size.grad.height && (this.oy + i + j * this.sdy) >= 0)
					{
						this.svg_group["Seco_Line"].line(
							ver_sec_x1, 
							this.size.grad.top_y + this.oy + i + j * this.sdy,
							ver_sec_x2, 
							this.size.grad.top_y + this.oy + i + j * this.sdy,
						);
					}
				}
			}
			if (this.oy - i <= this.size.grad.height && (this.oy - i) >= 0)
			{
				this.svg_group["Prim_Line"].line(
					ver_pri_x1, 
					this.size.grad.top_y + this.oy - i,
					ver_pri_x2, 
					this.size.grad.top_y + this.oy - i,
				);
				for(let j = 1; j < this.Parameters["ver_sec_nbr"]; j++)
				{
					if ((this.oy - i - j * this.sdy) <= this.size.grad.height && (this.oy - i - j * this.sdy) >= 0)
					{
						this.svg_group["Seco_Line"].line( 
							ver_sec_x1, 
							this.size.grad.top_y + this.oy - i - j * this.sdy,
							ver_sec_x2, 
							this.size.grad.top_y + this.oy - i - j * this.sdy,
						);
					}
				}
			}
			i += dy
		}
	}

	Axes()
	{
		this.svg_group["Prim_Line"].line( 
			this.size.base.left_x,
			this.hy,
			this.size.base.right_x,
			this.hy
		);
		this.svg_group["Prim_Line"].line( 
			this.vx,
			this.size.base.top_y,
			this.vx,
			this.size.base.bottom_y
		);

		let a = this.Parameters["line_pri_arrow"]
		let points = [
			[this.size.base.right_x,						 this.hy], 
			[this.size.base.right_x + 0.25 * a, this.hy], 
			[this.size.base.right_x + 0.25 * a, this.hy + 0.5 * a],
			[this.size.base.right_x + a,				 this.hy],
			[this.size.base.right_x + 0.25 * a, this.hy - 0.5 * a],
			[this.size.base.right_x + 0.25 * a, this.hy]
		]
		this.svg_group["Prim_Line"].polygon(points);

		points = [
			[this.vx,this.size.base.top_y], 
			[this.vx,this.size.base.top_y - 0.25 * a], 
			[this.vx + 0.5 * a,this.size.base.top_y - 0.25 * a],
			[this.vx,this.size.base.top_y - a],
			[this.vx - 0.5 * a,this.size.base.top_y - 0.25 * a],
			[this.vx,this.size.base.top_y - 0.25 * a]]
		this.svg_group["Prim_Line"].polygon(points);
	}

	Textes()
	{
		
		// Axe horizontal
		if (this.Parameters["hor_text"])
		{
			let a = this.Parameters["hor_start"];
			let b = this.Parameters["hor_end"];
			let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["hor_pas"];
			let i = dx; let j = 1;

			let y = this.hy + this.Parameters["line_pri_pin_size"] / 2.0 + this.Parameters["hor_text_size"] + this.Parameters["hor_text_offset"];

			while( this.ox + i <= this.size.grad.width || (this.ox - i) >= 0)
			{
				if ((this.ox + i) <= this.size.grad.width && (this.ox + i) >= 0)
				{
					let x = this.size.grad.left_x + this.ox + i;
					let text = Round(this.Parameters["hor_pas"] * j, 5).toString() 
					
					let ele1 = this.svg_group["Text_Hor"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text_Hor"].text(text)
					ele2.dmove(x, y)
				}
				if ((this.ox - i) <= this.size.grad.width && (this.ox - i) >= 0)
				{
					let x = this.size.grad.left_x + this.ox - i;
					let text = Round(-this.Parameters["hor_pas"] * j, 5).toString() 
					
					let ele1 = this.svg_group["Text_Hor"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text_Hor"].text(text)
					ele2.dmove(x, y)
				}
				i += dx
				j++;
			}
		}
		// Axe vertical
		if (this.Parameters["ver_text"])
		{
			let a = this.Parameters["ver_start"];
			let b = this.Parameters["ver_end"];
			let dy = this.size.grad.height * 1.0 / (b-a) * this.Parameters["ver_pas"];
			let i = dy; let j = 1;

			let x = this.vx + this.Parameters["line_pri_pin_size"] / 2.0+ this.Parameters["ver_text_size"] * 0.7 + this.Parameters["ver_text_offset"];

			while(this.oy + i <= this.size.grad.height || (this.oy - i) >= 0)
			{
				if (this.oy + i <= this.size.grad.height && (this.oy + i) >= 0)
				{
					let y = this.size.grad.top_y + this.oy + i + this.Parameters["ver_text_size"] * 0.35;
					let text = Round(this.Parameters["ver_pas"] * j, 5).toString() 
					
					let ele1 = this.svg_group["Text_Ver"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text_Ver"].text(text)
					ele2.dmove(x, y)
				}
				if (this.oy - i <= this.size.grad.height && (this.oy - i) >= 0)
				{
					let y = this.size.grad.top_y + this.oy - i + this.Parameters["ver_text_size"] * 0.35;
					let text = Round(-this.Parameters["ver_pas"] * j, 5).toString() 
					
					let ele1 = this.svg_group["Text_Ver"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text_Ver"].text(text)
					ele2.dmove(x, y)
				}
				i += dy
				j++;
			}
		}
	}

}