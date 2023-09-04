var lobster1img = "";
var lobster2img = "";


window.onload = function(){
    let client = new XMLHttpRequest();
    client.open('GET', 'Images/Lobster.svg');
    client.onreadystatechange = function(state) {
        if (client.readyState == 4)
        {
            lobster1img = client.responseText
            if (lobster2img != "")
                Init()
        }
    }
    client.send();
    let client2 = new XMLHttpRequest();
    client2.open('GET', 'Images/Lobster2.svg');
    client2.onreadystatechange = function(state) {
        if (client2.readyState == 4)
        {
            lobster2img = client2.responseText
            if (lobster1img != "")
                Init()
        }
    }
    client2.send();
}


function Init()
{
    console.log(lobster2img)
    console.log(lobster1img)
    Draw_SymAxial();
    Draw_SymCentral();
    Draw_Translation();
    Draw_Rotation();
    Draw_Homothetie1();
    Draw_Homothetie2();
    Draw_Homothetie3();
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
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.svg(lobster2img);
    draw.svg(lobster1img);
    let lobster1 = draw.find("#lobster2")[0];
    let lobster2 = draw.find("#lobster")[0];

    let text = draw.text("O")
    text.move(cx + margin-1, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    lobster1.width(150);
    lobster1.height(150);
    lobster2.width(150);
    lobster2.height(150);
    lobster1.translate(margin,margin);
    lobster2.translate(margin,margin);
    
    lobster1.scale(1, 1)
    lobster1.animate(1000).ease('<>')
        .transform({scale: -1, origin: [cx, cy]}, true, false)
        .loop(true, true, 1000)
}

function Draw_Translation()
{
    let margin = 30;
    let w = 300;
    let h = 250;

    let draw = SVG().addTo('#translation').size(w + margin*2, h + margin*2)
    draw.svg(lobster2img);
    draw.svg(lobster1img);
    let x = 10;
    let dx = (w -150) / 10;
    let dy = (h/4) / 10;
    let line1 = draw.line(x + margin, 170 + margin, x + margin, 170 + margin).stroke({ color: '#f06', width: 3, linecap: 'round', 'dasharray': "6 6" })
    let line2 = draw.line(x - dx + margin, 170 - dy + margin, x + margin, 170 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    line2.rotate(30, x + margin, 170 + margin)
    let line3 = draw.line(x - dx + margin, 170 - dy + margin, x + margin, 170 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    line3.rotate(-30, x + margin, 170 + margin)
    let lobster1 = draw.find("#lobster2")[0];
    let lobster2 = draw.find("#lobster")[0];
    
    draw.line(w -155 + x + margin, h/4 + 165 + margin, w -145 + x + margin, h/4 + 175 + margin).stroke({ color: '#f06', width: 2, linecap: 'round' })
    draw.line(w -145 + x + margin, h/4 + 165 + margin, w -155 + x + margin, h/4 + 175 + margin).stroke({ color: '#f06', width: 2, linecap: 'round' })

    draw.line(x-5 + margin, 165 + margin, x+5 + margin, 175 + margin).stroke({ color: '#f06', width: 2, linecap: 'round' })
    draw.line(x+5 + margin, 165 + margin, x-5 + margin, 175 + margin).stroke({ color: '#f06', width: 2, linecap: 'round' })
    
    let text1 = draw.text("A")
    text1.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })
    text1.move(x + 20, 205)
    let text2 = draw.text("B")
    text2.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })
    text2.move(w-130 + x, 205 + h/4)

    lobster1.width(150);
    lobster1.height(150);
    lobster2.width(150);
    lobster2.height(150);
    lobster1.translate(margin,margin);
    lobster2.translate(margin,margin);
    
    lobster1.animate(1000).ease('<>')
    .translate(w-150, h/4)
	.loop(true, true, 1000)
    line1.animate(1000).ease('<>')
    .plot(x + margin, 170 + margin, w -150 + x + margin, h/4 + 170 + margin)
	.loop(true, true, 1000)
    line2.animate(1000).ease('<>')
    .translate(w-150, h/4)
	.loop(true, true, 1000)
    line3.animate(1000).ease('<>')
    .translate(w-150, h/4)
	.loop(true, true, 1000)
}

function Draw_Rotation()
{
    let margin = 30;
    let w = 300;
    let h = 300;

    let cx = w / 2.0;
    let cy = h / 2.0;

    let draw = SVG().addTo('#rotation').size(w + margin*2, h + margin*2)
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.svg(lobster2img);
    draw.svg(lobster1img);
    let lobster1 = draw.find("#lobster2")[0];
    let lobster2 = draw.find("#lobster")[0];


    let text = draw.text("O")
    text.move(cx + margin-1, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    let text2 = draw.text(function(add) {
        add.tspan('rotation de 120°')
        add.tspan('sens horaire').newLine()
    })
    text2.leading(0.9)
    text2.move(cx + margin, h*0.9 + margin)
    text2.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    let ex = cx + Math.cos((120-90) / 180.0 * Math.PI) * 30;
    let ey = cy + Math.sin((120-90) / 180.0 * Math.PI) * 30;

    let path = draw.path('M'+cx +' '+ (cy-30) + 'A30 30 0 0 0 ' + (cx*2-ex) + ' ' + ey).stroke({ color: '#f06', width: 1, linecap: 'round' })
    path.fill('none');
    path.translate(margin, margin)

    let path2 = draw.path('M'+cx +' '+ (cy-30) + 'A30 30 0 0 0 ' + (cx*2-ex) + ' ' + ey).stroke({ color: '#fff', width: 5 })
    path2.fill('none');
    path2.translate(margin, margin)

    let l1 = draw.line(cx + margin, cy - 30 + margin, cx + margin - 5, cy - 30 + margin - 5).stroke({ color: '#f06', width: 1, linecap: 'round' })
    let l2 = draw.line(cx + margin, cy - 30 + margin, cx + margin - 5, cy - 30 + margin + 5).stroke({ color: '#f06', width: 1, linecap: 'round' })

    lobster1.width(150);
    lobster1.height(150);
    lobster2.width(150);
    lobster2.height(150);
    lobster1.translate(margin,margin);
    lobster2.translate(margin,margin);

    let line1 = draw.line(cx, cy, cx, cy-150).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line1.translate(margin,margin);
    let line2 = draw.line(cx, cy, cx, cy-150).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line2.translate(margin,margin);
    
    lobster1.scale(1, 1)
    lobster1.animate(1000).ease('<>')
        .rotate(120, cx, cy)
        .loop(true, true, 1000)
    line1.animate(1000).ease('<>')
        .rotate(120, cx, cy)
        .loop(true, true, 1000)
    path.animate(1000).ease('<>')
        .rotate(120, cx, cy)
        .loop(true, true, 1000)
    l1.animate(1000).ease('<>')
        .rotate(120, cx + margin, cy + margin)
        .loop(true, true, 1000)
    l2.animate(1000).ease('<>')
        .rotate(120, cx + margin, cy + margin)
        .loop(true, true, 1000)
}

function Draw_Homothetie1()
{
    let margin = 30;
    let w = 300;
    let h = 300;
    let k = 0.5;

    let cx = w / 4.0 * 3;
    let cy = h / 4.0 * 3;

    let draw = SVG().addTo('#homothetie1').size(w + margin*2, h + margin*2)
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
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
    lobster1.scale(0.5, cx, cy)
    lobster2.scale(0.5, cx, cy)
    
    let line1 = draw.line(cx, cy, cx-35, cy-110).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line1.translate(margin,margin);
    let line2 = draw.line(cx, cy, cx-110, cy-35).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line2.translate(margin,margin);

    let text = draw.text("O")
    text.move(cx + margin-1, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    let text2 = draw.text(function(add) {
        add.tspan("rapport k > 1 (ici 2)")
        add.tspan('Agrandissement').newLine()
    })
    text2.leading(0.9)
    text2.move(w / 2 + margin, h*0.9 + margin)
    text2.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    lobster1.animate(1000).ease('<>')
        .scale(2, cx, cy)
        .loop(true, true, 1000)
    line1.animate(1000).ease('<>')
        .plot(cx, cy, cx-70, cy-220)
        .loop(true, true, 1000)
    line2.animate(1000).ease('<>')
        .plot(cx, cy, cx-220, cy-70)
        .loop(true, true, 1000)
}

function Draw_Homothetie2()
{
    let margin = 30;
    let w = 300;
    let h = 300;
    let k = 0.5;

    let cx = w / 4.0 * 3;
    let cy = h / 4.0 * 3;

    let draw = SVG().addTo('#homothetie2').size(w + margin*2, h + margin*2)
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
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
    
    let line1 = draw.line(cx, cy, cx-75, cy-220).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line1.translate(margin,margin);
    let line2 = draw.line(cx, cy, cx-220, cy-75).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line2.translate(margin,margin);


    let text = draw.text("O")
    text.move(cx + margin-1, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    let text2 = draw.text(function(add) {
        add.tspan("rapport 0 < k < 1 (ici 0,5)")
        add.tspan('Réduction').newLine()
    })
    text2.leading(0.9)
    text2.move(w / 2 + margin, h*0.9 + margin)
    text2.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })


    lobster1.animate(1000).ease('<>')
        .scale(0.5, cx, cy)
        .loop(true, true, 1000)
    line1.animate(1000).ease('<>')
        .plot(cx, cy, cx-35, cy-110)
        .loop(true, true, 1000)
    line2.animate(1000).ease('<>')
        .plot(cx, cy, cx-110, cy-35)
        .loop(true, true, 1000)
}

function Draw_Homothetie3()
{
    let margin = 30;
    let w = 300;
    let h = 300;
    let k = 0.6;

    let cx = w / 4.0 * 2;
    let cy = h / 4.0 * 2;

    let draw = SVG().addTo('#homothetie3').size(w + margin*2, h + margin*2)
    draw.line(cx-10 + margin, cy-10 + margin, cx+10 + margin, cy+10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
    draw.line(cx-10 + margin, cy+10 + margin, cx+10 + margin, cy-10 + margin).stroke({ color: '#f06', width: 3, linecap: 'round' })
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
    
    let line1 = draw.line(cx, cy, cx, cy-125).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line1.translate(margin,margin);
    let line2 = draw.line(cx, cy, cx-125, cy).stroke({ color: '#f06', width: 1, linecap: 'round', 'dasharray': "6 6" })
    line2.translate(margin,margin);


    let text = draw.text("O")
    text.move(cx + margin-1 - 20, cy + margin)
    text.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })

    let text2 = draw.text("rapport k < 0 (ici -0,6)")
    text2.move(w / 2 + margin, h*0.9 + margin)
    text2.font({ fill: '#f06', family: 'Bahnschrift', size: 30, anchor:'middle' })


    lobster1.animate(1000).ease('<>')
        .transform({scale: -k, origin: [cx, cy]}, true, false)
        .loop(true, true, 1000)
    line1.animate(1000).ease('<>')
        .plot(cx, cy, cx, cy+125 * k)
        .loop(true, true, 1000)
    line2.animate(1000).ease('<>')
        .plot(cx, cy, cx+125 *k, cy)
        .loop(true, true, 1000)
}
