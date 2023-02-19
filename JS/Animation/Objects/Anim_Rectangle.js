class Anim_Rectangle extends Anim_Object
{

    InitSpec()
    {
        this.Type = "Rectangle"
        this.KeyFramesDataType.AddParam("ColorR", 255);
        this.KeyFramesDataType.AddParam("ColorG", 255);
        this.KeyFramesDataType.AddParam("ColorB", 255);
        this.KeyFramesDataType.AddParam("ColorA", 1);
        this.KeyFramesDataType.AddParam("BorderSize", 1);
        this.KeyFramesDataType.AddParam("BorderColorR", 0);
        this.KeyFramesDataType.AddParam("BorderColorG", 0);
        this.KeyFramesDataType.AddParam("BorderColorB", 0);
        this.KeyFramesDataType.AddParam("BorderColorA", 1);
        this.KeyFramesDataType.AddParam("Width", 20);
        this.KeyFramesDataType.AddParam("Height", 10);
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
        let size = this.KeyFrameDataCurrent.Data["BorderSize"]
        Context.fillStyle = color;
        cr = this.KeyFrameDataCurrent.Data["BorderColorR"]
        cg = this.KeyFrameDataCurrent.Data["BorderColorG"]
        cb = this.KeyFrameDataCurrent.Data["BorderColorB"]
        ca = this.KeyFrameDataCurrent.Data["BorderColorA"]
        color = "rgba(" + cr + "," + cg + "," + cb +"," + ca + ")"
        Context.strokeStyle = color;
        Context.lineWidth = size;
        let w = this.KeyFrameDataCurrent.Data["Width"];
        let h = this.KeyFrameDataCurrent.Data["Height"];


        Context.fillRect(0, 0, w, h)
        if (size > 0)
        {
            Context.strokeRect(0, 0, w, h)
        }
    }

}