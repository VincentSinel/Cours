var ctx = document.getElementById("cube_visualisation").getContext("2d");
var range = document.getElementById("cube_draw")
var spin = document.getElementById("cube_draw_value")

var cube_size = {l: 10, p: 10, h: 10};

function Resize()
{
	cube_size.l = document.getElementById("cube_size_l").value;
	cube_size.p = document.getElementById("cube_size_p").value;
	cube_size.h = document.getElementById("cube_size_h").value;

	let total = cube_size.l * cube_size.p * cube_size.h;

	range.setAttribute("max", total);
	spin.setAttribute("max", total);
	spin.value = range.value

	Redraw()
}

function Redraw_range()
{
	spin.value = range.value
	Redraw()
}

function Redraw_spin()
{
	range.value = spin.value
	Redraw()
}

function Redraw()
{
		let w = ctx.canvas.width
    let h = ctx.canvas.height

		let small_c = w / 18.0;
		let small_c_sqrt = small_c * 0.5;


		let c_l = small_c * cube_size.l;
		let c_p = small_c_sqrt * cube_size.p;
		let c_h = small_c * cube_size.h;
    let cube = range.value

		let o = {
			x: (w - c_l - c_p) / 2.0 , 
			y: (h - c_h - c_p) / 2.0
		}
		let p = {
			x: o.x + c_p - small_c_sqrt, 
			y: o.y + c_h - small_c
		}

    ctx.fillStyle = "White";
    ctx.fillRect(0,0,w, h);

    ctx.strokeStyle = "gray"
		ctx.setLineDash([5, 5]);
    ctx.beginPath()
    ctx.moveTo(o.x + c_p,o.y)
    ctx.lineTo(o.x + c_p,o.y + c_h)
    ctx.lineTo(o.x + c_p + c_l,o.y + c_h)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(o.x + c_p, o.y + c_h)
    ctx.lineTo(o.x,o.y + c_h + c_p)
    ctx.stroke()

    ctx.setLineDash([]);
    ctx.strokeStyle = "black"
    ctx.fillStyle = "black";
		ctx.textAlign = 'center';
    ctx.fillText("Unité", (small_c + small_c_sqrt) / 2.0, small_c + small_c_sqrt + 10)

		DrawCube(0, 0 , small_c)

		for (let i = 0; i < cube; i++)
		{
			let l = Math.floor(i % cube_size.p);
			let c = Math.floor(i / cube_size.p) % cube_size.l;
			let r = Math.floor(i / (cube_size.l * cube_size.p));
			let x = p.x - l * small_c_sqrt + small_c * c
			let y = p.y + l * small_c_sqrt - small_c * r

			DrawCube(x,y,small_c)
		}


    ctx.strokeStyle = "black"
		ctx.beginPath()
		ctx.moveTo(o.x + c_p, 			o.y)
		ctx.lineTo(o.x + c_p + c_l, o.y)
		ctx.lineTo(o.x + c_p + c_l, o.y + c_h)
		ctx.lineTo(o.x + c_l, 			o.y + c_p + c_h)
		ctx.lineTo(o.x, 						o.y + c_p + c_h)
		ctx.lineTo(o.x, 						o.y + c_p)
		ctx.lineTo(o.x + c_p, 			o.y)
		ctx.moveTo(o.x, 						o.y + c_p)
		ctx.lineTo(o.x + c_l, 			o.y + c_p)
		ctx.lineTo(o.x + c_l, 			o.y + c_p + c_h)
		ctx.moveTo(o.x + c_l, 			o.y + c_p)
		ctx.lineTo(o.x + c_l + c_p, o.y)
		ctx.stroke()
}


function DrawCube(x,y,size)
{
	var size_s = size / 2.0
	
	ctx.strokeStyle = "black"
	ctx.fillStyle = "#FF8080"
	ctx.beginPath()
	ctx.moveTo(x, y + size_s)
	ctx.lineTo(x + size, y + size_s)
	ctx.lineTo(x + size, y + size_s + size)
	ctx.lineTo(x, y + size_s + size)
	ctx.lineTo(x, y + size_s)
	ctx.stroke()
	ctx.fill()
	
	ctx.fillStyle = "#723939"
	ctx.beginPath()
	ctx.moveTo(x + size,y + size_s)
	ctx.lineTo(x + size,y + size_s + size)
	ctx.lineTo(x + size + size_s,y + size)
	ctx.lineTo(x + size + size_s,y)
	ctx.lineTo(x + size,y + size_s)
	ctx.stroke()
	ctx.fill()
	
	ctx.fillStyle = "#C66363"
	ctx.beginPath()
	ctx.moveTo(x, y + size_s)
	ctx.lineTo(x + size, y + size_s)
	ctx.lineTo(x + size + size_s, y)
	ctx.lineTo(x + size_s, y)
	ctx.lineTo(x, y + size_s)
	ctx.stroke()
	ctx.fill()
}


Redraw();