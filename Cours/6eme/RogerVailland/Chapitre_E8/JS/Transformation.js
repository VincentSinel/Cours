var lobster1img = "";
var lobster2img = "";


function Init()
{
    Draw_SymAxial();
}

function Draw_SymAxial()
{
    let margin = 30;
    let w = 300;
    let h = 300;

    let draw = SVG().addTo('#symetrieaxiale').size(w + margin*2, h + margin*2)
    let line = draw.line(margin, w + margin, h+margin, margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.svg(lobster2img);
    draw.svg(lobster1img);
    let lobster1 = draw.find("#lobster2")[0];
    let lobster2 = draw.find("#lobster")[0];


    lobster1.width(150);
    lobster1.height(150);
    lobster2.width(150);
    lobster2.height(150);
    lobster1.translate(margin,margin);
    lobster2.translate(margin,margin);

    let text = draw.text("(d)").font({ fill: '#f06', family: 'Bahnschrift', size: 30, style: 'italic' })
    text.move(w - 40,margin)

    lobster1.animate(1000).ease('<>')
	.scale(-1, 1)
    .rotate(90)
    .translate(w - 150, h - 150)
	.loop(true, true, 1000)
}