// Version 4.0
const pSBC=(p,c0,c1,l)=>{
	let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
	if(!this.pSBCr)this.pSBCr=(d)=>{
			let n=d.length,x={};
			if(n>9){
					[r,g,b,a]=d=d.split(","),n=d.length;
					if(n<3||n>4)return null;
					x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
			}else{
					if(n==8||n==6||n<4)return null;
					if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
					d=i(d.slice(1),16);
					if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
					else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
			}return x};
	h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
	if(!f||!t)return null;
	if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
	else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
	a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
	else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}


{ // Objects
    function Draw_Objects(paper, objects, context)
    {
        objects.forEach(obj => {
            try{
                if (obj["type"] == "courbe")
                    Courbe(paper, context, obj)
                if (obj["type"] == "point")
                    Point(paper, context, obj)
                if (obj["type"] == "polygone")
                    Polygone(paper, context, obj)
                if (obj["type"] == "circle")
                    Circle(paper, context, obj)
                if (obj["type"] == "line")
                    Line(paper, context, obj)
				if (obj["type"] == "segment")
					Segment(paper, context, obj)
				if (obj["type"] == "texte")
					Texte(paper, context, obj)
            }
            catch(e){
                console.log(e)
            }
        });
    }
    
    function Courbe(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let formule = data["formule"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
        let start = data["start"];
        let end = data["end"];
        
    
        
        if (formule == "" || formule == " ") return;
        let dx = (xe - xs) / width;
        let points = [[]];
        let index = 0
        let inside = false
        x = Math.max(start, xs)
				let y;
				try {
					y = Function('"use strict";return (' + formule + ')')()
				} catch (error) {
					alert("La formule entrée n'est pas correct : " + error)
					return;
				}

        if (y > ys && y < ye)
        {
            points[index].push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
            inside = true;
        }
        
        for(let px = 0; px < width; px++)
        {
            x = xs + dx * px;
            if (x > start && x < end)
            {
                y = Function('"use strict";return (' + formule + ')')();
                if (y > ys && y < ye)
                {
                    points[index].push({
                        x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                        y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
                    inside = true;
                }
                else if (inside)
                {
                    y = Math.max(ys, Math.min(ye, y))
                    points[index].push({
                        x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                        y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
                    points.push([])
                    index += 1;
                    inside = false;
                }
            }
        }
        x = Math.min(end, xe)
        y = Function('"use strict";return (' + formule + ')')()
        if (y > ys && y < ye)
        {
            points[index].push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width,
                y: Canvas_height - Gen_Margin - 5 - (y - ys)/(ye - ys) * height});
        }
        points.forEach(poly => {
            if (poly.length > 1)
            {
                element = draw_polygone(paper,poly, false);
                element.attr(
                    {
                        stroke: strokecolor,
                        "stroke-width": stroke,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-dasharray": dashstyle
                    }
                )
            }
        })
    }
    
    function Point(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let px = data["px"];
        let py = data["py"];
        let name = data["name"];
        let tx = data["tx"];
        let ty = data["ty"];
        let txt_size = data["txt_size"];
        let type = data["type_point"];
        let size = data["size"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let p = {
			x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
            y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
        }
		if (ye == ys)
			p.y = Canvas_height * 0.5
    
        if(type == 0)
        {
            let line = draw_line(paper, p.x, p.y - size / 2.0, p.x, p.y + size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
            line = draw_line(paper, p.x - size / 2.0, p.y, p.x + size / 2.0, p.y);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 1)
        {
            let line = draw_line(paper, p.x - size / 2.0, p.y - size / 2.0, p.x + size / 2.0, p.y + size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
            line = draw_line(paper, p.x - size / 2.0, p.y + size / 2.0, p.x + size / 2.0, p.y - size / 2.0);
            line.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 2)
        {
            let c = paper.circle(p.x, p.y, size / 2.0);
            c.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 3)
        {
            let c = paper.circle(p.x, p.y, size / 2.0);
            c.attr(
                {
                    fill: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
        else if (type == 4)
        {
            let c = paper.circle(p.x, p.y, 1.0);
            c.attr(
                {
                    fill: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    
        if (name != "")
        {
            element = paper.text( p.x + tx, p.y + ty, name);
            element.attr(
                {
                    fill: "white",
                    stroke: "white",
                    "stroke-width": 5,
                    "font-size": txt_size,
                    "text-anchor": "middle",
                    "font-weight": "bold"
                }
            )
            element = paper.text( p.x + tx, p.y + ty, name);
            element.attr(
                {
                    fill: strokecolor,
                    "font-size": txt_size,
                    "text-anchor": "middle",
                }
            )
        }
    }
    
    function Polygone(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let points_not = data["points"];
        let fill_color = data["fill_color"];
        let fill = data["fill"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
    
        let points = [];
        for (var i = 0; i < points_not.length; i++) {
            let x = points_not[i].x
            let y = points_not[i].y
            points.push({
                x: Gen_Margin + 5 + (x - xs)/(xe - xs) * width, 
                y: Canvas_height - (Gen_Margin + 5 + (y - ys)/(ye - ys) * height)});
        }
    
        let polygone = draw_polygone(paper,points, points.length > 2);
        if (fill)
        {
            polygone.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle,
                    "fill": fill_color
                }
            )
        }
        else
        {
            polygone.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    }
    
    function Circle(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let px = data["px"];
        let py = data["py"];
        let as = data["as"];
        let ae = data["ae"];
        let radius = data["radius"];
        let fill_color = data["fill_color"];
        let fill = data["fill"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];
    
        let p = {
            x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
            y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
        }
        var rx = (radius - Math.min(xs, xe))/Math.abs(xe - xs) * width
        var ry = (radius - Math.min(ys, ye))/Math.abs(ye - ys) * height
        if (ye < ys) {as *= -1;ae *= -1;}
        var element = draw_ellipse_arc(paper,p, as, ae, rx, ry, fill);
        if (fill)
        {
            element.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle,
                    "fill": fill_color
                }
            )
        }
        else
        {
            element.attr(
                {
                    stroke: strokecolor,
                    "stroke-width": stroke,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-dasharray": dashstyle
                }
            )
        }
    
    }

    function Line(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let dxs = Gen_Margin + 5 + (data["xs"] - xs)/(xe - xs) * width;
        let dxe = Gen_Margin + 5 + (data["xe"] - xs)/(xe - xs) * width;
        let dys = Canvas_height - (Gen_Margin + 5 + (data["ys"] - ys)/(ye - ys) * height);
        let dye = Canvas_height - (Gen_Margin + 5 + (data["ye"] - ys)/(ye - ys) * height);
    
        let line = draw_line(paper, dxs, dys, dxe, dye);
        line.attr(
            {
                stroke: strokecolor,
                "stroke-width": stroke,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-dasharray": dashstyle,
            }
        )
    }

		function Segment(paper, context, data)
    {
        let width = context["width"];
        let height = context["height"];
        let xs = context["xs"];
        let xe = context["xe"];
        let ys = context["ys"];
        let ye = context["ye"];
        let pxs = data["psx"];
        let pys = data["psy"];
        let pxe = data["pex"];
        let pye = data["pey"];
				let style_s = data["ss"];
				let style_e = data["se"];
				let style_s_size = data["sss"];
				let style_e_size = data["ses"];
        let stroke = data["stroke"];
        let strokecolor = data["strokecolor"];
        let dashstyle = data["dashstyle"];

        let dxs = Gen_Margin + 5 + (pxs - xs)/(xe - xs) * width;
        let dxe = Gen_Margin + 5 + (pxe - xs)/(xe - xs) * width;
        let dys = Canvas_height - (Gen_Margin + 5 + (pys - ys)/(ye - ys) * height);
        let dye = Canvas_height - (Gen_Margin + 5 + (pye - ys)/(ye - ys) * height);
    
				let dx1 = 0; let dy1 = 0;
				let dx2 = 0; let dy2 = 0;
				if (style_s == 2 || style_s == 5)
				{
					dx = dxe - dxs;
					dy = dye - dys;
					let l = Math.sqrt(dx * dx + dy * dy);
					dx1 = dx / l * style_s_size / 10.0;
					dy1 = dy / l * style_s_size / 10.0;
				}
				if (style_e == 2 || style_e == 5)
				{
					dx = dxs - dxe;
					dy = dys - dye;
					let l = Math.sqrt(dx * dx + dy * dy);
					dx2= dx / l * style_s_size / 10.0;
					dy2 = dy / l * style_s_size / 10.0;
				}
        let line = draw_line(paper, dxs + dx1, dys + dy1, dxe + dx2, dye + dy2);
        line.attr(
            {
                stroke: strokecolor,
                "stroke-width": stroke,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-dasharray": dashstyle,
            }
        )

		let poly = draw_fleche(style_s, dxs, dys, dxe, dye, style_s_size);
		switch (style_s) {
			case 1:
			case 2:
			case 4:
			case 5:
				poly.attr(
					{
						stroke: strokecolor,
						"stroke-width": stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
					}
				)
				break;
			case 3:
				poly.attr(
					{
						stroke: strokecolor,
						"fill": strokecolor
					}
				)
			default:
				break;
		}
		poly = draw_fleche(style_e, dxe, dye, dxs, dys, style_e_size);
		switch (style_e) {
			case 1:
			case 2:
			case 4:
			case 5:
				poly.attr(
					{
						stroke: strokecolor,
						"stroke-width": stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
					}
				)
				break;
			case 3:
				poly.attr(
					{
						stroke: strokecolor,
						"fill": strokecolor
					}
				)
			default:
				break;
		}
    }

	function Texte(paper, context, data)
	{
		let width = context["width"];
		let height = context["height"];
		let xs = context["xs"];
		let xe = context["xe"];
		let ys = context["ys"];
		let ye = context["ye"];
		let px = data["px"];
		let py = data["py"];
		let name = data["name"];
		let angle = data["angle"];
		let txt_size = data["txt_size"];
		let strokecolor = data["strokecolor"];

		let p = {
			x: Gen_Margin + 5 + (px - xs)/(xe - xs) * width,
			y: Canvas_height - Gen_Margin - 5 - (py - ys)/(ye - ys) * height
		}

		if (name != "")
		{
			element = paper.text( p.x, p.y, name);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": txt_size,
					"text-anchor": "middle",
					"font-weight": "bold",
				}
			)
			element.rotate(angle);
			element = paper.text( p.x, p.y, name);
			element.attr(
				{
					fill: strokecolor,
					"font-size": txt_size,
					"text-anchor": "middle",
				}
			)
			element.rotate(angle);
		}
	}
}

{ // Type

function RepereGradue(paper, data)
{
    let Canvas_width = data["Canvas_width"];
    let Canvas_height = data["Canvas_height"];
    let Gen_Margin = data["Gen_Margin"];
    let objects = data["objects"];
    let hor_pri_nbr = data["hor_pri_nbr"];
    let hor_sec_nbr = data["hor_sec_nbr"];
    let hor_start = data["hor_start"];
    let hor_pas = data["hor_pas"];
    let hor_text = data["hor_text"];
    let hor_text_pos = data["hor_text_pos"];
	let hor_text_size = data["hor_text_size"];
	let hor_text_offset = data["hor_text_offset"];
	let ver_pri_nbr = data["ver_pri_nbr"];
	let ver_sec_nbr = data["ver_sec_nbr"];
	let ver_start = data["ver_start"];
	let ver_pas = data["ver_pas"];
	let ver_text = data["ver_text"];
	let ver_text_pos = data["ver_text_pos"];
	let ver_text_size = data["ver_text_size"];
	let ver_text_offset = data["ver_text_offset"];
	let line_pry_stroke = data["line_pry_stroke"];
	let line_pry_color = data["line_pry_color"];
	let line_pry_pin_size = data["line_pry_pin_size"];
	let line_pry_arrow = data["line_pry_arrow"];
	let line_pry_grid = data["line_pry_grid"];
	let line_pry_grid_stroke = data["line_pry_grid_stroke"];
	let line_pry_grid_color = data["line_pry_grid_color"];
	let line_sec_stroke = data["line_sec_stroke"];
	let line_sec_color = data["line_sec_color"];
	let line_sec_pin_size = data["line_sec_pin_size"];
	let line_sec_grid = data["line_sec_grid"];
	let line_sec_grid_stroke = data["line_sec_grid_stroke"];
	let line_sec_grid_color = data["line_sec_grid_color"];
	
	let w = Canvas_width - Gen_Margin * 2 - line_pry_arrow - 10;
	let h = Canvas_height - Gen_Margin * 2 - line_pry_arrow - 10;

	let pdx = w * 1.0 / hor_pri_nbr;
	let sdx = pdx * 1.0 / hor_sec_nbr;

	let pdy = h * 1.0 / ver_pri_nbr;
	let sdy = pdy * 1.0 / ver_sec_nbr;

	let hy = 0;
	let hx = Canvas_width -  Gen_Margin - line_pry_arrow;

	let vx = 0;
	let vy = Gen_Margin + line_pry_arrow;

	if (ver_start >= 0)
		hy = Canvas_height - Gen_Margin - 5
	else if (ver_start + ver_pri_nbr * ver_pas <= 0)
		hy = Gen_Margin + line_pry_arrow + 5
	else
		hy = Canvas_height - Gen_Margin - 5 + (ver_start / ver_pas) * pdy
	
	if (hor_start >= 0)
		vx = Gen_Margin + 5
	else if (hor_start + hor_pri_nbr * hor_pas <= 0)
		vx = Canvas_width - Gen_Margin - line_pry_arrow - 5
	else
		vx = Gen_Margin + 5 - (hor_start / hor_pas) * pdx

	// axe horizontale
	
	let element;


	//Grilles
	
	
	if (line_pry_grid)
	{
		for(let i = 0; i <= hor_pri_nbr; i++)
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * pdx, Gen_Margin + line_pry_arrow, 
				Gen_Margin + 5 + i * pdx, Canvas_height - Gen_Margin);
			element.attr(
				{
					stroke: line_pry_grid_color,
					"stroke-width": line_pry_grid_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		for(let i = 0; i <= ver_pri_nbr; i++)
		{
			element = draw_line(paper, 
				Gen_Margin, Canvas_height - Gen_Margin - 5 - i * pdy,
				Canvas_width - Gen_Margin - line_pry_arrow, Canvas_height - Gen_Margin - 5 - i * pdy);
			element.attr(
				{
					stroke: line_pry_grid_color,
					"stroke-width": line_pry_grid_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
	}

	if (line_sec_grid)
	{
		for(let i = 0; i < hor_pri_nbr; i++)
		{
			for(let j = 1; j < hor_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, Gen_Margin + line_pry_arrow, 
					Gen_Margin + 5 + i * pdx + j * sdx, Canvas_height - Gen_Margin);
				element.attr(
					{
						stroke: line_sec_grid_color,
						"stroke-width": line_sec_grid_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
		for(let i = 0; i < ver_pri_nbr; i++)
		{
			for(let j = 1; j < ver_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy,
					Canvas_width - Gen_Margin - line_pry_arrow, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy);
				element.attr(
					{
						stroke: line_sec_grid_color,
						"stroke-width": line_sec_grid_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}


	// Tiret
	for(let i = 0; i <= hor_pri_nbr; i++)
	{
		if (hor_start + hor_pas * i  != 0)
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * pdx, hy - line_pry_pin_size / 2.0, 
				Gen_Margin + 5 + i * pdx, hy + line_pry_pin_size / 2.0);
			element.attr(
				{
					stroke: line_pry_color,
					"stroke-width": line_pry_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		if (i < hor_pri_nbr)
		{
			for(let j = 1; j < hor_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy - line_sec_pin_size / 2.0, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy + line_sec_pin_size / 2.0);
				element.attr(
					{
						stroke: line_sec_color,
						"stroke-width": line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}
	for(let i = 0; i <= ver_pri_nbr; i++)
	{
		if (ver_start + ver_pas * i  != 0)
		{
			element = draw_line(paper, 
				vx - line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy,
				vx + line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy);
			element.attr(
				{
					stroke: line_pry_color,
					"stroke-width": line_pry_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				}
			)
		}
		if(i < ver_pri_nbr)
		{
			for(let j = 1; j < ver_sec_nbr; j++)
			{
				element = draw_line(paper, 
					vx - line_sec_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy,
					vx + line_sec_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy - j * sdy);
				element.attr(
					{
						stroke: line_sec_color,
						"stroke-width": line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}

	// Axes
	element = draw_line(paper, Gen_Margin, hy, hx, hy);
	element.attr(
		{
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)
	element = draw_line(paper, vx, Canvas_height - Gen_Margin, vx, vy);
	element.attr(
		{
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	// Fleche
	let points = [{x: hx,y: hy}, {x: hx + 0.25 * line_pry_arrow,y: hy}, 
		{x: hx + 0.25 * line_pry_arrow,y: hy + 0.5 * line_pry_arrow},
		{x: hx + line_pry_arrow,y: hy},
		{x: hx + 0.25 * line_pry_arrow,y: hy - 0.5 * line_pry_arrow},
		{x: hx + 0.25 * line_pry_arrow,y: hy}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: line_pry_color,
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)
	points = [{x: vx,y: vy}, {x: vx,y: vy - 0.25 * line_pry_arrow}, 
		{x: vx + 0.5 * line_pry_arrow,y: vy - 0.25 * line_pry_arrow},
		{x: vx,y: vy - line_pry_arrow},
		{x: vx - 0.5 * line_pry_arrow,y: vy - 0.25 * line_pry_arrow},
		{x: vx,y: vy - 0.25 * line_pry_arrow}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: line_pry_color,
			stroke: line_pry_color,
			"stroke-width": line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	Draw_Objects(paper, objects, {
        "width": w, "height": h, "xs": hor_start, "xe": hor_start + hor_pri_nbr * hor_pas,
        "ys": ver_start, "ye": ver_start + ver_pri_nbr * ver_pas});

	// Draw text
	for(let i = 0; i <= hor_pri_nbr; i++)
	{
		if (hor_text && hor_start + hor_pas * i != 0)
		{
			let x = Gen_Margin + 5 + i * pdx
			let y = 0;
			if (hor_text_pos == 0)
				y = hy + line_pry_pin_size / 2.0 + 2 + hor_text_size + hor_text_offset;
			else
				y = hy - line_pry_pin_size / 2.0 - hor_text_size - hor_text_offset;
			let text = Round(hor_start + hor_pas * i, 5) 
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": hor_text_size,
					"text-anchor": "middle",
					"font-weight": "bold"
				}
			)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: line_pry_color,
					"font-size": hor_text_size,
					"text-anchor": "middle",
				}
			)
		}
	}
	for(let i = 0; i <= ver_pri_nbr; i++)
	{
		if (ver_text && ver_start + ver_pas * i != 0 )
		{
			element = draw_line(paper, 
				vx - line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy,
				vx + line_pry_pin_size / 2.0, Canvas_height - Gen_Margin - 5 - i * pdy);
			let x = 0;
			let y = Canvas_height - Gen_Margin - 5 - i * pdy;
			if (ver_text_pos == 0)
				x = vx - line_pry_pin_size / 2.0 - ver_text_size - ver_text_offset;
			else
				x = vx + line_pry_pin_size / 2.0 + ver_text_size + ver_text_offset;
			let text = Round(ver_start + ver_pas * i , 5)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: "white",
					stroke: "white",
					"stroke-width": 5,
					"font-size": ver_text_size,
					"text-anchor": "middle",
					"font-weight": "bold"
				}
			)
			element = paper.text( x, y, text);
			element.attr(
				{
					fill: line_pry_color,
					"font-size": ver_text_size,
					"text-anchor": "middle",
				}
			)
		}
	}
}

function AxeGradue(paper, data)
{
	let Canvas_width = data["Canvas_width"];
    let Canvas_height = data["Canvas_height"];
    let Gen_Margin = data["Gen_Margin"];
    let objects = data["objects"];
	
	let axe_pri_nbr = data["axe_pri_nbr"];
	let axe_sec_nbr = data["axe_sec_nbr"];
	let axe_start = data["axe_start"];
	let axe_pas = data["axe_pas"];
	let axe_text = data["axe_text"];
	let axe_text_pos = data["axe_text_pos"];
	let axe_text_size = data["axe_text_size"];
	let axe_text_offset = data["axe_text_offset"];
	let axe_line_pry_stroke = data["axe_line_pry_stroke"];
	let axe_line_pry_color = data["axe_line_pry_color"];
	let axe_line_pry_pin_size = data["axe_line_pry_pin_size"];
	let axe_line_pry_arrow = data["axe_line_pry_arrow"];
	let axe_line_sec_stroke = data["axe_line_sec_stroke"];
	let axe_line_sec_color = data["axe_line_sec_color"];
	let axe_line_sec_pin_size = data["axe_line_sec_pin_size"];
	
	let w = Canvas_width - Gen_Margin * 2 - axe_line_pry_arrow - 10;
	let h = Canvas_height - Gen_Margin * 2;

	let pdx = w * 1.0 / axe_pri_nbr;
	let sdx = pdx * 1.0 / axe_sec_nbr;

	let hy = h / 2.0 + Gen_Margin;
	let hx = Canvas_width -  Gen_Margin - axe_line_pry_arrow;

	let element;



	// Tiret
	for(let i = 0; i <= axe_pri_nbr; i++)
	{
		element = draw_line(paper, 
			Gen_Margin + 5 + i * pdx, hy - axe_line_pry_pin_size / 2.0, 
			Gen_Margin + 5 + i * pdx, hy + axe_line_pry_pin_size / 2.0);
		element.attr(
			{
				stroke: axe_line_pry_color,
				"stroke-width": axe_line_pry_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}
		)
		if (i < axe_pri_nbr)
		{
			for(let j = 1; j < axe_sec_nbr; j++)
			{
				element = draw_line(paper, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy - axe_line_sec_pin_size / 2.0, 
					Gen_Margin + 5 + i * pdx + j * sdx, hy + axe_line_sec_pin_size / 2.0);
				element.attr(
					{
						stroke: axe_line_sec_color,
						"stroke-width": axe_line_sec_stroke,
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}
				)
			}
		}
	}

	// Axe
	element = draw_line(paper, Gen_Margin, hy, hx, hy);
	element.attr(
		{
			stroke: axe_line_pry_color,
			"stroke-width": axe_line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	// Fleche
	let points = [{x: hx,y: hy}, {x: hx + 0.25 * axe_line_pry_arrow,y: hy}, 
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy + 0.5 * axe_line_pry_arrow},
		{x: hx + axe_line_pry_arrow,y: hy},
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy - 0.5 * axe_line_pry_arrow},
		{x: hx + 0.25 * axe_line_pry_arrow,y: hy}]
	element = draw_polygone(paper,points);
	element.attr(
		{
			fill: axe_line_pry_color,
			stroke: axe_line_pry_color,
			"stroke-width": axe_line_pry_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}
	)

	Draw_Objects(paper, objects, {
        "width": w, "height": h, "xs": axe_start, "xe": axe_start + axe_pri_nbr * axe_pas,
        "ys": 0, "ye": 0});

	// Draw text
	for(let i = 0; i <= axe_pri_nbr; i++)
	{
		let x = Gen_Margin + 5 + i * pdx
		let y = 0;
		if (axe_text_pos == 0)
			y = hy + axe_line_pry_pin_size / 2.0 + 2 + axe_text_size + axe_text_offset;
		else
			y = hy - axe_line_pry_pin_size / 2.0 - axe_text_size - axe_text_offset;
		let text = Round(axe_start + axe_pas * i, 5) 
		element = paper.text( x, y, text);
		element.attr(
			{
				fill: "white",
				stroke: "white",
				"stroke-width": 5,
				"font-size": axe_text_size,
				"text-anchor": "middle",
				"font-weight": "bold"
			}
		)
		element = paper.text( x, y, text);
		element.attr(
			{
				fill: axe_line_pry_color,
				"font-size": axe_text_size,
				"text-anchor": "middle",
			}
		)
	}
}

function Quadrillage(paper, data)
{
	let Canvas_width = data["Canvas_width"];
	let Canvas_height = data["Canvas_height"];
	let Gen_Margin = data["Gen_Margin"];
	let objects = data["objects"];

	let c_hor_nbr = data["c_hor_nbr"];
	let c_ver_nbr = data["c_ver_nbr"];
	let c_size_x = data["c_size_x"];
	let c_size_y = data["c_size_y"];
	let q_points = data["q_points"];
	let q_line_color = data["q_line_color"];
	let q_line_style = data["q_line_style"];
	let q_line_stroke = data["q_line_stroke"];
	let q_int = data["q_int"];
	let c_int_hor_nbr = data["c_int_hor_nbr"];
	let c_int_ver_nbr = data["c_int_ver_nbr"];
	let q_int_line_color = data["q_int_line_color"];
	let q_int_line_style = data["q_int_line_style"];
	let q_int_line_stroke = data["q_int_line_stroke"];

	Canvas_width = c_hor_nbr * c_size_x + Gen_Margin*2 + 10; 
	Canvas_height = c_ver_nbr * c_size_y + Gen_Margin*2 + 10;

	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();
	
	if(q_int)
	{
		var x_s = c_size_x * 1.0 / c_int_hor_nbr;
		var y_s = c_size_y * 1.0 / c_int_ver_nbr;
		
		for (let i = 0; i <= c_hor_nbr * c_int_hor_nbr; i++) 
		{
			if (!q_points && i % c_int_hor_nbr == 0) continue;
			element = draw_line(paper, 
				Gen_Margin + 5 + i * x_s, Gen_Margin + 5, 
				Gen_Margin + 5 + i * x_s, Canvas_height - Gen_Margin - 5);
			element.attr(
				{
					stroke: q_int_line_color,
					"stroke-width": q_int_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": q_int_line_style,
				})
		}
		for (let i = 0; i <= c_ver_nbr * c_int_ver_nbr; i++) 
		{
			if (!q_points && i % c_int_ver_nbr == 0) continue;
			element = draw_line(paper, 
				Gen_Margin + 5, Gen_Margin + 5 + i * y_s, 
				Canvas_width - Gen_Margin - 5, Gen_Margin + 5 + i * y_s);
			element.attr(
				{
					stroke: q_int_line_color,
					"stroke-width": q_int_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": q_int_line_style,
				})
		}
	}

	if (q_points)
	{
		for (let i = 0; i <= c_hor_nbr; i++) 
		{
			for (let j = 0; j <= c_ver_nbr; j++) 
			{
				element = paper.circle(
					Gen_Margin + 5 + i * c_size_x,
					Gen_Margin + 5 + j * c_size_y,
					q_line_stroke
				)
				element.attr(
					{
						fill: q_line_color,
						stroke: "none",
					}
				)
			}
		}
	}
	else
	{
		for (let i = 0; i <= c_hor_nbr; i++) 
		{
			element = draw_line(paper, 
				Gen_Margin + 5 + i * c_size_x, Gen_Margin + 5, 
				Gen_Margin + 5 + i * c_size_x, Canvas_height - Gen_Margin - 5);
			element.attr(
				{
					stroke: q_line_color,
					"stroke-width": q_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": q_line_style,
				}
			)
		}
		for (let i = 0; i <= c_ver_nbr; i++) 
		{
			element = draw_line(paper, 
				Gen_Margin + 5, Gen_Margin + 5 + i * c_size_y, 
				Canvas_width - Gen_Margin - 5, Gen_Margin + 5 + i * c_size_y);
			element.attr(
				{
					stroke: q_line_color,
					"stroke-width": q_line_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": q_line_style,
				}
			)
		}
	}

    
	Draw_Objects(paper, objects, {
        "width": c_hor_nbr * c_size_x, 
        "height": c_ver_nbr * c_size_y, "xs": 0, "xe": c_hor_nbr,
        "ys": c_ver_nbr, "ye": 0});
	
	return [Canvas_width, Canvas_height]

}

function Solide_PaveDroit(paper, data)
{
	let objects = data["objects"];

	let sol_pavdrt_L = data["sol_pavdrt_L"]
	let sol_pavdrt_H = data["sol_pavdrt_H"]
	let sol_pavdrt_P = data["sol_pavdrt_P"]
	let sol_pavdrt_line_stroke = data["sol_pavdrt_line_stroke"]
	let sol_pavdrt_line_color = data["sol_pavdrt_line_color"]
	let sol_pavdrt_show_hide = data["sol_pavdrt_show_hide"]
	let sol_pavdrt_hide_style = data["sol_pavdrt_hide_style"]
	let sol_pavdrt_hide_color = data["sol_pavdrt_hide_color"]
	let sol_pavdrt_hide_stroke = data["sol_pavdrt_hide_stroke"]
	let sol_pavdrt_fill = data["sol_pavdrt_fill"]
	let sol_pavdrt_fill_shadow = data["sol_pavdrt_fill_shadow"]
	let sol_pavdrt_fill_color = data["sol_pavdrt_fill_color"]
	let sol_pavdrt_fill_color_alpha = data["sol_pavdrt_fill_color_alpha"]
	let sol_pavdrt_fill_base = data["sol_pavdrt_fill_base"]
	let sol_pavdrt_base_full = data["sol_pavdrt_base_full"]
	let sol_pavdrt_base_stroke = data["sol_pavdrt_base_stroke"]
	let sol_pavdrt_base_color = data["sol_pavdrt_base_color"]
	let sol_pavdrt_base_style = data["sol_pavdrt_base_style"]

	let sqrt2p = sol_pavdrt_P / (Math.SQRT2 * 2.0);

	Canvas_width = Gen_Margin * 2 + sol_pavdrt_L + sqrt2p;
	Canvas_height = Gen_Margin * 2 + sol_pavdrt_H + sqrt2p;
	
	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();
	
	let p1 = {
		x: Gen_Margin + sqrt2p, 
		y: Gen_Margin}
	let p2 = {
		x: Gen_Margin + sqrt2p + sol_pavdrt_L, 
		y: Gen_Margin}
	let p3 = {
		x: Gen_Margin, 
		y: Gen_Margin + sqrt2p}
	let p4 = {
		x: Gen_Margin + sol_pavdrt_L, 
		y: Gen_Margin + sqrt2p}
	let p5 = {
		x: Gen_Margin + sqrt2p, 
		y: Gen_Margin + sol_pavdrt_H}
	let p6 = {
		x: Gen_Margin + sqrt2p + sol_pavdrt_L, 
		y: Gen_Margin + sol_pavdrt_H}
	let p7 = {
		x: Gen_Margin, 
		y: Gen_Margin + sqrt2p + sol_pavdrt_H}
	let p8 = {
		x: Gen_Margin + sol_pavdrt_L, 
		y: Gen_Margin + sqrt2p + sol_pavdrt_H}
	
	if (sol_pavdrt_fill_base)
	{
		if (sol_pavdrt_base_full)
		{
			let polygone = draw_polygone(paper, [p5, p6, p8, p7]);
			polygone.attr( { stroke: "none", "fill": sol_pavdrt_base_color } )
		}
		else
		{
			let style = 
			{
					stroke: sol_pavdrt_base_color,
					"stroke-width": sol_pavdrt_base_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_pavdrt_base_style,
			}

			let space = 4;
			for (let i = 0; i < (sol_pavdrt_L / (sol_pavdrt_base_stroke * space)); i++) 
			{
				let line = draw_line(paper, p5.x + i * sol_pavdrt_base_stroke * space, p5.y, p7.x + i * sol_pavdrt_base_stroke * space, p7.y);
				line.attr(style)
			}
		}
	}
	

	if (sol_pavdrt_show_hide)
	{
		let style = 
		{
				stroke: sol_pavdrt_hide_color,
				"stroke-width": sol_pavdrt_hide_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_pavdrt_hide_style,
		}


		let line = draw_line(paper, p5.x, p5.y, p1.x, p1.y);
		line.attr(style)
		line = draw_line(paper, p5.x, p5.y, p6.x, p6.y);
		line.attr(style)
		line = draw_line(paper, p5.x, p5.y, p7.x, p7.y);
		line.attr(style)
	}

	if (sol_pavdrt_fill)
	{
		let a = Math.floor(sol_pavdrt_fill_color_alpha * 255).toString(16);
		let polygone;
		polygone = draw_polygone(paper, [p4, p3, p7, p8]);
		polygone.attr( { stroke: "none", "fill": sol_pavdrt_fill_color, "opacity": sol_pavdrt_fill_color_alpha } )
		
		polygone = draw_polygone(paper, [p1, p2, p4, p3]);
		if (sol_pavdrt_fill_shadow)
			polygone.attr( { stroke: "none", "fill": pSBC(-0.4, sol_pavdrt_fill_color), "opacity": sol_pavdrt_fill_color_alpha } )
		else
			polygone.attr( { stroke: "none", "fill": sol_pavdrt_fill_color, "opacity": sol_pavdrt_fill_color_alpha } )

		polygone = draw_polygone(paper, [p2, p4, p8, p6]);
		if (sol_pavdrt_fill_shadow)
			polygone.attr( { stroke: "none", "fill": pSBC(-0.8, sol_pavdrt_fill_color), "opacity": sol_pavdrt_fill_color_alpha } )
		else
			polygone.attr( { stroke: "none", "fill": sol_pavdrt_fill_color, "opacity": sol_pavdrt_fill_color_alpha } )
	}
	

	// Main lines
	{
		let style = 
		{
				stroke: sol_pavdrt_line_color,
				"stroke-width": sol_pavdrt_line_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
		}

		let line = draw_line(paper,p3.x, p3.y, p1.x, p1.y);
		line.attr(style)
		line = draw_line(paper,p3.x, p3.y, p4.x, p4.y);
		line.attr(style)
		line = draw_line(paper,p3.x, p3.y, p7.x, p7.y);
		line.attr(style)
		line = draw_line(paper,p2.x, p2.y, p1.x, p1.y);
		line.attr(style)
		line = draw_line(paper,p2.x, p2.y, p4.x, p4.y);
		line.attr(style)
		line = draw_line(paper,p2.x, p2.y, p6.x, p6.y);
		line.attr(style)
		line = draw_line(paper,p8.x, p8.y, p7.x, p7.y);
		line.attr(style)
		line = draw_line(paper,p8.x, p8.y, p6.x, p6.y);
		line.attr(style)
		line = draw_line(paper,p8.x, p8.y, p4.x, p4.y);
		line.attr(style)
	}


	
	return [Canvas_width, Canvas_height]
}

function Solide_PrismeDroit(paper, data)
{
	let objects = data["objects"];

	let sol_prmdrt_L = data["sol_prmdrt_L"] * 2.0
	let sol_prmdrt_H = data["sol_prmdrt_H"]
	let sol_prmdrt_P = data["sol_prmdrt_P"]
	let sol_prmdrt_F = data["sol_prmdrt_F"]
	let sol_prmdrt_A = data["sol_prmdrt_A"]
	let sol_prmdrt_line_stroke = data["sol_prmdrt_line_stroke"]
	let sol_prmdrt_line_color = data["sol_prmdrt_line_color"]
	let sol_prmdrt_show_hide = data["sol_prmdrt_show_hide"]
	let sol_prmdrt_hide_style = data["sol_prmdrt_hide_style"]
	let sol_prmdrt_hide_color = data["sol_prmdrt_hide_color"]
	let sol_prmdrt_hide_stroke = data["sol_prmdrt_hide_stroke"]
	let sol_prmdrt_fill = data["sol_prmdrt_fill"]
	let sol_prmdrt_fill_shadow = data["sol_prmdrt_fill_shadow"]
	let sol_prmdrt_fill_color = data["sol_prmdrt_fill_color"]
	let sol_prmdrt_fill_color_alpha = data["sol_prmdrt_fill_color_alpha"]
	let sol_prmdrt_fill_base = data["sol_prmdrt_fill_base"]
	let sol_prmdrt_base_full = data["sol_prmdrt_base_full"]
	let sol_prmdrt_base_stroke = data["sol_prmdrt_base_stroke"]
	let sol_prmdrt_base_color = data["sol_prmdrt_base_color"]
	let sol_prmdrt_base_style = data["sol_prmdrt_base_style"]

	let ry = Math.SQRT1_2 * sol_prmdrt_P;

	Canvas_width = Gen_Margin * 2 + sol_prmdrt_L;
	Canvas_height = Gen_Margin * 2 + sol_prmdrt_H + ry;
	
	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let c = {x: Canvas_width / 2, y: Gen_Margin + ry / 2.0}

	let circlepoints = [];
	let da = Math.PI * 2.0 / sol_prmdrt_F;
	let off_a = sol_prmdrt_A / 180.0 * Math.PI;
	for (let i = 0; i < sol_prmdrt_F; i++) {
		let x = c.x + sol_prmdrt_L / 2.0 * Math.cos(da * i + off_a);
		let y = c.y + ry / 2.0 * Math.sin(da * i + off_a);
		circlepoints.push({x: x, y: y})
	}

	let backlines = [];

	let style1 = 
	{
			stroke: sol_prmdrt_line_color,
			"stroke-width": sol_prmdrt_line_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
	}
	let style2 = 
	{
			stroke: sol_prmdrt_hide_color,
			"stroke-width": sol_prmdrt_hide_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-dasharray": sol_prmdrt_hide_style,
	}
	for (let i = 0; i < sol_prmdrt_F; i++) 
	{
		let p1 = circlepoints[i];
		let p2 = circlepoints[(i + 1) % sol_prmdrt_F];
		let p3 = circlepoints[(i + sol_prmdrt_F - 1) % sol_prmdrt_F];
		let line1 = draw_line(paper, p1.x, p1.y, p2.x, p2.y);
		line1.attr(style1)
		if (p2.x <= p1.x)
		{
			let line2 = draw_line(paper, p1.x, p1.y + sol_prmdrt_H, p2.x, p2.y + sol_prmdrt_H);
			let line3 = draw_line(paper, p1.x, p1.y, p1.x, p1.y + sol_prmdrt_H);
			line2.attr(style1)
			line3.attr(style1)
			line2.toFront()
			line3.toFront()
		}
		else if (p1.x < p3.x)
		{
			let line3 = draw_line(paper, p1.x, p1.y, p1.x, p1.y + sol_prmdrt_H);
			line3.attr(style1)
			line3.toFront()
			if (sol_prmdrt_show_hide)
			{
				let line2 = draw_line(paper, p1.x, p1.y + sol_prmdrt_H, p2.x, p2.y + sol_prmdrt_H);
				line2.attr(style2)
				backlines.push(line2)
			}
			
		}
		else if (sol_prmdrt_show_hide)
		{
			let line2 = draw_line(paper, p1.x, p1.y + sol_prmdrt_H, p2.x, p2.y + sol_prmdrt_H);
			let line3 = draw_line(paper, p1.x, p1.y, p1.x, p1.y + sol_prmdrt_H);
			line2.attr(style2)
			line3.attr(style2)
			backlines.push(line2)
			backlines.push(line3)
		}
	}

	if (sol_prmdrt_fill)
	{
		var polygone = draw_polygone(paper, circlepoints);
		if (sol_prmdrt_fill_shadow)
			polygone.attr( { stroke: "none", "fill": pSBC(-0.2, sol_prmdrt_fill_color), "opacity": sol_prmdrt_fill_color_alpha } )
		else
			polygone.attr( { stroke: "none", "fill": sol_prmdrt_fill_color, "opacity": sol_prmdrt_fill_color_alpha } )
		polygone.toBack();
		for (let i = 0; i < sol_prmdrt_F; i++) 
		{
			let p1 = circlepoints[i];
			let p2 = circlepoints[(i + 1) % sol_prmdrt_F];
			if (p2.x <= p1.x)
			{
				let p3 = {x: p2.x, y: p2.y + sol_prmdrt_H}
				let p4 = {x: p1.x, y: p1.y + sol_prmdrt_H}
				polygone = draw_polygone(paper, [p1, p2, p3, p4]);
				let coef = - Math.abs((p1.x - c.x) + (p2.x - c.x)) / sol_prmdrt_L;
				if (sol_prmdrt_fill_shadow)
					polygone.attr( { stroke: "none", "fill": pSBC(coef, sol_prmdrt_fill_color), "opacity": sol_prmdrt_fill_color_alpha } )
				else
					polygone.attr( { stroke: "none", "fill": sol_prmdrt_fill_color, "opacity": sol_prmdrt_fill_color_alpha } )
				polygone.toBack();
			}
		}
	}
	
	for (let i = 0; i < backlines.length; i++) {
		backlines[i].toBack();
	}

	if (sol_prmdrt_fill_base)
	{
		if (sol_prmdrt_base_full)
		{
			var polygone = draw_polygone(paper, circlepoints);
			polygone.attr( { stroke: "none", "fill": sol_prmdrt_base_color } )
			polygone.translate(0, sol_prmdrt_H)
			polygone.toBack();
		}
		else
		{
			let style = 
			{
					stroke: sol_prmdrt_base_color,
					"stroke-width": sol_prmdrt_base_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_prmdrt_base_style,
			}

			let ida = 1;
			let idb = sol_prmdrt_F - 1
			let op1 = circlepoints[0];
			let op2 = circlepoints[1];
			let dx = (op1.y - op2.y) / length(op1, op2);
			let dy = -(op1.x - op2.x) / length(op1, op2);
			var count = 0;
			let space = 4.0;
			while (ida != idb && count < 500)
			{
				var line = draw_line(paper, op1.x, op1.y, op2.x, op2.y)
				line.attr(style)
				line.translate(0, sol_prmdrt_H)
				line.toBack();

				let np1 = {
					x: op1.x + dx * sol_prmdrt_base_stroke * space, 
					y: op1.y + dy * sol_prmdrt_base_stroke * space}
				let np2 = {
					x: op2.x + dx * sol_prmdrt_base_stroke * space, 
					y: op2.y + dy * sol_prmdrt_base_stroke * space}

				op1 = line_intersection(np1, np2, circlepoints[idb],circlepoints[(idb + 1) % sol_prmdrt_F])
				while(idb != ida && !point_between(circlepoints[idb],circlepoints[(idb + 1) % sol_prmdrt_F], op1))
				{
					idb -= 1;
					op1 = line_intersection(np1, np2, circlepoints[idb],circlepoints[(idb + 1) % sol_prmdrt_F])
				}
				op2 = line_intersection(np1, np2, circlepoints[ida],circlepoints[(ida + 1) % sol_prmdrt_F])
				while(idb != ida && !point_between(circlepoints[ida],circlepoints[(ida + 1) % sol_prmdrt_F], op2))
				{
					ida += 1;
					op2 = line_intersection(np1, np2, circlepoints[ida],circlepoints[(ida + 1) % sol_prmdrt_F])
				}


				count += 1;
			}
		}
	}

	
	return [Canvas_width, Canvas_height]
}

function Solide_Cylindre(paper, data)
{
	let objects = data["objects"];

	let sol_cylind_R = data["sol_cylind_R"]
	let sol_cylind_H = data["sol_cylind_H"]
	let sol_cylind_line_stroke = data["sol_cylind_line_stroke"]
	let sol_cylind_line_color = data["sol_cylind_line_color"]
	let sol_cylind_show_hide = data["sol_cylind_show_hide"]
	let sol_cylind_hide_style = data["sol_cylind_hide_style"]
	let sol_cylind_hide_color = data["sol_cylind_hide_color"]
	let sol_cylind_hide_stroke = data["sol_cylind_hide_stroke"]
	let sol_cylind_fill = data["sol_cylind_fill"]
	let sol_cylind_fill_shadow = data["sol_cylind_fill_shadow"]
	let sol_cylind_fill_color = data["sol_cylind_fill_color"]
	let sol_cylind_fill_color_alpha = data["sol_cylind_fill_color_alpha"]
	let sol_cylind_fill_base = data["sol_cylind_fill_base"]
	let sol_cylind_base_full = data["sol_cylind_base_full"]
	let sol_cylind_base_stroke = data["sol_cylind_base_stroke"]
	let sol_cylind_base_color = data["sol_cylind_base_color"]
	let sol_cylind_base_style = data["sol_cylind_base_style"]
	let sol_cylind_h = data["sol_cylind_h"]
	let sol_cylind_h_stroke = data["sol_cylind_h_stroke"]
	let sol_cylind_h_color = data["sol_cylind_h_color"]
	let sol_cylind_h_style = data["sol_cylind_h_style"]
	let sol_cylind_r = data["sol_cylind_r"]
	let sol_cylind_r_stroke = data["sol_cylind_r_stroke"]
	let sol_cylind_r_color = data["sol_cylind_r_color"]
	let sol_cylind_r_style = data["sol_cylind_r_style"]
	let sol_cylind_ag = data["sol_cylind_ag"]
	let sol_cylind_ag_stroke = data["sol_cylind_ag_stroke"]
	let sol_cylind_ag_full = data["sol_cylind_ag_full"]
	let sol_cylind_ag_color = data["sol_cylind_ag_color"]
	let sol_cylind_ag_style = data["sol_cylind_ag_style"]

	let ry = Math.floor(sol_cylind_R / 3.0);

	Canvas_width = Gen_Margin * 2 + sol_cylind_R * 2;
	Canvas_height = Gen_Margin * 2 + sol_cylind_H + ry * 2;
	
	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let c = {x: Canvas_width / 2, y: Gen_Margin + ry}


	let style = 
	{
			stroke: sol_cylind_line_color,
			"stroke-width": sol_cylind_line_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
	}

	let ellipse = paper.ellipse(c.x, c.y, sol_cylind_R, ry)
	ellipse.attr(style)
	c.y += sol_cylind_H

	let line = draw_line(paper, Gen_Margin, Gen_Margin + ry, Gen_Margin, c.y)
	line.attr(style)
	line = draw_line(paper, Canvas_width - Gen_Margin, Gen_Margin + ry, Canvas_width - Gen_Margin, c.y)
	line.attr(style)

	let arc = draw_ellipse_arc(paper, c, 0, 180, sol_cylind_R, ry, false)
	arc.attr(style)

	if (sol_cylind_fill)
	{
		let top_ellipse = paper.ellipse(c.x, c.y - sol_cylind_H, sol_cylind_R, ry)
		top_ellipse.attr(style)
		if (sol_cylind_fill_shadow)
			top_ellipse.attr( { stroke: "none", "fill": pSBC(-0.2, sol_cylind_fill_color), "opacity": sol_cylind_fill_color_alpha } )
		else
		top_ellipse.attr( { stroke: "none", "fill": sol_cylind_fill_color, "opacity": sol_cylind_fill_color_alpha } )
		top_ellipse.toBack();

		let path = "M" + (c.x + sol_cylind_R).toString() + " " + (c.y - sol_cylind_H).toString()
		path += get_ellipse_arc(c.x, c.y - sol_cylind_H, 0, 180, sol_cylind_R, ry, false)
		path += " L " + (c.x - sol_cylind_R).toString() + "," + c.y.toString();
		path += get_ellipse_arc(c.x, c.y, 180, 0, sol_cylind_R, ry, false);
		path += "Z"
		let front_face = paper.path(path);
		if (sol_cylind_fill_shadow)
		{
			let c1 = pSBC(-0.8, sol_cylind_fill_color);
			let grad = "0-" + c1 + "-" + sol_cylind_fill_color + "-" + c1;
			front_face.attr( { stroke: "none", "fill": grad, 
			"opacity": sol_cylind_fill_color_alpha } )
			
		}
		else
			front_face.attr( {"title":"test", stroke: "none", "fill": sol_cylind_fill_color, "opacity": sol_cylind_fill_color_alpha } )

		front_face.toBack();
		// Hack pour rendre le remplissage bien transparent (non implémenté dans Raphaël.js)
		document.getElementById("preview").getElementsByTagName("path")[0].setAttribute("style", "opacity:" + sol_cylind_fill_color_alpha.toString())
	}

	if (sol_cylind_h)
	{
		
		let line = draw_line(paper, c.x, c.y, c.x, c.y - sol_cylind_H)
		line.attr({
				stroke: sol_cylind_h_color,
				"stroke-width": sol_cylind_h_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cylind_h_style,
		})
		line.toBack();
	}
	if (sol_cylind_r)
	{
		let x = c.x + sol_cylind_R * Math.cos(Math.PI / 4.0)
		let y = c.y + ry * Math.sin(Math.PI / 4.0)
		let line = draw_line(paper, c.x, c.y, x, y)
		line.attr({
				stroke: sol_cylind_r_color,
				"stroke-width": sol_cylind_r_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cylind_r_style,
		})
		line.toBack()
	}
	if (sol_cylind_ag)
	{
		let style = {
				stroke: sol_cylind_ag_color,
				"stroke-width": sol_cylind_ag_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cylind_ag_style,
		}
		let x = sol_cylind_R * Math.cos(Math.PI / 4.0)
		let y = ry * Math.sin(Math.PI / 4.0)
		let coef = Math.sqrt(x*x + y*y);
		let p1 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef}
		let p2 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef-20}
		let p3 = {x: c.x , y: c.y -20}
		if (sol_cylind_ag_full)
		{
			let poly = draw_polygone(paper, [p1,p2,p3,c])
			poly.attr({ stroke: "none", "fill": sol_cylind_ag_color })
			poly.toBack();
		}
		else
		{
			let line = draw_line(paper, p1.x, p1.y, p2.x, p2.y)
			line.attr(style)
			line.toBack()
			line = draw_line(paper, p3.x, p3.y, p2.x, p2.y)
			line.attr(style)
			line.toBack()
		}
	}


	if (sol_cylind_show_hide)
	{
		let arc2 = draw_ellipse_arc(paper, c, 180, 360, sol_cylind_R, ry, false)
		arc2.attr({
				stroke: sol_cylind_hide_color,
				"stroke-width": sol_cylind_hide_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cylind_hide_style,
			})
			arc2.toBack();
	}

	if (sol_cylind_fill_base)
	{
		if (sol_cylind_base_full)
		{
			let ellipse = paper.ellipse(c.x, c.y, sol_cylind_R, ry)
			ellipse.attr({ stroke: "none", "fill": sol_cylind_base_color })
			ellipse.toBack();
		}
		else
		{
			let style = 
			{
					stroke: sol_cylind_base_color,
					"stroke-width": sol_cylind_base_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_cylind_base_style,
			}

			let dt = 0;
			let count = 0;
			let b = Gen_Margin * 2 + sol_cylind_H;

			let sr1 = sol_cylind_R * sol_cylind_R;
			let sr2 = ry * ry;

			let db = sol_cylind_base_stroke * 4.0 * Math.SQRT2;

			while (dt < Canvas_width && count < 500)
			{

				let A = 2.0 * (sr2 + sr1)
				let B = -2*(c.x * sr2 + sr1*(b - c.y))
				let C = sr2*c.x*c.x+sr1*(b - c.y)*(b-c.y) - sr1*sr2;

				let delta = B*B - 2*A*C;
				if (delta > 0)
				{
					let x1 = (-B + Math.sqrt(delta)) / A;
					let x2 = (-B - Math.sqrt(delta)) / A;
					let y1 = b - x1;
					let y2 = b - x2;
					let line = draw_line(paper, x1, y1, x2, y2)
					line.attr(style)
					line.toBack();
				}

				b += db;
				dt += db * Math.SQRT1_2;

				count += 1;
			}
		}
	}


	
	return [Canvas_width, Canvas_height]
}

function Solide_Pyramide(paper, data)
{
	let objects = data["objects"];

	let sol_pyrami_L = data["sol_pyrami_L"]
	let sol_pyrami_H = data["sol_pyrami_H"]
	let sol_pyrami_P = data["sol_pyrami_P"]
	let sol_pyrami_F = data["sol_pyrami_F"]
	let sol_pyrami_A = data["sol_pyrami_A"]
	let sol_pyrami_line_stroke = data["sol_pyrami_line_stroke"]
	let sol_pyrami_line_color = data["sol_pyrami_line_color"]
	let sol_pyrami_show_hide = data["sol_pyrami_show_hide"]
	let sol_pyrami_hide_style = data["sol_pyrami_hide_style"]
	let sol_pyrami_hide_color = data["sol_pyrami_hide_color"]
	let sol_pyrami_hide_stroke = data["sol_pyrami_hide_stroke"]
	let sol_pyrami_fill = data["sol_pyrami_fill"]
	let sol_pyrami_fill_shadow = data["sol_pyrami_fill_shadow"]
	let sol_pyrami_fill_color = data["sol_pyrami_fill_color"]
	let sol_pyrami_fill_color_alpha = data["sol_pyrami_fill_color_alpha"]
	let sol_pyrami_fill_base = data["sol_pyrami_fill_base"]
	let sol_pyrami_base_full = data["sol_pyrami_base_full"]
	let sol_pyrami_base_stroke = data["sol_pyrami_base_stroke"]
	let sol_pyrami_base_color = data["sol_pyrami_base_color"]
	let sol_pyrami_base_style = data["sol_pyrami_base_style"]
	let sol_pyrami_h = data["sol_pyrami_h"]
	let sol_pyrami_h_stroke = data["sol_pyrami_h_stroke"]
	let sol_pyrami_h_color = data["sol_pyrami_h_color"]
	let sol_pyrami_h_style = data["sol_pyrami_h_style"]
	let sol_pyrami_r = data["sol_pyrami_r"]
	let sol_pyrami_r_stroke = data["sol_pyrami_r_stroke"]
	let sol_pyrami_r_color = data["sol_pyrami_r_color"]
	let sol_pyrami_r_style = data["sol_pyrami_r_style"]
	let sol_pyrami_ag = data["sol_pyrami_ag"]
	let sol_pyrami_ag_stroke = data["sol_pyrami_ag_stroke"]
	let sol_pyrami_ag_full = data["sol_pyrami_ag_full"]
	let sol_pyrami_ag_color = data["sol_pyrami_ag_color"]
	let sol_pyrami_ag_style = data["sol_pyrami_ag_style"]

	let ry = Math.SQRT1_2 * sol_pyrami_P;

	Canvas_width = Gen_Margin * 2 + sol_pyrami_L;
	Canvas_height = Gen_Margin * 2 + sol_pyrami_H + ry / 2.0;
	
	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let c = {x: Canvas_width / 2, y: Gen_Margin}

	let circlepoints = [];
	let da = Math.PI * 2.0 / sol_pyrami_F;
	let off_a = sol_pyrami_A / 180.0 * Math.PI;
	for (let i = 0; i < sol_pyrami_F; i++) {
		let x = c.x + sol_pyrami_L / 2.0 * Math.cos(da * i + off_a);
		let y = c.y + ry / 2.0 * Math.sin(da * i + off_a) + sol_pyrami_H;
		circlepoints.push({x: x, y: y})
	}

	let backlines = [];


	let style1 = 
	{
			stroke: sol_pyrami_line_color,
			"stroke-width": sol_pyrami_line_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
	}
	let style2 = 
	{
			stroke: sol_pyrami_hide_color,
			"stroke-width": sol_pyrami_hide_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-dasharray": sol_pyrami_hide_style,
	}
	for (let i = 0; i < sol_pyrami_F; i++) 
	{
		let p1 = circlepoints[i];
		let p2 = circlepoints[(i + 1) % sol_pyrami_F];
		let p3 = circlepoints[(i + sol_pyrami_F - 1) % sol_pyrami_F];
		let a1 = Math.atan2(p1.y - c.y, p1.x - c.x)
		let a2 = Math.atan2(p2.y - c.y, p2.x - c.x)
		let a3 = Math.atan2(p3.y - c.y, p3.x - c.x)
		
		let p4 = {x: (p1.x + p2.x) / 2.0, y: (p1.y + p2.y) / 2.0}
		let a4 = Math.atan2(p4.y - c.y, p4.x - c.x)

		if (a4 < a2 || a4 > a1)
		{
			let line2 = draw_line(paper, p1.x, p1.y, p2.x, p2.y);
			line2.attr(style1)
			line2.toFront()
		}
		else if (sol_pyrami_show_hide)
		{
			let line2 = draw_line(paper, p1.x, p1.y, p2.x, p2.y);
			line2.attr(style2)
			backlines.push(line2)
		}

		if (a1 < a2 || a1 > a3)
		{
			let line3 = draw_line(paper, p1.x, p1.y, c.x, c.y);
			line3.attr(style1)
			line3.toFront()
		}
		else if (sol_pyrami_show_hide)
		{
			let line3 = draw_line(paper, p1.x, p1.y, c.x, c.y);
			line3.attr(style2)
			backlines.push(line3)
		}
	}

	if (sol_pyrami_fill)
	{
		for (let i = 0; i < sol_pyrami_F; i++) 
		{
			let p1 = circlepoints[i];
			let p2 = circlepoints[(i + 1) % sol_pyrami_F];
			let p3 = {x: (p1.x + p2.x) / 2.0, y: (p1.y + p2.y) / 2.0}
			let a1 = Math.atan2(p1.y - c.y, p1.x - c.x)
			let a2 = Math.atan2(p2.y - c.y, p2.x - c.x)
			let a3 = Math.atan2(p3.y - c.y, p3.x - c.x)
			if (a3 < a2 || a3 > a1)
			{
				polygone = draw_polygone(paper, [p1, p2, c]);
				let coef = - Math.abs((p1.x - c.x) + (p2.x - c.x)) / sol_pyrami_L;
				if (sol_pyrami_fill_shadow)
					polygone.attr( { stroke: "none", "fill": pSBC(coef, sol_pyrami_fill_color), "opacity": sol_pyrami_fill_color_alpha } )
				else
					polygone.attr( { stroke: "none", "fill": sol_pyrami_fill_color, "opacity": sol_pyrami_fill_color_alpha } )
				polygone.toBack();
			}
		}
	}

	if (sol_pyrami_h)
		{
			
			let line = draw_line(paper, c.x, c.y, c.x, c.y + sol_pyrami_H)
			line.attr({
					stroke: sol_pyrami_h_color,
					"stroke-width": sol_pyrami_h_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_pyrami_h_style,
			})
			line.toBack();
		}
		if (sol_pyrami_ag)
		{
			let style = {
					stroke: sol_pyrami_ag_color,
					"stroke-width": sol_pyrami_ag_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_pyrami_ag_style,
			}
			let x = sol_pyrami_L * Math.cos(Math.PI / 4.0)
			let y = ry * Math.sin(Math.PI / 4.0)
			let coef = Math.sqrt(x*x + y*y);
			let p1 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef + sol_pyrami_H}
			let p2 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef-20 + sol_pyrami_H}
			let p3 = {x: c.x , y: c.y -20 + sol_pyrami_H}
			let p4 = {x: c.x , y: c.y + sol_pyrami_H}
			if (sol_pyrami_ag_full)
			{
				let poly = draw_polygone(paper, [p1,p2,p3,p4])
				poly.attr({ stroke: "none", "fill": sol_pyrami_ag_color })
				poly.toBack();
			}
			else
			{
				let line = draw_line(paper, p1.x, p1.y, p2.x, p2.y)
				line.attr(style)
				line.toBack()
				line = draw_line(paper, p3.x, p3.y, p2.x, p2.y)
				line.attr(style)
				line.toBack()
			}
		}
	
	for (let i = 0; i < backlines.length; i++) {
		backlines[i].toBack();
	}

	if (sol_pyrami_fill_base)
	{
		if (sol_pyrami_base_full)
		{
			var polygone = draw_polygone(paper, circlepoints);
			polygone.attr( { stroke: "none", "fill": sol_pyrami_base_color } )
			polygone.toBack();
		}
		else
		{
			let style = 
			{
					stroke: sol_pyrami_base_color,
					"stroke-width": sol_pyrami_base_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_pyrami_base_style,
			}

			let ida = 1;
			let idb = sol_pyrami_F - 1
			let op1 = circlepoints[0];
			let op2 = circlepoints[1];
			let dx = (op1.y - op2.y) / length(op1, op2);
			let dy = -(op1.x - op2.x) / length(op1, op2);
			var count = 0;
			let space = 4.0;
			while (ida != idb && count < 500)
			{
				var line = draw_line(paper, op1.x, op1.y, op2.x, op2.y)
				line.attr(style)
				line.toBack();

				let np1 = {
					x: op1.x + dx * sol_pyrami_base_stroke * space, 
					y: op1.y + dy * sol_pyrami_base_stroke * space}
				let np2 = {
					x: op2.x + dx * sol_pyrami_base_stroke * space, 
					y: op2.y + dy * sol_pyrami_base_stroke * space}

				op1 = line_intersection(np1, np2, circlepoints[idb],circlepoints[(idb + 1) % sol_pyrami_F])
				while(idb != ida && !point_between(circlepoints[idb],circlepoints[(idb + 1) % sol_pyrami_F], op1))
				{
					idb -= 1;
					op1 = line_intersection(np1, np2, circlepoints[idb],circlepoints[(idb + 1) % sol_pyrami_F])
				}
				op2 = line_intersection(np1, np2, circlepoints[ida],circlepoints[(ida + 1) % sol_pyrami_F])
				while(idb != ida && !point_between(circlepoints[ida],circlepoints[(ida + 1) % sol_pyrami_F], op2))
				{
					ida += 1;
					op2 = line_intersection(np1, np2, circlepoints[ida],circlepoints[(ida + 1) % sol_pyrami_F])
				}


				count += 1;
			}
		}
	}

	
	return [Canvas_width, Canvas_height]
}

function Solide_Cone(paper, data)
{
	let objects = data["objects"];

	let sol_cone_R = data["sol_cone_R"]
	let sol_cone_H = data["sol_cone_H"]
	let sol_cone_line_stroke = data["sol_cone_line_stroke"]
	let sol_cone_line_color = data["sol_cone_line_color"]
	let sol_cone_show_hide = data["sol_cone_show_hide"]
	let sol_cone_hide_style = data["sol_cone_hide_style"]
	let sol_cone_hide_color = data["sol_cone_hide_color"]
	let sol_cone_hide_stroke = data["sol_cone_hide_stroke"]
	let sol_cone_fill = data["sol_cone_fill"]
	let sol_cone_fill_shadow = data["sol_cone_fill_shadow"]
	let sol_cone_fill_color = data["sol_cone_fill_color"]
	let sol_cone_fill_color_alpha = data["sol_cone_fill_color_alpha"]
	let sol_cone_fill_base = data["sol_cone_fill_base"]
	let sol_cone_base_full = data["sol_cone_base_full"]
	let sol_cone_base_stroke = data["sol_cone_base_stroke"]
	let sol_cone_base_color = data["sol_cone_base_color"]
	let sol_cone_base_style = data["sol_cone_base_style"]
	let sol_cone_h = data["sol_cone_h"]
	let sol_cone_h_stroke = data["sol_cone_h_stroke"]
	let sol_cone_h_color = data["sol_cone_h_color"]
	let sol_cone_h_style = data["sol_cone_h_style"]
	let sol_cone_r = data["sol_cone_r"]
	let sol_cone_r_stroke = data["sol_cone_r_stroke"]
	let sol_cone_r_color = data["sol_cone_r_color"]
	let sol_cone_r_style = data["sol_cone_r_style"]
	let sol_cone_ag = data["sol_cone_ag"]
	let sol_cone_ag_stroke = data["sol_cone_ag_stroke"]
	let sol_cone_ag_full = data["sol_cone_ag_full"]
	let sol_cone_ag_color = data["sol_cone_ag_color"]
	let sol_cone_ag_style = data["sol_cone_ag_style"]

	let ry = Math.floor(sol_cone_R / 3.0);

	Canvas_width = Gen_Margin * 2 + sol_cone_R * 2;
	Canvas_height = Gen_Margin * 2 + sol_cone_H + ry;
	
	paper.setSize(Canvas_width, Canvas_height);
	paper.clear();

	let c = {x: Canvas_width / 2, y: Gen_Margin + sol_cone_H}


	let style = 
	{
			stroke: sol_cone_line_color,
			"stroke-width": sol_cone_line_stroke,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
	}
	// Calcul des points de tangence à l'ellipse
	let y = - ry * ry / sol_cone_H;
	let x = sol_cone_R * Math.sqrt(1 - ry * ry / (sol_cone_H * sol_cone_H))
	let line = draw_line(paper, c.x + x, c.y + y, c.x, c.y - sol_cone_H)
	line.attr(style)
	line = draw_line(paper, c.x - x, c.y + y, c.x, c.y - sol_cone_H)
	line.attr(style)

	let txt = "M" + (c.x+x).toString() + " " + (c.y + y).toString() + " A ";
	txt += sol_cone_R + " " + ry.toString() + " 0 1 1 " + (c.x-x).toString();
	txt += " " + (c.y + y).toString();
	let ell = paper.path(txt);
	ell.attr(style);


	if (sol_cone_fill)
	{
		let path = "M" + (c.x+x).toString() + " " + (c.y + y).toString()
		path += " A " +sol_cone_R + " " + ry.toString() + " 0 1 1 " + (c.x-x).toString() + " " + (c.y + y).toString()
		path += " L " + (c.x).toString() + "," + (c.y - sol_cone_H).toString();
		path += "Z"
		let front_face = paper.path(path);
		if (sol_cone_fill_shadow)
		{
			let c1 = pSBC(-0.8, sol_cone_fill_color);
			let grad = "0-" + c1 + "-" + sol_cone_fill_color + "-" + c1;
			front_face.attr( { stroke: "none", "fill": grad, 
			"opacity": sol_cone_fill_color_alpha } )
			
		}
		else
			front_face.attr( {"title":"test", stroke: "none", "fill": sol_cone_fill_color, "opacity": sol_cone_fill_color_alpha } )

		front_face.toBack();
		// Hack pour rendre le remplissage bien transparent (non implémenté dans Raphaël.js)
		document.getElementById("preview").getElementsByTagName("path")[0].setAttribute("style", "opacity:" + sol_cone_fill_color_alpha.toString())
	}

	if (sol_cone_h)
	{
		
		let line = draw_line(paper, c.x, c.y, c.x, c.y - sol_cone_H)
		line.attr({
				stroke: sol_cone_h_color,
				"stroke-width": sol_cone_h_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cone_h_style,
		})
		line.toBack();
	}
	if (sol_cone_r)
	{
		let x = c.x + sol_cone_R * Math.cos(Math.PI / 4.0)
		let y = c.y + ry * Math.sin(Math.PI / 4.0)
		let line = draw_line(paper, c.x, c.y, x, y)
		line.attr({
				stroke: sol_cone_r_color,
				"stroke-width": sol_cone_r_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cone_r_style,
		})
		line.toBack()
	}
	if (sol_cone_ag)
	{
		let style = {
				stroke: sol_cone_ag_color,
				"stroke-width": sol_cone_ag_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cone_ag_style,
		}
		let x = sol_cone_R * Math.cos(Math.PI / 4.0)
		let y = ry * Math.sin(Math.PI / 4.0)
		let coef = Math.sqrt(x*x + y*y);
		let p1 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef}
		let p2 = {x: c.x + 20 * x / coef, y: c.y + 20 * y /coef-20}
		let p3 = {x: c.x , y: c.y -20}
		if (sol_cone_ag_full)
		{
			let poly = draw_polygone(paper, [p1,p2,p3,c])
			poly.attr({ stroke: "none", "fill": sol_cone_ag_color })
			poly.toBack();
		}
		else
		{
			let line = draw_line(paper, p1.x, p1.y, p2.x, p2.y)
			line.attr(style)
			line.toBack()
			line = draw_line(paper, p3.x, p3.y, p2.x, p2.y)
			line.attr(style)
			line.toBack()
		}
	}


	if (sol_cone_show_hide)
	{
		let arc2 = draw_ellipse_arc(paper, c, 180, 360, sol_cone_R, ry, false)
		arc2.attr({
				stroke: sol_cone_hide_color,
				"stroke-width": sol_cone_hide_stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-dasharray": sol_cone_hide_style,
			})
			arc2.toBack();
	}

	if (sol_cone_fill_base)
	{
		if (sol_cone_base_full)
		{
			let ellipse = paper.ellipse(c.x, c.y, sol_cone_R, ry)
			ellipse.attr({ stroke: "none", "fill": sol_cone_base_color })
			ellipse.toBack();
		}
		else
		{
			let style = 
			{
					stroke: sol_cone_base_color,
					"stroke-width": sol_cone_base_stroke,
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": sol_cone_base_style,
			}

			let dt = 0;
			let count = 0;
			let b = Gen_Margin * 2 + sol_cone_H;

			let sr1 = sol_cone_R * sol_cone_R;
			let sr2 = ry * ry;

			let db = sol_cone_base_stroke * 4.0 * Math.SQRT2;

			while (dt < Canvas_width && count < 500)
			{

				let A = 2.0 * (sr2 + sr1)
				let B = -2*(c.x * sr2 + sr1*(b - c.y))
				let C = sr2*c.x*c.x+sr1*(b - c.y)*(b-c.y) - sr1*sr2;

				let delta = B*B - 2*A*C;
				if (delta > 0)
				{
					let x1 = (-B + Math.sqrt(delta)) / A;
					let x2 = (-B - Math.sqrt(delta)) / A;
					let y1 = b - x1;
					let y2 = b - x2;
					let line = draw_line(paper, x1, y1, x2, y2)
					line.attr(style)
					line.toBack();
				}

				b += db;
				dt += db * Math.SQRT1_2;

				count += 1;
			}
		}
	}


	
	return [Canvas_width, Canvas_height]
}

function Solide_Sphere(paper, data)
{

}

}

{ //TOOLS

function draw_line(paper, sx, sy, ex, ey)
{
	return paper.path("M" + sx + " " + sy + "L" + ex + " " + ey);
}

function draw_polygone(paper, points, close = true)
{
	let txt = "M" + points[0].x + " " + points[0].y;
	for(let i = 1; i < points.length; i++){
		txt += "L" + points[i].x + " " + points[i].y;
	}
	if (close)
		return paper.path(txt + "Z");
	else
		return paper.path(txt);
}

function Round(value, decimal = 0)
{
	return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
}

function draw_ellipse_arc(paper, center, stara, enda, rx, ry, close = true)
{
	let sx = Round(center.x + rx * Math.cos(stara * Math.PI / 180.0),3);
	let sy = Round(center.y + ry * Math.sin(stara * Math.PI / 180.0),3);

	let ex = Round(center.x + rx * Math.cos(enda * Math.PI / 180.0),3);
	let ey = Round(center.y + ry * Math.sin(enda * Math.PI / 180.0),3);

	let txt = "M" + sx + " " + sy + " A ";
	txt += Round(rx,3) + " " + Round(ry,3) + " 0 ";
	if (Math.abs(enda - stara) < 360)
	{
		if (Math.abs(enda - stara) > 180)
			txt += "1 "
		else
			txt += "0 "
		if (enda < stara)
			txt += "0 "
		else
			txt += "1 " 
		
		txt += ex + " " + ey
		if (close)
		{
			txt += "L" + center.x + " " + center.y;
			return paper.path(txt + "Z");
		}
		else
			return paper.path(txt);
	}
	else
	{
		return paper.ellipse(center.x, center.y, rx, ry);
	}
}

function get_ellipse_arc(cx, cy, stara, enda, rx, ry, close = true)
{
	let sx = Round(cx + rx * Math.cos(stara * Math.PI / 180.0),3);
	let sy = Round(cy + ry * Math.sin(stara * Math.PI / 180.0),3);

	let ex = Round(cx + rx * Math.cos(enda * Math.PI / 180.0),3);
	let ey = Round(cy + ry * Math.sin(enda * Math.PI / 180.0),3);

	let txt = " A ";
	txt += Round(rx,3) + " " + Round(ry	,3) + " 0 ";
	if (Math.abs(enda - stara) < 360)
	{
		if (Math.abs(enda - stara) > 180)
			txt += "1 "
		else
			txt += "0 "
		if (enda < stara)
			txt += "0 "
		else
			txt += "1 " 
		txt += ex + " " + ey
		console.log(cx)
		if (close)
		{
			txt += "L" + cx + " " + cy;
			return txt + "Z";
		}
		else
			return txt;
	}
	return "";
}

function draw_fleche(type = 0, px, py, dx, dy, size)
{
	dx = dx - px;
	dy = dy - py;
	let l = Math.sqrt(dx * dx + dy * dy);
	let vx = dx / l;
	let vy = dy / l;
	let nx = -vy;
	let ny = vx;
	let c = size / 10.0;
	let p1; let p2; let p3; let p4;
	switch (type) {
		case 1:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3], false);
		case 2:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3], true);
		case 3:
			p1 = {x: px + (vx + nx * 0.5) * c,y: py + (vy + ny * 0.5) * c};
			p2 = {x: px,y: py};
			p3 = {x: px + (vx - nx * 0.5) * c,y: py + (vy - ny * 0.5) * c};
			p4 = {x: px + (vx * 0.5) * c,y: py + (vy * 0.5) * c};
			return draw_polygone(paper, [p1,p2,p3,p4], true);
		case 4:
			p1 = {x: px + nx * c,y: py + ny * c};
			p2 = {x: px - nx * c,y: py - ny * c};
			return draw_line(paper, p1.x, p1.y, p2.x, p2.y);
		case 5:
			p1 = {x: px,y: py};
			return draw_ellipse_arc(paper, p1, 0, 360, c, c, true);
		default:
			break;
	}
}

function line_intersection(p1,p2,p3,p4)
{
	let a1 = (p1.y - p2.y) / (p1.x - p2.x);
	let b1 = p1.y - a1 * p1.x ;
	let a2 = (p3.y - p4.y) / (p3.x - p4.x);
	let b2 = p3.y - a2 * p3.x ;
	if (Math.abs(p1.x - p2.x) <= 0.001)
	{
		return {x: p1.x, y: a2 * p1.x + b2};
	}
	else if (Math.abs(p3.x - p4.x) <= 0.001)
	{
		return {x: p3.x, y: a1 * p3.x + b1};
	}
	let x = (b2 - b1)/(a1-a2);
	let y = a1 * x + b1
	return {x: x, y: y};
}

function point_between(p1, p2, p)
{
	if (p.x < Math.min(p1.x, p2.x) - 0.01) return false;
	if (p.x > Math.max(p1.x, p2.x) + 0.01) return false;
	if (p.y < Math.min(p1.y, p2.y) - 0.01) return false;
	if (p.y > Math.max(p1.y, p2.y) + 0.01) return false;
	return true;
}

function length(p1, p2)
{
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

}

