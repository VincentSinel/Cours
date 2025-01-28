

var Canvas_width = 500;
var Canvas_height = 500;
var Gen_Margin = 5;
var Gen_font = "Arial";
var paper = null;
var colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#f0cccc"]
var objects = [
];
window.onload = function(){
	paper = Raphael("preview", Canvas_width, Canvas_height);

	// document.getElementById("gen_type").selectedIndex = 5;
	// document.getElementById("diag_type").selectedIndex = 2;

	menu_solid_changed()
	menu_diag_changed()
	menu_changed()
	Regenerate()
}


function ClearObject()
{
	objects = [];
	document.getElementById("object_list").innerHTML = "";
}

function Regenerate()
{
	Canvas_width = document.getElementById("gen_width").valueAsNumber;
	Canvas_height = document.getElementById("gen_height").valueAsNumber;
	Gen_Margin = document.getElementById("gen_margin").valueAsNumber;

	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let data = {};
    data["Canvas_width"] = Canvas_width;
    data["Canvas_height"] = Canvas_height;
    data["Gen_Margin"] = Gen_Margin;
    data["objects"] = Get_Objects();

	let type = document.getElementById("gen_type").selectedIndex;
	if (type == 0)
		Draw_RepereGradue(data);
	if (type == 1)
		Draw_AxeGradue(data);
	if (type == 2)
		Draw_Quadrillage(data);
	if (type == 3)
		Draw_Solide(data);
	if (type == 4)
		Draw_Fraction(data);
	if (type == 5)
		Draw_Diagramme(data);
}

function Draw_RepereGradue(data)
{
	data["hor_pri_nbr"] = document.getElementById("hor_pri_nbr").valueAsNumber;
	data["hor_sec_nbr"] = document.getElementById("hor_sec_nbr").valueAsNumber;
	data["hor_start"] = document.getElementById("hor_start").valueAsNumber;
	data["hor_pas"] = document.getElementById("hor_pas").valueAsNumber;
	data["hor_text"] = document.getElementById("hor_text").checked;
	data["hor_text_pos"] = document.getElementById("hor_text_pos").selectedIndex;
	data["hor_text_size"] = document.getElementById("hor_text_size").valueAsNumber;
	data["hor_text_offset"] = document.getElementById("hor_text_offset").valueAsNumber;
	data["ver_pri_nbr"] = document.getElementById("ver_pri_nbr").valueAsNumber;
	data["ver_sec_nbr"] = document.getElementById("ver_sec_nbr").valueAsNumber;
	data["ver_start"] = document.getElementById("ver_start").valueAsNumber;
	data["ver_pas"] = document.getElementById("ver_pas").valueAsNumber;
	data["ver_text"] = document.getElementById("ver_text").checked;
	data["ver_text_pos"] = document.getElementById("ver_text_pos").selectedIndex;
	data["ver_text_size"] = document.getElementById("ver_text_size").valueAsNumber;
	data["ver_text_offset"] = document.getElementById("ver_text_offset").valueAsNumber;
	data["line_pry_stroke"] = document.getElementById("line_pry_stroke").valueAsNumber;
	data["line_pry_color"] = document.getElementById("line_pry_color").value;
	data["line_pry_style"] = document.getElementById("line_pry_style").value;
	data["line_pry_pin_size"] = document.getElementById("line_pry_pin_size").valueAsNumber;
	data["line_pry_arrow"] = document.getElementById("line_pry_arrow").valueAsNumber;
	data["line_pry_grid"] = document.getElementById("line_pry_grid").checked;
	data["line_pry_grid_stroke"] = document.getElementById("line_pry_grid_stroke").valueAsNumber;
	data["line_pry_grid_color"] = document.getElementById("line_pry_grid_color").value;
	data["line_sec_stroke"] = document.getElementById("line_sec_stroke").valueAsNumber;
	data["line_sec_color"] = document.getElementById("line_sec_color").value;
	data["line_sec_style"] = document.getElementById("line_sec_style").value;
	data["line_sec_pin_size"] = document.getElementById("line_sec_pin_size").valueAsNumber;
	data["line_sec_grid"] = document.getElementById("line_sec_grid").checked;
	data["line_sec_grid_stroke"] = document.getElementById("line_sec_grid_stroke").valueAsNumber;
	data["line_sec_grid_color"] = document.getElementById("line_sec_grid_color").value;

  RepereGradue(paper, data);
}

function Draw_AxeGradue(data)
{
	data["axe_pri_nbr"] = document.getElementById("axe_pri_nbr").valueAsNumber;
	data["axe_sec_nbr"] = document.getElementById("axe_sec_nbr").valueAsNumber;
	data["axe_start"] = document.getElementById("axe_start").valueAsNumber;
	data["axe_pas"] = document.getElementById("axe_pas").valueAsNumber;
	data["axe_text"] = document.getElementById("axe_text").checked;
	data["axe_text_pos"] = document.getElementById("axe_text_pos").selectedIndex;
	data["axe_text_size"] = document.getElementById("axe_text_size").valueAsNumber;
	data["axe_text_offset"] = document.getElementById("axe_text_offset").valueAsNumber;
	data["axe_line_pry_stroke"] = document.getElementById("axe_line_pry_stroke").valueAsNumber;
	data["axe_line_pry_color"] = document.getElementById("axe_line_pry_color").value;
	data["axe_line_pry_pin_size"] = document.getElementById("axe_line_pry_pin_size").valueAsNumber;
	data["axe_line_pry_arrow"] = document.getElementById("axe_line_pry_arrow").valueAsNumber;
	data["axe_line_sec_stroke"] = document.getElementById("axe_line_sec_stroke").valueAsNumber;
	data["axe_line_sec_color"] = document.getElementById("axe_line_sec_color").value;
	data["axe_line_sec_pin_size"] = document.getElementById("axe_line_sec_pin_size").valueAsNumber;
	
	AxeGradue(paper, data);
}

function Draw_Quadrillage(data)
{
	data["c_hor_nbr"] = document.getElementById("c_hor_nbr").valueAsNumber;
	data["c_ver_nbr"] = document.getElementById("c_ver_nbr").valueAsNumber;
	data["c_size_x"] = document.getElementById("c_size_x").valueAsNumber;
	data["c_size_y"] = document.getElementById("c_size_y").valueAsNumber;
	data["q_line_color"] = document.getElementById("q_line_color").value;
	data["q_line_style"] = document.getElementById("q_line_style").value;
	data["q_line_stroke"] = document.getElementById("q_line_stroke").valueAsNumber;
	data["q_int"] = document.getElementById("q_int").checked;
	data["q_points"] = document.getElementById("q_points").checked;
	data["c_int_hor_nbr"] = document.getElementById("c_int_hor_nbr").valueAsNumber;
	data["c_int_ver_nbr"] = document.getElementById("c_int_ver_nbr").valueAsNumber;
	data["q_int_line_color"] = document.getElementById("q_int_line_color").value;
	data["q_int_line_style"] = document.getElementById("q_int_line_style").value;
	data["q_int_line_stroke"] = document.getElementById("q_int_line_stroke").valueAsNumber;

  let newsize = Quadrillage(paper, data);
	document.getElementById("gen_width").value = newsize[0];
	document.getElementById("gen_height").value = newsize[1];
}

function Draw_Solide(data)
{
	let type = document.getElementById("sol_type").selectedIndex;
	if(type == 0) // Pavé droit
	{
		data["sol_pavdrt_L"] = document.getElementById("sol_pavdrt_L").valueAsNumber;
		data["sol_pavdrt_H"] = document.getElementById("sol_pavdrt_H").valueAsNumber;
		data["sol_pavdrt_P"] = document.getElementById("sol_pavdrt_P").valueAsNumber;
		data["sol_pavdrt_line_stroke"] = document.getElementById("sol_pavdrt_line_stroke").valueAsNumber;
		data["sol_pavdrt_line_color"] = document.getElementById("sol_pavdrt_line_color").value;
		data["sol_pavdrt_show_hide"] = document.getElementById("sol_pavdrt_show_hide").checked;
		data["sol_pavdrt_hide_style"] = document.getElementById("sol_pavdrt_hide_style").value;
		data["sol_pavdrt_hide_color"] = document.getElementById("sol_pavdrt_hide_color").value;
		data["sol_pavdrt_hide_stroke"] = document.getElementById("sol_pavdrt_hide_stroke").value;
		data["sol_pavdrt_fill"] = document.getElementById("sol_pavdrt_fill").checked;
		data["sol_pavdrt_fill_shadow"] = document.getElementById("sol_pavdrt_fill_shadow").checked;
		data["sol_pavdrt_fill_color"] = document.getElementById("sol_pavdrt_fill_color").value;
		data["sol_pavdrt_fill_color_alpha"] = document.getElementById("sol_pavdrt_fill_color_alpha").value;
		data["sol_pavdrt_fill_base"] = document.getElementById("sol_pavdrt_fill_base").checked;
		data["sol_pavdrt_base_full"] = document.getElementById("sol_pavdrt_base_full").checked;
		data["sol_pavdrt_base_stroke"] = document.getElementById("sol_pavdrt_base_stroke").value;
		data["sol_pavdrt_base_color"] = document.getElementById("sol_pavdrt_base_color").value;
		data["sol_pavdrt_base_style"] = document.getElementById("sol_pavdrt_base_style").value;

		let newsize = Solide_PaveDroit(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
	}
	else if (type == 1) // Prisme droit régulier
	{
		data["sol_prmdrt_L"] = document.getElementById("sol_prmdrt_L").valueAsNumber;
		data["sol_prmdrt_H"] = document.getElementById("sol_prmdrt_H").valueAsNumber;
		data["sol_prmdrt_P"] = document.getElementById("sol_prmdrt_P").valueAsNumber;
		data["sol_prmdrt_F"] = document.getElementById("sol_prmdrt_F").valueAsNumber;
		data["sol_prmdrt_A"] = document.getElementById("sol_prmdrt_A").valueAsNumber;
		data["sol_prmdrt_line_stroke"] = document.getElementById("sol_prmdrt_line_stroke").valueAsNumber;
		data["sol_prmdrt_line_color"] = document.getElementById("sol_prmdrt_line_color").value;
		data["sol_prmdrt_show_hide"] = document.getElementById("sol_prmdrt_show_hide").checked;
		data["sol_prmdrt_hide_style"] = document.getElementById("sol_prmdrt_hide_style").value;
		data["sol_prmdrt_hide_color"] = document.getElementById("sol_prmdrt_hide_color").value;
		data["sol_prmdrt_hide_stroke"] = document.getElementById("sol_prmdrt_hide_stroke").value;
		data["sol_prmdrt_fill"] = document.getElementById("sol_prmdrt_fill").checked;
		data["sol_prmdrt_fill_shadow"] = document.getElementById("sol_prmdrt_fill_shadow").checked;
		data["sol_prmdrt_fill_color"] = document.getElementById("sol_prmdrt_fill_color").value;
		data["sol_prmdrt_fill_color_alpha"] = document.getElementById("sol_prmdrt_fill_color_alpha").value;
		data["sol_prmdrt_fill_base"] = document.getElementById("sol_prmdrt_fill_base").checked;
		data["sol_prmdrt_base_full"] = document.getElementById("sol_prmdrt_base_full").checked;
		data["sol_prmdrt_base_stroke"] = document.getElementById("sol_prmdrt_base_stroke").value;
		data["sol_prmdrt_base_color"] = document.getElementById("sol_prmdrt_base_color").value;
		data["sol_prmdrt_base_style"] = document.getElementById("sol_prmdrt_base_style").value;

		let newsize = Solide_PrismeDroit(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
	}
	else if (type == 2) // Cylindre
	{
		data["sol_cylind_R"] = document.getElementById("sol_cylind_R").valueAsNumber;
		data["sol_cylind_H"] = document.getElementById("sol_cylind_H").valueAsNumber;
		data["sol_cylind_line_stroke"] = document.getElementById("sol_cylind_line_stroke").valueAsNumber;
		data["sol_cylind_line_color"] = document.getElementById("sol_cylind_line_color").value;
		data["sol_cylind_show_hide"] = document.getElementById("sol_cylind_show_hide").checked;
		data["sol_cylind_hide_style"] = document.getElementById("sol_cylind_hide_style").value;
		data["sol_cylind_hide_color"] = document.getElementById("sol_cylind_hide_color").value;
		data["sol_cylind_hide_stroke"] = document.getElementById("sol_cylind_hide_stroke").value;
		data["sol_cylind_fill"] = document.getElementById("sol_cylind_fill").checked;
		data["sol_cylind_fill_shadow"] = document.getElementById("sol_cylind_fill_shadow").checked;
		data["sol_cylind_fill_color"] = document.getElementById("sol_cylind_fill_color").value;
		data["sol_cylind_fill_color_alpha"] = document.getElementById("sol_cylind_fill_color_alpha").value;
		data["sol_cylind_fill_base"] = document.getElementById("sol_cylind_fill_base").checked;
		data["sol_cylind_base_full"] = document.getElementById("sol_cylind_base_full").checked;
		data["sol_cylind_base_stroke"] = document.getElementById("sol_cylind_base_stroke").value;
		data["sol_cylind_base_color"] = document.getElementById("sol_cylind_base_color").value;
		data["sol_cylind_base_style"] = document.getElementById("sol_cylind_base_style").value;
		data["sol_cylind_h"] = document.getElementById("sol_cylind_h").checked;
		data["sol_cylind_h_stroke"] = document.getElementById("sol_cylind_h_stroke").value;
		data["sol_cylind_h_color"] = document.getElementById("sol_cylind_h_color").value;
		data["sol_cylind_h_style"] = document.getElementById("sol_cylind_h_style").value;
		data["sol_cylind_r"] = document.getElementById("sol_cylind_r").checked;
		data["sol_cylind_r_stroke"] = document.getElementById("sol_cylind_r_stroke").value;
		data["sol_cylind_r_color"] = document.getElementById("sol_cylind_r_color").value;
		data["sol_cylind_r_style"] = document.getElementById("sol_cylind_r_style").value;
		data["sol_cylind_ag"] = document.getElementById("sol_cylind_ag").checked;
		data["sol_cylind_ag_stroke"] = document.getElementById("sol_cylind_ag_stroke").value;
		data["sol_cylind_ag_full"] = document.getElementById("sol_cylind_ag_full").checked;
		data["sol_cylind_ag_color"] = document.getElementById("sol_cylind_ag_color").value;
		data["sol_cylind_ag_style"] = document.getElementById("sol_cylind_ag_style").value;

		let newsize = Solide_Cylindre(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
	}
	else if (type == 3) // Pyramide régulière
	{
		data["sol_pyrami_L"] = document.getElementById("sol_pyrami_L").valueAsNumber;
		data["sol_pyrami_H"] = document.getElementById("sol_pyrami_H").valueAsNumber;
		data["sol_pyrami_P"] = document.getElementById("sol_pyrami_P").valueAsNumber;
		data["sol_pyrami_F"] = document.getElementById("sol_pyrami_F").valueAsNumber;
		data["sol_pyrami_A"] = document.getElementById("sol_pyrami_A").valueAsNumber;
		data["sol_pyrami_line_stroke"] = document.getElementById("sol_pyrami_line_stroke").valueAsNumber;
		data["sol_pyrami_line_color"] = document.getElementById("sol_pyrami_line_color").value;
		data["sol_pyrami_show_hide"] = document.getElementById("sol_pyrami_show_hide").checked;
		data["sol_pyrami_hide_style"] = document.getElementById("sol_pyrami_hide_style").value;
		data["sol_pyrami_hide_color"] = document.getElementById("sol_pyrami_hide_color").value;
		data["sol_pyrami_hide_stroke"] = document.getElementById("sol_pyrami_hide_stroke").value;
		data["sol_pyrami_fill"] = document.getElementById("sol_pyrami_fill").checked;
		data["sol_pyrami_fill_shadow"] = document.getElementById("sol_pyrami_fill_shadow").checked;
		data["sol_pyrami_fill_color"] = document.getElementById("sol_pyrami_fill_color").value;
		data["sol_pyrami_fill_color_alpha"] = document.getElementById("sol_pyrami_fill_color_alpha").value;
		data["sol_pyrami_fill_base"] = document.getElementById("sol_pyrami_fill_base").checked;
		data["sol_pyrami_base_full"] = document.getElementById("sol_pyrami_base_full").checked;
		data["sol_pyrami_base_stroke"] = document.getElementById("sol_pyrami_base_stroke").value;
		data["sol_pyrami_base_color"] = document.getElementById("sol_pyrami_base_color").value;
		data["sol_pyrami_base_style"] = document.getElementById("sol_pyrami_base_style").value;
		data["sol_pyrami_h"] = document.getElementById("sol_pyrami_h").checked;
		data["sol_pyrami_h_stroke"] = document.getElementById("sol_pyrami_h_stroke").value;
		data["sol_pyrami_h_color"] = document.getElementById("sol_pyrami_h_color").value;
		data["sol_pyrami_h_style"] = document.getElementById("sol_pyrami_h_style").value;
		data["sol_pyrami_ag"] = document.getElementById("sol_pyrami_ag").checked;
		data["sol_pyrami_ag_stroke"] = document.getElementById("sol_pyrami_ag_stroke").value;
		data["sol_pyrami_ag_full"] = document.getElementById("sol_pyrami_ag_full").checked;
		data["sol_pyrami_ag_color"] = document.getElementById("sol_pyrami_ag_color").value;
		data["sol_pyrami_ag_style"] = document.getElementById("sol_pyrami_ag_style").value;
		
		let newsize = Solide_Pyramide(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
	}
	else if (type == 4) // Cône
	{
		data["sol_cone_R"] = document.getElementById("sol_cone_R").valueAsNumber;
		data["sol_cone_H"] = document.getElementById("sol_cone_H").valueAsNumber;
		data["sol_cone_line_stroke"] = document.getElementById("sol_cone_line_stroke").valueAsNumber;
		data["sol_cone_line_color"] = document.getElementById("sol_cone_line_color").value;
		data["sol_cone_show_hide"] = document.getElementById("sol_cone_show_hide").checked;
		data["sol_cone_hide_style"] = document.getElementById("sol_cone_hide_style").value;
		data["sol_cone_hide_color"] = document.getElementById("sol_cone_hide_color").value;
		data["sol_cone_hide_stroke"] = document.getElementById("sol_cone_hide_stroke").value;
		data["sol_cone_fill"] = document.getElementById("sol_cone_fill").checked;
		data["sol_cone_fill_shadow"] = document.getElementById("sol_cone_fill_shadow").checked;
		data["sol_cone_fill_color"] = document.getElementById("sol_cone_fill_color").value;
		data["sol_cone_fill_color_alpha"] = document.getElementById("sol_cone_fill_color_alpha").value;
		data["sol_cone_fill_base"] = document.getElementById("sol_cone_fill_base").checked;
		data["sol_cone_base_full"] = document.getElementById("sol_cone_base_full").checked;
		data["sol_cone_base_stroke"] = document.getElementById("sol_cone_base_stroke").value;
		data["sol_cone_base_color"] = document.getElementById("sol_cone_base_color").value;
		data["sol_cone_base_style"] = document.getElementById("sol_cone_base_style").value;
		data["sol_cone_h"] = document.getElementById("sol_cone_h").checked;
		data["sol_cone_h_stroke"] = document.getElementById("sol_cone_h_stroke").value;
		data["sol_cone_h_color"] = document.getElementById("sol_cone_h_color").value;
		data["sol_cone_h_style"] = document.getElementById("sol_cone_h_style").value;
		data["sol_cone_r"] = document.getElementById("sol_cone_r").checked;
		data["sol_cone_r_stroke"] = document.getElementById("sol_cone_r_stroke").value;
		data["sol_cone_r_color"] = document.getElementById("sol_cone_r_color").value;
		data["sol_cone_r_style"] = document.getElementById("sol_cone_r_style").value;
		data["sol_cone_ag"] = document.getElementById("sol_cone_ag").checked;
		data["sol_cone_ag_stroke"] = document.getElementById("sol_cone_ag_stroke").value;
		data["sol_cone_ag_full"] = document.getElementById("sol_cone_ag_full").checked;
		data["sol_cone_ag_color"] = document.getElementById("sol_cone_ag_color").value;
		data["sol_cone_ag_style"] = document.getElementById("sol_cone_ag_style").value;

		let newsize = Solide_Cone(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
		
	}
	else if (type == 5) // Sphère
	{
		data["sol_sphere_R"] = document.getElementById("sol_sphere_R").valueAsNumber;
		data["sol_sphere_A"] = document.getElementById("sol_sphere_A").valueAsNumber;
		data["sol_sphere_line_stroke"] = document.getElementById("sol_sphere_line_stroke").valueAsNumber;
		data["sol_sphere_line_color"] = document.getElementById("sol_sphere_line_color").value;
		data["sol_sphere_show_hide"] = document.getElementById("sol_sphere_show_hide").checked;
		data["sol_sphere_hide_style"] = document.getElementById("sol_sphere_hide_style").value;
		data["sol_sphere_fill"] = document.getElementById("sol_sphere_fill").checked;
		data["sol_sphere_fill_shadow"] = document.getElementById("sol_sphere_fill_shadow").checked;
		data["sol_sphere_fill_color"] = document.getElementById("sol_sphere_fill_color").value;
		data["sol_sphere_fill_color_alpha"] = document.getElementById("sol_sphere_fill_color_alpha").value;
		data["sol_sphere_e"] = document.getElementById("sol_sphere_e").checked;
		data["sol_sphere_e_stroke"] = document.getElementById("sol_sphere_e_stroke").value;
		data["sol_sphere_e_color"] = document.getElementById("sol_sphere_e_color").value;
		data["sol_sphere_e_style"] = document.getElementById("sol_sphere_e_style").value;
		data["sol_sphere_lon"] = document.getElementById("sol_sphere_lon").checked;
		data["sol_sphere_lon_angle"] = document.getElementById("sol_sphere_lon_angle").valueAsNumber;
		data["sol_sphere_lon_stroke"] = document.getElementById("sol_sphere_lon_stroke").value;
		data["sol_sphere_lon_color"] = document.getElementById("sol_sphere_lon_color").value;
		data["sol_sphere_lon_style"] = document.getElementById("sol_sphere_lon_style").value;
		data["sol_sphere_lat"] = document.getElementById("sol_sphere_lat").checked;
		data["sol_sphere_lat_angle"] = document.getElementById("sol_sphere_lat_angle").valueAsNumber;
		data["sol_sphere_lat_stroke"] = document.getElementById("sol_sphere_lat_stroke").value;
		data["sol_sphere_lat_color"] = document.getElementById("sol_sphere_lat_color").value;
		data["sol_sphere_lat_style"] = document.getElementById("sol_sphere_lat_style").value;
		data["sol_sphere_h"] = document.getElementById("sol_sphere_h").checked;
		data["sol_sphere_h_stroke"] = document.getElementById("sol_sphere_h_stroke").value;
		data["sol_sphere_h_color"] = document.getElementById("sol_sphere_h_color").value;
		data["sol_sphere_h_style"] = document.getElementById("sol_sphere_h_style").value;
		data["sol_sphere_r"] = document.getElementById("sol_sphere_r").checked;
		data["sol_sphere_r_lon"] = document.getElementById("sol_sphere_r_lon").valueAsNumber;
		data["sol_sphere_r_lat"] = document.getElementById("sol_sphere_r_lat").valueAsNumber;
		data["sol_sphere_r_stroke"] = document.getElementById("sol_sphere_r_stroke").value;
		data["sol_sphere_r_color"] = document.getElementById("sol_sphere_r_color").value;
		data["sol_sphere_r_style"] = document.getElementById("sol_sphere_r_style").value;

		let newsize = Solide_Sphere(paper, data);
		document.getElementById("gen_width").value = newsize[0];
		document.getElementById("gen_height").value = newsize[1];
		return;
	}
}

function Draw_Fraction(data)
{
	data["frac_txt"] = document.getElementById("frac_txt").checked;
	data["frac_txt_type"] = document.getElementById("frac_txt_type").selectedIndex;
	data["frac_txt_size"] = document.getElementById("frac_txt_size").valueAsNumber;
	data["frac_line_stroke"] = document.getElementById("frac_line_stroke").valueAsNumber;
	data["frac_line_color"] = document.getElementById("frac_line_color").value;
	data["frac_line_style"] = document.getElementById("frac_line_style").value;
	
	let weight = 0;
	let weight_list = [0];
	data["objects"].forEach(obj => {
		if (obj["type"] == "section")
		{
			weight += obj["weight"]
			weight_list.push(weight)
		}
	})
	data["frac_total_weight"] = weight;
	data["frac_weight_list"] = weight_list;


	Fraction(paper, data)
}

function Draw_Diagramme(data)
{
	let type = document.getElementById("diag_type").selectedIndex;
	if(type == 0) // Diagramme baton
	{
		data["diag_baton_maxeff"] = document.getElementById("diag_baton_maxeff").valueAsNumber;
		data["diag_baton_pas"] = document.getElementById("diag_baton_pas").valueAsNumber;

		let bar_names = [];
		let bar_effectifs = [];
		let bar_colors = [];

		var barres = document.getElementById("diag_baton_listbarre");
		let list = barres.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				bar_names.push(document.getElementById(list[i].id + "_name").value)
				bar_effectifs.push(document.getElementById(list[i].id + "_eff").valueAsNumber)
				bar_colors.push(document.getElementById(list[i].id + "_color").value)
			}
		}
		data["bar_names"] = bar_names;
		data["bar_effectifs"] = bar_effectifs;
		data["bar_colors"] = bar_colors;

		data["diag_baton_stroke"] = document.getElementById("diag_baton_stroke").valueAsNumber;
		data["diag_baton_grid"] = document.getElementById("diag_baton_grid").checked;
		data["diag_baton_gridcolor"] = document.getElementById("diag_baton_gridcolor").value;
		data["diag_baton_bar_width"] = document.getElementById("diag_baton_bar_width").valueAsNumber;
		data["diag_baton_grad_size"] = document.getElementById("diag_baton_grad_size").valueAsNumber;
		data["diag_baton_fill_opacity"] = document.getElementById("diag_baton_fill_opacity").valueAsNumber;
		data["diag_baton_title"] = document.getElementById("diag_baton_title").value;
		data["diag_baton_haxe_name"] = document.getElementById("diag_baton_haxe_name").value;
		data["diag_baton_vaxe_name"] = document.getElementById("diag_baton_vaxe_name").value;
		data["diag_baton_txt_size"] = document.getElementById("diag_baton_txt_size").valueAsNumber;
		data["diag_baton_bar_value"] = document.getElementById("diag_baton_bar_value").checked;
		data["diag_baton_offset_x"] = document.getElementById("diag_baton_offset_x").valueAsNumber;
		data["diag_baton_offset_y"] = document.getElementById("diag_baton_offset_y").valueAsNumber;
		data["diag_baton_offset_angle"] = document.getElementById("diag_baton_offset_angle").valueAsNumber;

		Diagramme_Baton(paper, data);
		return;
	}
	else if (type == 1) // Diagramme cartesien
	{
		data["diag_carte_Xstart"] = document.getElementById("diag_carte_Xstart").valueAsNumber;
		data["diag_carte_Xpas"] = document.getElementById("diag_carte_Xpas").valueAsNumber;
		data["diag_carte_Xsec"] = document.getElementById("diag_carte_Xsec").valueAsNumber;
		data["diag_carte_Xsubsec"] = document.getElementById("diag_carte_Xsubsec").valueAsNumber;
		data["diag_carte_Ystart"] = document.getElementById("diag_carte_Ystart").valueAsNumber;
		data["diag_carte_Ypas"] = document.getElementById("diag_carte_Ypas").valueAsNumber;
		data["diag_carte_Ysec"] = document.getElementById("diag_carte_Ysec").valueAsNumber;
		data["diag_carte_Ysubsec"] = document.getElementById("diag_carte_Ysubsec").valueAsNumber;

		let points = [];

		var barres = document.getElementById("diag_carte_listpoint");
		let list = barres.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				points.push([
					document.getElementById(list[i].id + "_x").valueAsNumber,
					document.getElementById(list[i].id + "_y").valueAsNumber])
			}
		}
		data["points"] = points;

		data["diag_carte_stroke"] = document.getElementById("diag_carte_stroke").valueAsNumber;
		data["diag_carte_point_size"] = document.getElementById("diag_carte_point_size").valueAsNumber;
		data["diag_carte_grad_size"] = document.getElementById("diag_carte_grad_size").valueAsNumber;
		data["diag_carte_strokecolor"] = document.getElementById("diag_carte_strokecolor").value;
		data["diag_carte_grid"] = document.getElementById("diag_carte_grid").checked;
		data["diag_carte_grid_width"] = document.getElementById("diag_carte_grid_width").valueAsNumber;
		data["diag_carte_gridcolor"] = document.getElementById("diag_carte_gridcolor").value;
		data["diag_carte_title"] = document.getElementById("diag_carte_title").value;
		data["diag_carte_haxe_name"] = document.getElementById("diag_carte_haxe_name").value;
		data["diag_carte_vaxe_name"] = document.getElementById("diag_carte_vaxe_name").value;
		data["diag_carte_txt_size"] = document.getElementById("diag_carte_txt_size").valueAsNumber;

		Diagramme_Cartesien(paper, data);
		return;
	}
	else if (type == 2) // Diagramme circulaire
	{
		let sec_names = [];
		let sec_effectifs = [];
		let sec_colors = [];

		var sections = document.getElementById("diag_circu_listsection");
		let list = sections.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				sec_names.push(document.getElementById(list[i].id + "_name").value)
				sec_effectifs.push(document.getElementById(list[i].id + "_eff").valueAsNumber)
				sec_colors.push(document.getElementById(list[i].id + "_color").value)
			}
		}
		data["sec_names"] = sec_names;
		data["sec_effectifs"] = sec_effectifs;
		data["sec_colors"] = sec_colors;

		data["diag_circu_stroke"] = document.getElementById("diag_circu_stroke").valueAsNumber;
		data["diag_circu_width"] = document.getElementById("diag_circu_width").valueAsNumber;
		data["diag_circu_offset"] = document.getElementById("diag_circu_offset").valueAsNumber;
		data["diag_circu_legende_space"] = document.getElementById("diag_circu_legende_space").valueAsNumber;
		data["diag_circu_legende_size"] = document.getElementById("diag_circu_legende_size").valueAsNumber;
		data["diag_circu_fill_opacity"] = document.getElementById("diag_circu_fill_opacity").valueAsNumber;
		data["diag_circu_title"] = document.getElementById("diag_circu_title").value;
		data["diag_circu_txt_size"] = document.getElementById("diag_circu_txt_size").valueAsNumber;

		Diagramme_Circulaire(paper, data);
		return;
	}
	else if (type == 3) // Histogramme
	{
		data["sol_pyrami_L"] = document.getElementById("sol_pyrami_L").valueAsNumber;
		data["sol_pyrami_H"] = document.getElementById("sol_pyrami_H").valueAsNumber;
		data["sol_pyrami_P"] = document.getElementById("sol_pyrami_P").valueAsNumber;
		data["sol_pyrami_F"] = document.getElementById("sol_pyrami_F").valueAsNumber;
		data["sol_pyrami_A"] = document.getElementById("sol_pyrami_A").valueAsNumber;
		data["sol_pyrami_line_stroke"] = document.getElementById("sol_pyrami_line_stroke").valueAsNumber;
		data["sol_pyrami_line_color"] = document.getElementById("sol_pyrami_line_color").value;
		data["sol_pyrami_show_hide"] = document.getElementById("sol_pyrami_show_hide").checked;
		data["sol_pyrami_hide_style"] = document.getElementById("sol_pyrami_hide_style").value;
		data["sol_pyrami_hide_color"] = document.getElementById("sol_pyrami_hide_color").value;
		data["sol_pyrami_hide_stroke"] = document.getElementById("sol_pyrami_hide_stroke").value;
		data["sol_pyrami_fill"] = document.getElementById("sol_pyrami_fill").checked;
		data["sol_pyrami_fill_shadow"] = document.getElementById("sol_pyrami_fill_shadow").checked;
		data["sol_pyrami_fill_color"] = document.getElementById("sol_pyrami_fill_color").value;
		data["sol_pyrami_fill_color_alpha"] = document.getElementById("sol_pyrami_fill_color_alpha").value;
		data["sol_pyrami_fill_base"] = document.getElementById("sol_pyrami_fill_base").checked;
		data["sol_pyrami_base_full"] = document.getElementById("sol_pyrami_base_full").checked;
		data["sol_pyrami_base_stroke"] = document.getElementById("sol_pyrami_base_stroke").value;
		data["sol_pyrami_base_color"] = document.getElementById("sol_pyrami_base_color").value;
		data["sol_pyrami_base_style"] = document.getElementById("sol_pyrami_base_style").value;
		data["sol_pyrami_h"] = document.getElementById("sol_pyrami_h").checked;
		data["sol_pyrami_h_stroke"] = document.getElementById("sol_pyrami_h_stroke").value;
		data["sol_pyrami_h_color"] = document.getElementById("sol_pyrami_h_color").value;
		data["sol_pyrami_h_style"] = document.getElementById("sol_pyrami_h_style").value;
		data["sol_pyrami_ag"] = document.getElementById("sol_pyrami_ag").checked;
		data["sol_pyrami_ag_stroke"] = document.getElementById("sol_pyrami_ag_stroke").value;
		data["sol_pyrami_ag_full"] = document.getElementById("sol_pyrami_ag_full").checked;
		data["sol_pyrami_ag_color"] = document.getElementById("sol_pyrami_ag_color").value;
		data["sol_pyrami_ag_style"] = document.getElementById("sol_pyrami_ag_style").value;
		
		Diagramme_Histogramme(paper, data);
		return;
	}
}


function Add_Diag_Element()
{
	let type = document.getElementById("diag_type").selectedIndex;
	if(type == 0) // Diagramme baton
	{
		var barres = document.getElementById("diag_baton_listbarre");
		
		let ids = []
		let list = barres.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			ids.push(list[i].id);
		}
		if ((ids.length / 5 + 1) > 50) return; // Limit max bar count to 50
		let id = 1;
		while(ids.indexOf("diag_baton_barre" + id.toString()) >= 0)
			id += 1;
	
		let div = document.createElement("div");
		div.id = "diag_baton_barre" + id.toString();
		div.classList.add("formemenu");
	
		let htmlnode = '<span>Barre UID :</span><div class="formemenu_div"><div class="flexparameters"><label>Nom :</label><input id="diag_baton_barreGID_name" type="text" value="" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Effectif :</label><input id="diag_baton_barreGID_eff" type="number" value="0" step="1" min="0" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="diag_baton_barreGID_color" type="color" value="COLOR" oninput="Regenerate()"></div><hr><button class="diag_baton_barreGID_delete" onclick="Remove_Diag_Element(GID)" style="color: red">supprimer</button></div>'
	
		htmlnode = htmlnode.replaceAll("COLOR", colors[(id - 1) % colors.length]);
		htmlnode = htmlnode.replaceAll("UID", (ids.length / 5 + 1).toString());
		htmlnode = htmlnode.replaceAll("GID", id.toString());
	
		div.innerHTML = htmlnode;
		barres.appendChild(div);
	
		div.children[0].onclick = function(){menu_click(div)};
	}
	else if (type == 1)
	{
		var points = document.getElementById("diag_carte_listpoint");
		
		let ids = []
		let list = points.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			ids.push(list[i].id);
		}
		if ((ids.length / 5 + 1) > 50) return; // Limit max bar count to 50
		let id = 1;
		while(ids.indexOf("diag_carte_point" + id.toString()) >= 0)
			id += 1;
	
		let div = document.createElement("div");
		div.id = "diag_carte_point" + id.toString();
		div.classList.add("formemenu");
	
		let htmlnode = '<span>Point UID :</span><div class="formemenu_div"><label>Position :</label><div class="flexparameters"><label>(</label><input class="input_coord" id="diag_carte_pointGID_x" type="number" value="0" oninput="Regenerate()"><label>;</label><input class="input_coord" id="diag_carte_pointGID_y" type="number" value="0" oninput="Regenerate()"><label>)</label></div><hr><button class="diag_baton_GID_delete" onclick="Remove_Diag_Element(UID)" style="color: red">supprimer</button>'
	
		htmlnode = htmlnode.replaceAll("UID", (ids.length / 3 + 1).toString());
		htmlnode = htmlnode.replaceAll("GID", id.toString());
	
		div.innerHTML = htmlnode;
		points.appendChild(div);
	
		div.children[0].onclick = function(){menu_click(div)};
	}
	else if (type == 2) // Diagramme baton
	{
		var barres = document.getElementById("diag_circu_listsection");
		
		let ids = []
		let list = barres.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			ids.push(list[i].id);
		}
		if ((ids.length / 5 + 1) > 50) return; // Limit max bar count to 50
		let id = 1;
		while(ids.indexOf("diag_circu_section" + id.toString()) >= 0)
			id += 1;
	
		let div = document.createElement("div");
		div.id = "diag_circu_section" + id.toString();
		div.classList.add("formemenu");
	
		let htmlnode = '<span>Section UID :</span><div class="formemenu_div"><div class="flexparameters"><label>Nom :</label><input id="diag_circu_sectionGID_name" type="text" value="" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Effectif :</label><input id="diag_circu_sectionGID_eff" type="number" value="1" step="1" min="0" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="diag_circu_sectionGID_color" type="color" value="COLOR" oninput="Regenerate()"></div><hr><button class="diag_circu_sectionGID_delete" onclick="Remove_Diag_Element(GID)" style="color: red">supprimer</button></div>'
	
		htmlnode = htmlnode.replaceAll("COLOR", colors[(id - 1) % colors.length]);
		htmlnode = htmlnode.replaceAll("UID", (ids.length / 5 + 1).toString());
		htmlnode = htmlnode.replaceAll("GID", id.toString());
	
		div.innerHTML = htmlnode;
		barres.appendChild(div);
	
		div.children[0].onclick = function(){menu_click(div)};
	}

	Regenerate();
}

function Remove_Diag_Element(id)
{
	let type = document.getElementById("diag_type").selectedIndex;
	if(type == 0) // Diagramme baton
	{
		let element = document.getElementById("diag_baton_barre" + id);
		element.parentNode.removeChild(element);

		var barres = document.getElementById("diag_baton_listbarre");
		let list = barres.getElementsByTagName("div")
		let rename_id = 1;
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				list[i].children[0].innerHTML = "Barre " + rename_id.toString() + " :"
				rename_id++;
			}
		}
	}
	else if (type == 1)
	{
		let element = document.getElementById("diag_carte_point" + id);
		element.parentNode.removeChild(element);

		var points = document.getElementById("diag_carte_listpoint");
		let list = points.getElementsByTagName("div")
		let rename_id = 1;
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				list[i].children[0].innerHTML = "Point " + rename_id.toString() + " :"
				rename_id++;
			}
		}
	}
	else if (type == 2) // Diagramme baton
	{
		let element = document.getElementById("diag_circu_section" + id);
		element.parentNode.removeChild(element);

		var barres = document.getElementById("diag_circu_listsection");
		let list = barres.getElementsByTagName("div")
		let rename_id = 1;
		for (var i = 0; i < list.length; i++) 
		{
			if (list[i].id != "")
			{
				list[i].children[0].innerHTML = "Section " + rename_id.toString() + " :"
				rename_id++;
			}
		}
	}

	Regenerate();
}

{ // Ajout d'objet dans la liste latérale

	function Add_courbe(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "courbe")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "courbe",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "for" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")

		var htmlnode = '<span onclick="menu_click(document.getElementById(\'forUID\'))">Courbe UID</span><div class="formemenu_div"><label>Formule (en JavaScript) :</label><input id="forUID_text" type="text" value="x*x" onchange="Regenerate()"><hr><div class="flexparameters"><label>Epaisseur :</label><input id="forUID_stroke" type="number" value="1" step="1" min="1" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="forUID_stroke_color" type="color" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Style de trait :</label><input id="forUID_style" type="text" oninput="Regenerate()"></div><hr><label>Interval x :</label><div class="flexparameters"><label>[</label><input class="input_coord" id="forUID_start" type="number" value="-1000" step="1" oninput="Regenerate()"><label>;</label><input class="input_coord" id="forUID_end" type="number" value="1000" step="1" oninput="Regenerate()"><label>]</label></div><hr><button class="delete" onclick="let a = Get_Courbe({id: UID}); Set_Courbe(Add_courbe(a),a)">Dupliquer</button><button class="delete" onclick="RemoveCourbe(\'forUID\')">Supprimer</button></div>'
		
		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);

		Regenerate();

		return id;
	}
	
	function Add_point(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "point")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "point",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "poi" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")

		let htmlnode = '<span onclick="menu_click(document.getElementById(\'poiUID\'))">Point UID</span><div class="formemenu_div"><div class="flexparameters">	<label>Nom :</label>	<input id="poiUID_text" type="text" value="A" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Taille du texte :</label><input id="poiUID_text_size" type="number" value="12" step="2" min="0" oninput="Regenerate()"></div><hr><label>Position :</label><br><div class="flexparameters"><label>(</label><input class="input_coord" id="poiUID_px" type="number" value="0" oninput="Regenerate()"><label>;</label><input class="input_coord" id="poiUID_py" type="number" value="0" oninput="Regenerate()"><label>)</label></div><hr><label>Position relative du texte :</label><div class="flexparameters"><label>(</label><input class="input_coord" id="poiUID_tx" type="number" value="0" step="1" oninput="Regenerate()"><label>;</label><input class="input_coord" id="poiUID_ty" value="-15" type="number" step="1" oninput="Regenerate()"><label>)</label><br></div><hr><div class="flexparameters"><label>Type de symbole :</label><select id="poiUID_type" oninput="Regenerate()"><option value="1">+</option><option value="2">×</option><option value="3">○</option><option value="4">•</option><option value="5">.</option><option value="6"></option></select></div><hr><div class="flexparameters"><label>Taille du symbole :</label><input id="poiUID_size" type="number" value="10" step="1" min="0" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Epaisseur :</label><input id="poiUID_stroke" type="number" value="1" step="1" min="1" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="poiUID_stroke_color" type="color" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Style de trait :</label><input id="poiUID_style" type="text" oninput="Regenerate()"></div><hr><button class="delete" onclick="let a = Get_Point({id: UID}); Set_Point(Add_point(a),a)">Dupliquer</button><button class="delete" onclick="RemovePoint(\'poiUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);
	
		Regenerate();

		return id;
	}
	
	function Add_polygone(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "polygone")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "polygone",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "pol" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")

		let htmlnode = '<span onclick="menu_click(document.getElementById(\'polUID\'))">Polygone UID</span><div class="formemenu_div"><label>Points :</label><div id="polUIDpoints_list" class="coord_poly"></div><button onclick="Add_Point_Polygone(UID)">Ajouter un point</button><hr><div class="flexparameters"><label>Epaisseur :</label><input id="polUID_stroke" type="number" value="1" step="1" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="polUID_stroke_color" type="color" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Style de trait :</label><input id="polUID_style" type="text" oninput="Regenerate()"></div><hr><div><input id="polUID_fill" type="checkbox" style="width: auto;"oninput="Regenerate(); show_hide_param(\'polUID_fill\')"><label for="polUID_fill" style="width: auto;">Remplir la forme</label></div><div id="polUID_fill_section" class="subsection hiddenparam"><div class="flexparameters"><label>Couleur de remplissage :</label><input id="polUID_fill_color" type="color" oninput="Regenerate()"></div></div><button class="delete" onclick="let a = Get_Polygone({id: UID}); Set_Polygone(Add_polygone(a),a)">Dupliquer</button><button class="delete" onclick="RemovePolygone(\'polUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());
		
		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);
		
		Add_Point_Polygone(id,0,0)
		Add_Point_Polygone(id,2,1)
		Add_Point_Polygone(id,1,2)
		
		Regenerate();

		return id;
	}
	
	function Add_Point_Polygone(polygone_id, ox = 0, oy = 0)
	{
		var points = document.getElementById("pol" + polygone_id + "points_list");
		
		let ids = []
		let list = points.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			ids.push(list[i].id);
		}
		let id = 1;
		while(ids.indexOf("pol"+ polygone_id + "_poi" + id) >= 0)
			id += 1;

		let div = document.createElement("div");
		div.id = "pol" + polygone_id.toString() + "_poi" + id.toString();

		let htmlnode = '<label class="first_child">Point GID :</label><label>(</label><input class="input_coord_poly" id="polUID_poiGID_px" type="number" value="OX" oninput="Regenerate()"><label>;</label><input class="input_coord_poly" id="polUID_poiGID_py" type="number" value="OY" oninput="Regenerate()"><label>)</label><button class="coord_poly_delete" onclick="Remove_Point_Polygone(UID, GID)">❌</button>'

		htmlnode = htmlnode.replaceAll("OX", ox.toString());
		htmlnode = htmlnode.replaceAll("OY", oy.toString());
		htmlnode = htmlnode.replaceAll("UID", polygone_id.toString());
		htmlnode = htmlnode.replaceAll("GID", id.toString());

		div.innerHTML = htmlnode;
		points.appendChild(div);

		Regenerate();

		return id;
	}

	function Add_circle(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "circle")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "circle",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "cir" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")

		let htmlnode = '<span onclick="menu_click(document.getElementById(\'cirUID\'))">Cercle UID</span><div class="formemenu_div"><label>Position centre :</label><div class="flexparameters"><label>(</label><input class="input_coord" id="cirUID_px" type="number" value="1" oninput="Regenerate();"><label>;</label><input class="input_coord" id="cirUID_py" type="number" value="1" oninput="Regenerate();"><label>)</label></div><hr><div class="flexparameters"><label>Angle :</label><input class="input_coord" id="cirUID_as" type="number" value="0" oninput="Regenerate();"><label>-&gt;</label><input class="input_coord" id="cirUID_ae" type="number" value="360" oninput="Regenerate();"></div><hr><div class="flexparameters"><label>Rayon :</label><input id="cirUID_radius" type="number" value="1" min="0" oninput="Regenerate();"></div><hr><div class="flexparameters"><label>Epaisseur :</label><input id="cirUID_stroke" type="number" value="1" step="1" min="1" oninput="Regenerate();"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="cirUID_stroke_color" type="color" oninput="Regenerate();"></div><hr><div class="flexparameters"><label>Style de trait :</label><input id="cirUID_style" type="text" oninput="Regenerate();"></div><hr><div><input id="cirUID_fill" type="checkbox" style="width: auto;"oninput="Regenerate(); show_hide_param(\'cirUID_fill\')"><label for="cirUID_fill" style="width: auto;">Remplir la forme</label></div><div id="cirUID_fill_section" class="subsection hiddenparam"><div class="flexparameters"><label>Couleur de remplissage :</label><input id="cirUID_fill_color" type="color" oninput="Regenerate();"></div></div><hr><button class="delete" onclick="let a = Get_Circle({id: UID}); Set_Circle(Add_circle(a),a)">Dupliquer</button><button class="delete" onclick="RemoveTexte(\'cirUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);
	
		Regenerate();

		return id;
	}

	function Add_segment(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "segment")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "segment",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "seg" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")


		let htmlnode = '<span onclick="menu_click(document.getElementById(\'segUID\'))">Segment UID</span><div class="formemenu_div"><label>Position :</label><div class="subsection"><div class="flexparameters"><label>Départ (</label><input class="input_coord" id="segUID_psx" type="number" value="0" oninput="Regenerate()"><label>;</label><input class="input_coord" id="segUID_psy" type="number" value="0" oninput="Regenerate()"><label>)</label></div><div class="flexparameters"><label>Arrivée (</label><input class="input_coord" id="segUID_pex" type="number" value="0" oninput="Regenerate()"><label>;</label><input class="input_coord" id="segUID_pey" type="number" value="0" oninput="Regenerate()"><label>)</label></div></div><hr><label>Style :</label><div class="subsection"><div class="flexparameters"><label>Départ :</label><select id="segUID_ss" oninput="Regenerate()"><option value="0">Aucun</option><option value="1">Flêche 1</option><option value="2">Flêche 2</option><option value="3">Flêche 3</option><option value="4">Segment</option><option value="5">Rond</option></select><label> - </label><input class="input_coord" id="segUID_sss" type="number" value="100" step="5" min="0" oninput="Regenerate()"><label>%</label></div><div class="flexparameters"><label>Arrivée :</label><select id="segUID_se" oninput="Regenerate()"><option value="0">Aucun</option><option value="1">Flêche 1</option><option value="2">Flêche 2</option><option value="3">Flêche 3</option><option value="4">Segment</option><option value="5">Rond</option></select><label> - </label><input class="input_coord" id="segUID_ses" type="number" value="100" step="5" min="0" oninput="Regenerate()"><label>%</label></div></div><hr><div class="flexparameters"><label>Epaisseur :</label><input id="segUID_stroke" type="number" value="1" step="1" min="1" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="segUID_stroke_color" type="color" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Style de trait :</label><input id="segUID_style" type="text" oninput="Regenerate()"></div><hr><button class="delete" onclick="let a = Get_Segment({id: UID}); Set_Segment(Add_segment(a),a)">Dupliquer</button><button class="delete" onclick="RemoveSegment(\'segUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);

		Regenerate();

		return id;
	}
	
	function Add_texte(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "texte")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "texte",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "txt" + id.toString();
		div.classList.add("formemenu")
		div.classList.add("show")

		let htmlnode = '<span onclick="menu_click(document.getElementById(\'txtUID\'))">Texte UID</span><div class="formemenu_div"><label>Position :</label><div class="flexparameters"><label>(</label><input class="input_coord" id="txtUID_px" type="number" value="0" oninput="Regenerate()"><label>;</label><input class="input_coord" id="txtUID_py" type="number" value="0" oninput="Regenerate()"><label>)</label></div><hr><div class="flexparameters"><label>Nom :</label><input id="txtUID_text" type="text" value="A" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Angle :</label><input id="txtUID_angle" type="number" value="0" step="5" min="-360" max="360" oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Taille du texte :</label><input id="txtUID_text_size" type="number" value="12" step="2" min="0"oninput="Regenerate()"></div><hr><div class="flexparameters"><label>Couleur :</label><input id="txtUID_stroke_color" type="color" oninput="Regenerate()"></div><hr><button class="delete" onclick="let a = Get_Texte({id: UID}); Set_Texte(Add_texte(a),a)">Dupliquer</button><button class="delete" onclick="RemoveTexte(\'txtUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);

		Regenerate();

		return id;
	}

	function Add_section(clone = false)
	{
		let ids = []
		objects.forEach(obj =>{
			if(obj.type == "section")
				ids.push(obj.id);
		})
		let id = 1;
		while(ids.indexOf(id) >= 0)
			id += 1;
		objects.push(
			{
				type: "section",
				id: id,
				hover: false
			}
		)

		let div = document.createElement("div");
		div.id = "sec" + id.toString();
		div.classList.add("formemenu")
		// div.classList.add("show")

		let htmlnode = '<span onclick="menu_click(document.getElementById(\'secUID\'))">Section UID</span><div class="formemenu_div"><label>Poids :</label><br><input id="secUID_pds" type="number" value="1" min="0" oninput="Regenerate()"><label>Texte :</label><br><div id="secUID_txt_section" class="subsection"><select id="secUID_txt_type" oninput="Regenerate()"><option value="0">Hérité</option><option value="1">Aucun</option><option value="2">Pourcentage</option><option value="3">Fraction</option><option value="4">Décimal</option></select><div class="flexparameters"><label>Taille texte :</label><input id="secUID_txt_size" type="number" value="-1" step="2" oninput="Regenerate()"></div><div class="flexparameters"><label>Couleur :</label><input id="secUID_txt_color" type="color" oninput="Regenerate()"></div><div class="flexparameters"><label>Distance texte (%) :</label><input id="secUID_txt_dist" type="number" value="70" step="5" oninput="Regenerate()"></div></div><div><input id="secUID_fill" type="checkbox" style="width: auto;" unchecked oninput="Regenerate(); show_hide_param(this.id);"><label for="secUID_fill" style="width: auto;">Remplir la section</label></div><div id="secUID_fill_section" class="subsection hiddenparam"><select id="secUID_fill_type" oninput="Regenerate()"><option value="0">Uni</option><option value="1">Ligne horizontale</option><option value="2">Ligne verticale</option><option value="3">Ligne diagonale HG→BD</option><option value="4">Ligne diagonale BG→HD</option><option value="5">Points</option><option value="6">Quadrillage</option><option value="7">Quadrillage diagonal</option><option value="8">Damier</option><option value="9">Damier diagonal</option></select><div class="flexparameters"><label>Taille forme :</label><input id="secUID_fill_size" type="number" value="20" step="2" oninput="Regenerate()"></div><div class="flexparameters"><label>Couleur :</label><input id="secUID_fill_color" type="color" value="#FF0000" oninput="Regenerate()"></div><div class="flexparameters"><label>Epaisseur :</label><input id="secUID_fill_stroke" type="number" value="6" step="1" min="1" oninput="Regenerate()"></div></div><button class="delete" onclick="let a = Get_Section({id: UID}); Set_Section(Add_section(a),a)">Dupliquer</button><button class="delete" onclick="RemoveSection(\'secUID\')">Supprimer</button></div>'

		htmlnode = htmlnode.replaceAll("UID", id.toString());

		div.innerHTML = htmlnode;
		document.getElementById("object_list").appendChild(div);

		Regenerate();

		return id;
	}
}

{ // Suppression d'objet dans la liste latérale

	function Remove_Point_Polygone(polygone_id, point_id)
	{
		let element = document.getElementById("pol"+ polygone_id + "_poi" + point_id);
		element.parentNode.removeChild(element);
		Regenerate();
	}

	function Remove_Global(name, type)
	{
		let element = document.getElementById(name);
		element.parentNode.removeChild(element);
		let id = parseInt(name.substring(3));
		objects.splice(objects.findIndex(element => element.id == id && element.type == type), 1);
		Regenerate();
	}

	function RemoveCourbe(name)
	{
		Remove_Global(name, "courbe")
	}

	function RemovePoint(name)
	{
		Remove_Global(name, "point")
	}

	function RemovePolygone(name)
	{
		Remove_Global(name, "polygone")
	}

	function RemoveCircle(name)
	{
		Remove_Global(name, "circle")
	}

	function RemoveSegment(name)
	{
		Remove_Global(name, "segment")
	}

	function RemoveTexte(name)
	{
		Remove_Global(name, "texte")
	}

	function RemoveSection(name)
	{
		Remove_Global(name, "section")
	}

}

{ // Recupération donnée des objets dans la liste latérale

	function Get_Objects()
	{
		let data = [];
		let index = 0;
		objects.forEach(obj => {
			try{
				if (obj.type == "courbe")
					data.push(Get_Courbe(obj))
				if (obj.type == "point")
					data.push(Get_Point(obj))
				if (obj.type == "polygone")
					data.push(Get_Polygone(obj))
				if (obj.type == "circle")
					data.push(Get_Circle(obj))
				if (obj.type == "segment")
					data.push(Get_Segment(obj))
				if (obj.type == "texte")
					data.push(Get_Texte(obj))
				if (obj.type == "section")
					data.push(Get_Section(obj, index))
			}
			catch(e){
				console.log(e)
			}
			index+=1;
		});
		return data;
	}

	function Get_Courbe(obj)
	{
		var name = "for" + obj.id;
		data = {
			"type": "courbe",
			"formule": document.getElementById(name + "_text").value,
			"stroke": document.getElementById(name + "_stroke").valueAsNumber,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
			"dashstyle": document.getElementById(name + "_style").value,
			"start": document.getElementById(name + "_start").valueAsNumber,
			"end": document.getElementById(name + "_end").valueAsNumber,
		};
		return data;
	}

	function Get_Point(obj)
	{
		var name = "poi" + obj.id;
		let data = {
			"type": "point",
			"px": document.getElementById(name + "_px").valueAsNumber,
			"py": document.getElementById(name + "_py").valueAsNumber,
			"name": document.getElementById(name + "_text").value,
			"tx": document.getElementById(name + "_tx").valueAsNumber,
			"ty": document.getElementById(name + "_ty").valueAsNumber,
			"txt_size": document.getElementById(name + "_text_size").valueAsNumber,
			"type_point": document.getElementById(name + "_type").selectedIndex,
			"size": document.getElementById(name + "_size").value,
			"stroke": document.getElementById(name + "_stroke").value,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
			"dashstyle": document.getElementById(name + "_style").value,
		}
		return data;
	}

	function Get_Polygone(obj)
	{
		var name = "pol" + obj.id;
		let points_div = document.getElementById(name + "points_list");
		let points = [];
		let list = points_div.getElementsByTagName("div")
		for (var i = 0; i < list.length; i++) {
			let x = document.getElementById(list[i].id + "_px").valueAsNumber
			let y = document.getElementById(list[i].id + "_py").valueAsNumber
			points.push({ x: x, y: y});
		}
		let data = {
			"type": "polygone",
			"points": points,
			"fill_color": document.getElementById(name + "_fill_color").value,
			"fill": document.getElementById(name + "_fill").checked,
			"stroke": document.getElementById(name + "_stroke").valueAsNumber,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
			"dashstyle": document.getElementById(name + "_style").value,
		}
		return data;
	}

	function Get_Circle(obj)
	{
		var name = "cir" + obj.id
		let data = {
			"type": "circle",
			"px": document.getElementById(name + "_px").valueAsNumber,
			"py": document.getElementById(name + "_py").valueAsNumber,
			"as": document.getElementById(name + "_as").valueAsNumber,
			"ae": document.getElementById(name + "_ae").valueAsNumber,
			"radius": document.getElementById(name + "_radius").valueAsNumber,
			"stroke": document.getElementById(name + "_stroke").valueAsNumber,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
			"dashstyle": document.getElementById(name + "_style").value,
			"fill": document.getElementById(name + "_fill").checked,
			"fill_color": document.getElementById(name + "_fill_color").value,
		}
		return data;

	}

	function Get_Segment(obj)
	{
		var name = "seg" + obj.id
		let data = {
			"type": "segment",
			"psx": document.getElementById(name + "_psx").valueAsNumber,
			"psy": document.getElementById(name + "_psy").valueAsNumber,
			"pex": document.getElementById(name + "_pex").valueAsNumber,
			"pey": document.getElementById(name + "_pey").valueAsNumber,
			"ss": document.getElementById(name + "_ss").selectedIndex,
			"sss": document.getElementById(name + "_sss").valueAsNumber,
			"se": document.getElementById(name + "_se").selectedIndex,
			"ses": document.getElementById(name + "_ses").valueAsNumber,
			"stroke": document.getElementById(name + "_stroke").valueAsNumber,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
			"dashstyle": document.getElementById(name + "_style").value,
		}
		return data;
	}

	function Get_Texte(obj)
	{
		var name = "txt" + obj.id;
		let data = {
			"type": "texte",
			"px": document.getElementById(name + "_px").valueAsNumber,
			"py": document.getElementById(name + "_py").valueAsNumber,
			"name": document.getElementById(name + "_text").value,
			"angle": document.getElementById(name + "_angle").valueAsNumber,
			"txt_size": document.getElementById(name + "_text_size").valueAsNumber,
			"strokecolor": document.getElementById(name + "_stroke_color").value,
		}
		return data;
	}

	function Get_Section(obj, index)
	{
		var name = "sec" + obj.id;
		let data = {
			"id": obj.id,
			"index": index,
			"type": "section",
			"weight": document.getElementById(name + "_pds").valueAsNumber,
			"txt_type": document.getElementById(name + "_txt_type").selectedIndex,
			"txt_size": document.getElementById(name + "_txt_size").valueAsNumber,
			"txt_color": document.getElementById(name + "_txt_color").value,
			"txt_dist": document.getElementById(name + "_txt_dist").valueAsNumber,
			"fill": document.getElementById(name + "_fill").checked,
			"fill_type": document.getElementById(name + "_fill_type").selectedIndex,
			"fill_size": document.getElementById(name + "_fill_size").valueAsNumber,
			"fill_color": document.getElementById(name + "_fill_color").value,
			"fill_stroke": document.getElementById(name + "_fill_stroke").valueAsNumber,
		}
		return data;
	}

}

{ // Assignation des données d'un objet


	function Set_Courbe(id, data)
	{
		var name = "for" + id;
		document.getElementById(name + "_text").value = data["formule"];
		document.getElementById(name + "_stroke").value = data["stroke"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		document.getElementById(name + "_style").value = data["dashstyle"];
		document.getElementById(name + "_start").value = data["start"];
		document.getElementById(name + "_end").value = data["end"];
		Regenerate();
	}

	function Set_Point(id, data)
	{
		var name = "poi" + id;
		document.getElementById(name + "_px").valueAsNumber = data["px"];
		document.getElementById(name + "_py").valueAsNumber = data["py"];
		document.getElementById(name + "_text").value = data["name"];
		document.getElementById(name + "_tx").valueAsNumber = data["tx"];
		document.getElementById(name + "_ty").valueAsNumber = data["ty"];
		document.getElementById(name + "_text_size").valueAsNumber = data["txt_size"];
		document.getElementById(name + "_type").selectedIndex = data["type_point"];
		document.getElementById(name + "_size").value = data["size"];
		document.getElementById(name + "_stroke").value = data["stroke"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		document.getElementById(name + "_style").value = data["dashstyle"];
		Regenerate();
	}

	function Set_Polygone(id, data)
	{
		var name = "pol" + id;
		document.getElementById(name + "points_list").innerHTML = "";
		for (var i = 0; i < data["points"].length; i++)
		{
			Add_Point_Polygone(id, data["points"][i].x, data["points"][i].y)
		}
		document.getElementById(name + "_fill_color").value = data["fill_color"];
		document.getElementById(name + "_fill").checked = data["fill"];
		document.getElementById(name + "_stroke").valueAsNumber = data["stroke"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		document.getElementById(name + "_style").value = data["dashstyle"];
		Regenerate();
	}

	function Set_Circle(id, data)
	{
		var name = "cir" + id
		document.getElementById(name + "_px").valueAsNumber = data["px"];
		document.getElementById(name + "_py").valueAsNumber = data["py"];
		document.getElementById(name + "_as").valueAsNumber = data["as"];
		document.getElementById(name + "_ae").valueAsNumber = data["ae"];
		document.getElementById(name + "_radius").valueAsNumber = data["radius"];
		document.getElementById(name + "_stroke").valueAsNumber = data["stroke"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		document.getElementById(name + "_style").value = data["dashstyle"];
		document.getElementById(name + "_fill").checked = data["fill"];
		document.getElementById(name + "_fill_color").value = data["fill_color"];
		Regenerate();
	}

	function Set_Segment(id, data)
	{
		var name = "seg" + id
		document.getElementById(name + "_psx").valueAsNumber = data["psx"];
		document.getElementById(name + "_psy").valueAsNumber = data["psy"];
		document.getElementById(name + "_pex").valueAsNumber = data["pex"];
		document.getElementById(name + "_pey").valueAsNumber = data["pey"];
		document.getElementById(name + "_ss").selectedIndex = data["ss"];
		document.getElementById(name + "_sss").valueAsNumber = data["sss"];
		document.getElementById(name + "_se").selectedIndex = data["se"];
		document.getElementById(name + "_ses").valueAsNumber = data["ses"];
		document.getElementById(name + "_stroke").valueAsNumber = data["stroke"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		document.getElementById(name + "_style").value = data["dashstyle"];
		Regenerate();
	}

	function Set_Texte(id, data)
	{
		var name = "txt" + id;
		document.getElementById(name + "_px").valueAsNumber = data["px"];
		document.getElementById(name + "_py").valueAsNumber = data["py"];
		document.getElementById(name + "_text").value = data["name"];
		document.getElementById(name + "_angle").valueAsNumber = data["angle"];
		document.getElementById(name + "_text_size").valueAsNumber = data["txt_size"];
		document.getElementById(name + "_stroke_color").value = data["strokecolor"];
		Regenerate();
	}

	function Set_Section(id, data)
	{
		var name = "sec" + id;
		document.getElementById(name + "_pds").valueAsNumber =	data["weight"];
		document.getElementById(name + "_txt_type").selectedIndex = data["txt_type"];
		document.getElementById(name + "_txt_size").valueAsNumber = data["txt_size"];
		document.getElementById(name + "_txt_color").value = data["txt_color"];
		document.getElementById(name + "_txt_dist").valueAsNumber = data["txt_dist"];
		document.getElementById(name + "_fill").checked = data["fill"];
		if (data["fill"])
			document.getElementById(name + "_fill_section").classList.remove("hiddenparam")
		document.getElementById(name + "_fill_type").selectedIndex = data["fill_type"];
		document.getElementById(name + "_fill_size").valueAsNumber = data["fill_size"];
		document.getElementById(name + "_fill_color").value = data["fill_color"];
		document.getElementById(name + "_fill_stroke").valueAsNumber = data["fill_stroke"];
		Regenerate();
	}

}




{ // Save functions

	function Save()
	{
		var svgString = document.getElementById('preview').innerHTML;
		a = document.createElement('a');
		a.download = 'Forme.svg';
		a.type = 'image/svg+xml';
		blob = new Blob([svgString], {"type": "image/svg+xml"});
		a.href = (window.URL || webkitURL).createObjectURL(blob);
		a.click();
	}

	function SavePNG() {
		var svg = document.getElementById('preview').innerHTML;
		let img = document.createElement("img");
		let url = (window.URL || webkitURL).createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
		img.src = url;
		img.setAttribute("style", "position:fixed;left:-200vw;");
		img.onload = function onload() {
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			var link = document.createElement('a');
			link.download = 'Forme.png';
			link.href = canvas.toDataURL("image/png")
			link.click();
			img.remove();
			(window.URL || webkitURL).revokeObjectURL(url);
		};
		document.body.appendChild(img);
	}

}
