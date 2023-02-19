class Anim_Line extends Anim_Object
{

    InitSpec()
    {
        this.Type = "Line"
        this.KeyFramesDataType.AddParam("ColorR", 0);
        this.KeyFramesDataType.AddParam("ColorG", 0);
        this.KeyFramesDataType.AddParam("ColorB", 0);
        this.KeyFramesDataType.AddParam("ColorA", 1);
        this.KeyFramesDataType.AddParam("LineWidth", 1);
        this.KeyFramesDataType.AddParam("LineSX", 0);
        this.KeyFramesDataType.AddParam("LineSY", 0);
        this.KeyFramesDataType.AddParam("LineEX", 0);
        this.KeyFramesDataType.AddParam("LineEY", 0);
    }

    Draw(Context)
    {
        let cr = this.KeyFrameDataCurrent.Data["ColorR"]
        let cg = this.KeyFrameDataCurrent.Data["ColorG"]
        let cb = this.KeyFrameDataCurrent.Data["ColorB"]
        let ca = this.KeyFrameDataCurrent.Data["ColorA"]
        let color = "rgba(" + cr + "," + cg + "," + cb +"," + ca + ")"
        let size = this.KeyFrameDataCurrent.Data["LineWidth"]
        Context.strokeStyle = color;
        Context.lineWidth = size;
        Context.lineCap='round';

        let sx = this.KeyFrameDataCurrent.Data["LineSX"]
        let sy = this.KeyFrameDataCurrent.Data["LineSY"]
        let ex = this.KeyFrameDataCurrent.Data["LineEX"]
        let ey = this.KeyFrameDataCurrent.Data["LineEY"]
        
        if (ex != sx && ey != sy)
        {
            Context.beginPath()
            Context.moveTo(sx,-sy)
            Context.lineTo(ex,-ey);
            Context.stroke()
        }
    }

}