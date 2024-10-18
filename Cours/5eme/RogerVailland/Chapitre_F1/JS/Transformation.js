var lobster1img = "";
var lobster2img = "";


function Init()
{
    Draw_SymCentral();
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