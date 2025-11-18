var x;
class F_Obj
{
	ParentObject;
	DrawGroup;
	Parent;
	Root;

	constructor(parent)
	{
		this.ParentObject = parent;
		this.DrawGroup = parent.svg_group["Objects"].group();
		this.Parent = document.getElementById("object_list");
		
		this.Root = document.createElement("div");
		this.Root.classList.add("formemenu");
		this.Root.classList.add("show");
		this.Parent.appendChild(this.Root)
	}

	// Angle in degrees
	DrawEllipseArc(group, center, starta, enda, rx, ry, close = true)
	{
		let sx = Round(center.x + rx * Math.cos(starta * Math.PI / 180.0),3);
		let sy = Round(center.y + ry * Math.sin(starta * Math.PI / 180.0),3);

		let ex = Round(center.x + rx * Math.cos(enda * Math.PI / 180.0),3);
		let ey = Round(center.y + ry * Math.sin(enda * Math.PI / 180.0),3);

		let txt = "M" + sx + " " + sy + " A ";
		txt += Round(rx,3) + " " + Round(ry,3) + " 0 ";
		if (Math.abs(enda - starta) < 360)
		{
			if (Math.abs(enda - starta) > 180)
				txt += "1 "
			else
				txt += "0 "
			if (enda < starta)
				txt += "0 "
			else
				txt += "1 " 
			
			txt += ex + " " + ey
			if (close)
			{
				txt += "L" + center.x + " " + center.y;
				return group.path(txt + "Z");
			}
			else
				return group.path(txt);
		}
		else
		{
			return group.ellipse(rx * 2, ry * 2).center(center.x, center.y);
		}
	}

	DrawText(layer, txt, cx, cy, txt_size = 12)
	{
		layer.text(txt).center(cx, cy).attr({
						fill: "white",
						stroke: "white",
						"stroke-width": Math.min(8, 5 * txt_size / 12.0),
						"font-weight": "bold"
					})
		layer.text(txt).center(cx, cy)
	}

}