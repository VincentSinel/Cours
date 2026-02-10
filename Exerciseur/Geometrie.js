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
		return Math.atan2(this.y, this.x) * 180.0 / Math.PI;
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
	normal()
	{
		return this.rotate(Math.PI / 2);
	}

	resize(center, coef)
	{
		let v = this.sub(center).mul(coef).add(center)
		this.x = v.x
		this.y = v.y
		return this
	}

	dmove(dx, dy)
	{
		this.x = this.x + dx
		this.y = this.y + dy
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

	bissectrice()
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

	width;
	height;

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

	Objects = []
	Points = []
	
	constructor(width, height)
	{
		this.width = width;
		this.height = height;
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


	_DrawSegmentHand(line, group, attr_sup)
	{
		let dir = line.direction();
		let norm = dir.normal();

		let wave_length = 30;
		let wave_size = 3;
		let length = line.p1.distanceTo(line.p2);
		while (length < wave_length)
			wave_length = length / 2;
		let num_waves = Math.floor(length / wave_length);
		let p = line.p1;
		let offset_dir = Math.random() < 0.5 ? 0 : 1;
		let offset =  (offset_dir * 2 - 1) * Math.random() * wave_size;
		let p_wave = p.add(norm.mul(offset));
		let prev_point = p;
		let txt = "M " + p_wave.x + " " + p_wave.y + " ";
		for (let i = 1; i < num_waves; i++)
		{
			let t = i / num_waves + (Math.random() * wave_length / (length * 2));
			p = line.pointIn(t);
			offset =  (i % 2 == offset_dir ? 1 : -1) * Math.random() * wave_size;
			p_wave = p.add(norm.mul(offset));
			let p_start = prev_point.add(dir.mul(length / (num_waves * 4)));
			let p_end = p_wave.add(dir.mul(-length / (num_waves * 4)));
			txt += "C " + p_start.x + " " + p_start.y + " " + p_end.x + " " + p_end.y + " " + p_wave.x + " " + p_wave.y + " ";
			prev_point = p_wave;
		}
		let p_start = prev_point.add(dir.mul(length / (num_waves * 4)));
		let p_end = line.p2.add(dir.mul(-length / (num_waves * 4)));
		offset =  (offset_dir * 2 - 1) * Math.random() * wave_size;
		p_wave = line.p2.add(norm.mul(offset));
		txt += "C " + p_start.x + " " + p_start.y + " " + p_end.x + " " + p_end.y + " " + p_wave.x + " " + p_wave.y + " ";
		

		group.path(txt).attr(this.base_line_attr).attr(attr_sup);
	}

	_DrawPolygonHand(points, attr_sup)
	{
		let group = this.base_group.group();
		let num_points = points.length;

		for (let i = 0; i < num_points; i++)
		{
			let p1 = points[i];
			let p2 = points[(i + 1) % num_points];
			let line = new Ligne(p1, p2);
			this._DrawSegmentHand(line, group, attr_sup);
		}

		return group;
	}

	_DrawPoint(v, nom, param = {})
	{
		let angle = param.hasOwnProperty("angle") ? param.angle : 90;
		let distance = param.hasOwnProperty("distance") ? param.distance : 15;
		let offsetX = distance * Math.cos(angle * Math.PI / 180);
		let offsetY = distance * Math.sin(angle * Math.PI / 180);
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
		let g_txt = this._DrawText(v.add(new Vecteur2(offsetX, offsetY)), nom, attr_sup_text);
		return {svg: g, txt: g_txt};
	}

	_DrawSegment(line, param = {})
	{
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let hand_draw = param.hasOwnProperty("hand-drawn") ? param["hand-drawn"] : false;
		let g = this.base_group.group()

		if (hand_draw)
			this._DrawSegmentHand(line, g, attr_sup);
		else
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

	_DrawLine(line, param = {})
	{
		let border_line = line.toBorder(this.SVG_Draw.width(), this.SVG_Draw.height());
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let attr_sup_text = param.hasOwnProperty("nom-text") ? param["nom-text"] : {"attr": {}};
		let hand_draw = param.hasOwnProperty("hand-drawn") ? param["hand-drawn"] : false;
		attr_sup_text["attr"]["font-style"] = "italic";

		let g = this.base_group.group()
		if (hand_draw)
			this._DrawSegmentHand(border_line, g, attr_sup);
		else
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
			txt_svg = this._DrawText(txt_position, param.nom, attr_sup_text).txt;
		}

		return {svg: g, line: border_line, txt: txt_svg};
	}

	_DrawHalfLine(line, param = {})
	{
		let border_line = line.toBorder(this.SVG_Draw.width(), this.SVG_Draw.height());
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let hand_draw = param.hasOwnProperty("hand-drawn") ? param["hand-drawn"] : false;

		let g = this.base_group.group()

		let dot = line.direction().dot(border_line.direction());
		if (hand_draw)
		{
			if (dot > 0)
				this._DrawSegmentHand(new Ligne(line.p1, border_line.p2), g, attr_sup);
			else
				this._DrawSegmentHand(new Ligne(line.p1, border_line.p1), g, attr_sup);
		}
		else
		{
			if (dot > 0)
				g.line(line.p1.x, line.p1.y, border_line.p2.x, border_line.p2.y).attr(this.base_line_attr).attr(attr_sup);
			else
				g.line(line.p1.x, line.p1.y, border_line.p1.x, border_line.p1.y).attr(this.base_line_attr).attr(attr_sup);
		}
		
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

	_DrawText(v, txt, param = {})
	{
		let offsetX = param.hasOwnProperty("offsetX") ? param.offsetX : 0;
		let offsetY = param.hasOwnProperty("offsetY") ? param.offsetY : 0;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let rotate = param.hasOwnProperty("rotate") ? param.rotate : 0;
		let g = this.txt_group.group();
		g.text(txt).attr(this.base_txt_attr).attr(attr_sup).attr(this.base_txt_back_attr).center(v.x + offsetX, v.y + offsetY);
		g.text(txt).attr(this.base_txt_attr).attr(attr_sup).center(v.x + offsetX, v.y + offsetY);
		if (rotate != 0)
			g.rotate(rotate)
		return {txt: g};
	}

	_DrawPolygon(points, param = {})
	{
		if (points.length < 3) return null;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let hand_draw = param.hasOwnProperty("hand-drawn") ? param["hand-drawn"] : false;
		let points_svg = points.map(p => `${p.x},${p.y}`).join(" ");
		
		let poly;
		if (hand_draw)
			poly = this._DrawPolygonHand(points, attr_sup);
		else
			poly = this.base_group.polygon(points_svg).attr(this.base_line_attr).attr(attr_sup);

		return {svg: poly, points: points};
	}

	_DrawAngle(angle, dir = 0, param = {})
	{
		let bisect = angle.bissectrice();
		let radius = param.hasOwnProperty("radius") ? param.radius : 30;
		let attr_sup = param.hasOwnProperty("attr") ? param.attr : {};
		let right_angle = param.hasOwnProperty("right") ? param.right : false;

		let g = this.base_group.group()

		let p_start = angle.p2.add(angle.p1.sub(angle.p2).normalize().mul(radius));
		let p_end = angle.p2.add(angle.p3.sub(angle.p2).normalize().mul(radius));
		if (right_angle)
		{
			let p_middle = p_start.add(angle.p3.sub(angle.p2).normalize().mul(radius))
			g.line(p_start.x, p_start.y, p_middle.x, p_middle.y).attr(this.base_line_attr).attr(attr_sup);
			g.line(p_end.x, p_end.y, p_middle.x, p_middle.y).attr(this.base_line_attr).attr(attr_sup);
		}
		else
		{
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
		}
		


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
	}
	
	/**
	 * Ajoute le codage d'un point
	 * @param {Vecteur2} v 
	 * @param {String} nom 
	 * @param {Object} param 
	 */
	AjouterPoint(v,nom, param = {})
	{
		this.Objects.push(
			{
				type: "Point",
				obj: v,
				nom: nom,
				param: param
			}
		)
		if (!this.Points.includes(v))
			this.Points.push(v);
	}

	/**
	 * Ajoute le tracé d'un segment
	 * @param {Ligne} line 
	 * @param {Object} param 
	 */
	AjouterSegment(line, param = {})
	{
		this.Objects.push(
			{
				type: "Segment",
				obj: line,
				param: param
			}
		)
		if (!this.Points.includes(line.p1))
			this.Points.push(line.p1);
		if (!this.Points.includes(line.p2))
			this.Points.push(line.p2);
	}

	/**
	 * Ajoute le tracé d'une droite
	 * @param {Ligne} line 
	 * @param {Object} param 
	 */
	AjouterDroite(line, param = {})
	{
		this.Objects.push(
			{
				type: "Droite",
				obj: line,
				param: param
			}
		)
		if (!this.Points.includes(line.p1))
			this.Points.push(line.p1);
		if (!this.Points.includes(line.p2))
			this.Points.push(line.p2);
	}

	/**
	 * Ajoute le tracé d'une demi-droite
	 * @param {Ligne} line 
	 * @param {Object} param 
	 */
	AjouterDemiDroite(line, param = {})
	{
		this.Objects.push(
			{
				type: "DemiDroite",
				obj: line,
				param: param
			}
		)
		if (!this.Points.includes(line.p1))
			this.Points.push(line.p1);
		if (!this.Points.includes(line.p2))
			this.Points.push(line.p2);
	}

	/**
	 * Ajoute un texte centré sur la position
	 * @param {Vecteur2} v 
	 * @param {String} txt 
	 * @param {Object} param 
	 */
	AjouterTexte(v, txt, param = {})
	{
		this.Objects.push(
			{
				type: "Texte",
				obj: v,
				txt: txt,
				param: param
			}
		)
		if (!this.Points.includes(v))
			this.Points.push(v);
	}

	/**
	 * Ajoute le tracé d'un polygone
	 * @param {Array[Vecteur2]} points 
	 * @param {Object} param 
	 */
	AjouterPolygone(points, param = {})
	{
		this.Objects.push(
			{
				type: "Polygone",
				points: points,
				param: param
			}
		)
		for (let i = 0; i < points.length; i++) {
			if (!this.Points.includes(points[i]))
				this.Points.push(points[i]);
		}
	}

	/**
	 * Ajoute le codage d'un angle
	 * @param {Angle} angle 
	 * @param {int} dir 
	 * @param {Object} param 
	 */
	AjouterAngle(angle, dir = 0, param = {})
	{
		this.Objects.push(
			{
				type: "Angle",
				obj: angle,
				dir: dir,
				param: param
			}
		)
		if (!this.Points.includes(angle.p1))
			this.Points.push(angle.p1);
		if (!this.Points.includes(angle.p2))
			this.Points.push(angle.p2);
		if (!this.Points.includes(angle.p3))
			this.Points.push(angle.p3);
	}

	CenterAll()
	{
		var cx = this.width / 2 - this.base_group.cx()
		if (Math.abs(this.width / 2 - this.txt_group.cx()) < Math.abs(cx))
			cx = this.width / 2 - this.txt_group.cx()
		
		var cy = this.height / 2 - this.base_group.cy()
		if (Math.abs(this.height / 2 - this.txt_group.cy()) < Math.abs(cy))
			cy = this.height / 2 - this.txt_group.cy()
		
		if (Math.abs(cx) <= 1 && Math.abs(cy) <= 1)
			return;

		for (let index = 0; index < this.Points.length; index++) {
			const point = this.Points[index];
			point.dmove(cx, cy);
		}
		this.Recreate()
	}

	color = ["black", "red", "green", "blue", "yellow", "cyan"]

	Recreate()
	{
		this.base_group.clear()
		this.txt_group.clear()
		this.Objects.forEach( obj => 
		{
			switch(obj.type)
			{
				case "Point":
					return this._DrawPoint(obj.obj, obj.nom, obj.param);
				case "Segment":
					return this._DrawSegment(obj.obj, obj.param);
				case "Droite":
					return this._DrawLine(obj.obj, obj.param);
				case "DemiDroite":
					return this._DrawHalfLine(obj.obj, obj.param);
				case "Texte":
					return this._DrawText(obj.obj, obj.txt, obj.param);
				case "Polygone":
					return this._DrawPolygon(obj.points, obj.param);
				case "Angle":
					return this._DrawAngle(obj.obj, obj.dir, obj.param);
			}
		})
		this.CenterAll();
	}

	AppliquerCoef(coef)
	{
		let center = new Vecteur2(this.width / 2.0, this.height / 2.0);

		for (let index = 0; index < this.Points.length; index++) {
			const point = this.Points[index];
			point.resize(center, coef);
		}

		this.Recreate();
	}

	AjusterZoneDessin(marge = 20)
	{
		this.Recreate(false); // Ensure svg is generated for mesurement
		let coef1 = Math.min((this.width - marge * 2) / this.base_group.width(), (this.width - marge * 2) / this.txt_group.width())
		let coef2 = Math.min((this.height - marge * 2) / this.base_group.height(), (this.height - marge * 2) / this.txt_group.height())
		let coef = Math.min(coef1, coef2);
		this.AppliquerCoef(coef)
	}

}