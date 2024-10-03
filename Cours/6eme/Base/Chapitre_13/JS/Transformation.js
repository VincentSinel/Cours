var lobster1img = "";
var lobster2img = "";


function Init()
{
    Draw_SymAxial();
    Draw_SymCentral();
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


function Draw_SymCentral()
{
    let margin = 30;
    let w = 300;
    let h = 300;

    let cx = w / 2.0;
    let cy = h / 2.0;

    let draw = SVG().addTo('#symetriecentrale').size(w + margin*2, h + margin*2)

    let line1 = draw.line(margin, cy + margin, margin, cy + margin).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    let line2 = draw.line(cx + margin, margin, cx + margin, margin).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.svg(lobster2img);
    draw.svg(lobster1img);
    let lobster1 = draw.find("#lobster2")[0];
    let lobster2 = draw.find("#lobster")[0];

    let text = draw.text("O")
    text.move(cx + margin-1 - 25, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    lobster1.width(150);
    lobster1.height(150);
    lobster2.width(150);
    lobster2.height(150);
    lobster1.translate(margin,margin);
    lobster2.translate(margin,margin);
    
    lobster1.scale(1, 1)
    lobster1.animate(1000).ease('<>')
        .rotate(180, cx, cy)
        .loop(true, true, 1000)

    line1.animate(1000).ease('<>')
        .plot(margin, cy + margin, w + margin, cy + margin)
        .loop(true, true, 1000)
    line2.animate(1000).ease('<>')
        .plot(cx + margin, margin, cx + margin, h + margin)
        .loop(true, true, 1000)
}