class Anim_Compas
{
    Parent;
    BaseValue;

    get Content() {
        return this.Parent.Content;
    }


    pinLength = 5;
    drawLength = 7;
    armWidth = 5;
    headSize1 = 5
    headSize2 = 7
    head_d1 = 10
    head_d2 = 10

    P1 = {x: 0,y: 0};
    P2 = {x: 0,y: 0};
    P3 = {x: 0,y: 0};
    Ang = 0;

    Arms_Pin;
    Arms_Pen;
    Pen;
    Head;
    Arcs = [];

    constructor(parent)
    {
        this.Parent = parent;
        this.Init();
        this.Create(this.BaseValue);
    }


    GetLength(p1, p2)
    {
        return Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        )
    }

    Init()
    {
    
        this.P1 = {x: 0,y: 0};
        this.P2 = {x: 0,y: 0};
        this.P3 = {x: 0, y: 0};
        this.Delta = {x: 0, y: 0};
        this.pinLength = 5;
        this.drawLength = 7;
        this.armWidth = 5;
        this.headSize1 = 10
        this.headSize2 = 18
        this.head_d1 = 10
        this.head_d2 = 5
    
        this.Arcs = [];

        this.BaseValue = {
            "p1": {x: 150,y: 150},
            "p2": {x: 200,y: 150},
            "dangle": 0,
            "minsize": 100,
            "maxangle": 160,
            "position": 0, // Can be 1 or 0
        }

        this.Arms_Style = {fill: '#D4D3D0' ,'fill-opacity': 1.0 ,stroke: '#000' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'}
        this.Head_Style = {fill: "#2B4B48" ,'fill-opacity': 1.0 ,stroke: '#000' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'}
        this.Pen_Style = {fill: "#555555" ,'fill-opacity': 1.0 ,stroke: '#000' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'}
        this.Draw_Style = {fill: "none", stroke: '#555', width: 1, linecap: 'round', linejoin: 'round'}
        
    }

    Create(parameters)
    {
        this.UpdatePoints(parameters)
        let pen = this._GetArms_Path()
        
        this.Arms_Pin = this.Content.path(this._GetPointe_Path())
        this.Arms_Pin.attr(this.Arms_Style)
        
        this.Arms_Pen = this.Content.path(pen[0])
        this.Arms_Pen.attr(this.Arms_Style)
        
        this.Pen = this.Content.path(pen[1])
        this.Pen.attr(this.Pen_Style)

        this.Head = this.Content.path(this._GetHead_Path());
        this.Head.attr(this.Head_Style)
    }

    attr(parameters)
    {
        for (const key in this.BaseValue) 
        { parameters[key] = parameters[key] || this.BaseValue[key] }

        this.UpdatePoints(parameters)
        let pen = this._GetArms_Path()
        
        this.Arms_Pin.plot(this._GetPointe_Path())
        if (parameters.hasOwnProperty("arms"))
            this.Arms_Pin.attr(parameters["arms"])
        this.Arms_Pen.plot(pen[0])
        if (parameters.hasOwnProperty("arms"))
            this.Arms_Pen.attr(parameters["arms"])
        this.Pen.plot(pen[1])
        if (parameters.hasOwnProperty("pen"))
            this.Pen.attr(parameters["pen"])
        this.Head.plot(this._GetHead_Path())
        if (parameters.hasOwnProperty("head"))
            this.Head.attr(parameters["head"])
    }

    AddAnimation(parameters, delay, duration, easy = "<>")
    {
        for (const key in this.BaseValue) 
        { parameters[key] = parameters[key] || this.BaseValue[key] }

        this.UpdatePoints(parameters)
        let pen = this._GetArms_Path()

        let param = {plot: this._GetPointe_Path()}
        if (parameters.hasOwnProperty("arms"))
            param.attr = parameters["arms"]
        this.Parent.AddAnimation(this.Arms_Pin, param, delay, duration, easy);

        param.plot = pen[0]
        this.Parent.AddAnimation(this.Arms_Pen, param, delay, duration, easy);

        param = {plot: pen[1]}
        if (parameters.hasOwnProperty("pen"))
            param.attr = parameters["pen"]
        this.Parent.AddAnimation(this.Pen, param, delay, duration, easy);

        param = {plot: this._GetHead_Path()}
        if (parameters.hasOwnProperty("head"))
            param.attr = parameters["head"]
        this.Parent.AddAnimation(this.Head, param, delay, duration, easy);
    }

    Rotate(Angle, delay, duration, easy = "-")
    {
        this._rotation(Angle, false, delay, duration, easy)
    }

    Draw(Angle, delay, duration, easy = undefined)
    {
        this._rotation(Angle, true, delay, duration, easy)
    }

    _rotation(Angle, draw, delay, duration, easy)
    {
        let param = {transform: {'rotate': Angle, 'originX': this.P1.x, 'originY': this.P1.y}}
        this.Parent.AddAnimation(this.Arms_Pin, param, delay, duration-1, easy);
        this.Parent.AddAnimation(this.Arms_Pen, param, delay, duration-1, easy);
        this.Parent.AddAnimation(this.Pen, param, delay, duration-1, easy);
        this.Parent.AddAnimation(this.Head, param, delay, duration-1, easy);

        param = {transform: {a:1,b:0,c:0,d:1,e:0,f:0}}
        let c = Math.cos(Angle / 180.0 * Math.PI)
        let s = Math.sin(Angle / 180.0 * Math.PI)
        let old_p2 = {x: this.P2.x, y: this.P2.y};
        this.P2.x = this.P2.x - this.P1.x
        this.P2.y = this.P2.y - this.P1.y
        let parameters = {
            "p1": this.P1,
            "p2": {
                x: this.P1.x + this.P2.x * c - this.P2.y * s,
                y: this.P1.y + this.P2.x * s + this.P2.y * c,
            }
        }
        for (const key in this.BaseValue) 
        { parameters[key] = parameters[key] || this.BaseValue[key] }
        this.UpdatePoints(parameters)
        let pen = this._GetArms_Path()
        let transform = {'rotate': -Angle, 'originX': this.P1.x, 'originY': this.P1.y}
        this.Parent.AddAnimation(this.Arms_Pin, {transform: transform, plot: this._GetPointe_Path()}, delay + duration - 1, 1, easy);
        this.Parent.AddAnimation(this.Arms_Pen, {transform: transform, plot: pen[0]}, delay + duration - 1, 1, easy);
        this.Parent.AddAnimation(this.Pen, {transform: transform, plot: pen[1]}, delay + duration - 1, 1, easy);
        this.Parent.AddAnimation(this.Head, {transform: transform, plot: this._GetHead_Path()}, delay + duration - 1, 1, easy);
    
        if (!draw) return;

        
        let total = Math.abs(Math.floor(Angle * this.GetLength(this.P1, this.P2) / 200))
        let lastpoint = old_p2;
        let dp2x = old_p2.x - this.P1.x;
        let dp2y = old_p2.y - this.P1.y;
        let dduration = duration / total;
        for (let i = 0; i < total; i++) 
        {
            let coef = 0.5-Math.cos((i + 1)/total * Math.PI) / 2
            let ang = coef * Angle / 180.0 * Math.PI
            let c = Math.cos(ang)
            let s = Math.sin(ang)
            let p = {
                x: this.P1.x + dp2x * c - dp2y * s,
                y: this.P1.y + dp2x * s + dp2y * c,
            }
            let l = this.Content.line(lastpoint.x, lastpoint.y,p.x, p.y);
            l.attr(this.Draw_Style).back()
            l.attr({'stroke-opacity': 0})
            lastpoint = p;
            this.Parent.AddAnimation(l, {attr: {'stroke-opacity': 1.0}},delay + dduration * i, dduration, easy);
        }
    }
    // this.Content.circle(2).center(parameters["p2"].x, parameters["p2"].y).fill("red")


    _GetDraw_Arc(ps, pe, center, angle, flip = false)
    {
        let r = this.GetLength(center, ps);
        let sa = Math.atan2(ps.y - center.y, ps.x - center.x);
        let ea = Math.atan2(pe.y - center.y, pe.x - center.x);
    
        let txt = "M" + ps.x + " " + ps.y + " A ";
        txt += r + " " + r + " 0 ";
        if (angle < 360)
        {
            if (angle > 180)
                txt += "1 "
            else
                txt += "0 "
            if (flip)
            {
                if ((angle > 0 && ea < sa) || (angle < 0 && ea > sa))
                    txt += "1 "
                else
                    txt += "0 "
            }
            else
            {
                if ((angle > 0 && ea < sa) || (angle < 0 && ea > sa))
                    txt += "0 "
                else
                    txt += "1 "
            }
            let t1 = txt + ps.x + " " + ps.y;
            let t2 = txt + pe.x + " " + pe.y;
            return [t1, t2];
        }
        return "";
    }


    UpdatePoints(parameters)
    {
        let da = parameters["dangle"] * Math.PI / 180.0;
        this.P1 = parameters["p1"];
        let op2 = parameters["p2"];
        this.Ang = (Math.atan2(op2.y - this.P1.y, op2.x - this.P1.x) + da);
        let midlength = this.GetLength(this.P1, op2) / 2;

        this.P2.x = this.P1.x + midlength * 2 * Math.cos(this.Ang);
        this.P2.y = this.P1.y + midlength * 2 * Math.sin(this.Ang);

        let MS = parameters["minsize"];
        let MA = parameters["maxangle"] * Math.PI / 360.0;
        let Dir = parameters["position"];

        let maxlength = MS * Math.sin(MA);
        let midpoint = {
            x: (this.P1.x + this.P2.x) / 2,
            y: (this.P1.y + this.P2.y) / 2
        };

        let l = 0;
        if (midlength > maxlength)
            l = midlength * Math.tan(Math.PI / 2 - MA);
        else
        {
            l = Math.sqrt(MS * MS - midlength * midlength);
        }
        
        if (Dir == 1)
            l *= -1;
        this.Delta.x = Math.cos(Math.PI/2 + this.Ang);
        this.Delta.y = Math.sin(Math.PI/2 + this.Ang);
        this.P3.x = midpoint.x + l * this.Delta.x;
        this.P3.y = midpoint.y + l * this.Delta.y;

        this.Ang = this.Ang * 180.0 / Math.PI;
    }


    _GetPointe_Path()
    {
        let l = this.GetLength(this.P1, this.P3);
        let a = Math.atan2(this.P3.y - this.P1.y, this.P3.x - this.P1.x);
        let c1 = this.pinLength / l;
        let p1 = {
            x: this.P1.x * (1 - c1) + this.P3.x * c1,
            y: this.P1.y * (1 - c1) + this.P3.y * c1}
        let dx = this.armWidth / 2 * Math.cos(Math.PI/2 + a);
        let dy = this.armWidth / 2 * Math.sin(Math.PI/2 + a)
        let p2 = {x: p1.x + dx, y: p1.y + dy}
        let p3 = {x: this.P3.x + dx, y: this.P3.y + dy}
        let p4 = {x: this.P3.x - dx, y: this.P3.y - dy}
        let p5 = {x: p1.x - dx, y: p1.y - dy}

        return ['M',this.P1.x,this.P1.y,'L',p1.x,p1.y,'L',p2.x,p2.y,'L',p3.x,p3.y,'L',p4.x,p4.y,'L',p5.x,p5.y,'L',p1.x,p1.y,'Z'].join(' ');
    }

    _GetArms_Path()
    {
        let l = this.GetLength(this.P2, this.P3);
        let a = Math.atan2(this.P3.y - this.P2.y, this.P3.x - this.P2.x);
        let c1 = this.drawLength / l;
        let p1 = {
            x: this.P2.x * (1 - c1) + this.P3.x * c1,
            y: this.P2.y * (1 - c1) + this.P3.y * c1}
        let dx = this.armWidth / 2 * Math.cos(Math.PI/2 + a);
        let dy = this.armWidth / 2 * Math.sin(Math.PI/2 + a)
        let p2 = {x: p1.x + dx, y: p1.y + dy}
        let p3 = {x: this.P3.x + dx, y: this.P3.y + dy}
        let p4 = {x: this.P3.x - dx, y: this.P3.y - dy}
        let p5 = {x: p1.x - dx, y: p1.y - dy}
        
        let arm = ['M',p2.x,p2.y,'L',p3.x,p3.y,'L',p4.x,p4.y,'L',p5.x,p5.y,'Z'].join(' ');
        let pen = ['M',this.P2.x,this.P2.y,'L',p2.x,p2.y,'L',p5.x,p5.y,'Z'].join(' ');
        return [arm, pen];
    }

    _GetHead_Path()
    {
        let a = Math.atan2(this.P3.y - (this.P1.y + this.P2.y) / 2, this.P3.x - (this.P1.x + this.P2.x) / 2);
        

        let pc1 = {
            x: this.P3.x + this.headSize2 / 2 * this.Delta.x,
            y: this.P3.y + this.headSize2 / 2 * this.Delta.y,
        }
        let pc2 = {
            x: this.P3.x - this.headSize1 / 2 * this.Delta.x,
            y: this.P3.y - this.headSize1 / 2 * this.Delta.y,
        }
        let pc3 = {
            x: this.P3.x + this.headSize2 * 1.2 * this.Delta.x,
            y: this.P3.y + this.headSize2 * 1.2 * this.Delta.y,
        }
        
        let dx = this.headSize1 / 2 * Math.cos(Math.PI/2 + a);
        let dy = this.headSize1 / 2 * Math.sin(Math.PI/2 + a);

        let head = ["M"]
        head.push(pc1.x - dx)
        head.push(pc1.y - dy)
        head.push("L")
        head.push(pc1.x - dx * 0.5)
        head.push(pc1.y - dy * 0.5)
        head.push("L")
        head.push(pc3.x - dx * 0.5)
        head.push(pc3.y - dy * 0.5)
        head.push("L")
        head.push(pc3.x + dx * 0.5)
        head.push(pc3.y + dy * 0.5)
        head.push("L")
        head.push(pc1.x + dx * 0.5)
        head.push(pc1.y + dy * 0.5)
        head.push("L")
        head.push(pc1.x + dx)
        head.push(pc1.y + dy)
        head.push("L")
        head.push(pc2.x + dx)
        head.push(pc2.y + dy)
        head.push("L")
        head.push(pc2.x - dx)
        head.push(pc2.y - dy)
        head.push("Z")


        head = head.join(' ');
        return head;
    }
}