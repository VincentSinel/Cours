class Diagramme_Baton
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";

    margin_up = 10; // Marge en dehors du diagramme
    margin_down = 10; // Marge en dehors du diagramme
    margin_left = 10; // Marge en dehors du diagramme
    margin_right = 10; // Marge en dehors du diagramme
    bar = 5; // nombre de barre de valeur (axe horitontal)
    max_eff = 8; // effectif maximum (axe verticale)
    stroke_width = 1; // epaisseur du tracé
    graduation_size = 6; // taille des graduation
    bar_width = 50; // largeur d'une barre en pourcentage de la place disponible
    text_size = 12; // taille du texte
    title = ""; // titre du diagramme
    Haxe_name = ""; // Nom de l'axe horizontal
    Vaxe_name = "Effectif"; // Nom de l'axe vertical
    grid = true; // affichage de la grille
    grid_color = "#75FFFF" // couleur de la grille
	
    // etiquettes des différentes barre
	etiquettes = ["valeur 1","valeur 2","valeur 3","valeur 4","valeur 5"]; 
	etiq_offset_x = 0;
	etiq_offset_y = 0;
	etiq_offset_angle = 0;
    // effectifs des différentes barres
	effectifs = [5,3,4,7,2];
    // transparence des barres
	transparency = "AA"; 
	//Couleur des barres
	colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#f0cccc"];

    constructor(config)
    {
        if (config.hasOwnProperty("element_id")) this.element_id = config["element_id"];
        if (config.hasOwnProperty("margin_up")) this.margin_up = config["margin_up"];
        if (config.hasOwnProperty("margin_down")) this.margin_down = config["margin_down"];
        if (config.hasOwnProperty("margin_left")) this.margin_left = config["margin_left"];
        if (config.hasOwnProperty("margin_right")) this.margin_right = config["margin_right"];
        if (config.hasOwnProperty("width")) this.Canvas_width = config["width"];
        if (config.hasOwnProperty("height")) this.Canvas_height = config["height"];
        if (config.hasOwnProperty("bar")) this.bar = config["bar"];
        if (config.hasOwnProperty("max_eff")) this.max_eff = config["max_eff"];
        if (config.hasOwnProperty("title")) this.title = config["title"];
        if (config.hasOwnProperty("Haxe_name")) this.Haxe_name = config["Haxe_name"];
        if (config.hasOwnProperty("Vaxe_name")) this.Vaxe_name = config["Vaxe_name"];
        if (config.hasOwnProperty("grid")) this.grid = config["grid"];
        if (config.hasOwnProperty("bar_width")) this.grid = config["bar_width"];
        if (config.hasOwnProperty("grid_color")) this.grid_color = config["grid_color"];
        if (config.hasOwnProperty("etiquettes")) this.etiquettes = config["etiquettes"];
        if (config.hasOwnProperty("etiq_offset_x")) this.etiq_offset_x = config["etiq_offset_x"];
        if (config.hasOwnProperty("etiq_offset_y")) this.etiq_offset_y = config["etiq_offset_y"];
        if (config.hasOwnProperty("etiq_offset_angle")) this.etiq_offset_angle = config["etiq_offset_angle"];
        if (config.hasOwnProperty("effectifs")) this.effectifs = config["effectifs"];
        if (config.hasOwnProperty("colors")) this.colors = config["colors"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("graduation_size")) this.graduation_size = config["graduation_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("grid_width")) this.grid_width = config["grid_width"];
        if (config.hasOwnProperty("transparency")) this.transparency = config["transparency"];
        let e = document.getElementById(this.element_id);
        e.style.border = "solid black 1px";
        e.style.width = "fit-content"
        this.Draw();
    }

    lineh;

    Draw()
    {
        this.draw = SVG().addTo("#" + this.element_id).size(this.Canvas_width, this.Canvas_height)
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
            this.Draw_Grid(sx, sy, dw, dh);
        this.Draw_Diagramme(sx, sy, dw, dh);
        this.Draw_Axes(sx, sy, dw, dh);
        this.Draw_Text(sx, sy, dw, dh);

        let text1 = this.draw.text(this.Haxe_name)
        text1.move(ex1, sy + this.graduation_size / 2.0 + this.lineh)
        text1.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'end' })
        let text2 = this.draw.text(this.Vaxe_name)
        text2.move(this.margin_up, this.margin_up + this.lineh - this.lineh /4)
        text2.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'start' })
        let text3 = this.draw.text(this.title)
        text3.move(this.margin_left + w / 2, this.margin_up - this.lineh /4)
        text3.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        
    }


    Draw_Grid(sx, sy, w, h)
    {
		let grid_style = {width: this.grid_width, color: this.grid_color};
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy) / 2));
        for (let i = 1; i <= this.max_eff; i++) {
            if (i % pass != 0) continue;
            let y = sy + i * dy;
            this.draw.line(sx, y, sx + w, y)
            .stroke(grid_style);
        }

    }

    Draw_Axes(sx, sy, w, h)
    {
		var stroke_style = {width: this.stroke_width, color: "black"};
        for (let i = 0; i <= this.max_eff; i++) {
            let dy = sy + i * h / this.max_eff;
            this.draw.line(sx - this.graduation_size / 2.0, dy, sx + this.graduation_size / 2.0, dy)
            .stroke(stroke_style);
        }
        this.draw.line(sx, sy, sx + w, sy)
            .stroke(stroke_style);
        this.draw.line(sx, sy, sx, sy + h)
            .stroke(stroke_style);
    }

    Draw_Text(sx, sy, w, h)
    {
		var text_style = { fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' }
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy)));
        for (let i = 0; i <= this.max_eff; i++) {
            if (i % pass == 0)
            {
                let y = sy + i * dy;
                let text = this.draw.text(i.toString())
                text.move(sx - this.lineh / 2.0 - this.graduation_size / 2.0, y - this.lineh / 2.0)
                text.font(text_style)
            }
        }
        for (let i = 0; i < this.etiquettes.length; i++) {
            let dx = sx + (i + 0.5) * w / (this.bar);
			dx += this.etiq_offset_x;
            let text = this.draw.text(this.etiquettes[i])
            text.move(dx, sy + this.graduation_size / 2.0 + this.etiq_offset_y)
            text.font(text_style)
			text.rotate(-this.etiq_offset_angle)
		}
    }

    Draw_Diagramme(sx, sy, w, h)
    {
        let dx = w / (this.bar);
        let dy = h / this.max_eff;
		let offset_x = (dx - 1) * (1.0 - this.bar_width / 100.0) / 2.0
        for (let i = 0; i < this.effectifs.length; i++) {
            if (this.effectifs[i] == 0) continue;

            let c = this.colors[i % this.colors.length];


            let rect = this.draw.rect( (dx - 1) * this.bar_width / 100.0, Math.abs(dy* this.effectifs[i])-0.5)
            rect.move(sx + dx * i+0.5 + offset_x, sy + dy * this.effectifs[i])
            rect.fill(c + this.transparency)
            rect.stroke({color: c, width: this.grid_width})
        }
    }
}