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
class Anim_Object
{
    Type = "Object"
    KeyFrameDataCurrent = null
    KeyFramesDataType = new KeyFramesData();
    KeyFrames = {};
    #Parent = null
    #Animation_Data = null;
    Children = [];
    offsetdrawingcoef = [0,0];
    offsetdrawing = [0,0];

    get frame_count()
    {
        return this.#Animation_Data.frame_count
    }
    get frames()
    {
        return this.#Animation_Data.frames
    }


    constructor(anim, parent)
    {
        this.#Animation_Data = anim
        this.#Parent = parent;
        parent.Children.push(this);
        this.InitParam();
        this.KeyFrames[0] = this.KeyFramesDataType.CreateBase();
    }

    InitParam()
    {
        this.KeyFramesDataType.AddParam("X", 0);
        this.KeyFramesDataType.AddParam("Y", 0);
        this.KeyFramesDataType.AddParam("Z", 0);
        this.KeyFramesDataType.AddParam("Opacity", 1.0);
        this.KeyFramesDataType.AddParam("Angle", 0);
        this.KeyFramesDataType.AddParam("ZoomX", 1.0);
        this.KeyFramesDataType.AddParam("ZoomY", 1.0);
        this.KeyFramesDataType.AddParam("Visibility", true, false);
        this.InitSpec()
    }

    InitSpec()
    {

    }

    ChangeKeyFrame(keyframe)
    {
        if (keyframe.frameid == 0)
        {
            this.KeyFrames[0] = this.KeyFramesDataType.CombineZero(keyframe)
        }
        else
        {
            this.KeyFrames[keyframe.frameid] = keyframe;
        }
    }

    RemoveKeyFrame(frameid)
    {
        if (Object.keys(this.KeyFrames).includes(frameid))
        {
            delete this.KeyFrames[frameid];
        }
        if (frameid == 0)
        {
            this.KeyFrames[0] = this.KeyFramesDataType.CreateBase();
        }
    }

    Prepare()
    {
        let newkeyframe = {};
        newkeyframe[0] = this.KeyFrames[0];
        for (let i = 1; i < this.frame_count; i++) 
        {
            let f = this.frames[i];
            newkeyframe[i] = this.KeyFramesDataType.CreateNew(i);
        }

        let keys = Object.keys(this.KeyFrames)
        for (let i = 0; i < keys.length; i++) {
            keys[i] = parseInt(keys[i]);}   
        keys = keys.sort((a, b) => a - b);
        let params = Object.keys(this.KeyFramesDataType.Data)
        for (let p = 0; p < params.length; p++) 
        {
            const param = params[p];
            let ks = 0; 
            let ke = this.frame_count - 1;
            let vs = this.KeyFrames[0].Data[param];
            let ve = this.KeyFrames[0].Data[param];
            for (let k = 1; k < keys.length; k++) {
                const keyfid = keys[k];
                if (this.KeyFrames[keyfid].Data[param] != null)
                {
                    ke = parseInt(keyfid);
                    ve = this.KeyFrames[keyfid].Data[param]
                    this.Interpolate(newkeyframe, param, ks, ke, vs, ve);
                    ks = ke;
                    vs = ve;
                }
            }
            if (ks != this.frame_count - 1)
            {
                this.Interpolate(newkeyframe, param, ks, this.frame_count - 1, vs, vs);
            }
        }
        this.KeyFrames = newkeyframe;
        this.KeyFrameDataCurrent = JSON.parse(JSON.stringify(this.KeyFrames[0]));
        this.Children.forEach(obj => {
            obj.Prepare();
        });
    }

    Interpolate(newkeyframe, param, ks, ke, vs, ve)
    {
        let totaltime = 0
        for (let i = ks + 1; i <= ke; i++) 
        {
            totaltime += this.frames[i].Durationframe;
        }
        if (this.KeyFramesDataType.Data[param].interpolable)
        {
            let a = (ve - vs) / totaltime;
            let currenttime = 0;
            for (let i = ks; i < ke; i++) 
            {
                newkeyframe[i].Data[param] = vs + a * currenttime;
                currenttime += this.frames[i+1].Durationframe;
            }
        }
        else
        {
            for (let i = ks; i < ke; i++) 
            {
                newkeyframe[i].Data[param] = vs;
            }
        }
        newkeyframe[ke].Data[param] = ve;
    }


    Update(current_frame)
    {
        let from = Math.floor(current_frame);
        let to = Math.ceil(current_frame);

        let params = Object.keys(this.KeyFramesDataType.Data)
        params.forEach(param => {
            let valuefrom = this.KeyFrames[from].Data[param];
            if (this.KeyFramesDataType.Data[param].interpolable)
            {
                let valueto = this.KeyFrames[to].Data[param];
                
                this.KeyFrameDataCurrent.Data[param] = valuefrom + (valueto - valuefrom) * (current_frame % 1);
            }
            else
            {
                this.KeyFrameDataCurrent.Data[param] = valuefrom;
            }
        });
        this.Children.forEach(obj => {
            obj.Update(current_frame);
        });
        this.LateUpdate(current_frame)
    }

    LateUpdate(current_frame)
    {
    }

    PreDraw()
    {

    }

    MainDraw(Context, DContext)
    {
        this.PreDraw()

        Context.save();
        Context.translate(this.KeyFrameDataCurrent.Data["X"], -this.KeyFrameDataCurrent.Data["Y"]); 
        Context.rotate(-this.KeyFrameDataCurrent.Data["Angle"] / 180.0 * Math.PI);
        Context.scale(this.KeyFrameDataCurrent.Data["ZoomX"], this.KeyFrameDataCurrent.Data["ZoomY"]); 
        Context.globalAlpha = this.KeyFrameDataCurrent.Data["Opacity"]

        DContext.save();
        DContext.translate(this.KeyFrameDataCurrent.Data["X"], -this.KeyFrameDataCurrent.Data["Y"]); 
        DContext.rotate(-this.KeyFrameDataCurrent.Data["Angle"] / 180.0 * Math.PI);
        DContext.scale(this.KeyFrameDataCurrent.Data["ZoomX"], this.KeyFrameDataCurrent.Data["ZoomY"]);

        if (this.KeyFrameDataCurrent.Data["Visibility"])
        {
            Context.save()
            Context.translate(-this.offsetdrawing[0] , -this.offsetdrawing[1])
            this.Draw(Context);
            Context.restore()
        }

        DContext.save()
        DContext.translate(-this.offsetdrawing[0] , -this.offsetdrawing[1])
        this.DrawLayer(DContext);
        DContext.restore()

        this.Children.forEach(obj => {
            obj.MainDraw(Context, DContext);
        });

        Context.restore()
        DContext.restore()
    }

    Draw(Context)
    {

    }

    DrawLayer(Context)
    {

    }

    QuickAssignKeyFrame(frameid, data)
    {
        let keyframe = this.KeyFramesDataType.CreateNew(frameid);
        Object.keys(data).forEach(param => {
            keyframe.Data[param] = data[param];
        });
        this.ChangeKeyFrame(keyframe);
        
    }
}

class KeyFramesData
{
    Data = {}

    AddParam(name, _basevalue = 0, interpolable = true)
    {
        this.Data[name] = {value: _basevalue, interpolable: interpolable};
    }

    CombineZero(a)
    {
        Object.keys(this.Data).forEach(param => {
            if (Object.keys(a.Data).includes(param))
                if (a.Data[param] != null)
                    a.Data[param] = a.Data[param];
                else
                    a.Data[param] = this.Data[param].value
        });
        return a;
    }

    CreateNew(id = 0)
    {
        let kf = new KeyFrame();
        kf.frameid = id;
        Object.keys(this.Data).forEach(param => {
            kf.Data[param] = null;
        });
        return kf;
    }

    CreateBase()
    {
        let kf = new KeyFrame();
        kf.frameid = 0;
        Object.keys(this.Data).forEach(param => {
            kf.Data[param] = this.Data[param].value;
        });
        return kf;
    }
}
class KeyFrame
{
    frameid = 0;
    Data = {}
}