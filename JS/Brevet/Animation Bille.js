var points= [];
var c;
var ctx;
var vitesse = 2;
var distance = 150;
var framecount = 0;



function init(number){
    c = document.getElementById("Background");
    c.width = document.getElementById('Page').offsetWidth;
    c.height = document.getElementById('Page').offsetHeight;
    ctx = c.getContext("2d");
    let html = document.getElementById("Page");
    for (let index = 0; index < number; index++) {
        let x = Math.random() * c.width;
        let y = Math.random() * c.height;
        let angle = Math.random() * 360.0;
        points.push({x: x,y: y,angle: angle});
    }
    window.requestAnimationFrame(update);
}

function update()
{
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = document.getElementById('Page').offsetWidth;
    c.height = document.getElementById('Page').offsetHeight;
    ctx.fillStyle = "#4CA8C4";
    ctx.strokeStyle  = "rgba(76,168,196,0.4)";
    for (let index = 0; index < points.length; index++) {
        points[index].x = (points[index].x + vitesse * Math.cos(points[index].angle) + c.width) % c.width;
        points[index].y = (points[index].y + vitesse * Math.sin(points[index].angle) + c.height) % c.height;
        ctx.beginPath();
        ctx.arc(points[index].x, points[index].y, 2.5, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
    DrawLine();
    framecount++;
    distance = 150 + 75 * Math.sin(framecount * 0.01);

    window.requestAnimationFrame(update);
}

function DrawLine()
{
    ctx.save();
    for (let index = 0; index < points.length - 1; index++) 
    {
        for(let index2 = index; index2 < points.length; index2++)
        {
            let d = Distance(points[index], points[index2])
            if (d <= distance)
            {
                ctx.lineWidth = (1 - d / distance) * 2 ;
                ctx.beginPath();
                ctx.moveTo(points[index].x, points[index].y);
                ctx.lineTo(points[index2].x, points[index2].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    ctx.restore();
}

function Distance(point1, point2)
{
    return Math.sqrt(Math.pow(point1.x-point2.x, 2) + Math.pow(point1.y-point2.y, 2))
}