
window.addEventListener("load", CreateGraphique);

function CreateGraphique()
{
    let config1 = {
        "element_id": "graphiqueintro",
        "element_k": "graphiqueintro_range",
        "width": 340,
        "height": 340,
    }
    let h = new Homothétie(config1);
    document.getElementById("graphiqueintro_range").addEventListener("input", (e) => {UpdateCoef(e, h)})
    UpdateCoef({target: document.getElementById("graphiqueintro_range")}, h);
}

function UpdateCoef(e, h)
{
    let v = e.target.value;
    let f1 = document.getElementById("frac1")
    let f2 = document.getElementById("frac2")
    let f3 = document.getElementById("frac3")
    document.getElementById("graphiqueintro_range_value").innerHTML = v;
    f1.innerHTML = "$\\frac{AB}{AM}=\\frac{" + h.AB + "}{" + h.AM + "}=" + v + "$"
    f2.innerHTML = "$\\frac{AC}{AN}=\\frac{" + h.AC + "}{" + h.AN + "}=" + v + "$"
    f3.innerHTML = "$\\frac{BC}{MN}=\\frac{" + h.BC + "}{" + h.MN + "}=" + v + "$"
    MathJax.typeset([f1, f2, f3])
}

class Homothétie
{
    Canvas_width = 400;
    Canvas_height = 300;
    draw;

    element_id = "";
    element_k = "";

    margin = 20;    
    stroke_width = 1;
    text_size = 12;

    
    color_t1 = "#FDC463"
    color_t2 = "#ADEBF6"

    random1 = Math.random();
    random2 = Math.random();

    AB = 0;
    AC = 0;
    BC = 0;
    AM = 0;
    AN = 0;
    MN = 0;


    constructor(config)
    {
        if (config.hasOwnProperty("element_id")) this.element_id = config["element_id"];
        if (config.hasOwnProperty("element_k")) this.element_k = config["element_k"];
        if (config.hasOwnProperty("width")) this.Canvas_width = config["width"];
        if (config.hasOwnProperty("height")) this.Canvas_height = config["height"];
        if (config.hasOwnProperty("margin")) this.margin = config["margin"];
        if (config.hasOwnProperty("text_size")) this.text_size = config["text_size"];
        if (config.hasOwnProperty("stroke_width")) this.stroke_width = config["stroke_width"];
        if (config.hasOwnProperty("color_t1")) this.color_t1 = config["color_t1"];
        if (config.hasOwnProperty("color_t2")) this.color_t2 = config["color_t2"];

        let This = this;
        document.getElementById(this.element_k).addEventListener("input", (e) => {this.UpdateDraw(This,e)})

        this.Draw(document.getElementById(this.element_k).value);
    }

    lineh;

    Texts = [];

    Draw(value)
    {
        this.draw = SVG().addTo("#" + this.element_id).size(this.Canvas_width, this.Canvas_height)

        this.Redraw(value);
    }

    Redraw(value)
    {
        let w = this.Canvas_width - this.margin * 2;
        let h = this.Canvas_height - this.margin * 2;
        this.draw.clear();

        let p1 = [this.margin + w / 4.0, this.margin + h /2.0];
        let p2 = [this.margin + w / 2.0 + w / 8.0 * this.random1, this.margin + h / 4.0];
        let p3 = [this.margin + w / 2.0 + w / 8.0 * this.random2, this.margin + h * 3.0 / 4.0];
        let p2_2 = [p1[0] + (p2[0] - p1[0]) * value, p1[1] + (p2[1] - p1[1]) * value];
        let p3_2 = [p1[0] + (p3[0] - p1[0]) * value, p1[1] + (p3[1] - p1[1]) * value];

        this.draw.polygon().fill('none').stroke({width: this.stroke_width, color: this.color_t2})
        .plot([p1,p2_2,p3_2])

        this.draw.polygon().fill('none').stroke({width: this.stroke_width, color: this.color_t1})
        .plot([p1,p2,p3])

        
        let text = this.draw.text("A")
        text.move(p1[0], p1[1] - 20)
        text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })

        text = this.draw.text("B")
        text.move(p2[0], p2[1] - 20)
        text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })

        text = this.draw.text("C")
        text.move(p3[0], p3[1])
        text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })


        text = this.draw.text("M")
        text.move(p2_2[0], p2_2[1] - ((value > 0) ? 20 : 0))
        text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })

        text = this.draw.text("N")
        text.move(p3_2[0], p3_2[1] - ((value < 0) ? 20 : 0))
        text.font({ fill: 'black', family: 'Bahnschrift', size: this.text_size, anchor:'middle' })

        this.AB = this.Length(p1, p2)
        this.AC = this.Length(p1, p3)
        this.BC = this.Length(p2, p3)
        this.AM = this.Length(p1, p2_2)
        this.AN = this.Length(p1, p3_2)
        this.MN = this.Length(p2_2, p3_2)
    }

    Length(p1, p2)
    {
        let dx = p1[0] - p2[0];
        let dy = p1[1] - p2[1];
        return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10.0
    }

    UpdateDraw(context, e)
    {
        context.Redraw(e.target.value)
    }
}