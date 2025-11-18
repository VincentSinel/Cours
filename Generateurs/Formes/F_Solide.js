class F_Solide extends F_Base
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
		this.Parameters["sol_type"] = document.getElementById("sol_type").selectedIndex;
		this.Parameters["sol_gen_margin"] = document.getElementById("sol_gen_margin").valueAsNumber;

		this.Parameters["sol_pavdrt_L"] = document.getElementById("sol_pavdrt_L").valueAsNumber;
		this.Parameters["sol_pavdrt_H"] = document.getElementById("sol_pavdrt_H").valueAsNumber;
		this.Parameters["sol_pavdrt_P"] = document.getElementById("sol_pavdrt_P").valueAsNumber;
		this.Parameters["sol_pavdrt_line_stroke"] = document.getElementById("sol_pavdrt_line_stroke").valueAsNumber;
		this.Parameters["sol_pavdrt_line_color"] = document.getElementById("sol_pavdrt_line_color").getAttribute("data-color");
		this.Parameters["sol_pavdrt_line_style"] = document.getElementById("sol_pavdrt_line_style").value;
		this.Parameters["sol_pavdrt_show_hide"] = document.getElementById("sol_pavdrt_show_hide").checked;
		this.Parameters["sol_pavdrt_hide_stroke"] = document.getElementById("sol_pavdrt_hide_stroke").valueAsNumber;
		this.Parameters["sol_pavdrt_hide_color"] = document.getElementById("sol_pavdrt_hide_color").getAttribute("data-color");
		this.Parameters["sol_pavdrt_hide_style"] = document.getElementById("sol_pavdrt_hide_style").value;
		this.Parameters["sol_pavdrt_fill_base"] = document.getElementById("sol_pavdrt_fill_base").checked;
		this.Parameters["sol_pavdrt_fill_base_color"] = document.getElementById("sol_pavdrt_fill_base_color").getAttribute("data-color");
		this.Parameters["sol_pavdrt_fill_base_type"] = document.getElementById("sol_pavdrt_fill_base_type").selectedIndex;
		this.Parameters["sol_pavdrt_fill"] = document.getElementById("sol_pavdrt_fill").checked;
		this.Parameters["sol_pavdrt_fill_color"] = document.getElementById("sol_pavdrt_fill_color").getAttribute("data-color");
		this.Parameters["sol_pavdrt_fill_shadow"] = document.getElementById("sol_pavdrt_fill_shadow").checked;
		this.Parameters["sol_pavdrt_fill_type"] = document.getElementById("sol_pavdrt_fill_type").selectedIndex;


		this.Parameters["sol_prmdrt_L"] = document.getElementById("sol_prmdrt_L").valueAsNumber;
		this.Parameters["sol_prmdrt_H"] = document.getElementById("sol_prmdrt_H").valueAsNumber;
		this.Parameters["sol_prmdrt_P"] = document.getElementById("sol_prmdrt_P").valueAsNumber;
		this.Parameters["sol_prmdrt_F"] = document.getElementById("sol_prmdrt_F").valueAsNumber;
		this.Parameters["sol_prmdrt_A"] = document.getElementById("sol_prmdrt_A").valueAsNumber;
		this.Parameters["sol_prmdrt_line_stroke"] = document.getElementById("sol_prmdrt_line_stroke").valueAsNumber;
		this.Parameters["sol_prmdrt_line_color"] = document.getElementById("sol_prmdrt_line_color").getAttribute("data-color");
		this.Parameters["sol_prmdrt_line_style"] = document.getElementById("sol_prmdrt_line_style").value;
		this.Parameters["sol_prmdrt_show_hide"] = document.getElementById("sol_prmdrt_show_hide").checked;
		this.Parameters["sol_prmdrt_hide_stroke"] = document.getElementById("sol_prmdrt_hide_stroke").valueAsNumber;
		this.Parameters["sol_prmdrt_hide_color"] = document.getElementById("sol_prmdrt_hide_color").getAttribute("data-color");
		this.Parameters["sol_prmdrt_hide_style"] = document.getElementById("sol_prmdrt_hide_style").value;
		this.Parameters["sol_prmdrt_fill_base"] = document.getElementById("sol_prmdrt_fill_base").checked;
		this.Parameters["sol_prmdrt_fill_base_color"] = document.getElementById("sol_prmdrt_fill_base_color").getAttribute("data-color");
		this.Parameters["sol_prmdrt_fill_base_type"] = document.getElementById("sol_prmdrt_fill_base_type").selectedIndex;
		this.Parameters["sol_prmdrt_fill"] = document.getElementById("sol_prmdrt_fill").checked;
		this.Parameters["sol_prmdrt_fill_color"] = document.getElementById("sol_prmdrt_fill_color").getAttribute("data-color");
		this.Parameters["sol_prmdrt_fill_shadow"] = document.getElementById("sol_prmdrt_fill_shadow").checked;
		this.Parameters["sol_prmdrt_fill_type"] = document.getElementById("sol_prmdrt_fill_type").selectedIndex;


		this.Parameters["sol_cylind_R"] = document.getElementById("sol_cylind_R").valueAsNumber;
		this.Parameters["sol_cylind_H"] = document.getElementById("sol_cylind_H").valueAsNumber;
		this.Parameters["sol_cylind_line_stroke"] = document.getElementById("sol_cylind_line_stroke").valueAsNumber;
		this.Parameters["sol_cylind_line_color"] = document.getElementById("sol_cylind_line_color").getAttribute("data-color");
		this.Parameters["sol_cylind_line_style"] = document.getElementById("sol_cylind_line_style").value;
		this.Parameters["sol_cylind_show_hide"] = document.getElementById("sol_cylind_show_hide").checked;
		this.Parameters["sol_cylind_hide_stroke"] = document.getElementById("sol_cylind_hide_stroke").valueAsNumber;
		this.Parameters["sol_cylind_hide_color"] = document.getElementById("sol_cylind_hide_color").getAttribute("data-color");
		this.Parameters["sol_cylind_hide_style"] = document.getElementById("sol_cylind_hide_style").value;
		this.Parameters["sol_cylind_fill_base"] = document.getElementById("sol_cylind_fill_base").checked;
		this.Parameters["sol_cylind_fill_base_color"] = document.getElementById("sol_cylind_fill_base_color").getAttribute("data-color");
		this.Parameters["sol_cylind_fill_base_type"] = document.getElementById("sol_cylind_fill_base_type").selectedIndex;
		this.Parameters["sol_cylind_fill"] = document.getElementById("sol_cylind_fill").checked;
		this.Parameters["sol_cylind_fill_color"] = document.getElementById("sol_cylind_fill_color").getAttribute("data-color");
		this.Parameters["sol_cylind_fill_shadow"] = document.getElementById("sol_cylind_fill_shadow").checked;
		this.Parameters["sol_cylind_fill_type"] = document.getElementById("sol_cylind_fill_type").selectedIndex;
		this.Parameters["sol_cylind_h"] = document.getElementById("sol_cylind_h").checked;
		this.Parameters["sol_cylind_h_stroke"] = document.getElementById("sol_cylind_h_stroke").valueAsNumber;
		this.Parameters["sol_cylind_h_color"] = document.getElementById("sol_cylind_h_color").getAttribute("data-color");
		this.Parameters["sol_cylind_h_style"] = document.getElementById("sol_cylind_h_style").value;
		this.Parameters["sol_cylind_r"] = document.getElementById("sol_cylind_r").checked;
		this.Parameters["sol_cylind_r_stroke"] = document.getElementById("sol_cylind_r_stroke").valueAsNumber;
		this.Parameters["sol_cylind_r_color"] = document.getElementById("sol_cylind_r_color").getAttribute("data-color");
		this.Parameters["sol_cylind_r_style"] = document.getElementById("sol_cylind_r_style").value;
		this.Parameters["sol_cylind_ag"] = document.getElementById("sol_cylind_ag").checked;
		this.Parameters["sol_cylind_ag_full"] = document.getElementById("sol_cylind_ag_full").checked;
		this.Parameters["sol_cylind_ag_stroke"] = document.getElementById("sol_cylind_ag_stroke").valueAsNumber;
		this.Parameters["sol_cylind_ag_color"] = document.getElementById("sol_cylind_ag_color").getAttribute("data-color");
		this.Parameters["sol_cylind_ag_style"] = document.getElementById("sol_cylind_ag_style").value;


		this.Parameters["sol_pyrami_L"] = document.getElementById("sol_pyrami_L").valueAsNumber;
		this.Parameters["sol_pyrami_H"] = document.getElementById("sol_pyrami_H").valueAsNumber;
		this.Parameters["sol_pyrami_P"] = document.getElementById("sol_pyrami_P").valueAsNumber;
		this.Parameters["sol_pyrami_F"] = document.getElementById("sol_pyrami_F").valueAsNumber;
		this.Parameters["sol_pyrami_A"] = document.getElementById("sol_pyrami_A").valueAsNumber;
		this.Parameters["sol_pyrami_line_stroke"] = document.getElementById("sol_pyrami_line_stroke").valueAsNumber;
		this.Parameters["sol_pyrami_line_color"] = document.getElementById("sol_pyrami_line_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_line_style"] = document.getElementById("sol_pyrami_line_style").value;
		this.Parameters["sol_pyrami_show_hide"] = document.getElementById("sol_pyrami_show_hide").checked;
		this.Parameters["sol_pyrami_hide_stroke"] = document.getElementById("sol_pyrami_hide_stroke").valueAsNumber;
		this.Parameters["sol_pyrami_hide_color"] = document.getElementById("sol_pyrami_hide_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_hide_style"] = document.getElementById("sol_pyrami_hide_style").value;
		this.Parameters["sol_pyrami_fill_base"] = document.getElementById("sol_pyrami_fill_base").checked;
		this.Parameters["sol_pyrami_fill_base_color"] = document.getElementById("sol_pyrami_fill_base_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_fill_base_type"] = document.getElementById("sol_pyrami_fill_base_type").selectedIndex;
		this.Parameters["sol_pyrami_fill"] = document.getElementById("sol_pyrami_fill").checked;
		this.Parameters["sol_pyrami_fill_color"] = document.getElementById("sol_pyrami_fill_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_fill_shadow"] = document.getElementById("sol_pyrami_fill_shadow").checked;
		this.Parameters["sol_pyrami_fill_type"] = document.getElementById("sol_pyrami_fill_type").selectedIndex;
		this.Parameters["sol_pyrami_h"] = document.getElementById("sol_pyrami_h").checked;
		this.Parameters["sol_pyrami_h_stroke"] = document.getElementById("sol_pyrami_h_stroke").valueAsNumber;
		this.Parameters["sol_pyrami_h_color"] = document.getElementById("sol_pyrami_h_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_h_style"] = document.getElementById("sol_pyrami_h_style").value;
		this.Parameters["sol_pyrami_ag"] = document.getElementById("sol_pyrami_ag").checked;
		this.Parameters["sol_pyrami_ag_full"] = document.getElementById("sol_pyrami_ag_full").checked;
		this.Parameters["sol_pyrami_ag_stroke"] = document.getElementById("sol_pyrami_ag_stroke").valueAsNumber;
		this.Parameters["sol_pyrami_ag_color"] = document.getElementById("sol_pyrami_ag_color").getAttribute("data-color");
		this.Parameters["sol_pyrami_ag_style"] = document.getElementById("sol_pyrami_ag_style").value;
		

		this.Parameters["sol_cone_R"] = document.getElementById("sol_cone_R").valueAsNumber;
		this.Parameters["sol_cone_H"] = document.getElementById("sol_cone_H").valueAsNumber;
		this.Parameters["sol_cone_line_stroke"] = document.getElementById("sol_cone_line_stroke").valueAsNumber;
		this.Parameters["sol_cone_line_color"] = document.getElementById("sol_cone_line_color").getAttribute("data-color");
		this.Parameters["sol_cone_line_style"] = document.getElementById("sol_cone_line_style").value;
		this.Parameters["sol_cone_show_hide"] = document.getElementById("sol_cone_show_hide").checked;
		this.Parameters["sol_cone_hide_stroke"] = document.getElementById("sol_cone_hide_stroke").valueAsNumber;
		this.Parameters["sol_cone_hide_color"] = document.getElementById("sol_cone_hide_color").getAttribute("data-color");
		this.Parameters["sol_cone_hide_style"] = document.getElementById("sol_cone_hide_style").value;
		this.Parameters["sol_cone_fill_base"] = document.getElementById("sol_cone_fill_base").checked;
		this.Parameters["sol_cone_fill_base_color"] = document.getElementById("sol_cone_fill_base_color").getAttribute("data-color");
		this.Parameters["sol_cone_fill_base_type"] = document.getElementById("sol_cone_fill_base_type").selectedIndex;
		this.Parameters["sol_cone_fill"] = document.getElementById("sol_cone_fill").checked;
		this.Parameters["sol_cone_fill_color"] = document.getElementById("sol_cone_fill_color").getAttribute("data-color");
		this.Parameters["sol_cone_fill_shadow"] = document.getElementById("sol_cone_fill_shadow").checked;
		this.Parameters["sol_cone_fill_type"] = document.getElementById("sol_cone_fill_type").selectedIndex;
		this.Parameters["sol_cone_h"] = document.getElementById("sol_cone_h").checked;
		this.Parameters["sol_cone_h_stroke"] = document.getElementById("sol_cone_h_stroke").valueAsNumber;
		this.Parameters["sol_cone_h_color"] = document.getElementById("sol_cone_h_color").getAttribute("data-color");
		this.Parameters["sol_cone_h_style"] = document.getElementById("sol_cone_h_style").value;
		this.Parameters["sol_cone_r"] = document.getElementById("sol_cone_r").checked;
		this.Parameters["sol_cone_r_stroke"] = document.getElementById("sol_cone_r_stroke").valueAsNumber;
		this.Parameters["sol_cone_r_color"] = document.getElementById("sol_cone_r_color").getAttribute("data-color");
		this.Parameters["sol_cone_r_style"] = document.getElementById("sol_cone_r_style").value;
		this.Parameters["sol_cone_ag"] = document.getElementById("sol_cone_ag").checked;
		this.Parameters["sol_cone_ag_full"] = document.getElementById("sol_cone_ag_full").checked;
		this.Parameters["sol_cone_ag_stroke"] = document.getElementById("sol_cone_ag_stroke").valueAsNumber;
		this.Parameters["sol_cone_ag_color"] = document.getElementById("sol_cone_ag_color").getAttribute("data-color");
		this.Parameters["sol_cone_ag_style"] = document.getElementById("sol_cone_ag_style").value;
		

		this.Parameters["sol_sphere_R"] = document.getElementById("sol_sphere_R").valueAsNumber;
		this.Parameters["sol_sphere_A"] = document.getElementById("sol_sphere_A").valueAsNumber;
		this.Parameters["sol_sphere_line_stroke"] = document.getElementById("sol_sphere_line_stroke").valueAsNumber;
		this.Parameters["sol_sphere_line_color"] = document.getElementById("sol_sphere_line_color").getAttribute("data-color");
		this.Parameters["sol_sphere_line_style"] = document.getElementById("sol_sphere_line_style").value;
		this.Parameters["sol_sphere_show_hide"] = document.getElementById("sol_sphere_show_hide").checked;
		this.Parameters["sol_sphere_hide_stroke"] = document.getElementById("sol_sphere_hide_stroke").valueAsNumber;
		this.Parameters["sol_sphere_hide_color"] = document.getElementById("sol_sphere_hide_color").getAttribute("data-color");
		this.Parameters["sol_sphere_hide_style"] = document.getElementById("sol_sphere_hide_style").value;
		this.Parameters["sol_sphere_fill"] = document.getElementById("sol_sphere_fill").checked;
		this.Parameters["sol_sphere_fill_color"] = document.getElementById("sol_sphere_fill_color").getAttribute("data-color");
		this.Parameters["sol_sphere_fill_shadow"] = document.getElementById("sol_sphere_fill_shadow").checked;
		this.Parameters["sol_sphere_fill_type"] = document.getElementById("sol_sphere_fill_type").selectedIndex;
		this.Parameters["sol_sphere_equ"] = document.getElementById("sol_sphere_equ").checked;
		this.Parameters["sol_sphere_equ_stroke"] = document.getElementById("sol_sphere_equ_stroke").valueAsNumber;
		this.Parameters["sol_sphere_equ_color"] = document.getElementById("sol_sphere_equ_color").getAttribute("data-color");
		this.Parameters["sol_sphere_lon"] = document.getElementById("sol_sphere_lon").checked;
		this.Parameters["sol_sphere_lon_angle"] = document.getElementById("sol_sphere_lon_angle").valueAsNumber;
		this.Parameters["sol_sphere_lon_stroke"] = document.getElementById("sol_sphere_lon_stroke").valueAsNumber;
		this.Parameters["sol_sphere_lon_color"] = document.getElementById("sol_sphere_lon_color").getAttribute("data-color");
		this.Parameters["sol_sphere_lat"] = document.getElementById("sol_sphere_lat").checked;
		this.Parameters["sol_sphere_lat_angle"] = document.getElementById("sol_sphere_lat_angle").valueAsNumber;
		this.Parameters["sol_sphere_lat_stroke"] = document.getElementById("sol_sphere_lat_stroke").valueAsNumber;
		this.Parameters["sol_sphere_lat_color"] = document.getElementById("sol_sphere_lat_color").getAttribute("data-color");
		this.Parameters["sol_sphere_pol"] = document.getElementById("sol_sphere_pol").checked;
		this.Parameters["sol_sphere_pol_stroke"] = document.getElementById("sol_sphere_pol_stroke").valueAsNumber;
		this.Parameters["sol_sphere_pol_color"] = document.getElementById("sol_sphere_pol_color").getAttribute("data-color");
		this.Parameters["sol_sphere_pol_style"] = document.getElementById("sol_sphere_pol_style").value;
		this.Parameters["sol_sphere_rad"] = document.getElementById("sol_sphere_rad").checked;
		this.Parameters["sol_sphere_rad_lon"] = document.getElementById("sol_sphere_rad_lon").valueAsNumber;
		this.Parameters["sol_sphere_rad_lat"] = document.getElementById("sol_sphere_rad_lat").valueAsNumber;
		this.Parameters["sol_sphere_rad_stroke"] = document.getElementById("sol_sphere_rad_stroke").valueAsNumber;
		this.Parameters["sol_sphere_rad_color"] = document.getElementById("sol_sphere_rad_color").getAttribute("data-color");
		this.Parameters["sol_sphere_rad_style"] = document.getElementById("sol_sphere_rad_style").value;


		this.Parameters["objects"] = [];
	}

	SetEvents()
	{
		document.getElementById("sol_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_gen_margin").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		
		this.PavDrt_SetEvents()
		this.PrmDrt_SetEvents()
		this.Cylind_SetEvents()
		this.Pyrami_SetEvents()
		this.Cone_SetEvents()
		this.Sphere_SetEvents()
	}

//#region  Pavé droit

	PavDrt_SetEvents()
	{
		document.getElementById("sol_pavdrt_L").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pavdrt_H").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pavdrt_P").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pavdrt_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.PavDrt_SetHiddenLine();})
		document.getElementById("sol_pavdrt_fill_base").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.PavDrt_SetBaseFill()})
		document.getElementById("sol_pavdrt_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_pavdrt_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_pavdrt_fill_base_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_pavdrt_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_pavdrt_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pavdrt_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_pavdrt_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pavdrt_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_pavdrt_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_pavdrt_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_pavdrt_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_pavdrt_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_pavdrt_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pavdrt_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_pavdrt_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pavdrt_hide_color"] = color;
			this.PavDrt_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_pavdrt_fill_base_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pavdrt_fill_base_color"] = color;
			this.PavDrt_SetBaseFill();
		})
		var color = new ColorPicker(document.getElementById("sol_pavdrt_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pavdrt_fill_color"] = color;
			this.Recreate();
		})
	}

	PavDrt_SetHiddenLine()
	{
		if (this.Parameters["sol_pavdrt_show_hide"])
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_pavdrt_hide_color"]})
		else
			this.svg_group["Hidden"].attr({"stroke": "none"})
	}

	PavDrt_SetBaseFill()
	{
		if (this.Parameters["sol_pavdrt_fill_base"])
			this.svg_group["Base"].attr({"fill": this.Parameters["sol_pavdrt_fill_base_color"]})
		else
			this.svg_group["Base"].attr({"fill": "none"})
	}

//#endregion

//#region  Prisme droit

	PrmDrt_SetEvents()
	{
		document.getElementById("sol_prmdrt_L").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_prmdrt_H").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_prmdrt_P").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_prmdrt_F").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_prmdrt_A").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_prmdrt_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.PrmDrt_SetHiddenLine();})
		document.getElementById("sol_prmdrt_fill_base").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.PrmDrt_SetBaseFill()})
		document.getElementById("sol_prmdrt_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_prmdrt_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_prmdrt_fill_base_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_prmdrt_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_prmdrt_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_prmdrt_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_prmdrt_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_prmdrt_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_prmdrt_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_prmdrt_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_prmdrt_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_prmdrt_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_prmdrt_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_prmdrt_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_prmdrt_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_prmdrt_hide_color"] = color;
			this.PrmDrt_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_prmdrt_fill_base_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_prmdrt_fill_base_color"] = color;
			this.PrmDrt_SetBaseFill();
		})
		var color = new ColorPicker(document.getElementById("sol_prmdrt_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_prmdrt_fill_color"] = color;
			this.Recreate();
		})
	}

	PrmDrt_SetHiddenLine()
	{
		if (this.Parameters["sol_prmdrt_show_hide"])
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_prmdrt_hide_color"]})
		else
			this.svg_group["Hidden"].attr({"stroke": "none"})
	}

	PrmDrt_SetBaseFill()
	{
		if (this.Parameters["sol_prmdrt_fill_base"])
			this.svg_group["Base"].attr({"fill": this.Parameters["sol_prmdrt_fill_base_color"]})
		else
			this.svg_group["Base"].attr({"fill": "none"})
	}

//#endregion

//#region  Cylindre

	Cylind_SetEvents()
	{
		document.getElementById("sol_cylind_R").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_cylind_H").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_cylind_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetHiddenLine();})
		document.getElementById("sol_cylind_fill_base").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetBaseFill()})
		document.getElementById("sol_cylind_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_cylind_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_cylind_h").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetHColor()})
		document.getElementById("sol_cylind_r").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetRColor()})
		document.getElementById("sol_cylind_ag").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetAgColor()})
		document.getElementById("sol_cylind_ag_full").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cylind_SetAgFullColor()})
		document.getElementById("sol_cylind_fill_base_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_cylind_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_cylind_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cylind_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cylind_h_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_h_stroke"] = e.target.valueAsNumber;
			this.svg_group["Height"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cylind_r_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_r_stroke"] = e.target.valueAsNumber;
			this.svg_group["Radius"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cylind_ag_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_ag_stroke"] = e.target.valueAsNumber;
			this.svg_group["Angle"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_cylind_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cylind_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cylind_h_style").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_h_style"] = e.target.value;
			this.svg_group["Height"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cylind_r_style").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_r_style"] = e.target.value;
			this.svg_group["Radius"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cylind_ag_style").addEventListener("input", (e) => {
			this.Parameters["sol_cylind_ag_style"] = e.target.value;
			this.svg_group["Angle"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_cylind_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_hide_color"] = color;
			this.Cylind_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_fill_base_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_fill_base_color"] = color;
			this.Cylind_SetBaseFill();
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_fill_color"] = color;
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_h_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_h_color"] = color;
			this.Cylind_SetHColor();
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_r_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_r_color"] = color;
			this.Cylind_SetRColor();
		})
		var color = new ColorPicker(document.getElementById("sol_cylind_ag_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cylind_ag_color"] = color;
			this.Cylind_SetAgColor();
		})
	}

	Cylind_SetHiddenLine()
	{
		if (this.Parameters["sol_cylind_show_hide"])
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_cylind_hide_color"]})
		else
			this.svg_group["Hidden"].attr({"stroke": "none"})
	}

	Cylind_SetBaseFill()
	{
		if (this.Parameters["sol_cylind_fill_base"])
			this.svg_group["Base"].attr({"fill": this.Parameters["sol_cylind_fill_base_color"]})
		else
			this.svg_group["Base"].attr({"fill": "none"})
	}

	Cylind_SetHColor()
	{
		if (this.Parameters["sol_cylind_h"])
			this.svg_group["Height"].attr({"stroke": this.Parameters["sol_cylind_h_color"]})
		else
			this.svg_group["Height"].attr({"stroke": "none"})
	}

	Cylind_SetRColor()
	{
		if (this.Parameters["sol_cylind_r"])
			this.svg_group["Radius"].attr({"stroke": this.Parameters["sol_cylind_r_color"]})
		else
			this.svg_group["Radius"].attr({"stroke": "none"})
	}

	Cylind_SetAgColor()
	{
		if (this.Parameters["sol_cylind_ag"])
			this.svg_group["Angle"].attr({"stroke": this.Parameters["sol_cylind_ag_color"]})
		else
			this.svg_group["Angle"].attr({"stroke": "none"})
		this.Cylind_SetAgFullColor()
	}

	Cylind_SetAgFullColor()
	{
		if (this.Parameters["sol_cylind_ag"] && this.Parameters["sol_cylind_ag_full"])
			this.svg_group["Angle"].attr({"fill": this.Parameters["sol_cylind_ag_color"]})
		else
			this.svg_group["Angle"].attr({"fill": "none"})
	}

//#endregion

//#region  Pyramide

	Pyrami_SetEvents()
	{
		document.getElementById("sol_pyrami_L").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pyrami_H").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pyrami_P").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pyrami_F").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pyrami_A").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_pyrami_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Pyrami_SetHiddenLine();})
		document.getElementById("sol_pyrami_fill_base").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Pyrami_SetBaseFill()})
		document.getElementById("sol_pyrami_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_pyrami_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_pyrami_h").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Pyrami_SetHColor()})
		document.getElementById("sol_pyrami_ag").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Pyrami_SetAgColor()})
		document.getElementById("sol_pyrami_ag_full").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Pyrami_SetAgFullColor()})
		document.getElementById("sol_pyrami_fill_base_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_pyrami_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_pyrami_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_pyrami_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_pyrami_h_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_h_stroke"] = e.target.valueAsNumber;
			this.svg_group["Height"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_pyrami_ag_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_ag_stroke"] = e.target.valueAsNumber;
			this.svg_group["Angle"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_pyrami_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_pyrami_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_pyrami_h_style").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_h_style"] = e.target.value;
			this.svg_group["Height"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_pyrami_ag_style").addEventListener("input", (e) => {
			this.Parameters["sol_pyrami_ag_style"] = e.target.value;
			this.svg_group["Angle"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_pyrami_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_pyrami_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_hide_color"] = color;
			this.Pyrami_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_pyrami_fill_base_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_fill_base_color"] = color;
			this.Pyrami_SetBaseFill();
		})
		var color = new ColorPicker(document.getElementById("sol_pyrami_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_fill_color"] = color;
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("sol_pyrami_h_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_h_color"] = color;
			this.Pyrami_SetHColor();
		})
		var color = new ColorPicker(document.getElementById("sol_pyrami_ag_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_pyrami_ag_color"] = color;
			this.Pyrami_SetAgColor();
		})
	}

	Pyrami_SetHiddenLine()
	{
		if (this.Parameters["sol_pyrami_show_hide"])
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_pyrami_hide_color"]})
		else
			this.svg_group["Hidden"].attr({"stroke": "none"})
	}

	Pyrami_SetBaseFill()
	{
		if (this.Parameters["sol_pyrami_fill_base"])
			this.svg_group["Base"].attr({"fill": this.Parameters["sol_pyrami_fill_base_color"]})
		else
			this.svg_group["Base"].attr({"fill": "none"})
	}

	Pyrami_SetHColor()
	{
		if (this.Parameters["sol_pyrami_h"])
			this.svg_group["Height"].attr({"stroke": this.Parameters["sol_pyrami_h_color"]})
		else
			this.svg_group["Height"].attr({"stroke": "none"})
	}

	Pyrami_SetAgColor()
	{
		if (this.Parameters["sol_pyrami_ag"])
			this.svg_group["Angle"].attr({"stroke": this.Parameters["sol_pyrami_ag_color"]})
		else
			this.svg_group["Angle"].attr({"stroke": "none"})
		this.Pyrami_SetAgFullColor()
	}

	Pyrami_SetAgFullColor()
	{
		if (this.Parameters["sol_pyrami_ag"] && this.Parameters["sol_pyrami_ag_full"])
			this.svg_group["Angle"].attr({"fill": this.Parameters["sol_pyrami_ag_color"]})
		else
			this.svg_group["Angle"].attr({"fill": "none"})
	}

//#endregion

//#region  Cone

	Cone_SetEvents()
	{
		document.getElementById("sol_cone_R").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_cone_H").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_cone_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetHiddenLine();})
		document.getElementById("sol_cone_fill_base").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetBaseFill()})
		document.getElementById("sol_cone_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_cone_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_cone_h").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetHColor()})
		document.getElementById("sol_cone_r").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetRColor()})
		document.getElementById("sol_cone_ag").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetAgColor()})
		document.getElementById("sol_cone_ag_full").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Cone_SetAgFullColor()})
		document.getElementById("sol_cone_fill_base_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		document.getElementById("sol_cone_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_cone_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cone_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cone_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cone_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cone_h_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cone_h_stroke"] = e.target.valueAsNumber;
			this.svg_group["Height"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cone_r_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cone_r_stroke"] = e.target.valueAsNumber;
			this.svg_group["Radius"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_cone_ag_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_cone_ag_stroke"] = e.target.valueAsNumber;
			this.svg_group["Angle"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_cone_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_cone_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cone_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_cone_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cone_h_style").addEventListener("input", (e) => {
			this.Parameters["sol_cone_h_style"] = e.target.value;
			this.svg_group["Height"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cone_r_style").addEventListener("input", (e) => {
			this.Parameters["sol_cone_r_style"] = e.target.value;
			this.svg_group["Radius"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_cone_ag_style").addEventListener("input", (e) => {
			this.Parameters["sol_cone_ag_style"] = e.target.value;
			this.svg_group["Angle"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_cone_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_cone_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_hide_color"] = color;
			this.Cone_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_cone_fill_base_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_fill_base_color"] = color;
			this.Cone_SetBaseFill();
		})
		var color = new ColorPicker(document.getElementById("sol_cone_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_fill_color"] = color;
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("sol_cone_h_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_h_color"] = color;
			this.Cone_SetHColor();
		})
		var color = new ColorPicker(document.getElementById("sol_cone_r_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_r_color"] = color;
			this.Cone_SetRColor();
		})
		var color = new ColorPicker(document.getElementById("sol_cone_ag_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_cone_ag_color"] = color;
			this.Cone_SetAgColor();
		})
	}

	Cone_SetHiddenLine()
	{
		if (this.Parameters["sol_cone_show_hide"])
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_cone_hide_color"]})
		else
			this.svg_group["Hidden"].attr({"stroke": "none"})
	}

	Cone_SetBaseFill()
	{
		if (this.Parameters["sol_cone_fill_base"])
			this.svg_group["Base"].attr({"fill": this.Parameters["sol_cone_fill_base_color"]})
		else
			this.svg_group["Base"].attr({"fill": "none"})
	}

	Cone_SetHColor()
	{
		if (this.Parameters["sol_cone_h"])
			this.svg_group["Height"].attr({"stroke": this.Parameters["sol_cone_h_color"]})
		else
			this.svg_group["Height"].attr({"stroke": "none"})
	}

	Cone_SetRColor()
	{
		if (this.Parameters["sol_cone_r"])
			this.svg_group["Radius"].attr({"stroke": this.Parameters["sol_cone_r_color"]})
		else
			this.svg_group["Radius"].attr({"stroke": "none"})
	}

	Cone_SetAgColor()
	{
		if (this.Parameters["sol_cone_ag"])
			this.svg_group["Angle"].attr({"stroke": this.Parameters["sol_cone_ag_color"]})
		else
			this.svg_group["Angle"].attr({"stroke": "none"})
		this.Cone_SetAgFullColor()
	}

	Cone_SetAgFullColor()
	{
		if (this.Parameters["sol_cone_ag"] && this.Parameters["sol_cone_ag_full"])
			this.svg_group["Angle"].attr({"fill": this.Parameters["sol_cone_ag_color"]})
		else
			this.svg_group["Angle"].attr({"fill": "none"})
	}

//#endregion

//#region  Cone

	Sphere_SetEvents()
	{
		document.getElementById("sol_sphere_R").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_A").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_lon_angle").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_lat_angle").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_rad_lat").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_lat_angle").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.valueAsNumber; this.Recreate()})
		document.getElementById("sol_sphere_show_hide").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetHiddenLine();})
		document.getElementById("sol_sphere_fill").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_sphere_fill_shadow").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Recreate()})
		document.getElementById("sol_sphere_equ").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetEqu()})
		document.getElementById("sol_sphere_lon").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetLon()})
		document.getElementById("sol_sphere_lat").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetLat()})
		document.getElementById("sol_sphere_pol").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetPol()})
		document.getElementById("sol_sphere_rad").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.checked; this.Sphere_SetRad()})
		document.getElementById("sol_sphere_fill_type").addEventListener("input", (e) => { this.Parameters[e.target.id] = e.target.selectedIndex; this.Recreate()})
		
		document.getElementById("sol_sphere_line_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_line_stroke"] = e.target.valueAsNumber;
			this.svg_group["Main"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_hide_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_hide_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_equ_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_equ_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden_Equ"].attr({"stroke-width": e.target.valueAsNumber})
			this.svg_group["Equ"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_lon_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_lon_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden_Lon"].attr({"stroke-width": e.target.valueAsNumber})
			this.svg_group["Lon"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_lat_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_lat_stroke"] = e.target.valueAsNumber;
			this.svg_group["Hidden_Lat"].attr({"stroke-width": e.target.valueAsNumber})
			this.svg_group["Lat"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_pol_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_pol_stroke"] = e.target.valueAsNumber;
			this.svg_group["Pol"].attr({"stroke-width": e.target.valueAsNumber})
		})
		document.getElementById("sol_sphere_rad_stroke").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_rad_stroke"] = e.target.valueAsNumber;
			this.svg_group["Radius"].attr({"stroke-width": e.target.valueAsNumber})
		})

		document.getElementById("sol_sphere_line_style").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_line_style"] = e.target.value;
			this.svg_group["Main"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_sphere_hide_style").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_hide_style"] = e.target.value;
			this.svg_group["Hidden"].attr({"stroke-dasharray": e.target.value})
			this.svg_group["Hidden_Equ"].attr({"stroke-dasharray": e.target.value})
			this.svg_group["Hidden_Lon"].attr({"stroke-dasharray": e.target.value})
			this.svg_group["Hidden_Lat"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_sphere_pol_style").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_pol_style"] = e.target.value;
			this.svg_group["Pol"].attr({"stroke-dasharray": e.target.value})
		})
		document.getElementById("sol_sphere_rad_style").addEventListener("input", (e) => {
			this.Parameters["sol_sphere_rad_style"] = e.target.value;
			this.svg_group["Radius"].attr({"stroke-dasharray": e.target.value})
		})


		var color = new ColorPicker(document.getElementById("sol_sphere_line_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_line_color"] = color;
			this.svg_group["Main"].attr({"stroke": color})
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_hide_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_hide_color"] = color;
			this.Sphere_SetHiddenLine();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_fill_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_fill_color"] = color;
			this.Recreate();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_equ_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_equ_color"] = color;
			this.Sphere_SetEqu();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_lon_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_lon_color"] = color;
			this.Sphere_SetLon();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_lat_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_lat_color"] = color;
			this.Sphere_SetLat();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_pol_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_pol_color"] = color;
			this.Sphere_SetPol();
		})
		var color = new ColorPicker(document.getElementById("sol_sphere_rad_color"), base_options_colorpicker)
		color.on('pick', (color) => { 
			this.Parameters["sol_sphere_rad_color"] = color;
			this.Sphere_SetRad();
		})
	}

	Sphere_SetHiddenLine()
	{
		if (this.Parameters["sol_sphere_show_hide"])
		{
			this.svg_group["Hidden"].attr({"stroke": this.Parameters["sol_sphere_hide_color"]})
			this.svg_group["Hidden_Equ"].attr({"stroke": this.Parameters["sol_sphere_equ"] ? this.Parameters["sol_sphere_equ_color"] : "none"})
			this.svg_group["Hidden_Lon"].attr({"stroke": this.Parameters["sol_sphere_lon"] ? this.Parameters["sol_sphere_lon_color"] : "none"})
			this.svg_group["Hidden_Lat"].attr({"stroke": this.Parameters["sol_sphere_lat"] ? this.Parameters["sol_sphere_lat_color"] : "none"})
		}
		else
		{
			this.svg_group["Hidden"].attr({"stroke": "none"})
			this.svg_group["Hidden_Equ"].attr({"stroke": "none"})
			this.svg_group["Hidden_Lon"].attr({"stroke": "none"})
			this.svg_group["Hidden_Lat"].attr({"stroke": "none"})
		}
	}

	Sphere_SetEqu()
	{
		if (this.Parameters["sol_sphere_equ"])
		{
			this.svg_group["Hidden_Equ"].attr({"stroke": this.Parameters["sol_sphere_show_hide"] ? this.Parameters["sol_sphere_equ_color"] : "none"})
			this.svg_group["Equ"].attr({"stroke": this.Parameters["sol_sphere_equ_color"]})
		}
		else
		{
			this.svg_group["Hidden_Equ"].attr({"stroke": "none"})
			this.svg_group["Equ"].attr({"stroke": "none"})
		}
	}

	Sphere_SetLon()
	{
		if (this.Parameters["sol_sphere_lon"])
		{
			this.svg_group["Hidden_Lon"].attr({"stroke": this.Parameters["sol_sphere_show_hide"] ? this.Parameters["sol_sphere_lon_color"] : "none"})
			this.svg_group["Lon"].attr({"stroke": this.Parameters["sol_sphere_lon_color"]})
		}
		else
		{
			this.svg_group["Hidden_Lon"].attr({"stroke": "none"})
			this.svg_group["Lon"].attr({"stroke": "none"})
		}
	}

	Sphere_SetLat()
	{
		if (this.Parameters["sol_sphere_lat"])
		{
			this.svg_group["Hidden_Lat"].attr({"stroke": this.Parameters["sol_sphere_show_hide"] ? this.Parameters["sol_sphere_lat_color"] : "none"})
			this.svg_group["Lat"].attr({"stroke": this.Parameters["sol_sphere_lat_color"]})
		}
		else
		{
			this.svg_group["Hidden_Lat"].attr({"stroke": "none"})
			this.svg_group["Lat"].attr({"stroke": "none"})
		}
	}

	Sphere_SetPol()
	{
		if (this.Parameters["sol_sphere_pol"])
			this.svg_group["Pol"].attr({"stroke": this.Parameters["sol_sphere_pol_color"]})
		else
			this.svg_group["Pol"].attr({"stroke": "none"})
	}

	Sphere_SetRad()
	{
		if (this.Parameters["sol_sphere_rad"])
			this.svg_group["Radius"].attr({"stroke": this.Parameters["sol_sphere_rad_color"]})
		else
			this.svg_group["Radius"].attr({"stroke": "none"})
	}

//#endregion

	ox; oy;
	w; h; pdx; sdx; pdy; sdy; hy; hx; vx; vy;

	Recreate()
	{
		let s = this.GetSize()
		let w = s[0]
		let h = s[1]
		this.EM.SetSize(w, h);
		this.EM.SetMargin(this.Parameters["sol_gen_margin"]);
		this.EM.Clear()
		

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

		switch (this.Parameters["sol_type"]) {
			case 0:
				this.Create_PaveDroit(); break;
			case 1:
				this.Create_PrismeDroit(); break;
			case 2:
				this.Create_Cylindre(); break;
			case 3:
				this.Create_Pyramide(); break;
			case 4:
				this.Create_Cone(); break;
			case 5:
				this.Create_Sphere(); break;
			default:
				return [];
		}
		super.DrawObjects(this.svg_group["Objects"], this.Parameters["objects"]);
	}

	GetSize()
	{
		switch (this.Parameters["sol_type"]) {
			case 0:
				return [
					this.Parameters["sol_pavdrt_L"] + this.Parameters["sol_pavdrt_P"] / 2.0 + 10,
					this.Parameters["sol_pavdrt_H"] + this.Parameters["sol_pavdrt_P"] / 2.0 + 10,
				]
			case 1:
				return [
					this.Parameters["sol_prmdrt_L"] * 1.5 + 10,
					this.Parameters["sol_prmdrt_H"] + this.Parameters["sol_prmdrt_P"] / 2.0 + 10,
				]
			case 2:
				return [
					this.Parameters["sol_cylind_R"] * 2.0 + 10,
					this.Parameters["sol_cylind_H"] + this.Parameters["sol_cylind_R"] + 10,
				]
			case 3:
				return [
					this.Parameters["sol_pyrami_L"] * 1.5 + 10,
					this.Parameters["sol_pyrami_H"] + this.Parameters["sol_pyrami_P"] / 4.0 + 10,
				]
			case 4:
				return [
					this.Parameters["sol_cone_R"] * 2 + 10,
					this.Parameters["sol_cone_H"] + this.Parameters["sol_cone_R"] / 2.0 + 10,
				]
			case 5:
				return [
					this.Parameters["sol_sphere_R"] * 2.0 + 10,
					this.Parameters["sol_sphere_R"] * 2.0 + 10,
				]
			default:
				break;
		}
	}

	Create_PaveDroit()
	{
		var Base = this.EM.SVG_Draw.group();
		var Hidden = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Base"] = Base;
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Base"].clear()
		this.svg_group["Hidden"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()

		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": "none"
			}
		)

		this.svg_group["Base"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_pavdrt_fill_base"] ? this.Parameters["sol_pavdrt_fill_base_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_pavdrt_fill_base_type"]
		if (fill_pattern > 0)
			this.svg_group["Base"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.svg_group["Base"].unmask()


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_pavdrt_fill"] ? this.Parameters["sol_pavdrt_fill_color"] : "none",
			}
		)
		fill_pattern = this.Parameters["sol_pavdrt_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_pavdrt_fill"] && this.Parameters["sol_pavdrt_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()

		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pavdrt_show_hide"] ? this.Parameters["sol_pavdrt_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_pavdrt_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pavdrt_hide_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pavdrt_line_color"],
				"stroke-width": this.Parameters["sol_pavdrt_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pavdrt_line_style"],

			}
		)

		let x1 = this.size.grad.left_x;
		let x2 = x1 + this.Parameters["sol_pavdrt_P"] / 2.0;
		let x3 = x1 + this.Parameters["sol_pavdrt_L"];
		let x4 = this.size.grad.right_x;
		let y1 = this.size.grad.top_y;
		let y2 = y1 + this.Parameters["sol_pavdrt_P"] / 2.0;
		let y3 = y1 + this.Parameters["sol_pavdrt_H"];
		let y4 = this.size.grad.bottom_y;

		this.svg_group["Main"].polygon([[x1, y2], [x3, y2], [x3, y4], [x1, y4]]);
		this.svg_group["Main"].polygon([[x1, y2], [x3, y2], [x4, y1], [x2, y1]]);
		this.svg_group["Main"].polygon([[x3, y2], [x3, y4], [x4, y3], [x4, y1]]);

		this.svg_group["Hidden"].line(x1, y4, x2, y3);
		this.svg_group["Hidden"].line(x2, y1, x2, y3);
		this.svg_group["Hidden"].line(x4, y3, x2, y3);

		this.svg_group["Base"].polygon([[x1, y4], [x2, y3], [x4, y3], [x3, y4]]);

		this.svg_group["Fill"].polygon([[x1, y2], [x3, y2], [x3, y4], [x1, y4]]);
		this.svg_group["Fill"].polygon([[x1, y2], [x3, y2], [x4, y1], [x2, y1]]);
		this.svg_group["Fill"].polygon([[x3, y2], [x3, y4], [x4, y3], [x4, y1]]);

		this.svg_group["Shadow"].polygon([[x1, y2], [x3, y2], [x4, y1], [x2, y1]]).attr({"fill": "#00000033"});
		this.svg_group["Shadow"].polygon([[x3, y2], [x3, y4], [x4, y3], [x4, y1]]).attr({"fill": "#00000066"});


		this.svg_group["Base"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
	}

	Create_PrismeDroit()
	{
		var Base = this.EM.SVG_Draw.group();
		var Hidden = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Base"] = Base;
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Base"].clear()
		this.svg_group["Hidden"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()

		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": "none",
				"fill-opacity": 0.3,
			}
		)

		this.svg_group["Base"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_prmdrt_fill_base"] ? this.Parameters["sol_prmdrt_fill_base_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_prmdrt_fill_base_type"]
		if (fill_pattern > 0)
			this.svg_group["Base"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.svg_group["Base"].unmask()


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_prmdrt_fill"] ? this.Parameters["sol_prmdrt_fill_color"] : "none",
			}
		)
		fill_pattern = this.Parameters["sol_prmdrt_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_prmdrt_fill"] && this.Parameters["sol_prmdrt_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()

		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_prmdrt_show_hide"] ? this.Parameters["sol_prmdrt_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_prmdrt_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_prmdrt_hide_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_prmdrt_line_color"],
				"stroke-width": this.Parameters["sol_prmdrt_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_prmdrt_line_style"],

			}
		)
		
		let h = this.Parameters["sol_prmdrt_H"]
		let rx = this.size.grad.width / 2.0;
		let ry = (this.size.grad.height - h) / 2.0;

		let cx = this.size.base.width / 2.0;
		let cy= this.size.grad.top_y + ry ;
		
		let edge_c = this.Parameters["sol_prmdrt_F"]

		let off_set_a = this.Parameters["sol_prmdrt_A"] / 180.0 * Math.PI;
		let da = Math.PI * 2.0 / edge_c;

		let circle_points = []

		for (let i = 0; i < edge_c; i++) {
			let x = cx + rx * Math.cos(da * i + off_set_a);
			let y = cy + ry * Math.sin(da * i + off_set_a);
			circle_points.push([x, y])
		}

		for (let i = 0; i < edge_c; i++) 
		{
			let p1 = circle_points[i];
			let p2 = circle_points[(i + 1) % edge_c];
			let p3 = circle_points[(i + edge_c - 1) % edge_c];
			this.svg_group["Main"].line(p1[0], p1[1], p2[0], p2[1]);
			if (p2[0] <= p1[0])
			{
				this.svg_group["Main"].line(p1[0], p1[1] + h, p2[0], p2[1] + h);
				this.svg_group["Main"].line(p1[0], p1[1], p1[0], p1[1] + h);
			}
			else if (p1[0] < p3[0])
			{
				this.svg_group["Main"].line(p1[0], p1[1], p1[0], p1[1] + h);
				if (this.Parameters["sol_prmdrt_show_hide"])
				{
					this.svg_group["Hidden"].line(p1[0], p1[1] + h, p2[0], p2[1] + h);
				}
			}
			else if (this.Parameters["sol_prmdrt_show_hide"])
			{
				this.svg_group["Hidden"].line(p1[0], p1[1] + h, p2[0], p2[1] + h);
				this.svg_group["Hidden"].line(p1[0], p1[1], p1[0], p1[1] + h);
			}
		}

		if (this.Parameters["sol_prmdrt_fill"])
		{
			this.svg_group["Fill"].polygon(circle_points);
			this.svg_group["Shadow"].polygon(circle_points).attr({"fill": "#00000033"});

			for (let i = 0; i < edge_c; i++) 
			{
				let p1 = circle_points[i];
				let p2 = circle_points[(i + 1) % edge_c];
				if (p2[0] <= p1[0])
				{
					let p3 = [p2[0], p2[1] + h]
					let p4 = [p1[0], p1[1] + h]
					this.svg_group["Fill"].polygon([p1, p2, p3, p4]);

					let coef = Math.pow(Math.asin(Math.abs((p1[0] + p2[0]) / 2 - cx) * 2 / this.size.base.width), 4);
					this.svg_group["Shadow"].polygon([p1, p2, p3, p4]).attr({"fill": "#000000", "fill-opacity": coef});
				}
			}
		}

		let base_pol = []
		for (let i = 0; i < circle_points.length; i++) {
			const element = circle_points[i];
			base_pol.push([element[0], element[1] + h])
		}
		this.svg_group["Base"].polygon(base_pol);


		this.svg_group["Base"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
	}

	Create_Cylindre()
	{
		var Base = this.EM.SVG_Draw.group();
		var Hidden = this.EM.SVG_Draw.group();
		var Angle = this.EM.SVG_Draw.group();
		var Height = this.EM.SVG_Draw.group();
		var Radius = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Base"] = Base;
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Height"] = Height;
		this.svg_group["Radius"] = Radius;
		this.svg_group["Angle"] = Angle;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Base"].clear()
		this.svg_group["Hidden"].clear()
		this.svg_group["Height"].clear()
		this.svg_group["Radius"].clear()
		this.svg_group["Angle"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()


		var gradient = this.svg_group["Shadow"].gradient('linear', function(add) {
			add.stop({ offset: 0, color: '#000', opacity: 0.3 })
			add.stop({ offset: 0.5, color: '#000', opacity: 0 })
			add.stop({ offset: 1, color: '#000', opacity: 0.3 })
		})
		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": gradient,
			}
		)

		this.svg_group["Base"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_cylind_fill_base"] ? this.Parameters["sol_cylind_fill_base_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_cylind_fill_base_type"]
		if (fill_pattern > 0)
			this.svg_group["Base"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.svg_group["Base"].unmask()


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_cylind_fill"] ? this.Parameters["sol_cylind_fill_color"] : "none",
			}
		)
		fill_pattern = this.Parameters["sol_cylind_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_cylind_fill"] && this.Parameters["sol_cylind_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()

		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cylind_show_hide"] ? this.Parameters["sol_cylind_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_cylind_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cylind_hide_style"],
			}
		)
		this.svg_group["Height"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cylind_h"] ? this.Parameters["sol_cylind_h_color"] : "none",
				"stroke-width": this.Parameters["sol_cylind_h_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cylind_h_style"],
			}
		)
		this.svg_group["Radius"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cylind_r"] ? this.Parameters["sol_cylind_r_color"] : "none",
				"stroke-width": this.Parameters["sol_cylind_r_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cylind_r_style"],
			}
		)
		this.svg_group["Angle"].attr(
			{
				"fill": this.Parameters["sol_cylind_ag"] && this.Parameters["sol_cylind_ag_full"] ? this.Parameters["sol_cylind_ag_color"] : "none",
				"fill-opacity": 0.6,
				"stroke": this.Parameters["sol_cylind_ag"] ? this.Parameters["sol_cylind_ag_color"] : "none",
				"stroke-width": this.Parameters["sol_cylind_ag_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cylind_ag_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cylind_line_color"],
				"stroke-width": this.Parameters["sol_cylind_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cylind_line_style"],

			}
		)
		
		let h = this.Parameters["sol_cylind_H"]
		let rx = this.size.grad.width / 2.0;
		let ry = (this.size.grad.height - h) / 2.0;

		let cx = this.size.base.width / 2.0;
		let cy= this.size.grad.top_y + ry ;


		this.svg_group["Main"].ellipse(rx * 2, ry * 2).center(cx, cy);
		this.svg_group["Shadow"].ellipse(rx * 2, ry * 2).center(cx, cy).attr({"fill": "#00000033"});
		this.svg_group["Main"].line(cx - rx, cy, cx - rx, cy + h);
		this.svg_group["Main"].line(cx + rx, cy, cx + rx, cy + h);
		this.svg_group["Base"].ellipse(rx * 2, ry * 2).center(cx, cy + h);
		this.DrawEllipseArc(this.svg_group["Main"], {x: cx, y: cy + h}, 0, 180, rx, ry, false);
		this.DrawEllipseArc(this.svg_group["Hidden"], {x: cx, y: cy + h}, 180, 360, rx, ry, false);


		let txt = "M" + (cx + rx).toString() + " " + cy.toString() + " A " + rx.toString() + " " + ry.toString() + " 0 0 1" + (cx - rx).toString() + " " + cy.toString();
		txt += "L " + (cx - rx).toString() + " " +  (cy + h).toString()
		txt += "A " + rx.toString() + " " + ry.toString() + " 0 0 0" + (cx + rx).toString() + " " + (cy + h).toString();
		txt += "Z"

		this.svg_group["Fill"].ellipse(rx * 2, ry * 2).center(cx, cy);
		this.svg_group["Fill"].path(txt)
		this.svg_group["Shadow"].path(txt)

		this.svg_group["Height"].line(cx, cy, cx, cy + h);

		let radx = cx + rx * Math.cos(Math.PI / 4);
		let rady = cy + h + ry * Math.sin(Math.PI / 4);

		let radl = Math.sqrt(Math.pow(radx - cx, 2) + Math.pow(rady - (cy + h), 2));

		this.svg_group["Radius"].line(cx, cy + h, radx, rady);
		let anglepoints = [
			[cx, cy + h],
			[cx, cy + h - 20],
			[cx + (radx - cx) / radl * 20, cy + h - 20 + (rady - (cy + h)) / radl * 20],
			[cx + (radx - cx) / radl * 20, cy + h + (rady - (cy + h)) / radl * 20],
		]
		this.svg_group["Angle"].polygon(anglepoints);


		this.svg_group["Base"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Height"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Radius"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Angle"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
	}

	Create_Pyramide()
	{
		var Base = this.EM.SVG_Draw.group();
		var Hidden = this.EM.SVG_Draw.group();
		var Angle = this.EM.SVG_Draw.group();
		var Height = this.EM.SVG_Draw.group();
		var Radius = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Base"] = Base;
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Height"] = Height;
		this.svg_group["Radius"] = Radius;
		this.svg_group["Angle"] = Angle;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Base"].clear()
		this.svg_group["Hidden"].clear()
		this.svg_group["Height"].clear()
		this.svg_group["Radius"].clear()
		this.svg_group["Angle"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()


		var gradient = this.svg_group["Shadow"].gradient('linear', function(add) {
			add.stop({ offset: 0, color: '#000', opacity: 0.3 })
			add.stop({ offset: 0.5, color: '#000', opacity: 0 })
			add.stop({ offset: 1, color: '#000', opacity: 0.3 })
		})
		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": gradient,
			}
		)

		this.svg_group["Base"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_pyrami_fill_base"] ? this.Parameters["sol_pyrami_fill_base_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_pyrami_fill_base_type"]
		if (fill_pattern > 0)
			this.svg_group["Base"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.svg_group["Base"].unmask()


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_pyrami_fill"] ? this.Parameters["sol_pyrami_fill_color"] : "none",
			}
		)
		fill_pattern = this.Parameters["sol_pyrami_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_pyrami_fill"] && this.Parameters["sol_pyrami_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()

		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pyrami_show_hide"] ? this.Parameters["sol_pyrami_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_pyrami_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pyrami_hide_style"],
			}
		)
		this.svg_group["Height"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pyrami_h"] ? this.Parameters["sol_pyrami_h_color"] : "none",
				"stroke-width": this.Parameters["sol_pyrami_h_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pyrami_h_style"],
			}
		)
		this.svg_group["Radius"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pyrami_r"] ? this.Parameters["sol_pyrami_r_color"] : "none",
				"stroke-width": this.Parameters["sol_pyrami_r_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pyrami_r_style"],
			}
		)
		this.svg_group["Angle"].attr(
			{
				"fill": this.Parameters["sol_pyrami_ag"] && this.Parameters["sol_pyrami_ag_full"] ? this.Parameters["sol_pyrami_ag_color"] : "none",
				"fill-opacity": 0.6,
				"stroke": this.Parameters["sol_pyrami_ag"] ? this.Parameters["sol_pyrami_ag_color"] : "none",
				"stroke-width": this.Parameters["sol_pyrami_ag_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pyrami_ag_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_pyrami_line_color"],
				"stroke-width": this.Parameters["sol_pyrami_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_pyrami_line_style"],

			}
		)
		
		let h = this.Parameters["sol_pyrami_H"]
		let rx = this.size.grad.width / 2.0;
		let ry = (this.size.grad.height - h);

		let cx = this.size.base.width / 2.0;
		let cy= this.size.grad.top_y;
		
		let edge_c = this.Parameters["sol_pyrami_F"]

		let off_set_a = this.Parameters["sol_pyrami_A"] / 180.0 * Math.PI;
		let da = Math.PI * 2.0 / edge_c;

		let circle_points = []

		for (let i = 0; i < edge_c; i++) {
			let x = cx + rx * Math.cos(da * i + off_set_a);
			let y = cy + ry * Math.sin(da * i + off_set_a) + h;
			circle_points.push([x, y])
		}

		this.svg_group["Base"].polygon(circle_points);

		for (let i = 0; i < edge_c; i++) 
		{
			let p1 = circle_points[i];
			let p2 = circle_points[(i + 1) % edge_c];
			let p3 = circle_points[(i + edge_c - 1) % edge_c];

			let a1 = Math.atan2(p1[1] - cy, p1[0] - cx)
			let a2 = Math.atan2(p2[1] - cy, p2[0] - cx)
			let a3 = Math.atan2(p3[1] - cy, p3[0] - cx)
		
			let p4 = {x: (p1[0] + p2[0]) / 2.0, y: (p1[1] + p2[1]) / 2.0}
			let a4 = Math.atan2(p4.y - cy, p4.x - cx)

			if (a4 < a2 || a4 > a1)
			{
				this.svg_group["Main"].line(p1[0], p1[1], p2[0], p2[1]);
			}
			else
			{
				this.svg_group["Hidden"].line(p1[0], p1[1], p2[0], p2[1]);
			}
			if (a1 < a2 || a1 > a3)
			{
				this.svg_group["Main"].line(p1[0], p1[1], cx, cy);
			}
			else
			{
				this.svg_group["Hidden"].line(p1[0], p1[1], cx, cy);
			}
		}

		for (let i = 0; i < edge_c; i++) 
		{
			let p1 = circle_points[i];
			let p2 = circle_points[(i + 1) % edge_c];
			let p3 = [(p1[0] + p2[0]) / 2.0, (p1[1] + p2[1]) / 2.0]
			let a1 = Math.atan2(p1[1] - cy, p1[0] - cx)
			let a2 = Math.atan2(p2[1] - cy, p2[0] - cx)
			let a3 = Math.atan2(p3[1] - cy, p3[0] - cx)
			if (a3 < a2 || a3 > a1)
			{
				this.svg_group["Fill"].polygon([p1, p2, [cx, cy]]);

				let coef = Math.pow(Math.asin(Math.abs((p1[0] + p2[0]) / 2 - cx) * 2 / this.size.base.width), 4);
				this.svg_group["Shadow"].polygon([p1, p2, [cx, cy]]).attr({"fill": "#000000", "fill-opacity": coef});
			}
		}

		this.svg_group["Height"].line(cx, cy, cx, cy + h);

		let radx = cx + rx * Math.cos(Math.PI / 4);
		let rady = cy + h + ry * Math.sin(Math.PI / 4);

		let radl = Math.sqrt(Math.pow(radx - cx, 2) + Math.pow(rady - (cy + h), 2));

		let anglepoints = [
			[cx, cy + h],
			[cx, cy + h - 20],
			[cx + (radx - cx) / radl * 20, cy + h - 20 + (rady - (cy + h)) / radl * 20],
			[cx + (radx - cx) / radl * 20, cy + h + (rady - (cy + h)) / radl * 20],
		]
		this.svg_group["Angle"].polygon(anglepoints);


		this.svg_group["Base"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Height"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Radius"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Angle"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
	}

	Create_Cone()
	{
		var Base = this.EM.SVG_Draw.group();
		var Hidden = this.EM.SVG_Draw.group();
		var Angle = this.EM.SVG_Draw.group();
		var Height = this.EM.SVG_Draw.group();
		var Radius = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Base"] = Base;
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Height"] = Height;
		this.svg_group["Radius"] = Radius;
		this.svg_group["Angle"] = Angle;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

	
		this.svg_group["Base"].clear()
		this.svg_group["Hidden"].clear()
		this.svg_group["Height"].clear()
		this.svg_group["Radius"].clear()
		this.svg_group["Angle"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()


		var gradient = this.svg_group["Shadow"].gradient('radial', function(add) {
			add.stop({ offset: 0, color: '#000', opacity: 0 })
			add.stop({ offset: 1, color: '#000', opacity: 0.3 })
		}).from(0.5,0).to(0.5,0.5).attr({gradientTransform:"scale(1.0, 1.5)"})
		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": gradient,
			}
		)

		this.svg_group["Base"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_cone_fill_base"] ? this.Parameters["sol_cone_fill_base_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_cone_fill_base_type"]
		if (fill_pattern > 0)
			this.svg_group["Base"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		else
			this.svg_group["Base"].unmask()


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_cone_fill"] ? this.Parameters["sol_cone_fill_color"] : "none",
			}
		)
		fill_pattern = this.Parameters["sol_cone_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_cone_fill"] && this.Parameters["sol_cone_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()

		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cone_show_hide"] ? this.Parameters["sol_cone_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_cone_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cone_hide_style"],
			}
		)
		this.svg_group["Height"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cone_h"] ? this.Parameters["sol_cone_h_color"] : "none",
				"stroke-width": this.Parameters["sol_cone_h_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cone_h_style"],
			}
		)
		this.svg_group["Radius"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cone_r"] ? this.Parameters["sol_cone_r_color"] : "none",
				"stroke-width": this.Parameters["sol_cone_r_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cone_r_style"],
			}
		)
		this.svg_group["Angle"].attr(
			{
				"fill": this.Parameters["sol_cone_ag"] && this.Parameters["sol_cone_ag_full"] ? this.Parameters["sol_cone_ag_color"] : "none",
				"fill-opacity": 0.6,
				"stroke": this.Parameters["sol_cone_ag"] ? this.Parameters["sol_cone_ag_color"] : "none",
				"stroke-width": this.Parameters["sol_cone_ag_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cone_ag_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_cone_line_color"],
				"stroke-width": this.Parameters["sol_cone_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_cone_line_style"],

			}
		)

		let h = this.Parameters["sol_cone_H"]
		let rx = this.size.grad.width / 2.0;
		let ry = (this.size.grad.height - h);

		let cx = this.size.base.width / 2.0;
		let cy= this.size.grad.top_y + h ;


		// Calcul des points de tangence à l'ellipse
		let y = - ry * ry / h;
		let x = rx * Math.sqrt(1 - ry * ry / (h * h))

		this.svg_group["Base"].ellipse(rx * 2, ry * 2).center(cx, cy);
		let txt = "M" + (cx + x).toString() + " " + (cy + y).toString() + " A " + rx.toString() + " " + ry.toString() + " 0 1 1" + (cx - x).toString() + " " + (cy + y).toString();
		
		this.svg_group["Hidden"].path(txt.replace("0 1 1", "0 0 0"));

		txt += "L " + cx.toString() + " " +  (cy - h).toString()
		txt += "Z"
		
		this.svg_group["Main"].path(txt);
		this.svg_group["Fill"].path(txt)
		this.svg_group["Shadow"].path(txt)

		this.svg_group["Height"].line(cx, cy, cx, cy - h);

		let radx = cx + rx * Math.cos(Math.PI / 4);
		let rady = cy + ry * Math.sin(Math.PI / 4);

		let radl = Math.sqrt(Math.pow(radx - cx, 2) + Math.pow(rady - cy, 2));

		this.svg_group["Radius"].line(cx, cy, radx, rady);
		let anglepoints = [
			[cx, cy],
			[cx, cy - 20],
			[cx + (radx - cx) / radl * 20, cy - 20 + (rady - cy) / radl * 20],
			[cx + (radx - cx) / radl * 20, cy + (rady - cy) / radl * 20],
		]
		this.svg_group["Angle"].polygon(anglepoints);


		this.svg_group["Base"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Height"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Radius"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Angle"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
	}

	Create_Sphere()
	{
		var Hidden = this.EM.SVG_Draw.group();
		var Hidden_Equ = this.EM.SVG_Draw.group();
		var Hidden_Lon = this.EM.SVG_Draw.group();
		var Hidden_Lat = this.EM.SVG_Draw.group();
		var Pol = this.EM.SVG_Draw.group();
		var Center = this.EM.SVG_Draw.group();
		var Radius = this.EM.SVG_Draw.group();
		var Fill = this.EM.SVG_Draw.group();
		var Shadow = this.EM.SVG_Draw.group();
		var Equ = this.EM.SVG_Draw.group();
		var Lon = this.EM.SVG_Draw.group();
		var Lat = this.EM.SVG_Draw.group();
		var Main = this.EM.SVG_Draw.group();
		var Objects = this.EM.SVG_Draw.group();
		
		this.svg_group["Hidden"] = Hidden;
		this.svg_group["Hidden_Equ"] = Hidden_Equ;
		this.svg_group["Hidden_Lon"] = Hidden_Lon;
		this.svg_group["Hidden_Lat"] = Hidden_Lat;
		this.svg_group["Pol"] = Pol;
		this.svg_group["Center"] = Center;
		this.svg_group["Radius"] = Radius;
		this.svg_group["Fill"] = Fill;
		this.svg_group["Shadow"] = Shadow;
		this.svg_group["Equ"] = Equ;
		this.svg_group["Lon"] = Lon;
		this.svg_group["Lat"] = Lat;
		this.svg_group["Main"] = Main;
		this.svg_group["Objects"] = Objects;

		this.svg_group["Hidden"].clear()
		this.svg_group["Hidden_Equ"].clear()
		this.svg_group["Hidden_Lon"].clear()
		this.svg_group["Hidden_Lat"].clear()
		this.svg_group["Pol"].clear()
		this.svg_group["Center"].clear()
		this.svg_group["Radius"].clear()
		this.svg_group["Fill"].clear()
		this.svg_group["Shadow"].clear()
		this.svg_group["Equ"].clear()
		this.svg_group["Lon"].clear()
		this.svg_group["Lat"].clear()
		this.svg_group["Main"].clear()
		this.svg_group["Objects"].clear()


		var gradient = this.svg_group["Shadow"].gradient('radial', function(add) {
			add.stop({ offset: 0, color: '#000', opacity: 0 })
			add.stop({ offset: 1, color: '#000', opacity: 0.3 })
		})
		this.svg_group["Shadow"].attr(
			{
				"stroke": "none",
				"fill": gradient,
			}
		)


		this.svg_group["Fill"].attr(
			{
				"stroke": "none",
				"fill": this.Parameters["sol_sphere_fill"] ? this.Parameters["sol_sphere_fill_color"] : "none",
			}
		)
		let fill_pattern = this.Parameters["sol_sphere_fill_type"]
		if (fill_pattern > 0)
		{
			this.svg_group["Fill"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
			this.svg_group["Shadow"].maskWith(this.EM.PatternsMask["pattern" + fill_pattern.toString()])
		}
		else
		{
			this.svg_group["Fill"].unmask()
			this.svg_group["Shadow"].unmask()
		}

		if (this.Parameters["sol_sphere_fill"] && this.Parameters["sol_sphere_fill_shadow"])
			this.svg_group["Shadow"].show()
		else
			this.svg_group["Shadow"].hide()


		this.svg_group["Hidden"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_show_hide"] ? this.Parameters["sol_sphere_hide_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_hide_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_hide_style"],
			}
		)
		this.svg_group["Hidden_Equ"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_show_hide"] && this.Parameters["sol_sphere_equ"] ? this.Parameters["sol_sphere_equ_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_equ_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_hide_style"],
			}
		)
		this.svg_group["Hidden_Lon"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_show_hide"] && this.Parameters["sol_sphere_lon"] ? this.Parameters["sol_sphere_lon_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_lon_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_hide_style"],
			}
		)
		this.svg_group["Hidden_Lat"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_show_hide"] && this.Parameters["sol_sphere_lat"] ? this.Parameters["sol_sphere_lat_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_lat_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_hide_style"],
			}
		)
		this.svg_group["Equ"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_equ"] ? this.Parameters["sol_sphere_equ_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_equ_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)
		this.svg_group["Lon"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_lon"] ? this.Parameters["sol_sphere_lon_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_lon_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)
		this.svg_group["Lat"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_lat"] ? this.Parameters["sol_sphere_lat_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_lat_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}
		)
		this.svg_group["Pol"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_pol"] ? this.Parameters["sol_sphere_pol_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_pol_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_pol_style"],
			}
		)
		this.svg_group["Radius"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_rad"] ? this.Parameters["sol_sphere_rad_color"] : "none",
				"stroke-width": this.Parameters["sol_sphere_rad_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_rad_style"],
			}
		)

		this.svg_group["Main"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_line_color"],
				"stroke-width": this.Parameters["sol_sphere_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_line_style"],
			}
		)

		this.svg_group["Center"].attr(
			{
				"fill": "none",
				"stroke": this.Parameters["sol_sphere_line_color"],
				"stroke-width": this.Parameters["sol_sphere_line_stroke"],
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": this.Parameters["sol_sphere_line_style"],
			}
		)

		let R = this.Parameters["sol_sphere_R"]
		let AngleVue = this.Parameters["sol_sphere_A"]

		let sol_sphere_r_lon = this.Parameters["sol_sphere_rad_lon"]
		let sol_sphere_r_lat = this.Parameters["sol_sphere_rad_lat"]
		let sol_sphere_lon_angle = this.Parameters["sol_sphere_lon_angle"]
		let sol_sphere_lat_angle = this.Parameters["sol_sphere_lat_angle"]

		let cx = this.size.base.width / 2.0;
		let cy = this.size.base.height / 2.0;

		this.svg_group["Main"].circle(R * 2).center(cx, cy);

		var get_lat_size = function(h, sphere_r, angle)
		{
			let hr = Math.sqrt(sphere_r * sphere_r - h*h);
			let vr = Math.abs(hr * Math.sin(angle * Math.PI / 180.0));
			let y = h * Math.cos(angle * Math.PI / 180.0);
			return [y, hr, vr];
		}
		var get_lon_size = function(sphere_r, angle, angle_vue)
		{
			let al_r = angle * Math.PI / 180.0
			let av_r = angle_vue * Math.PI / 180.0
			let equate_r = Math.abs(sphere_r * Math.sin(av_r));
			let dx = sphere_r * Math.cos(al_r);
			let dy = equate_r * Math.sin(al_r);
			let ang_ellipse;
			if (dy == 0)
				ang_ellipse = -Math.PI / 2.0;
			else
			{
				ang_ellipse = Math.atan2(-dx, dy);
				if (angle_vue < 0)
					ang_ellipse *= -1
			}
			

			let y1 = sphere_r * Math.cos(av_r);
			let c = 1 - y1 * y1 * Math.sin(ang_ellipse) * Math.sin(ang_ellipse) / (sphere_r * sphere_r);
			let b;
			if (c == 0)
				b = sphere_r * Math.sin(al_r);
			else
				b = y1*Math.cos(ang_ellipse) / Math.sqrt(c);


			return [Round(ang_ellipse, 3), Round(b, 3)]
		}
		
		// Fill
		this.svg_group["Fill"].circle(R * 2).center(cx, cy);
		this.svg_group["Shadow"].circle(R * 2).center(cx, cy);
		// Hauteur
		{
			let y = R * Math.cos(AngleVue * Math.PI / 180.0);
			this.svg_group["Pol"].line(cx, cy + y, cx, cy - y);
		}
		// Rayon
		{
			let h = R * Math.sin(-sol_sphere_r_lat * Math.PI / 180.0)
			let size = get_lat_size(h, R, AngleVue)
			let x, y;
			
			x = size[1] * Math.cos(sol_sphere_r_lon * Math.PI / 180.0 + Math.PI / 2.0);
			if (AngleVue >= 0)
				y = size[2] * Math.sin(sol_sphere_r_lon * Math.PI / 180.0 + Math.PI / 2.0);
			else
				y = -size[2] * Math.sin(sol_sphere_r_lon * Math.PI / 180.0 + Math.PI / 2.0);

	
			this.svg_group["Radius"].line(cx, cy, cx + x, cy + size[0] + y);
		}
		// Center
		{
			this.svg_group["Center"].line(cx - 2, cy - 2, cx + 2, cy + 2);
			this.svg_group["Center"].line(cx - 2, cy + 2, cx + 2, cy - 2);
		}
		// Equateur
		{
			let size = get_lat_size(0, R, AngleVue)
			if (AngleVue == 0)
			{
				this.svg_group["Equ"].line(cx - R, cy, cx + R, cy);
			}
			else
			{
				if (AngleVue > 0)
				{
					this.DrawEllipseArc(this.svg_group["Equ"], {x: cx, y: cy}, 0, 180, R, size[2], false);
					this.DrawEllipseArc(this.svg_group["Hidden_Equ"], {x: cx, y: cy}, 180, 360, R, size[2], false);
				}
				else
				{
					this.DrawEllipseArc(this.svg_group["Equ"], {x: cx, y: cy}, 180, 360, R, size[2], false);
					this.DrawEllipseArc(this.svg_group["Hidden_Equ"], {x: cx, y: cy}, 0, 180, R, size[2], false);
				}
			}
		}
		// Latitude
		{
			let h = R * Math.sin(-sol_sphere_lat_angle * Math.PI / 180.0)
			let size = get_lat_size(h, R, AngleVue)
			let ec = {x: cx, y: cy + size[0]};
			if (AngleVue == 0)
			{
				this.svg_group["Lat"].line(ec.x - size[1], ec.y, ec.x + size[1], ec.y);
			}
			else
			{
				let sol = circleEllipse_intersection({x: cx, y: cy}, R, ec, size[1], size[2]);
				if (sol.length > 1)
				{
					let a1 = (Math.atan2(sol[0].y - ec.y, sol[0].x - ec.x) * 180.0 / Math.PI + 360) % 360;
					let a2 = (Math.atan2(sol[1].y - ec.y, sol[1].x - ec.x) * 180.0 / Math.PI + 360) % 360;
					if (AngleVue > 0)
					{
						if (h < 0)
							this.DrawEllipseArc(this.svg_group["Lat"], ec, a2, a1 - 360, size[1], size[2], false);
						else
							this.DrawEllipseArc(this.svg_group["Lat"], ec, a1, a2, size[1], size[2], false);
					}
					else
					{
						if (h >= 0)
							this.DrawEllipseArc(this.svg_group["Lat"], ec, a2, 360 + a1, size[1], size[2], false);
						else
							this.DrawEllipseArc(this.svg_group["Lat"], ec, a1, a2, size[1], size[2], false);
					}
					if (AngleVue > 0 && h < 0)
						this.DrawEllipseArc(this.svg_group["Hidden_Lat"], ec, a1, a2, size[1], size[2], false);
					else
						this.DrawEllipseArc(this.svg_group["Hidden_Lat"], ec, a2, a1 - 360, size[1], size[2], false);
				}
				else
				{
					let y = R * Math.cos(AngleVue * Math.PI / 180.0);
					if (((h > 0 && AngleVue < 0) || (h < 0 && AngleVue > 0)))
						this.svg_group["Lat"].ellipse(size[1] * 2, size[2] * 2).center(ec.x, ec.y)
					else
						this.svg_group["Hidden_Lat"].ellipse(size[1] * 2, size[2] * 2).center(ec.x, ec.y)
				}
			}
		}
		// Longitude
		if (sol_sphere_lon)
		{
			let size = get_lon_size(R, sol_sphere_lon_angle, AngleVue);
			let ellipse;
			if (size[1] == 0)
			{
				this.svg_group["Lon"].line(cx + R, cy, cx - R, cy).rotate(size[0] * 180.0 / Math.PI)
			}
			else
			{
				let ang = size[0] * 180.0 / Math.PI
				let d = 0;
				if (AngleVue < 0) d = 360
				this.DrawEllipseArc(this.svg_group["Lon"], {x: cx, y: cy}, 180, 360-d, R, size[1], false).rotate(ang, cx, cy);
				this.DrawEllipseArc(this.svg_group["Hidden_Lon"], {x: cx, y: cy}, 180, d, R, size[1], false).rotate(ang, cx, cy);
			}
		}

		this.svg_group["Hidden"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden_Equ"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden_Lon"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Hidden_Lat"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Pol"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Center"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Radius"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Fill"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Shadow"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Equ"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Lon"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Lat"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Main"].dmove(this.EM.Margin, this.EM.Margin);
		this.svg_group["Objects"].dmove(this.EM.Margin, this.EM.Margin);
	}

}