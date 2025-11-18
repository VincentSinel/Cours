class F_Fraction extends F_Base
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
		this.Parameters["frac_gen_margin"] = document.getElementById("frac_gen_margin").valueAsNumber;
		this.Parameters["frac_gen_size"] = document.getElementById("frac_gen_size").valueAsNumber;
		this.Parameters["frac_txt"] = document.getElementById("frac_txt").checked;
		this.Parameters["frac_txt_type"] = document.getElementById("frac_txt_type").selectedIndex;
		this.Parameters["frac_txt_size"] = document.getElementById("frac_txt_size").valueAsNumber;
		this.Parameters["frac_color"] = document.getElementById("frac_color").getAttribute("data-color");
		this.Parameters["frac_style"] = document.getElementById("frac_style").value;
		this.Parameters["frac_stroke"] = document.getElementById("frac_stroke").valueAsNumber;
		this.Parameters["objects"] = [];
	}

	SetEvents()
	{
		document.getElementById("frac_gen_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("frac_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})

		document.getElementById("frac_txt").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("frac_txt_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("frac_txt_size").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		
		document.getElementById("frac_stroke").addEventListener("input", (e) => {
			this.Parameters["frac_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("frac_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["frac_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		document.getElementById("frac_style").addEventListener("input", (e) => {
			this.Parameters["frac_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
	}

	ox; oy;
	w; h; pdx; sdx; pdy; sdy; hy; hx; vx; vy;

	Recreate()
	{
		let s = this.Parameters["frac_gen_size"] + 10
		this.EM.SetSize(this.Parameters["frac_gen_size"] + 10, this.Parameters["frac_gen_size"] + 10);
		this.EM.SetMargin(this.Parameters["frac_gen_margin"]);
		this.EM.Clear()

		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()
		

		this.size = {
			grad: {
				width: s - 10,
				height: s - 10, 
				left_x: 5,
				top_y: 5,
				right_x: s - 5,
				bottom_y: s - 5
			},
			base: {
				width: s, 
				height: s, 
				left_x: 0,
				top_y: 0,
				right_x: s,
				bottom_y: s
			},
			reel: {
				x_start: 0,
				x_end: 0,
				y_start: 0,
				y_end: 0,
			}
		}


		this.svg_group["Main"].attr(
			{
				fill: "none",
				stroke: this.Parameters["frac_color"],
				"stroke-width": this.Parameters["frac_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["frac_style"],
			}
		)

		this.svg_group["Main"].circle((s - 10)).center(s / 2, s / 2)
		super.DrawObjects(this.svg_group["Objects"]);

		let index = 0;
		this.Object.forEach(obj => {
			obj.SetTitle(index);
			index++;
		});

		Main.dmove(this.EM.Margin, this.EM.Margin);
	}

	GetTotalWeight()
	{
		let total = 0;
		for (let obj of this.Object)
		{
			total += obj.E_weight.valueAsNumber;
		}
		return total;
	}

	GetWeightTo(index)
	{
		let base_weight = 0;
		for(let i = 0; i < index; i++)
		{
			let obj = Array.from(this.Object)[i];
			base_weight += obj.E_weight.valueAsNumber;
		}
		return base_weight;
	}

}