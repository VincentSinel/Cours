class Anim_Text extends Anim_Object
{
    
    InitSpec()
    {
        this.Type = "Texte"
        this.KeyFramesDataType.AddParam("ColorR", 0);
        this.KeyFramesDataType.AddParam("ColorG", 0);
        this.KeyFramesDataType.AddParam("ColorB", 0);
        this.KeyFramesDataType.AddParam("ColorA", 1);
        this.KeyFramesDataType.AddParam("BorderSize", 0);
        this.KeyFramesDataType.AddParam("BorderColorR", 0);
        this.KeyFramesDataType.AddParam("BorderColorG", 0);
        this.KeyFramesDataType.AddParam("BorderColorB", 0);
        this.KeyFramesDataType.AddParam("BorderColorA", 1);
        this.KeyFramesDataType.AddParam("Text", "texte", false);
        this.KeyFramesDataType.AddParam("FontSize", 20);
        this.KeyFramesDataType.AddParam("FontName", "sans-serif", false);
        this.KeyFramesDataType.AddParam("CharVisible", 1);
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

        Context.font = this.KeyFrameDataCurrent.Data["FontSize"] + "px " + 
        this.KeyFrameDataCurrent.Data["FontName"]

        let charmax = this.KeyFrameDataCurrent.Data["Text"].length;
        let visi = Math.round(charmax * this.KeyFrameDataCurrent.Data["CharVisible"]);
        let text = this.KeyFrameDataCurrent.Data["Text"].substr(0,visi);
        Context.textBaseline = 'middle';
        Context.textAlign = 'center';
        Context.fillText(text, 0, 0)
        if (size > 0)
        {
            Context.strokeText(text, 0, 0)
        }
    }

}