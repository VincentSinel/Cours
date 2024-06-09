/*
Paramètres
X           => Position X (float)
Y           => Position Y (float)
Z           => Position Z (float)
Opacity     => Opacity entre 0 et 1 (float)
Angle       => Angle en degré (float)
ZoomX       => X scale (float)
ZoomY       => Y scale (float)
Visibility  => boolean
*/
class Anim_Point extends Anim_Object
{
    InitSpec()
    {
        this.Type = "Point"
        this.KeyFramesDataType.AddParam("ColorR", 0);
        this.KeyFramesDataType.AddParam("ColorG", 0);
        this.KeyFramesDataType.AddParam("ColorB", 0);
        this.KeyFramesDataType.AddParam("ColorA", 1);
        this.KeyFramesDataType.AddParam("Size", 5);
        this.KeyFramesDataType.AddParam("BorderSize", 1);
        this.KeyFramesDataType.AddParam("PosAngle", -90);
        this.KeyFramesDataType.AddParam("Type", 0, false);
        this.KeyFramesDataType.AddParam("Text", "M", false);
        this.KeyFramesDataType.AddParam("FontSize", 20);
        this.KeyFramesDataType.AddParam("FontName", "Bahnschrift", false);
    }


    PreDraw()
    {
        let w = this.KeyFrameDataCurrent.Data["Width"];
        let h = this.KeyFrameDataCurrent.Data["Height"];
        this.offsetdrawing[0] = this.offsetdrawingcoef[0] * w
        this.offsetdrawing[1] = this.offsetdrawingcoef[1] * h
    }

    Draw(Context)
    {
        let cr = this.KeyFrameDataCurrent.Data["ColorR"]
        let cg = this.KeyFrameDataCurrent.Data["ColorG"]
        let cb = this.KeyFrameDataCurrent.Data["ColorB"]
        let ca = this.KeyFrameDataCurrent.Data["ColorA"]
        let color = "rgba(" + cr + "," + cg + "," + cb +"," + ca + ")"
        let size = this.KeyFrameDataCurrent.Data["Size"]
        let text = this.KeyFrameDataCurrent.Data["Text"];
        let type = this.KeyFrameDataCurrent.Data["Type"];
        let ang = this.KeyFrameDataCurrent.Data["PosAngle"] * Math.PI / 180;
        let fsize = this.KeyFrameDataCurrent.Data["FontSize"]
        Context.fillStyle = color;
        Context.strokeStyle = color;
        Context.lineWidth = this.KeyFrameDataCurrent.Data["BorderSize"];
        Context.font = fsize + "px " + this.KeyFrameDataCurrent.Data["FontName"]
        Context.textAlign = 'center';
        Context.textBaseline = 'middle';
        Context.lineCap='round';
        let a = Context.measureText(text).width
        a = Math.sqrt(a * a + fsize * fsize) / 2;

        if (type == 0)
        {
            let s2 = Math.SQRT2
            Context.beginPath()
            Context.moveTo(-size/Math.SQRT2, -size/Math.SQRT2)
            Context.lineTo(size/Math.SQRT2, size/Math.SQRT2)
            Context.moveTo(-size/Math.SQRT2, size/Math.SQRT2)
            Context.lineTo(size/Math.SQRT2, -size/Math.SQRT2)
            Context.stroke();
        }
        else if (type == 1)
        {
            Context.beginPath()
            Context.moveTo(0, -size)
            Context.lineTo(0, size)
            Context.moveTo(-size, 0)
            Context.lineTo(size, 0)
            Context.stroke();
        }
        else if (type == 2)
        {
            Context.beginPath()
            Context.ellipse(0,0, size, size, 0, 0, Math.PI*2)
            Context.fill();
        }
        else if (type == 3)
        {
            Context.beginPath()
            Context.ellipse(0,0, size, size, 0, 0, Math.PI*2)
            Context.stroke();
        }

        Context.fillText(text,
            (size + a + 2) * Math.cos(ang),
            (size + a + 2) * Math.sin(ang))
    }
}