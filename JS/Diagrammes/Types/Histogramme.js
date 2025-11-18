class Histogramme
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";

    margin_up = 10; // Marge en dehors du diagramme
    margin_down = 10; // Marge en dehors du diagramme
    margin_left = 10; // Marge en dehors du diagramme
    margin_right = 10; // Marge en dehors du diagramme
    intervalle = 5; 
    start = 0; 
    pas = 1; 
    max_eff = 5;
    stroke_width = 1;
    graduation_size = 6;
    text_size = 12;
    title = ""; 
    Haxe_name = "";
    Vaxe_name = "Effectif";
    grid = true;
    grid_color = "#75FFFF"
    effectifs = [5,3,4,7,2];
    colors = ["#e60049B3", "#0bb4ffB3", "#50e991B3", "#e6d800B3", "#9b19f5B3", "#ffa300B3", "#dc0ab4B3", "#b3d4ffB3", "#00bfa0B3", "#f0ccccB3"];

    constructor(config)
    {
        if (config.hasOwnProperty("element_id")) this.element_id = config["element_id"];
        if (config.hasOwnProperty("margin_up")) this.margin_up = config["margin_up"];
        if (config.hasOwnProperty("margin_down")) this.margin_down = config["margin_down"];
        if (config.hasOwnProperty("margin_left")) this.margin_left = config["margin_left"];
        if (config.hasOwnProperty("margin_right")) this.margin_right = config["margin_right"];
        if (config.hasOwnProperty("width")) this.Canvas_width = config["width"];
        if (config.hasOwnProperty("height")) this.Canvas_height = config["height"];
        if (config.hasOwnProperty("intervalle")) this.intervalle = config["intervalle"];
        if (config.hasOwnProperty("start")) this.start = config["start"];
        if (config.hasOwnProperty("pas")) this.pas = config["pas"];
        if (config.hasOwnProperty("max_eff")) this.max_eff = config["max_eff"];
        if (config.hasOwnProperty("title")) this.title = config["title"];
        if (config.hasOwnProperty("Haxe_name")) this.Haxe_name = config["Haxe_name"];
        if (config.hasOwnProperty("Vaxe_name")) this.Vaxe_name = config["Vaxe_name"];
        if (config.hasOwnProperty("grid")) this.grid = config["grid"];
        if (config.hasOwnProperty("grid_color")) this.grid_color = config["grid_color"];
        if (config.hasOwnProperty("effectifs")) this.effectifs = config["effectifs"];
        if (config.hasOwnProperty("colors")) this.colors = config["colors"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("graduation_size")) this.graduation_size = config["graduation_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("grid_width")) this.grid_width = config["grid_width"];
        
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
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy) / 2));
        for (let i = 1; i <= this.max_eff; i++) {
            if (i % pass != 0) continue;
            let y = sy + i * dy;
            draw.line(sx, y, sx + w, y)
            .stroke(grid_style);
        }
        for (let i = 1; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            draw.line(dx, sy, dx, sy + h)
            .stroke(grid_style);
        }

    }

    Draw_Axes(draw, sx, sy, w, h)
    {
        for (let i = 0; i <= this.max_eff; i++) {
            let dy = sy + i * h / this.max_eff;
            draw.line(sx - this.graduation_size / 2.0, dy, sx + this.graduation_size / 2.0, dy)
            .stroke({width: this.stroke_width, color: "black"});
        }
        for (let i = 0; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            draw.line(dx, sy - this.graduation_size / 2.0, dx, sy + this.graduation_size / 2.0)
            .stroke({width: this.stroke_width, color: "black"});
        }
        draw.line(sx, sy, sx + w, sy)
            .stroke({width: this.stroke_width, color: "black"});
        draw.line(sx, sy, sx, sy + h)
            .stroke({width: this.stroke_width, color: "black"});
    }

    Draw_Text(draw, sx, sy, w, h)
    {
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy)));
        for (let i = 0; i <= this.max_eff; i++) {
            if (i % pass == 0)
            {
                let y = sy + i * dy;
                let text = draw.text(i.toString())
                text.move(sx - this.lineh / 2.0 - this.graduation_size / 2.0, y - this.lineh / 2.0)
                text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
            }
        }
        for (let i = 0; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            let text = draw.text((i * this.pas + this.start).toString())
            text.move(dx, sy + this.graduation_size / 2.0)
            text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        }
    }

    Draw_Diagramme(draw, sx, sy, w, h)
    {
        let dx = w / (this.intervalle);
        let dy = h / this.max_eff;
        for (let i = 0; i < this.effectifs.length; i++) {
            if (this.effectifs[i] == 0) continue;

            let c = this.colors[i % this.colors.length];
            
            let rect = draw.rect( dx - 1, Math.abs(dy* this.effectifs[i])-0.5)
            rect.move(sx + dx * i+0.5, sy + dy * this.effectifs[i])
            rect.fill({color: c})
            rect.stroke({color: c.substring(0, c.length - 2), width: this.grid_width})
        }
    }
}