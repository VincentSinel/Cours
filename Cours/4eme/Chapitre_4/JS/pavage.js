var zoom = 1.0;
var position = {x: 240, y: 180};
var img = new Image();
img.src = "Images/BasePavage.png"
img.onload = function() { Resize() }
var canvas = document.getElementById("pavagesCanvas");
var ctx = canvas.getContext("2d");
var w = 0;
var h = 0;
var dw;
var dh;
var maxcount;
var drawn = [];

window.onresize = function() { Resize() }


function Resize()
{
    canvas.width = Math.min(480, document.body.offsetWidth)
    canvas.height = 360 * canvas.width / 480;
    Refresh()
}

function RefreshImg(file)
{
    var reader  = new FileReader();
    reader.onload = function () {
        img.src = reader.result;
        Refresh() 
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.src = "";
        w = 0;
        h = 0;
    }
}

function Refresh()
{
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height);

    w = img.width;
    h = img.height;
    zoom = Math.pow(1.1,parseInt(document.getElementById("pavage_zoom").value))

    maxcount = 5000;
    drawn = [];
    var x1 = parseInt(document.getElementById("x1").value)
    var x2 = parseInt(document.getElementById("x2").value)
    var y1 = parseInt(document.getElementById("y1").value)
    var y2 = parseInt(document.getElementById("y2").value)
    var v = document.getElementById("pavage_vector").checked

    ctx.save();
    ctx.translate(position.x, position.y)

    drawimg(x1, y1, x2, y2, 0, 0);
    drawimg(-x1, -y1, x2, y2, 0, 0, true);
    drawimg(x1, y1, -x2, -y2, 0, 0, true);
    drawimg(-x1, -y1, -x2, -y2, 0, 0, true);

    if (v)
    {
        ctx.strokeStyle = "Black"
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(x1 * zoom, y1 * zoom);
        ctx.stroke()
        ctx.strokeRect(x1 * zoom - 2, y1 * zoom - 2, 4, 4)

        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(x2 * zoom, y2 * zoom);
        ctx.stroke()
        ctx.strokeRect(x2 * zoom - 2,y2 * zoom  - 2, 4, 4)
    }

    ctx.restore();
}



function drawimg(x1, y1, x2, y2, x, y, force = false)
{
    var id = x + (canvas.width / 2 + w / 2) * y
    if ((x + w/2) * zoom < (-canvas.width / 2.0 - w) ||
        (x - w/2) * zoom > (canvas.width / 2.0 + w)  ||
        (y + h/2) * zoom < (-canvas.height / 2.0 - h) ||
        (y - h/2) * zoom > (canvas.height / 2.0 + h) ||
        maxcount < 0 ||
        (drawn.includes(id) && !force))
        return;
    maxcount -= 1;
    drawn.push(id)
    ctx.save();
    ctx.scale(zoom, zoom)
    ctx.translate(x-w/2, y-h/2);
    ctx.drawImage(img, 0, 0)
    ctx.restore();

    drawimg(x1, y1, x2, y2, x + x1, y + y1);
    drawimg(x1, y1, x2, y2, x + x2, y + y2);
    drawimg(x1, y1, x2, y2, x + (x1 + x2), y + (y1 + y2));
}

Refresh()