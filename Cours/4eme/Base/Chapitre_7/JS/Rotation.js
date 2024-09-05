var ctx = document.getElementById("rotationvisualisation").getContext("2d");
var select = document.getElementById("rotationvisualisation_s")
var range = document.getElementById("rotationvisualisation_i")

function Redraw()
{
    let w = ctx.canvas.width
    let h = ctx.canvas.height
    let angdegre = range.value
    let angle = angdegre * Math.PI / 180.0;

    if (select.selectedIndex == 0)
        angle *= -1


    ctx.fillStyle = "White";
    ctx.fillRect(0,0,w, h);

    let cx = w / 2;
    let cy = h / 2;
    let margin = 25

    let mpoint = {
        x: cx + (cx - margin) * Math.cos(angle),
        y: cy + (cy - margin) * Math.sin(angle)
    }

    ctx.strokeStyle = "black"
    ctx.font = '18px "Bahnschrift"';
    ctx.textAlign = 'center';
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.moveTo(cx - 5,cy - 5)
    ctx.lineTo(cx + 5,cy + 5)
    ctx.moveTo(cx - 5,cy + 5)
    ctx.lineTo(cx + 5,cy - 5)
    ctx.moveTo(w - margin,cy)
    ctx.ellipse(cx,cy, cx - margin, cy - margin, 0, 0, Math.PI*2)
    ctx.stroke()

    ctx.setLineDash([5, 5]);
    ctx.beginPath()
    ctx.moveTo(cx,cy)
    ctx.lineTo(w - margin,cy)
    ctx.moveTo(cx,cy)
    ctx.lineTo(mpoint.x,mpoint.y)
    ctx.stroke()

    let ang = angle / 2
    if (select.selectedIndex == 1)
    {
        if (angle > Math.PI * 1.5)
            ang = - Math.PI / 2
    }
    else
    {
        if (angle < -Math.PI * 1.5)
            ang = Math.PI / 2
    }
    ctx.fillText("O", cx - 18 * Math.cos(ang), cy + 6 - 18 * Math.sin(ang))
    ctx.setLineDash([]);

    ctx.strokeStyle = "#008000"
    ctx.lineWidth = 2
    ctx.fillStyle = "#00800033"
    ctx.beginPath()
    ctx.ellipse(cx,cy, 30, 30, 0, 0, angle, angle < 0)
    ctx.stroke()
    ctx.lineTo(cx, cy)
    ctx.fill()
    ctx.fillStyle = "#008000"
    ctx.fillText(angdegre + "°", cx + 50 * Math.cos(angle / 2), cy + 6 + 50 * Math.sin(angle / 2))

    if (Math.abs(angle) > Math.PI / 9)
    {
        ctx.beginPath()
        ctx.moveTo(
            cx + 35 * Math.cos(angle - Math.sign(angle) * Math.PI / 9), 
            cy + 35 * Math.sin(angle - Math.sign(angle) * Math.PI / 9))
        ctx.lineTo(
            cx + 30 * Math.cos(angle), 
            cy + 30 * Math.sin(angle))
        ctx.lineTo(
            cx + 25 * Math.cos(angle - Math.sign(angle) * Math.PI / 9), 
            cy + 25 * Math.sin(angle - Math.sign(angle) * Math.PI / 9))
        ctx.stroke()
    }

    ctx.strokeStyle = "#FF0000"
    ctx.lineWidth = 1
    ctx.fillStyle = "#FF0000"
    ctx.beginPath()
    ctx.moveTo(
        cx + (cx - margin) * Math.cos(angle) - 5, 
        cy + (cy - margin) * Math.sin(angle) - 5)
    ctx.lineTo(
        cx + (cx - margin) * Math.cos(angle) + 5, 
        cy + (cy - margin) * Math.sin(angle) + 5)
    ctx.moveTo(
        cx + (cx - margin) * Math.cos(angle) - 5, 
        cy + (cy - margin) * Math.sin(angle) + 5)
    ctx.lineTo(
        cx + (cx - margin) * Math.cos(angle) + 5, 
        cy + (cy - margin) * Math.sin(angle) - 5)
    ctx.stroke()
    ctx.fillText("P'", cx + (cx - margin + 18) * Math.cos(angle),
    cy + 6 + (cy - margin + 18) * Math.sin(angle))

    ctx.strokeStyle = "#008000"
    ctx.lineWidth = 1
    ctx.fillStyle = "#008000"
    ctx.beginPath()
    ctx.moveTo(
        cx * 2 - margin - 5, 
        cy - 5)
    ctx.lineTo(
        cx * 2 - margin + 5, 
        cy + 5)
    ctx.moveTo(
        cx * 2 - margin - 5, 
        cy + 5)
    ctx.lineTo(
        cx * 2 - margin + 5, 
        cy - 5)
    ctx.stroke()
    ctx.fillText("P", cx * 2 - margin + 18,
    6 + cy)


}


Redraw();