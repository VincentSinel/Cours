

window.onload = function()
{
    CreateDiagrammes();
}


function CreateDiagrammes()
{
    let config1 = {
        "element_id": "diagintro",
        "margin": 10,
        "width": 400,
        "height": 300,
        "intervalle": 5,
        "start": 28,
        "pas": 2,
        "max_eff": 18,
        "name": "Effectif en fonction du calibre",
        "axe_name": "Calibre (mm)",
        "effectifs": [4],
    }
    new Diagramme(config1);
    let config2 = {
        "element_id": "diagexemple1",
        "margin": 10,
        "width": 400,
        "height": 300,
        "intervalle": 3,
        "start": 145,
        "pas": 5,
        "max_eff": 13,
        "name": "Répartition de la taille des élèves",
        "axe_name": "Taille (cm)",
        "effectifs": [9,12,7],
    }
    new Diagramme(config2);
    let config3 = {
        "element_id": "diagexemple2",
        "margin": 10,
        "width": 400,
        "height": 300,
        "intervalle": 5,
        "start": 0,
        "pas": 30,
        "max_eff": 12,
        "name": "Quantité de SMS envoyé par jour",
        "axe_name": "SMS",
        "effectifs": [2,6,10,5,1],
    }
    new Diagramme(config3);
}


class Diagramme
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";

    margin = 10; 
    intervalle = 5; 
    start = 0; 
    pas = 1; 
    max_eff = 5;
    stroke_width = 1;
    graduation_size = 6;
    text_size = 12;
    name = ""; 
    axe_name = "";
    grid = true;
    grid_color = "#75FFFF"
    effectifs = [5,3,4,7,2];
    transparency = "AA";
    colors = ["#FDC463","#ADEBF6","#465058","#F77C55"];

    constructor(config)
    {
        if (config.hasOwnProperty("element_id")) this.element_id = config["element_id"];
        if (config.hasOwnProperty("margin")) this.margin = config["margin"];
        if (config.hasOwnProperty("width")) this.Canvas_width = config["width"];
        if (config.hasOwnProperty("height")) this.Canvas_height = config["height"];
        if (config.hasOwnProperty("intervalle")) this.intervalle = config["intervalle"];
        if (config.hasOwnProperty("start")) this.start = config["start"];
        if (config.hasOwnProperty("pas")) this.pas = config["pas"];
        if (config.hasOwnProperty("max_eff")) this.max_eff = config["max_eff"];
        if (config.hasOwnProperty("name")) this.name = config["name"];
        if (config.hasOwnProperty("axe_name")) this.axe_name = config["axe_name"];
        if (config.hasOwnProperty("grid")) this.grid = config["grid"];
        if (config.hasOwnProperty("grid_color")) this.grid_color = config["grid_color"];
        if (config.hasOwnProperty("effectifs")) this.effectifs = config["effectifs"];
        if (config.hasOwnProperty("colors")) this.colors = config["colors"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("graduation_size")) this.graduation_size = config["graduation_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("grid_width")) this.grid_width = config["grid_width"];
        if (config.hasOwnProperty("transparency")) this.transparency = config["transparency"];
        this.Draw();
    }

    lineh;

    Draw()
    {
        this.draw = SVG().addTo("#" + this.element_id).size(this.Canvas_width, this.Canvas_height)
        let w = this.Canvas_width - this.margin * 2;
        let h = this.Canvas_height - this.margin * 2;

        this.lineh = Math.floor(this.text_size * 96.0/72.0);

        let sx = this.lineh + this.margin;
        let sy = this.margin + h - this.lineh * 2;

        let ex1 = w + this.margin;
        let ey2 = this.margin + this.lineh;

        let dw = ex1 - sx
        let dh = ey2 - sy
        if (this.grid)
            this.Draw_Grid(sx, sy, dw, dh);
        this.Draw_Histogramme(sx, sy, dw, dh);
        this.Draw_Axes(sx, sy, dw, dh);
        this.Draw_Text(sx, sy, dw, dh);

        let text1 = this.draw.text(this.axe_name)
        text1.move(ex1, sy + this.graduation_size / 2.0 + this.lineh)
        text1.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'end' })
        let text2 = this.draw.text("Effectif")
        text2.move(this.margin, this.margin - this.lineh /4)
        text2.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'start' })
        let text3 = this.draw.text(this.name)
        text3.move(this.margin + w / 2, this.margin - this.lineh /4)
        text3.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        
    }


    Draw_Grid(sx, sy, w, h)
    {
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy) / 2));
        for (let i = 1; i <= this.max_eff; i++) {
            if (i % pass != 0) continue;
            let y = sy + i * dy;
            this.draw.line(sx, y, sx + w, y)
            .stroke({width: this.grid_width, color: this.grid_color});
        }
        for (let i = 1; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            this.draw.line(dx, sy, dx, sy + h)
            .stroke({width: this.grid_width, color: this.grid_color});
        }

    }

    Draw_Axes(sx, sy, w, h)
    {
        for (let i = 0; i <= this.max_eff; i++) {
            let dy = sy + i * h / this.max_eff;
            this.draw.line(sx - this.graduation_size / 2.0, dy, sx + this.graduation_size / 2.0, dy)
            .stroke({width: this.stroke_width, color: "black"});
        }
        for (let i = 0; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            this.draw.line(dx, sy - this.graduation_size / 2.0, dx, sy + this.graduation_size / 2.0)
            .stroke({width: this.stroke_width, color: "black"});
        }
        this.draw.line(sx, sy, sx + w, sy)
            .stroke({width: this.stroke_width, color: "black"});
        this.draw.line(sx, sy, sx, sy + h)
            .stroke({width: this.stroke_width, color: "black"});
    }

    Draw_Text(sx, sy, w, h)
    {
        let dy = h / this.max_eff;
        let pass = Math.max(1, Math.floor(this.lineh / Math.abs(dy)));
        for (let i = 0; i <= this.max_eff; i++) {
            if (i % pass == 0)
            {
                let y = sy + i * dy;
                let text = this.draw.text(i.toString())
                text.move(sx - this.lineh / 2.0 - this.graduation_size / 2.0, y - this.lineh / 2.0)
                text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
            }
        }
        for (let i = 0; i <= this.intervalle; i++) {
            let dx = sx + i * w / (this.intervalle);
            let text = this.draw.text((i * this.pas + this.start).toString())
            text.move(dx, sy + this.graduation_size / 2.0)
            text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })
        }
    }

    Draw_Histogramme(sx, sy, w, h)
    {
        let dx = w / (this.intervalle);
        let dy = h / this.max_eff;
        for (let i = 0; i < this.effectifs.length; i++) {
            if (this.effectifs[i] == 0) continue;

            let c = this.colors[i % this.colors.length];
            
            let rect = this.draw.rect( dx - 1, Math.abs(dy* this.effectifs[i])-0.5)
            rect.move(sx + dx * i+0.5, sy + dy * this.effectifs[i])
            rect.fill(c + this.transparency)
            rect.stroke({color: c, width: this.grid_width})
        }
    }
}