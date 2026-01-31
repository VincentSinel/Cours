class Vecteur2
{
	x;
	y;
	
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	add(v)
	{
		return new Vecteur2(this.x + v.x, this.y + v.y);
	}
	sub(v)
	{
		return new Vecteur2(this.x - v.x, this.y - v.y);
	}
	mul(s)
	{
		return new Vecteur2(this.x * s, this.y * s);
	}
	div(s)
	{
		return new Vecteur2(this.x / s, this.y / s);
	}
	length()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize()
	{
		let len = this.length();
		return new Vecteur2(this.x / len, this.y / len);
	}
	angle()
	{
		return Math.atan2(this.y, this.x);
	}
	rotate(angle)
	{
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		return new Vecteur2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}
	static fromAngle(angle)
	{
		return new Vecteur2(Math.cos(angle), Math.sin(angle));
	}
	static distance(v1, v2)
	{
		return v1.sub(v2).length();
	}
	distanceTo(v)
	{
		return this.sub(v).length();
	}

	dot(v)
	{
		return this.x * v.x + this.y * v.y;
	}
	atright(v)
	{
		return this.x*-v.y + this.y*v.x;
	}
}

class Ligne
{
	p1;
	p2;
	constructor(p1, p2)
	{
		this.p1 = p1;
		this.p2 = p2;
	}
	direction()
	{
		return this.p2.sub(this.p1).normalize();
	}
	intersection(line)
	{
		let x1 = this.p1.x;
		let y1 = this.p1.y;
		let x2 = this.p2.x;
		let y2 = this.p2.y;
		let x3 = line.p1.x;
		let y3 = line.p1.y;
		let x4 = line.p2.x;
		let y4 = line.p2.y;
		let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (denom == 0) return null;
		let px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
		let py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;
		return new Vecteur2(px, py);
	}
	toBorder(w, h)
	{
		let line1 = new Ligne(new Vecteur2(0, 0), new Vecteur2(w, 0));
		let line2 = new Ligne(new Vecteur2(w, 0), new Vecteur2(w, h));
		let line3 = new Ligne(new Vecteur2(w, h), new Vecteur2(0, h));
		let line4 = new Ligne(new Vecteur2(0, h), new Vecteur2(0, 0));
		let points = [];
		let p;
		p = this.intersection(line1);
		if (p) points.push(p);
		p = this.intersection(line2);
		if (p) points.push(p);
		p = this.intersection(line3);
		if (p) points.push(p);
		p = this.intersection(line4);
		if (p) points.push(p);
		if (points.length < 2) return null;
		points.sort((v1, v2) => { return v1.distanceTo(new Vecteur2(w / 2, h / 2)) - v2.distanceTo(new Vecteur2(w / 2, h / 2)); });
		return new Ligne(points[0], points[1]);
	}
	middle()
	{
		return this.p1.add(this.p2).div(2);
	}
	pointIn(t)
	{
		return this.p1.add(this.p2.sub(this.p1).mul(t));
	}
	toHalfLine(w, h, flip=false)
	{
		let border_line = this.toBorder(w, h);
		let dot = this.direction().dot(border_line.direction());
		if (dot > 0)
		{
			if (flip)
				return new Ligne(this.p2, border_line.p1);
			else
				return new Ligne(this.p1, border_line.p2);
		}
		else
		{
			if (flip)
				return new Ligne(this.p2, border_line.p2);
			else
				return new Ligne(this.p1, border_line.p1);
		}
	}
}

class Angle
{
	p1
	p2;
	p3;

	constructor(p1, p2, p3)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}

	angle()
	{
		let v1 = this.p1.sub(this.p2).normalize();
		let v2 = this.p3.sub(this.p2).normalize();
		return Math.acos(v1.dot(v2));
	}

	bisectrice()
	{
		let v1 = this.p1.sub(this.p2).normalize();
		let v2 = this.p3.sub(this.p2).normalize();
		let bisect = v1.add(v2).normalize();
		return bisect;
	}
}

class Geometrie
{
	SVG_Draw;

	base_group;
	txt_group;

	base_line_attr = {
		stroke: "black",
		fill: "none",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
	}
	base_txt_attr = {
		stroke: "none",
		fill: "black",
		"text-anchor": "middle",
		"font-family": "Bahnschrift",
		"font-size": 16,
	}
	base_txt_back_attr = {
		stroke: "white",
		"stroke-width": 2,
		fill: "white",
		"text-anchor": "middle",
		"font-family": "Bahnschrift",
		"font-size": 16,
	}
	
	constructor(width, height)
	{
		this.SVG_Draw = SVG();
		this.SVG_Draw.size(width, height);
		this.SVG_Draw.rect(width,height).attr({fill: "white"});
		this.base_group = this.SVG_Draw.group();
		this.txt_group = this.SVG_Draw.group();
	}
	
	GetElement()
	{
		return this.SVG_Draw.node
	}

	
	AjouterPoint(v,nom, param = {})
	{
		let angle = param.hasOwnProperty("angle") ? param.angle : 90;
		let distance = param.hasOwnProperty("distance") ? param.distance : 15;
		let offsetX = distance * Math.cos(angle * Math.PI / 180);
		let offsetY = -distance * Math.sin(angle * Math.PI / 180);
		let type = param.hasOwnProperty("type") ? param.type : "+";
		let size = param.hasOwnProperty("size") ? param.size : 10;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let attr_sup_text = param.hasOwnProperty("attr-text") ? param["attr-text"] : {};

		let g = this.base_group.group();
		
		switch (type) {
			case "+":
				g.line(v.x - size / 2,v.y, v.x + size / 2,v.y).attr(this.base_line_attr).attr(attr_sup);
				g.line(v.x, v.y - size / 2, v.x, v.y + size / 2).attr(this.base_line_attr).attr(attr_sup);		
				break;
			case "x":
				g.line(v.x - size / 2,v.y - size / 2, v.x + size / 2,v.y + size / 2).attr(this.base_line_attr).attr(attr_sup);
				g.line(v.x - size / 2,v.y + size / 2, v.x + size / 2,v.y - size / 2).attr(this.base_line_attr).attr(attr_sup);		
				break;
			case "o":
				g.circle(size).attr(this.base_line_attr).attr(attr_sup).center(v.x,v.y);
				break;
			default:
				break;
		}
		let g_txt = this.AjoutText(v.add(new Vecteur2(offsetX, offsetY)), nom, attr_sup_text);
		return {svg: g, txt: g_txt};
	}

	AjouterSegment(line, param = {})
	{
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let g = this.base_group.group()

		g.line(line.p1.x, line.p1.y, line.p2.x, line.p2.y).attr(this.base_line_attr).attr(attr_sup);
		let codage = param.hasOwnProperty("codage") ? param.codage : "none";
		let c_size = param.hasOwnProperty("codage-size") ? param["codage-size"] : 20;
		let c_color = param.hasOwnProperty("codage-color") ? param["codage-color"] : "#43a047";

		let middle = line.middle();
		let dir = line.direction();
		if (codage != "none")
		{
			switch(codage)
			{
				case "/":
					let v3 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2));
					let v4 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2));
					g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr({stroke: c_color});
					break;
				case "//":
					let offset = dir.mul(c_size / 3);
					let v5 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2)).add(offset);
					let v6 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2)).add(offset);
					g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr({stroke: c_color});
					let v7 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2)).sub(offset);
					let v8 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2)).sub(offset);
					g.line(v7.x, v7.y, v8.x, v8.y).attr(this.base_line_attr).attr({stroke: c_color});
					break;
				case "///":
					let offset2 = dir.mul(c_size / 2);
					let v9 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2));
					let v10 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2));
					g.line(v9.x, v9.y, v10.x, v10.y).attr(this.base_line_attr).attr({stroke: c_color});
					let v11 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2)).add(offset2);
					let v12 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2)).add(offset2);
					g.line(v11.x, v11.y, v12.x, v12.y).attr(this.base_line_attr).attr({stroke: c_color});
					let v13 = middle.add(dir.rotate(Math.PI / 2).mul(c_size / 2)).sub(offset2);
					let v14 = middle.add(dir.rotate(-Math.PI / 2).mul(c_size / 2)).sub(offset2);
					g.line(v13.x, v13.y, v14.x, v14.y).attr(this.base_line_attr).attr({stroke: c_color});
					break;
				case "x":
					let v15 = middle.add(dir.rotate(Math.PI / 4).mul(c_size / 2));
					let v16 = middle.add(dir.rotate(-Math.PI / 4).mul(c_size / 2));
					let v17 = middle.add(dir.rotate(3 * Math.PI / 4).mul(c_size / 2));
					let v18 = middle.add(dir.rotate(-3 * Math.PI / 4).mul(c_size / 2));
					g.line(v15.x, v15.y, v18.x, v18.y).attr(this.base_line_attr).attr({stroke: c_color});
					g.line(v17.x, v17.y, v16.x, v16.y).attr(this.base_line_attr).attr({stroke: c_color});
					break;
				case "o":
					g.circle(c_size).attr(this.base_line_attr).attr({stroke: c_color}).center(middle.x, middle.y);
					break;
			}
		}
		let depart = param.hasOwnProperty("depart") ? param.depart : false;
		let d_size = param.hasOwnProperty("depart-size") ? param["depart-size"] : 15;
		let fin = param.hasOwnProperty("fin") ? param.fin : false;
		let f_size = param.hasOwnProperty("fin-size") ? param["fin-size"] : 15;
		if (depart)
		{
			let v3 = line.p1.add(dir.rotate(Math.PI / 2).mul(d_size / 2));
			let v4 = line.p1.add(dir.rotate(-Math.PI / 2).mul(d_size / 2));
			g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr(attr_sup);
		}
		if (fin)
		{
			let v5 = line.p2.add(dir.rotate(Math.PI / 2).mul(f_size / 2));
			let v6 = line.p2.add(dir.rotate(-Math.PI / 2).mul(f_size / 2));
			g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr(attr_sup);
		}

		return {svg: g, line: line};
	}

	AjouterDroite(line, param = {})
	{
		let border_line = line.toBorder(this.SVG_Draw.width(), this.SVG_Draw.height());
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let attr_sup_text = param.hasOwnProperty("nom-text") ? param["nom-text"] : {"attr": {}};
		attr_sup_text["attr"]["font-style"] = "italic";

		let g = this.base_group.group()

		g.line(border_line.p1.x, border_line.p1.y, border_line.p2.x, border_line.p2.y).attr(this.base_line_attr).attr(attr_sup);
		
		let dir = line.direction().rotate(Math.PI / 2);
		let depart = param.hasOwnProperty("depart") ? param.depart : false;
		let d_size = param.hasOwnProperty("depart-size") ? param["depart-size"] : 15;
		let fin = param.hasOwnProperty("fin") ? param.fin : false;
		let f_size = param.hasOwnProperty("fin-size") ? param["fin-size"] : 15;
		if (depart)
		{
			let v3 = line.p1.add(dir.mul(d_size / 2));
			let v4 = line.p1.add(dir.mul(-d_size / 2));
			g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr(attr_sup);
		}
		if (fin)
		{
			let v5 = line.p2.add(dir.mul(f_size / 2));
			let v6 = line.p2.add(dir.mul(-f_size / 2));
			g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr(attr_sup);
		}

		let txt_svg;
		if (param.hasOwnProperty("nom"))
		{
			let pos_target =  param.hasOwnProperty("nom-position") ? param["nom-position"] : 0;
			let dist =  param.hasOwnProperty("nom-distance") ? param["nom-distance"] : 15;
			let marge =  param.hasOwnProperty("nom-margebord") ? param["nom-margebord"] : 15;
			let txt_position;
			let pos = border_line.p1.distanceTo(line.p1) < border_line.p1.distanceTo(line.p2) ? pos_target: (pos_target + 1) % 2;
			if (pos == 0)
			{
				let dot2 = dir.dot(border_line.p1.sub(new Vecteur2(this.SVG_Draw.width() / 2, this.SVG_Draw.height() / 2)));
				if (dot2 < 0)
					txt_position = border_line.p1.add(dir.mul(dist));
				else
					txt_position = border_line.p1.add(dir.mul(-dist));
			}
			else if (pos == 1)
			{

				let dot2 = dir.dot(line.p2.sub(new Vecteur2(this.SVG_Draw.width() / 2, this.SVG_Draw.height() / 2)));
				if (dot2 > 0)
					txt_position = border_line.p2.add(dir.mul(dist));
				else
					txt_position = border_line.p2.add(dir.mul(-dist));
			}
			let count = 20;
			while(count > 0 && (txt_position.x < marge || txt_position.x > this.SVG_Draw.width() - marge || txt_position.y < marge || txt_position.y > this.SVG_Draw.height() - marge))
			{
				txt_position = txt_position.add(border_line.direction().mul(pos == 0 ? 5	: -5));
				count--;
			}
			txt_svg = this.AjoutText(txt_position, param.nom, attr_sup_text).txt;
		}

		return {svg: g, line: border_line, txt: txt_svg};
	}

	AjouterDemiDroite(line, param = {})
	{
		let border_line = line.toBorder(this.SVG_Draw.width(), this.SVG_Draw.height());
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};

		let g = this.base_group.group()

		let dot = line.direction().dot(border_line.direction());
		if (dot > 0)
			g.line(line.p1.x, line.p1.y, border_line.p2.x, border_line.p2.y).attr(this.base_line_attr).attr(attr_sup);
		else
			g.line(line.p1.x, line.p1.y, border_line.p1.x, border_line.p1.y).attr(this.base_line_attr).attr(attr_sup);
		
		let depart = param.hasOwnProperty("depart") ? param.depart : false;
		let d_size = param.hasOwnProperty("depart-size") ? param["depart-size"] : 15;
		let fin = param.hasOwnProperty("fin") ? param.fin : false;
		let f_size = param.hasOwnProperty("fin-size") ? param["fin-size"] : 15;
		let direction = line.direction();
		if (depart)
		{
			let v3 = line.p1.add(direction.rotate(Math.PI / 2).mul(d_size / 2));
			let v4 = line.p1.add(direction.rotate(-Math.PI / 2).mul(d_size / 2));
			let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
			g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr(attr_sup);
		}
		if (fin)
		{
			let v5 = line.p2.add(direction.rotate(Math.PI / 2).mul(f_size / 2));
			let v6 = line.p2.add(direction.rotate(-Math.PI / 2).mul(f_size / 2));
			g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr(attr_sup);
		}

		let new_line;
		if (dot > 0)
			new_line = new Ligne(line.p1, border_line.p2);
		else
			new_line = new Ligne(line.p1, border_line.p1);
		return {svg: g, line: new_line};
	}

	AjoutText(v, txt, param = {})
	{
		let offsetX = param.hasOwnProperty("offsetX") ? param.offsetX : 0;
		let offsetY = param.hasOwnProperty("offsetY") ? param.offsetY : 0;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let g = this.txt_group.group();
		g.text(txt).attr(this.base_txt_attr).attr(attr_sup).attr(this.base_txt_back_attr).center(v.x + offsetX, v.y + offsetY);
		g.text(txt).attr(this.base_txt_attr).attr(attr_sup).center(v.x + offsetX, v.y + offsetY);
		return {txt: g};
	}

	AjoutPolygone(points, param = {})
	{
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let points_svg = points.map(p => `${p.x},${p.y}`).join(" ");
		let poly =  this.base_group.polygon(points_svg).attr(this.base_line_attr).attr(attr_sup);
		return {svg: poly, points: points};
	}

	AjoutAngle(angle, dir = 0, param = {})
	{
		let bisect = angle.bisectrice();
		let radius = param.hasOwnProperty("radius") ? param.radius : 30;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};

		let g = this.base_group.group()
		
		let p_start = angle.p2.add(angle.p1.sub(angle.p2).normalize().mul(radius));
		let p_end = angle.p2.add(angle.p3.sub(angle.p2).normalize().mul(radius));
		let arc = "M " + p_start.x + " " + p_start.y + " ";

		arc += "A " + radius + " " + radius + " 0 "

		let right = angle.p1.sub(angle.p2).atright(angle.p3.sub(angle.p2))
		if(right >= 0 && dir == 0)
			arc += "0 0 "
		else if(right >= 0 && dir == 1)
			arc += "1 1 "
		else if(right < 0 && dir == 0)
			arc += "0 1 "
		else if(right < 0 && dir == 1)
			arc += "1 0 "
		arc += p_end.x + " " + p_end.y;
		g.path(arc).attr(this.base_line_attr).attr(attr_sup)


		let codage = param.hasOwnProperty("codage") ? param.codage : "none";
		let c_size = param.hasOwnProperty("codage-size") ? param["codage-size"] : 20;
		let c_color = param.hasOwnProperty("codage-color") ? param["codage-color"] : "#43a047";

		let middle = angle.p2.add(bisect.mul(radius * (dir == 0 ? 1 : -1)));
		if (codage != "none")
		{
			switch(codage)
			{
				case "/":
					{
						let v1 = middle.add(bisect.mul(c_size / 2));
						let v2 = middle.add(bisect.mul(-c_size / 2));
						g.line(v1.x, v1.y, v2.x, v2.y).attr(this.base_line_attr).attr({stroke: c_color});
					}
					break;
				case "//":
					{
						let a1 = new Angle(angle.p1, angle.p2, angle.p2.add(bisect.mul(dir == 0 ? 200 : -200)));
						let a2 = new Angle(angle.p3, angle.p2, angle.p2.add(bisect.mul(dir == 0 ? 200 : -200)));
						let b1 = a1.bisectrice();
						let b2 = a2.bisectrice();
						let m1 = angle.p2.add(b1.mul(radius * (dir == 0 ? 1 : -1)));
						let m2 = angle.p2.add(b2.mul(radius * (dir == 0 ? 1 : -1)));
						let v3 = m1.add(b1.mul(c_size / 2));
						let v4 = m1.add(b1.mul(-c_size / 2));
						let v5 = m2.add(b2.mul(c_size / 2));
						let v6 = m2.add(b2.mul(-c_size / 2));
						g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr({stroke: c_color});
						g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr({stroke: c_color});
					}
					break;
				case "///":
					{
						let a1 = new Angle(angle.p1, angle.p2, angle.p2.add(bisect.mul(dir == 0 ? 200 : -200)));
						let a2 = new Angle(angle.p3, angle.p2, angle.p2.add(bisect.mul(dir == 0 ? 200 : -200)));
						let b1 = a1.bisectrice();
						let b2 = a2.bisectrice();
						let m1 = angle.p2.add(b1.mul(radius * (dir == 0 ? 1 : -1)));
						let m2 = angle.p2.add(b2.mul(radius * (dir == 0 ? 1 : -1)));
						let v1 = middle.add(bisect.mul(c_size / 2));
						let v2 = middle.add(bisect.mul(-c_size / 2));
						let v3 = m1.add(b1.mul(c_size / 2));
						let v4 = m1.add(b1.mul(-c_size / 2));
						let v5 = m2.add(b2.mul(c_size / 2));
						let v6 = m2.add(b2.mul(-c_size / 2));
						g.line(v1.x, v1.y, v2.x, v2.y).attr(this.base_line_attr).attr({stroke: c_color});
						g.line(v3.x, v3.y, v4.x, v4.y).attr(this.base_line_attr).attr({stroke: c_color});
						g.line(v5.x, v5.y, v6.x, v6.y).attr(this.base_line_attr).attr({stroke: c_color});;
					}
					break;
				case "x":
					let v15 = middle.add(bisect.rotate(Math.PI / 4).mul(c_size / 2));
					let v16 = middle.add(bisect.rotate(-Math.PI / 4).mul(c_size / 2));
					let v17 = middle.add(bisect.rotate(3 * Math.PI / 4).mul(c_size / 2));
					let v18 = middle.add(bisect.rotate(-3 * Math.PI / 4).mul(c_size / 2));
					g.line(v15.x, v15.y, v18.x, v18.y).attr(this.base_line_attr).attr({stroke: c_color});
					g.line(v17.x, v17.y, v16.x, v16.y).attr(this.base_line_attr).attr({stroke: c_color});
					break;
				case "o":
					g.circle(c_size / 2).attr(this.base_line_attr).attr({stroke: c_color}).center(middle.x, middle.y);
					break;
			}
		}
		return {svg: g, angle: angle}
	}


}