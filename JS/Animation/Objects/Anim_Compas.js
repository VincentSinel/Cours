class Anim_Compas extends Anim_Object
{
    mainColor = "#D4D3D0"
    teteColor = "#2B4B48"
    strokeWidth = 1;
    pinLength = 5;
    drawLength = 7;
    armWidth = 5;
    headSize1 = 5
    headSize2 = 7

    P1 = {x: 0,y: 0};
    P2 = {x: 0,y: 0};
    MS = 100;
    MA = 100;
    Dir = 0;
    Size = 1;
    Ang = 0;
    P3 = {x: 0, y: 0};

    DrawTO = null;
    draw = false;

    InitSpec()
    {
        this.KeyFramesDataType.AddParam("P1X", 0);
        this.KeyFramesDataType.AddParam("P1Y", 0);
        this.KeyFramesDataType.AddParam("P2X", 0);
        this.KeyFramesDataType.AddParam("P2Y", 0);
        this.KeyFramesDataType.AddParam("DAngle", 0);
        this.KeyFramesDataType.AddParam("MinSize", 100);
        this.KeyFramesDataType.AddParam("MaxAngle", 160);
        this.KeyFramesDataType.AddParam("Size", 1);
        this.KeyFramesDataType.AddParam("Position", 0, false);
        this.KeyFramesDataType.AddParam("Draw", 0, false);
        this.KeyFramesDataType.AddParam("DrawColorR", 0);
        this.KeyFramesDataType.AddParam("DrawColorG", 0);
        this.KeyFramesDataType.AddParam("DrawColorB", 0);
        this.KeyFramesDataType.AddParam("DrawColorA", 1);
        this.KeyFramesDataType.AddParam("DrawSize", 1);
    }

    GetLength(p1, p2)
    {
        return Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        )
    }

    Draw(Context)
    {
        let da = this.KeyFrameDataCurrent.Data["DAngle"] * Math.PI / 180.0;
        this.P1.x = this.KeyFrameDataCurrent.Data["P1X"];
        this.P1.y = this.KeyFrameDataCurrent.Data["P1Y"];
        let op2 = {
            x: this.KeyFrameDataCurrent.Data["P2X"],
            y: this.KeyFrameDataCurrent.Data["P2Y"]
        }
        this.Ang = (Math.atan2(op2.y - this.P1.y, op2.x - this.P1.x) + da);
        let midlength = this.GetLength(this.P1, op2) / 2;

        this.P2.x = this.P1.x + midlength * 2 * Math.cos(this.Ang);
        this.P2.y = this.P1.y + midlength * 2 * Math.sin(this.Ang);

        this.MS = this.KeyFrameDataCurrent.Data["MinSize"];
        this.MA = this.KeyFrameDataCurrent.Data["MaxAngle"] * Math.PI / 360.0;
        this.Dir = this.KeyFrameDataCurrent.Data["Position"];
        this.Size = this.KeyFrameDataCurrent.Data["Size"];

        let maxlength = this.MS * Math.sin(this.MA);
        let midpoint = {
            x: (this.P1.x + this.P2.x) / 2,
            y: (this.P1.y + this.P2.y) / 2
        };

        let l = 0;
        if (midlength > maxlength)
            l = midlength * Math.tan(Math.PI / 2 - this.MA);
        else
        {
            l = Math.sqrt(this.MS * this.MS - midlength * midlength);
        }
        
        if (this.Dir == 1)
            l *= -1;
        this.P3.x = midpoint.x + l * Math.cos(Math.PI/2 + this.Ang);
        this.P3.y = midpoint.y + l * Math.sin(Math.PI/2 + this.Ang);

        let a = (this.P1.x + this.P2.x) / 2
        
        Context.lineCap='round';
        Context.strokeStyle = "#000000";
        Context.fillStyle = this.mainColor;
        Context.lineWidth = this.strokeWidth ;

        this.Draw_Bras1(Context);
        this.Draw_Bras2(Context);
        this.Draw_Tete(Context);
    }

    Draw_Bras1(Context)
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

        Context.beginPath()
        Context.moveTo(this.P1.x, this.P1.y)
        Context.lineTo(p1.x, p1.y);
        Context.lineTo(p2.x, p2.y);
        Context.lineTo(p3.x, p3.y);
        Context.lineTo(p4.x, p4.y);
        Context.lineTo(p5.x, p5.y);
        Context.lineTo(p1.x, p1.y);
        Context.fill()
        Context.stroke()
    }

    Draw_Bras2(Context)
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

        Context.beginPath()
        Context.moveTo(p2.x, p2.y);
        Context.lineTo(p3.x, p3.y);
        Context.lineTo(p4.x, p4.y);
        Context.lineTo(p5.x, p5.y);
        Context.lineTo(p2.x, p2.y);
        Context.fill()
        Context.stroke()
        Context.fillStyle = "#000000";
        Context.beginPath()
        Context.moveTo(this.P2.x, this.P2.y)
        Context.lineTo(p2.x, p2.y);
        Context.lineTo(p5.x, p5.y);
        Context.fill()
        Context.stroke()
    }

    Draw_Tete(Context)
    {
        let sens = 1;
        if (this.Dir == 1)
            sens *= -1;
        
        Context.fillStyle = this.teteColor
        Context.beginPath();
        Context.ellipse(
            this.P3.x + sens * this.headSize2 * Math.cos(Math.PI/2 + this.Ang),
            this.P3.y + sens * this.headSize2 * Math.sin(Math.PI/2 + this.Ang), 
            this.headSize1 / 2, 
            this.headSize2, 
            this.Ang, 0, 2 * Math.PI);
        Context.fill()
        Context.stroke()
        Context.beginPath();
        Context.ellipse(this.P3.x, this.P3.y, this.headSize1, this.headSize2, this.Ang, 0, 2 * Math.PI);
        Context.fill()
        Context.stroke()
    }

    DrawLayer(Context)
    {
        this.draw = this.KeyFrameDataCurrent.Data["Draw"] == 1
        
        if (this.DrawTO)
        {
            let cr = this.KeyFrameDataCurrent.Data["DrawColorR"]
            let cg = this.KeyFrameDataCurrent.Data["DrawColorG"]
            let cb = this.KeyFrameDataCurrent.Data["DrawColorB"]
            let ca = this.KeyFrameDataCurrent.Data["DrawColorA"]
            let si = this.KeyFrameDataCurrent.Data["DrawSize"]
            let color = "rgba(" + cr + "," + cg + "," + cb +"," + ca + ")"
        
            Context.lineCap='round';
            Context.strokeStyle = color;
            Context.lineWidth = si;
            Context.beginPath()
            Context.moveTo(this.P2.x, this.P2.y)
            Context.lineTo(this.DrawTO.x, this.DrawTO.y);
            Context.stroke()

        }

        if (this.draw)
            this.DrawTO = JSON.parse(JSON.stringify(this.P2));
        else
            this.DrawTO = false;
    }
}