class Anim_BreakLine extends Anim_Object
{
    startpoint;
    middlepoint = false;
    realstart = {x: 0,y: 0};
    realstartp = 0;
    realend = {x: 0,y: 0};
    realendp = 0;


    get length()
    {
        if (this.startpoint != null)
        {
            let lsx = this.startpoint.KeyFrameDataCurrent.Data["SX"]
            let lsy = this.startpoint.KeyFrameDataCurrent.Data["SY"]
            let lex = this.KeyFrameDataCurrent.Data["SX"]
            let ley = this.KeyFrameDataCurrent.Data["SY"]
            let dx = lex - lsx;
            let dy = ley - lsy;
            return Math.sqrt((dx * dx) + (dy * dy));
        }
        return 0;
    }

    get totallength()
    {
        if (this.startpoint != null)
            return this.length + this.startpoint.totallength;
        else
            return 0;
    }

    get lengthlist()
    {
        if (this.startpoint != null)
        {
            let a = this.startpoint.lengthlist;
            a.push(this.length);
            return a;
        }
        else
            return [];

    }

    get pointlist()
    {
        if (this.startpoint != null)
        {
            let a = this.startpoint.pointlist;
            a.push({x: this.KeyFrameDataCurrent.Data["SX"],
            y: this.KeyFrameDataCurrent.Data["SY"]});
            return a;
        }
        else
            return [
                {x: this.KeyFrameDataCurrent.Data["SX"],
                 y: this.KeyFrameDataCurrent.Data["SY"]}];
    }

    
    constructor(anim, parent, startpoint = null)
    {
        super(anim, parent)
        if (startpoint != null)
        {
            this.startpoint = startpoint;
            this.startpoint.middlepoint = true;
        }
        this.Type = "BreakLine"
    }
    InitSpec()
    {
        this.KeyFramesDataType.AddParam("ColorR", 0);
        this.KeyFramesDataType.AddParam("ColorG", 0);
        this.KeyFramesDataType.AddParam("ColorB", 0);
        this.KeyFramesDataType.AddParam("ColorA", 1);
        this.KeyFramesDataType.AddParam("LineWidth", 1);
        this.KeyFramesDataType.AddParam("LinePartS", 0);
        this.KeyFramesDataType.AddParam("LinePartE", 1);
        this.KeyFramesDataType.AddParam("SX", 0);
        this.KeyFramesDataType.AddParam("SY", 0);
    }

    LateUpdate(frame)
    {
        if (!this.middlepoint)
        {
            let tl = this.totallength;
            let ll = this.lengthlist;
            let pl = this.pointlist;
            let lineparts = this.KeyFrameDataCurrent.Data["LinePartS"]
            let lineparte = this.KeyFrameDataCurrent.Data["LinePartE"]
            let temp = lineparts;
            lineparts = Math.min(lineparts, lineparte);
            lineparte = Math.max(temp, lineparte);
            let stl = tl * lineparts;
            let etl = tl * lineparte;

            temp = 0;
            this.realstartp = -1;
            this.realendp = -1;
            for (let i = 0; i < ll.length; i++) {
                const currentlength = ll[i];
                if (stl < temp + currentlength && this.realstartp == -1)
                {
                    this.realstartp = i + 1;
                    let dx = pl[i+1].x - pl[i].x;
                    let dy = pl[i+1].y - pl[i].y;

                    let dt = (stl - temp) / currentlength;
                    let x = pl[i].x + dx * dt;
                    let y = pl[i].y + dy * dt;

                    this.realstart = {x: x, y: y};
                }
                if (etl < temp + currentlength && this.realendp == -1)
                {
                    this.realendp = i + 1;
                    let dx = pl[i+1].x - pl[i].x;
                    let dy = pl[i+1].y - pl[i].y;

                    let dt = (etl - temp) / currentlength;
                    let x = pl[i].x + dx * dt;
                    let y = pl[i].y + dy * dt;

                    this.realend = {x: x, y: y};
                }
                temp += currentlength
            }
            if (this.realstartp == -1)
            {
                this.realstartp = 1;
                this.realstart = pl[0];
            }
            if (this.realendp == -1)
            {
                this.realendp = ll.length;
                this.realend = pl[ll.length];
            }
        }
    }

    MainDraw(Context, DContext)
    {
        if (!this.middlepoint && this.startpoint != null)
        {
            super.MainDraw(Context, DContext);
        }
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
        Context.lineJoin = "round";
        Context.lineCap='round';

        let lx = this.KeyFrameDataCurrent.Data["SX"]
        let ly = this.KeyFrameDataCurrent.Data["SY"]
        
        let pl = this.pointlist;

        Context.beginPath()
        Context.moveTo(this.realstart.x, this.realstart.y)
        let ll = this.pointlist;
        for (let i = this.realstartp; i < this.realendp; i++) {
            const element = ll[i];
            Context.lineTo(element.x, element.y);
        }
        Context.lineTo(this.realend.x, this.realend.y);
        Context.stroke()
    }
}