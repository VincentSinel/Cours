class F_Axe extends F_Base
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
		this.Parameters["axe_gen_width"] = document.getElementById("axe_gen_width").valueAsNumber;
		this.Parameters["axe_gen_height"] = document.getElementById("axe_gen_height").valueAsNumber;
		this.Parameters["axe_gen_margin"] = document.getElementById("axe_gen_margin").valueAsNumber;
		this.Parameters["axe_sec_nbr"] = document.getElementById("axe_sec_nbr").valueAsNumber;
		this.Parameters["axe_start"] = document.getElementById("axe_start").valueAsNumber;
		this.Parameters["axe_end"] = document.getElementById("axe_end").valueAsNumber;
		this.Parameters["axe_pas"] = document.getElementById("axe_pas").valueAsNumber;
		this.Parameters["axe_text"] = document.getElementById("axe_text").checked;
		this.Parameters["axe_text_size"] = document.getElementById("axe_text_size").valueAsNumber;
		this.Parameters["axe_text_offset"] = document.getElementById("axe_text_offset").valueAsNumber;
		this.Parameters["axe_line_pri_stroke"] = document.getElementById("axe_line_pri_stroke").valueAsNumber;
		this.Parameters["axe_line_pri_color"] = document.getElementById("axe_line_pri_color").getAttribute("data-color");
		this.Parameters["axe_line_pri_pin_size"] = document.getElementById("axe_line_pri_pin_size").valueAsNumber;
		this.Parameters["axe_line_pri_arrow"] = document.getElementById("axe_line_pri_arrow").valueAsNumber;
		this.Parameters["axe_line_sec_stroke"] = document.getElementById("axe_line_sec_stroke").valueAsNumber;
		this.Parameters["axe_line_sec_color"] = document.getElementById("axe_line_sec_color").getAttribute("data-color");
		this.Parameters["axe_line_sec_pin_size"] = document.getElementById("axe_line_sec_pin_size").valueAsNumber;
		this.Parameters["objects"] = [];
	}

	SetEvents()
	{
		document.getElementById("axe_gen_width").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_gen_height").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("axe_start").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_end").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_pas").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_sec_nbr").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_text").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("axe_text_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_text_offset").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("axe_line_pri_pin_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_line_sec_pin_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("axe_line_pri_arrow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		
		document.getElementById("axe_line_pri_stroke").addEventListener("input", (e) => {
			this.Parameters["axe_line_pri_stroke"] = e.target.valueAsNumber;
			this.svg_group["Prim_Line"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("axe_line_pri_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["axe_line_pri_color"] = color;
			this.svg_group["Prim_Line"].attr({"stroke": color})
		})
		document.getElementById("axe_line_pri_style").addEventListener("input", (e) => {
			this.Parameters["axe_line_pri_style"] = e.target.value;
			this.svg_group["Prim_Line"].attr({"stroke-dasharray": e.target.value})
		})

		document.getElementById("axe_line_sec_stroke").addEventListener("input", (e) => {
			this.Parameters["axe_line_sec_stroke"] = e.target.valueAsNumber;
			this.svg_group["Seco_Line"].attr({"stroke-width": e.target.valueAsNumber})
		})
		var color = new ColorPicker(document.getElementById("axe_line_sec_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["axe_line_sec_color"] = color;
			this.svg_group["Seco_Line"].attr({"stroke": color})
		})
		document.getElementById("axe_line_sec_style").addEventListener("input", (e) => {
			this.Parameters["axe_line_sec_style"] = e.target.value;
			this.svg_group["Seco_Line"].attr({"stroke-dasharray": e.target.value})
		})
	}

	Recreate()
	{
		this.EM.SetSize(this.Parameters["axe_gen_width"], this.Parameters["axe_gen_height"]);
		this.EM.SetMargin(this.Parameters["axe_gen_margin"]);
		this.EM.Clear()

		var Seco_Line = this.EM.SVG_Draw.group();
		var Prim_Line = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		var Text = this.EM.SVG_Draw.group();
		
		this.svg_group["Prim_Line"] = Prim_Line;
		this.svg_group["Seco_Line"] = Seco_Line;
		this.svg_group["Objects"] = Objects;
		this.svg_group["Text"] = Text;

	
		this.svg_group["Prim_Line"].clear()
		this.svg_group["Seco_Line"].clear()
		this.svg_group["Objects"].clear()
		this.svg_group["Text"].clear()
		
			
		this.svg_group["Prim_Line"].attr(
			{
				stroke: this.Parameters["axe_line_pri_color"],
				"stroke-width": this.Parameters["axe_line_pri_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["axe_line_pri_style"],
				"text-anchor": "middle",
			}
		)
		this.svg_group["Seco_Line"].attr(
			{
				stroke: this.Parameters["axe_line_sec_color"],
				"stroke-width": this.Parameters["axe_line_sec_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["axe_line_sec_style"],
			}
		)
		this.svg_group["Text"].attr(
			{
				fill: this.Parameters["axe_line_pri_color"],
				"font-size": this.Parameters["axe_text_size"],
				"font-family": "Bahnschrift",
				"text-anchor": "middle",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)

		this.size = {
			grad: {
				width: this.EM.Size.w - this.Parameters["axe_line_pri_arrow"] - 10,
				height: this.EM.Size.h, 
				left_x: 5,
				right_x: this.EM.Size.w - this.Parameters["axe_line_pri_arrow"] - 5,
				y: this.EM.Size.h / 2
			},
			base: {
				width: this.EM.Size.w - this.Parameters["axe_line_pri_arrow"], 
				height: this.EM.Size.h, 
				left_x: 0,
				right_x: this.EM.Size.w - this.Parameters["axe_line_pri_arrow"],
				y: this.EM.Size.h / 2
			}
		}

		this.Parameters["axe_pas"] = Math.max(this.Parameters["axe_pas"] , 0)

		if (this.Parameters["axe_pas"] == 0)
			this.hor_nbr = 1;
		else
			this.hor_nbr = (this.Parameters["axe_end"] - this.Parameters["axe_start"]) /// this.Parameters["axe_pas"]; 


		this.sdx = this.size.grad.width  * this.Parameters["axe_pas"] / (this.hor_nbr * this.Parameters["axe_sec_nbr"]);


		this.Tirets();
		this.Axes();
		super.DrawObjects(this.svg_group["Objects"], this.Parameters["objects"]);
		this.Textes();

		Prim_Line.dmove(this.EM.Margin, this.EM.Margin);
		Seco_Line.dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Objects"].dmove(this.EM.Margin, this.EM.Margin);
		Text.dmove(this.EM.Margin, this.EM.Margin);
	}

	Tirets()
	{
		let a = this.Parameters["axe_start"];
		let b = this.Parameters["axe_end"];
		if (a == b || this.Parameters["axe_pas"] == 0) return;
		let ox =  - this.size.grad.width * 1.0 / (b-a) * a;
		let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["axe_pas"];
		let i = 0;

		let pri_pin_y1 = this.size.base.y - this.Parameters["axe_line_pri_pin_size"] / 2.0;
		let pri_pin_y2 = this.size.base.y + this.Parameters["axe_line_pri_pin_size"] / 2.0;
		let sec_pin_y1 = this.size.base.y - this.Parameters["axe_line_sec_pin_size"] / 2.0;
		let sec_pin_y2 = this.size.base.y + this.Parameters["axe_line_sec_pin_size"] / 2.0;

		while( ox + i <= this.size.grad.width || (ox - i) >= 0)
		{
			if (ox + i <= this.size.grad.width)
			{
				this.svg_group["Prim_Line"].line( 
					this.size.grad.left_x + ox + i,
					pri_pin_y1,
					this.size.grad.left_x + ox + i,
					pri_pin_y2,
				);
				for(let j = 1; j < this.Parameters["axe_sec_nbr"]; j++)
				{
					if (ox + i + j * this.sdx <= this.size.grad.width)
					{
						this.svg_group["Seco_Line"].line( 
							this.size.grad.left_x + ox + i + j * this.sdx,
							sec_pin_y1,
							this.size.grad.left_x + ox + i + j * this.sdx,
							sec_pin_y2,
						);
					}
				}
			}
			if ((ox - i) >= 0)
			{
				this.svg_group["Prim_Line"].line( 
					this.size.grad.left_x + ox - i,
					pri_pin_y1,
					this.size.grad.left_x + ox - i,
					pri_pin_y2,
				);
				for(let j = 1; j < this.Parameters["axe_sec_nbr"]; j++)
				{
					if ((ox - i - j * this.sdx) >= 0)
					{
						this.svg_group["Seco_Line"].line( 
							this.size.grad.left_x + ox - i - j * this.sdx,
							sec_pin_y1,
							this.size.grad.left_x + ox - i - j * this.sdx,
							sec_pin_y2,
						);
					}
				}
			}
			i += dx
		}
	}

	Axes()
	{
		this.svg_group["Prim_Line"].line( 
			this.size.base.left_x,
			this.size.base.y,
			this.size.base.right_x,
			this.size.base.y,
		);

		let a = this.Parameters["axe_line_pri_arrow"]
		let points = [
			[this.size.base.right_x,						this.size.base.y], 
			[this.size.base.right_x + 0.25 * a, this.size.base.y], 
			[this.size.base.right_x + 0.25 * a, this.size.base.y + 0.5 * a],
			[this.size.base.right_x + a,				this.size.base.y],
			[this.size.base.right_x + 0.25 * a, this.size.base.y - 0.5 * a],
			[this.size.base.right_x + 0.25 * a, this.size.base.y]
		]
		this.svg_group["Prim_Line"].polygon(points);
	}

	Textes()
	{
		if (this.Parameters["axe_text"])
		{
			let a = this.Parameters["axe_start"];
			let b = this.Parameters["axe_end"];
			if (a == b || this.Parameters["axe_pas"] == 0) return;
			let ox =  - this.size.grad.width * 1.0 / (b-a) * a;
			let dx = this.size.grad.width * 1.0 / (b-a) * this.Parameters["axe_pas"];
			let i = 0; let j = 0;

			let y = this.size.grad.y + this.Parameters["axe_line_pri_pin_size"] / 2.0 + this.Parameters["axe_text_size"] + this.Parameters["axe_text_offset"]

			while( ox + i <= this.size.grad.width || (ox - i) >= 0)
			{
				if (ox + i <= this.size.grad.width)
				{
					let x = this.size.grad.left_x + ox + i

					let text = Round(this.Parameters["axe_pas"] * j, 5).toString() 
					let ele1 = this.svg_group["Text"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text"].text(text)
					ele2.dmove(x, y)
				}
				if ((ox - i) >= 0)
				{
					let x = this.size.grad.left_x + ox - i

					let text = Round(-this.Parameters["axe_pas"] * j, 5).toString() 
					let ele1 = this.svg_group["Text"].text(text)
					ele1.attr({
						fill: "white",
						stroke: "white",
						"stroke-width": 5,
						"font-weight": "bold"
					})
					ele1.dmove(x, y)
					let ele2 = this.svg_group["Text"].text(text)
					ele2.dmove(x, y)
				}
				i += dx
				j++;
			}
		}
	}

}