class Diagramme_Circulaire
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";

    margin_up = 10; // Marge en dehors du diagramme
    margin_down = 10; // Marge en dehors du diagramme
    margin_left = 10; // Marge en dehors du diagramme
    margin_right = 10; // Marge en dehors du diagramme
    diag_width = 75; // pourcentage d'occupation du diagramme par rapport a la legende
    diag_angle = 0; // decalage d'angle du diagramme
    legende_space = 10; // espace entre le diagramme et la legende
    legende_square_size = 10; // taille des carré de couleur de la légende
    stroke_width = 1; // epaisseur du tracé
    text_size = 12; // taille du texte
    title = ""; // titre du diagramme
    border = false;
	
    // etiquettes des différentes sections
	etiquettes = ["valeur 1","valeur 2","valeur 3","valeur 4","valeur 5"];
    // effectifs des différentes sections
	effectifs = [5,3,4,40,2];
    // transparence des sections
	transparency = 0.8; 
	//Couleur des sections
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
        if (config.hasOwnProperty("diag_width")) this.diag_width = config["diag_width"];
        if (config.hasOwnProperty("diag_angle")) this.diag_angle = config["diag_angle"];
        if (config.hasOwnProperty("legende_space")) this.legende_space = config["legende_space"];
        if (config.hasOwnProperty("title")) this.title = config["title"];
        if (config.hasOwnProperty("etiquettes")) this.etiquettes = config["etiquettes"];
        if (config.hasOwnProperty("effectifs")) this.effectifs = config["effectifs"];
        if (config.hasOwnProperty("colors")) this.colors = config["colors"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("legende_square_size")) this.legende_square_size = config["legende_square_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("transparency")) this.transparency = config["transparency"];
        if (config.hasOwnProperty("border")) this.border = config["border"];
        
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

        let dsx = this.margin_left;
        let dsy = this.margin_up + this.lineh;

        let dw = (w - this.legende_space) * this.diag_width / 100.0;
        let dh = (h - this.lineh);
		let tw = (w - this.legende_space) * (1.0 - this.diag_width / 100.0);

        let tsx = this.margin_left + dw + this.legende_space;
		
        this.Draw_Diagramme(draw, dsx, dsy, dw, dh);
        this.Draw_Text(draw, tsx, dsy, tw, dh);

        let text3 = draw.text(this.title)
        text3.move(this.margin_left + w / 2, this.margin_up - this.lineh /4)
        text3.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        
    }

    Draw_Text(draw, sx, sy, w, h)
    {
		var text_style = { fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'left' }
        let dy = h / this.effectifs.length;
		let sdy = (dy - this.legende_square_size) / 2.0;
        for (let i = 0; i < this.effectifs.length; i++) 
		{
            let c = this.colors[i % this.colors.length];
			let rect = draw.rect(this.legende_square_size, this.legende_square_size)
            rect.move(sx, sy + sdy + dy * i)
            rect.fill({color: c, opacity: this.transparency})
            rect.stroke({color: c, width: this.stroke_width})
			if (this.etiquettes.length > i)
			{
                let y = sy + (i+0.5) * dy;
                let text = draw.text(this.etiquettes[i])
                text.move(sx + this.legende_square_size + 5, y + 3.5 - this.lineh / 2.0)
                text.font(text_style)
            }
        }
    }

    Draw_Diagramme(draw, sx, sy, w, h)
    {
		let radius = Math.min(w / 2.0, h / 2.0);
		let effectif_total = 0.0;
		for (let i = 0; i < this.effectifs.length; i++) {
			effectif_total += this.effectifs[i];
        }
		let da = this.diag_angle;
		let cx = sx + w / 2.0
		let cy = sy + h / 2.0
		let startpos = "M"+ cx.toString() + " " + cy.toString() + "L"
        for (let i = 0; i < this.effectifs.length; i++) {
            if (this.effectifs[i] == 0) continue;
			let a = 360.0 * this.effectifs[i] / effectif_total;
            let c = this.colors[i % this.colors.length];

			let xs = cx + radius * Math.cos(da / 180.0 * Math.PI);
			let ys = cy + radius * Math.sin(da / 180.0 * Math.PI);

			let xe = cx + radius * Math.cos((da + a) / 180.0 * Math.PI);
			let ye = cy + radius * Math.sin((da + a) / 180.0 * Math.PI);

			let txt = startpos + xs.toString()+" "+ys.toString();
			let big = "0"
			if (a > 180.0) big = "1"
			txt += "A"+radius.toString()+" "+radius.toString() + " 0 " + big + " 1 "
			txt += xe.toString()+" "+ye.toString()
			txt += "z";
			let path = draw.path(txt)
            path.fill({color: c, opacity: this.transparency})
            path.stroke({color: c, width: this.stroke_width})
			da += a;
        }
        if (this.border)
        {
            let el = draw.ellipse(radius * 2, radius * 2);
            el.move(cx - radius, cy - radius);
            el.fill({opacity: 0})
            el.stroke({color: 'black', width: this.stroke_width})
        }
    }
}