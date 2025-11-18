class Diagramme_Cartesien
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";

    margin_up = 10; // Marge en dehors du diagramme
    margin_down = 10; // Marge en dehors du diagramme
    margin_left = 10; // Marge en dehors du diagramme
    margin_right = 10; // Marge en dehors du diagramme

	Hstart = 0; // Valeur de départ pour l'axe horizontal
	Hpas = 1; // Pas de l'axe horizontal
	Hsection = 3; // Nombre de section sur l'axe horizontal
	Hsubsection = 5; // Nombre de sous section sur l'axe horizontal (utiliser pour la grille)

	Vstart = 0; // Valeur de départ pour l'axe vertical
	Vpas = 1; // Pas de l'axe vertical
	Vsection = 5; // Nombre de section sur l'axe vertical
	Vsubsection = 5; // Nombre de sous section sur l'axe vertical (utiliser pour la grille)

    grid = true; // affichage de la grille
    grid_color = "#75FFFF" // couleur de la grille
    grid_color_second = "#75FFFF" // couleur de la grille
    text_size = 12; // taille du texte
    title = ""; // titre du diagramme
    Haxe_name = "Temps (s)"; // Nom de l'axe horizontal
    Vaxe_name = "Taille (cm)"; // Nom de l'axe vertical
    stroke_width = 1; // epaisseur du tracé
	grid_width = 1; // epaisseur de la grille
    graduation_size = 6; // taille des graduation
    point_size = 10; // taille des points
	stroke_color = "#dc0ab4"; // Couleur du tracé
	//Couleur des barres
	// colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#f0cccc"];
	
    // points du diagramme
	points = [[0,0],[1,0.5],[2,4],[3,2]];

    constructor(config)
    {
        if (config.hasOwnProperty("element_id")) this.element_id = config["element_id"];
        if (config.hasOwnProperty("margin_up")) this.margin_up = config["margin_up"];
        if (config.hasOwnProperty("margin_down")) this.margin_down = config["margin_down"];
        if (config.hasOwnProperty("margin_left")) this.margin_left = config["margin_left"];
        if (config.hasOwnProperty("margin_right")) this.margin_right = config["margin_right"];
        if (config.hasOwnProperty("width")) this.Canvas_width = config["width"];
        if (config.hasOwnProperty("height")) this.Canvas_height = config["height"];
        if (config.hasOwnProperty("Hstart")) this.Hstart = config["Hstart"];
        if (config.hasOwnProperty("Hpas")) this.Hpas = config["Hpas"];
        if (config.hasOwnProperty("Hsection")) this.Hsection = config["Hsection"];
        if (config.hasOwnProperty("Hsubsection")) this.Hsubsection = config["Hsubsection"];
        if (config.hasOwnProperty("Vstart")) this.Vstart = config["Vstart"];
        if (config.hasOwnProperty("Vpas")) this.Vpas = config["Vpas"];
        if (config.hasOwnProperty("Vsection")) this.Vsection = config["Vsection"];
        if (config.hasOwnProperty("Vsubsection")) this.Vsubsection = config["Vsubsection"];
        if (config.hasOwnProperty("title")) this.title = config["title"];
        if (config.hasOwnProperty("Haxe_name")) this.Haxe_name = config["Haxe_name"];
        if (config.hasOwnProperty("Vaxe_name")) this.Vaxe_name = config["Vaxe_name"];
        if (config.hasOwnProperty("grid")) this.grid = config["grid"];
        if (config.hasOwnProperty("grid_color")) this.grid_color = config["grid_color"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("graduation_size")) this.graduation_size = config["graduation_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("stroke_color")) this.stroke_color = config["stroke_color"];
        if (config.hasOwnProperty("grid_width")) this.grid_width = config["grid_width"];
        if (config.hasOwnProperty("point_size")) this.grid_width = config["point_size"];
        if (config.hasOwnProperty("points")) this.points = config["points"];
        
        if (this.element_id != "")
        {
            let e = document.getElementById(this.element_id);
            e.style.border = "solid black 1px";
            e.style.width = "fit-content"
            this.draw = SVG().addTo("#" + this.element_id).size(this.Canvas_width, this.Canvas_height)
            this.Draw(this.draw);
        }
        else
        {
            if (config.hasOwnProperty("draw_surface"))
            {
                this.Draw(config["draw_surface"]);
            }
        }
    }

    lineh;

    Draw(draw)
    {
        let w = this.Canvas_width - this.margin_left - this.margin_right;
        let h = this.Canvas_height - this.margin_up - this.margin_down;

        this.lineh = Math.floor(this.text_size * 96.0/72.0);

        let sx = this.lineh + this.margin_left;
        let sy = this.margin_up + h - this.lineh * 2;

        let ex1 = w + this.margin_left;
        let ey2 = this.margin_up + this.lineh * 2;

        let dw = ex1 - sx
        let dh = ey2 - sy
        if (this.grid)
            this.Draw_Grid(draw, sx, sy, dw, dh);
        this.Draw_Diagramme(draw, sx, sy, dw, dh);
        this.Draw_Axes(draw, sx, sy, dw, dh);
        this.Draw_Text(draw, sx, sy, dw, dh);

        let text1 = draw.text(this.Haxe_name)
        text1.move(ex1, sy + this.graduation_size / 2.0 + this.lineh)
        text1.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'end' })
        let text2 = draw.text(this.Vaxe_name)
        text2.move(this.margin_up, this.margin_up + this.lineh - this.lineh /4)
        text2.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'start' })
        let text3 = draw.text(this.title)
        text3.move(this.margin_left + w / 2, this.margin_up - this.lineh /4)
        text3.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        
    }


    Draw_Grid(draw, sx, sy, w, h)
    {
		let grid_style = {width: this.grid_width, color: this.grid_color}
		let grid_style2 = {width: this.grid_width / 2.0, color: this.grid_color}
        let dx = w / (this.Hsection * this.Hsubsection);
        let dy = h / (this.Vsection * this.Vsubsection);
        for (let i = 1; i <= this.Hsection * this.Hsubsection; i++) {
            let x = sx + i * dx;
			if (i %this.Hsubsection == 0)
			{
				draw.line(x, sy, x, sy + h).stroke(grid_style);
			}
			else
			{
				draw.line(x, sy, x, sy + h).stroke(grid_style2);
			}
        }
        for (let i = 1; i <= this.Vsection * this.Vsubsection; i++) {
            let y = sy + i * dy;
			if (i %this.Vsubsection == 0)
			{
				draw.line(sx, y, sx + w, y).stroke(grid_style);
			}
			else
			{
				draw.line(sx, y, sx + w, y).stroke(grid_style2);
			}
        }
    }

    Draw_Axes(draw, sx, sy, w, h)
    {
		let stroke_style = {width: this.stroke_width, color: "black"};
		let dx = w / this.Hsection;
		let dy = h / this.Vsection;
        for (let i = 0; i <= this.Hsection; i++) {
            let x = sx + i * dx;
            draw.line(x, sy - this.graduation_size / 2.0, x, sy + this.graduation_size / 2.0)
            .stroke(stroke_style);
        }
        for (let i = 0; i <= this.Vsection; i++) {
            let y = sy + i * dy;
            draw.line(sx - this.graduation_size / 2.0, y, sx + this.graduation_size / 2.0, y)
            .stroke(stroke_style);
        }
        draw.line(sx, sy, sx + w, sy)
            .stroke(stroke_style);
        draw.line(sx, sy, sx, sy + h)
            .stroke(stroke_style);
    }

    Draw_Text(draw, sx, sy, w, h)
    {
		var text_style = { fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' }
		let dx = w / this.Hsection;
		let dy = h / this.Vsection;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy)));
        for (let i = 0; i <= this.Hsection; i++) {
            let x = sx + i * dx;
            let text = draw.text((this.Hstart + this.Hpas * i).toString())
            text.move(x, sy + this.graduation_size / 2.0 + 2)
            text.font(text_style)
		}
        for (let i = 0; i <= this.Vsection; i++) {
            if (i % pass == 0)
            {
                let y = sy + i * dy;
                let text = draw.text((this.Vstart + this.Vpas * i).toString())
                text.move(sx - this.lineh / 2.0 - this.graduation_size / 2.0, y - this.lineh / 2.0)
                text.font(text_style)
            }
        }
    }

    Draw_Diagramme(draw, sx, sy, w, h)
    {
		let dx = w / (this.Hsection * this.Hpas);
		let dy = h / (this.Vsection * this.Vpas);
		if (this.points.length == 0) return;
		let ox; let oy;
        for (let i = 0; i < this.points.length; i++) 
		{
			let x = sx + dx * (this.points[i][0] - this.Hstart);
			let y = sy + dy * (this.points[i][1] - this.Vstart);
			
			let cross1 = draw.line(x - this.point_size / 2.0,y,x + this.point_size / 2.0,y)
			cross1.stroke({color: this.stroke_color, width: this.stroke_width})
			let cross2 = draw.line(x, y - this.point_size / 2.0,x, y + this.point_size / 2.0)
			cross2.stroke({color: this.stroke_color, width: this.stroke_width})
			
			if (i > 0)
			{
				let line = draw.line(ox, oy, x, y);
				line.stroke({color: this.stroke_color, width: this.stroke_width})
			}


			ox = x; oy = y;
        }
    }
}