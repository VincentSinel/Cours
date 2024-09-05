function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}

class Balance
{
    static Width = 360;
    static Height = 360;

    static instance;
    static #TotalTime = 0
    static #DepartTime = 0
    static #TempsPrecedent = 0;
    static imagetoload = 7;
    static StartMainLoop()
    {
        Balance.instance = new Balance();
        Balance.instance.Init();
        window.onresize = function() { Balance.instance.Resize()}
        window.requestAnimationFrame(Balance.MainLoop);
    }

    static MainLoop()
    {
        let now = Date.now();
        let dt = (now - Balance.#TempsPrecedent) / 1000.0;
        Balance.#TotalTime = (now - Balance.#DepartTime) / 1000.0;

        Balance.instance.Update(dt);
        Balance.instance.Draw();

        Balance.#TempsPrecedent = now;
        window.requestAnimationFrame(Balance.MainLoop);
    }

    canvas;
    ctx;
    angle = 0;
    angle_power = 0.1;
    angle_target = 0;
    draw_coef = 1.0;

    Equation = new Equation();

    Folder = "/Cours/4eme/Chapitre_13/Images/"
    Images = { }

    Resize()
    {
        let w = this.canvas.parentElement.offsetWidth;
        this.canvas.width = w;
        this.canvas.height = w * 0.61;
    }

    Init()
    {
        this.canvas = document.getElementById("balance_canvas");
        this.Resize()
        this.ctx = this.canvas.getContext("2d");

        //this.canvas.parentElement.parentElement.style.maxWidth = this.canvas.width + "px";

        this.Images.pied = new Image();
        this.Images.plateau = new Image();
        this.Images.balancier = new Image();
        this.Images.pcn = new Image();
        this.Images.pcp = new Image();
        this.Images.pvn = new Image();
        this.Images.pvp = new Image();

        this.Images.pied.src = this.Folder + "Pied.png"
        this.Images.plateau.src = this.Folder + "Plateau.png"
        this.Images.balancier.src = this.Folder + "Balancier.png"
        this.Images.pcn.src = this.Folder + "Poids_constante_négatif.png"
        this.Images.pcp.src = this.Folder + "Poids_constante_positif.png"
        this.Images.pvn.src = this.Folder + "Poids_variable_négatif.png"
        this.Images.pvp.src = this.Folder + "Poids_variable_positif.png"

        this.Images.pied.onload = function() { Balance.imagetoload -= 1; }
        this.Images.plateau.onload = function() { Balance.imagetoload -= 1; }
        this.Images.balancier.onload = function() { Balance.imagetoload -= 1; }
        this.Images.pcn.onload = function() { Balance.imagetoload -= 1; }
        this.Images.pcp.onload = function() { Balance.imagetoload -= 1; }
        this.Images.pvn.onload = function() { Balance.imagetoload -= 1; }
        this.Images.pvp.onload = function() { Balance.imagetoload -= 1; }
    }

    CreateEquation()
    {
        let x1num = document.getElementById("x1num").value
        let x1den = document.getElementById("x1den").value
        let c1num = document.getElementById("c1num").value
        let c1den = document.getElementById("c1den").value
        let x2num = document.getElementById("x2num").value
        let x2den = document.getElementById("x2den").value
        let c2num = document.getElementById("c2num").value
        let c2den = document.getElementById("c2den").value

        this.Equation.Generate(x1num, x1den, c1num, c1den, x2num, x2den, c2num, c2den);
    }

    AddToEquation(position)
    {
        let a = document.getElementById("anum").value
        if (a != 0)
        {
            let b = document.getElementById("aden").value
            let p = new Poids(a, b, document.getElementById("Balance_add_unknow").checked);
            if (position < 2)
                this.Equation.Part1.push(p);
            if (position > 0)
                this.Equation.Part2.push(p.clone());
        }
    }
    MultiplyEquation()
    {
        let a = document.getElementById("coefnum").value
        let b = document.getElementById("coefden").value
        this.Equation.multiply(a, b)
    }
    DivideEquation()
    {
        let a = document.getElementById("coefnum").value
        let b = document.getElementById("coefden").value
        this.Equation.divide(a, b)
    }
    Regroupe()
    {
        this.Equation.Regroupe();
    }


    Update(dt)
    {
        if (this.Equation.Is_Equal())
            this.angle_target = 0;
        else
        {
            let a = this.Equation.Get_Approx_Weight1()
            let b = this.Equation.Get_Approx_Weight2()
            let dp = (b - a) / 5;
            let max = Math.PI / 180 * 12;
            if (dp < 0)
                this.angle_target = -max + max * Math.exp(dp);
            else
                this.angle_target = max - max * Math.exp(-dp);
        }
        this.angle = (this.angle_target + this.angle * 1 / this.angle_power) / (1 + 1 / this.angle_power)
    }

    Draw()
    {
        this.ctx.fillStyle = "lightgray"
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        if (Balance.imagetoload == 0)
        {
            this.draw_coef = this.ctx.canvas.width * 0.66 / this.Images.pied.width
            this.Draw_pied(this.ctx)
            this.Draw_balancier(this.ctx)
            this.Draw_plateau(this.ctx, 0)
            this.Draw_plateau(this.ctx, 1)
        }
    }

    Draw_pied(ctx)
    {
        let w = this.draw_coef * this.Images.pied.width;
        let h = this.draw_coef * this.Images.pied.height;
        ctx.drawImage(this.Images.pied, 
            ctx.canvas.width / 2 - w / 2,
            ctx.canvas.height * 2 / 3 - 40 * this.draw_coef,
            w, h)
    }

    Draw_balancier(ctx)
    {
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height * 2 / 3);
        ctx.rotate(this.angle)
        let w = this.draw_coef * this.Images.balancier.width;
        let h = this.draw_coef * this.Images.balancier.height;
        ctx.drawImage(this.Images.balancier, 
            -w / 2,
            -508 * this.draw_coef,
            w, h)
        ctx.restore();
    }

    Draw_plateau(ctx, id)
    {
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height * 2 / 3);
        ctx.rotate(this.angle)
        ctx.translate( (id == 0 ? -742 : 742) * this.draw_coef, -22 * this.draw_coef)
        ctx.rotate(-this.angle)
        let w = this.draw_coef * this.Images.plateau.width;
        let h = this.draw_coef * this.Images.plateau.height;
        ctx.translate( -w / 2, -213 * this.draw_coef)
        ctx.drawImage(this.Images.plateau, 0, 0, w, h)
        this.Draw_plateau_content(ctx, id == 0 ? this.Equation.Part1 : this.Equation.Part2);
        ctx.restore();
    }

    Draw_plateau_content(ctx, content)
    {
        let w = this.draw_coef * this.Images.plateau.width;
        let dx = w / content.length;
        w = this.draw_coef * this.Images.pcn.width;
        let h = this.draw_coef * this.Images.pcn.height;
        ctx.translate( (dx - w) / 2, 0)
        for (let i = 0; i < content.length; i++) {
            const poid = content[i];
            ctx.save()
            ctx.translate( dx*i, -h)
            if (poid.Unknow)
            {
                if (poid.PoidNum >= 0)
                {
                    ctx.drawImage(this.Images.pvp, 0, 0, w, h)
                    ctx.translate(0, h / 4.0)
                    poid.Draw_text(ctx, w, h * 0.75)
                }
                else
                {
                    ctx.drawImage(this.Images.pvn, 0, 0, w, h)
                    poid.Draw_text(ctx, w, h * 0.75)
                }
            }
            else
            {
                if (poid.PoidNum >= 0)
                {
                    ctx.drawImage(this.Images.pcp, 0, 0, w, h)
                    ctx.translate(0, h / 4.0)
                    poid.Draw_text(ctx, w, h * 0.75)
                }
                else
                {
                    ctx.drawImage(this.Images.pcn, 0, 0, w, h)
                    poid.Draw_text(ctx, w, h * 0.75)
                }
            }
            ctx.restore()
        }
    }

}


class Equation
{
    Part1 = [];
    Part2 = [];

    Unknow_realvalue = new Poids(0, 1, false);

    Generate(_x1num, _x1den, _c1num, _c1den, _x2num, _x2den, _c2num, _c2den)
    {
        this.Part1 = [];
        this.Part2 = [];
        if (_x1num != 0)
            this.Part1.push(new Poids(_x1num, _x1den, true));
        if (_c1num != 0 || _x1num == 0)
            this.Part1.push(new Poids(_c1num, _c1den, false));
        if (_x2num != 0)
            this.Part2.push(new Poids(_x2num, _x2den, true));
        if (_c2num != 0 || _x2num == 0)
            this.Part2.push(new Poids(_c2num, _c2den, false));
        this.CalculateUnknow()
    }

    CalculateUnknow()
    {
        let pc = new Poids(0, 1, false)
        let px = new Poids(0, 1, true)
        this.Part1.forEach(poid => {
            if (poid.Unknow)
                px.add(poid.PoidNum, poid.PoidDen)
            else
                pc.remove(poid.PoidNum, poid.PoidDen)
        });
        this.Part2.forEach(poid => {
            if (poid.Unknow)
                px.remove(poid.PoidNum, poid.PoidDen)
            else
                pc.add(poid.PoidNum, poid.PoidDen)
        });
        pc.divide(px.PoidNum, px.PoidDen);
        this.Unknow_realvalue = pc;
    }

    Get_Total(_part)
    {
        let p = new Poids(0, 1)
        _part.forEach(poid => {
            if (poid.Unknow)
                p.add(
                    poid.PoidNum * this.Unknow_realvalue.PoidNum, 
                    poid.PoidDen * this.Unknow_realvalue.PoidDen)
            else
                p.add(poid.PoidNum, poid.PoidDen)
        });
        return p;
    }

    Get_Approx_Weight1()
    {
        let p = this.Get_Total(this.Part1)
        return p.PoidNum / (p.PoidDen * 1.0)
    }

    Get_Approx_Weight2()
    {
        let p = this.Get_Total(this.Part2)
        return p.PoidNum / (p.PoidDen * 1.0)
    }

    Is_Equal()
    {
        let p1 = this.Get_Total(this.Part1)
        let p2 = this.Get_Total(this.Part2)
        return p1.PoidNum == p2.PoidNum && p1.PoidDen == p2.PoidDen;
    }

    Regroupe()
    {
        this.Part1 = this.#Regroupe(this.Part1);
        this.Part2 = this.#Regroupe(this.Part2);
    }

    #Regroupe(_part)
    {
        let px = new Poids(0, 1, true)
        let pc = new Poids(0, 1, false)
        _part.forEach(poid => {
            if (poid.Unknow)
                px.add(poid.PoidNum, poid.PoidDen)
            else
                pc.add(poid.PoidNum, poid.PoidDen)
        });
        if (px.PoidNum != 0 && pc.PoidNum != 0)
            return [px, pc];
        else if (px.PoidNum != 0)
            return [px];
        else
            return [pc];
    }

    multiply(num, den)
    {
        if (num == 0)
            return;
        this.Part1.forEach(poid => {
            poid.multiply(num, den)
        });
        this.Part2.forEach(poid => {
            poid.multiply(num, den)
        });
    }
    divide(num, den)
    {
        if (num == 0)
            return;
        this.Part1.forEach(poid => {
            poid.divide(num, den)
        });
        this.Part2.forEach(poid => {
            poid.divide(num, den)
        });
    }
}

class Poids
{
    PoidNum = 1.0;
    PoidDen = 1.0;
    Unknow = false;
    
    Get_Poid()
    {
        return PoidNum / PoidDen;
    }

    is_zero()
    {
        return this.PoidNum == 0;
    }

    clone()
    {
        let p = new Poids(this.PoidNum, this.PoidDen, this.Unknow);
        return p;
    }

    constructor(_poidnum, _poidden, _unknow = false)
    {
        this.PoidNum = _poidnum;
        this.PoidDen = _poidden;
        this.Unknow = _unknow;
        this.simplify();
    }

    add(_poidnum, _poidden)
    {
        this.PoidNum = this.PoidNum * _poidden + _poidnum * this.PoidDen;
        this.PoidDen = this.PoidDen * _poidden;
        this.simplify();
    }
    remove(_poidnum, _poidden)
    {
        this.add(-_poidnum, _poidden);
    }
    multiply(_coefnum, _coefden)
    {
        this.PoidNum *= _coefnum;
        this.PoidDen *= _coefden;
        this.simplify()
    }
    divide(_coefnum, _coefden)
    {
        this.multiply(_coefden, _coefnum)
    }


    simplify()
    {
        if (isNaN(this.PoidNum) )
            console.trace()
        let pgcd = this.PGCD(Math.abs(this.PoidNum), Math.abs(this.PoidDen));
        this.PoidNum /= pgcd;
        this.PoidDen /= pgcd;

        if (this.PoidDen < 0)
        {
            this.PoidNum *= -1;
            this.PoidDen *= -1;
        }
    }

    PGCD(_a, _b)
    {
        if (_b == 0)
            return _a;
        return this.PGCD(_b, _a % _b);
    }
    
    Draw_text(ctx, w, h)
    {
        let c = Balance.instance.draw_coef;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font =  Math.round(c * 120) + "px serif";
        if (this.PoidDen > 1)
        {
            if (this.Unknow)
            {
                ctx.font =  Math.round(c * 110) + "px serif";
                let a = ctx.measureText("x").width + 2;
                ctx.fillText(this.PoidNum, (w-a) / 2, h / 2 - 11)
                ctx.fillText(this.PoidDen, (w-a) / 2, h / 2 + 11)
                ctx.beginPath()
                ctx.moveTo(1, h / 2);
                ctx.lineTo(w - a, h / 2);
                ctx.stroke();
                ctx.fillText("x", w - a / 2, h / 2)
            }
            else
            {
                ctx.fillText(this.PoidNum, w / 2, h / 2 - 11)
                ctx.fillText(this.PoidDen, w / 2, h / 2 + 11)
                ctx.beginPath()
                ctx.moveTo(w/2 - 10, h / 2);
                ctx.lineTo(w/2 + 10, h / 2);
                ctx.stroke();
            }
        }
        else
        {
            if (this.Unknow)
                if (this.PoidNum == 1)
                    ctx.fillText("x", w / 2, h / 2)
                else
                    ctx.fillText(this.PoidNum + "x", w / 2, h / 2)
            else
                ctx.fillText(this.PoidNum, w / 2, h / 2)
        }
    }
}


Balance.StartMainLoop();
