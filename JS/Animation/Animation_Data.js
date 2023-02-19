class Animation_Data
{
    divname = "";
    divcontent = null;
    rangebar = null;
    playing = 0;
    loop = false;
    stop = false;
    frame_actual = 0;
    frame_target = 0;
    frame_previous = 0;
    frame_starttime = 0;
    frame_offsettime = 0;
    frame_time = 0;
    frames = []
    Children = [];
    BackGroundColor = "white";
    frame_totalduration = 0;
    ready = false;
    lastintframe = 0;

    hopew = 0;
    hopeh = 0;

    Context = null;
    DrawContext = null;
    ObjtContext = null;

    get frame_count()
    {
        return this.frames.length
    }

    Initialise(div)
    {
        this.divname = div.id;
        this.divcontent = div;
        this.CreateElement();
        this.frames.push(new Frame(0, 0, 0))
        this.CreateEvent()
        this.GetContext()
        this.CreateFrames()
        this.CreateObjects()
        this.PrepareObjects()
        this.ready = true;
        this.Restart();
    }

    CreateElement()
    {
        let showmenu = true
        if (this.divcontent.hasAttribute("showmenu"))
            showmenu = this.divcontent.attributes["showmenu"].value != "false";
        if (this.divcontent.hasAttribute("loop"))
            this.loop = this.divcontent.attributes["loop"].value == "true";
        let animzone = document.createElement("div");
        animzone.classList.add("animationzone");
        let canvas = document.createElement("canvas");
        console.log(window.innerWidth)
        this.hopew = parseInt(this.divcontent.attributes["width"].value) - 2;
        this.hopeh = parseInt(this.divcontent.attributes["height"].value) - 2
        let selectedw = Math.min(this.hopew, window.innerWidth - 30)
        canvas.width = selectedw;
        canvas.height = selectedw / this.hopew * this.hopeh;
        let animmenu = document.createElement("div");
        animmenu.classList.add("menuAnimation");
        let button1 = document.createElement("button");
        button1.classList.add("glow-on-hover");
        button1.innerHTML = "⏯"
        let button2 = document.createElement("button");
        button2.classList.add("glow-on-hover");
        button2.innerHTML = "↺"
        let button3 = document.createElement("button");
        button3.classList.add("glow-on-hover");
        button3.innerHTML = "◄"
        let button4 = document.createElement("button");
        button4.classList.add("glow-on-hover");
        button4.innerHTML = "►"
        let range = document.createElement("input");
        range.type = "range";

        animmenu.appendChild(button1);
        animmenu.appendChild(button2);
        animmenu.appendChild(button3);
        animmenu.appendChild(button4);
        animmenu.appendChild(range);

        if (!showmenu)
            animmenu.classList.add("hide");

        animzone.appendChild(canvas);
        animzone.appendChild(animmenu);
        animzone.style.minwidth = (canvas.width).toString() + "px"
        this.divcontent.appendChild(animzone);
    }

    ResizeCanvas()
    {
        let selectedw = Math.min(this.hopew, window.innerWidth - 30)
        this.Context.canvas.width = selectedw;
        this.Context.canvas.height = selectedw / this.hopew * this.hopeh;
    }

    CreateEvent()
    {
        let playpausebutton = this.divcontent.getElementsByTagName("button")[0];
        let restartbutton = this.divcontent.getElementsByTagName("button")[1];
        let previousframebutton = this.divcontent.getElementsByTagName("button")[2];
        let nextframebutton = this.divcontent.getElementsByTagName("button")[3];
        this.rangebar = this.divcontent.getElementsByTagName("input")[0];
        this.rangebar.min = 0;
        this.rangebar.max = 1;
        this.rangebar.step = "any";

        let _divname = this.divname;
        playpausebutton.onclick = function() { Animation_Gestionnaire.PlayPause(_divname) }
        restartbutton.onclick = function() { Animation_Gestionnaire.Restart(_divname) }
        previousframebutton.onclick = function() { Animation_Gestionnaire.PreviousFrame(_divname) }
        nextframebutton.onclick = function() { Animation_Gestionnaire.NextFrame(_divname) }
        this.rangebar.oninput = function() { Animation_Gestionnaire.ChangeRange(_divname) }
    }

    GetContext()
    {
        this.Context = this.divcontent.getElementsByTagName("canvas")[0].getContext("2d");
        
        this.DrawContext = document.createElement("canvas").getContext("2d");
        this.DrawContext.canvas.width = this.hopew;
        this.DrawContext.canvas.height = this.hopeh;

        this.ObjtContext = document.createElement("canvas").getContext("2d");
        this.ObjtContext.canvas.width = this.hopew;
        this.ObjtContext.canvas.height = this.hopeh;
    }

    CreateFrames()
    {
    }

    AddFrame(duration, clear = false)
    {
        this.frames.push(new Frame(duration, this.frame_totalduration, this.frame_count, clear))
        this.frame_totalduration += duration;
    }

    CreateObjects()
    {
    }

    PrepareObjects()
    {
        this.Children.forEach(obj => {
            obj.Prepare();
        });
    }

    PlayPause()
    {
        if (!this.ready)
            return;
        if (this.frame_time == this.frame_totalduration)
        {
            this.Restart()
            this.playing = 1
            return;
        }
        if (this.playing == 0)
        {
            this.playing = 1;
            if (this.frame_target == this.frame_actual)
            {
                this.frame_target = this.frame_count - 1;
                this.frame_previous = this.frame_actual
            }
            return;
        }
        if (this.playing != 0)
            this.playing = 0;
            return;
    }

    Play()
    {
        this.playing = 1
        this.stop = false;
    }

    Pause()
    {
        this.playing = 0
        this.stop = false;
    }

    Frame_Next()
    {
        if (!this.ready)
            return;
        this.frame_previous = Math.ceil(this.frame_actual);
        this.frame_actual = this.frame_previous;
        this.frame_target = Math.min(this.frame_count - 1,  this.frame_previous + 1);
        this.frame_time = this.frames[this.frame_actual].Timeafter;
        this.playing = 2;
    }

    Frame_Previous()
    {
        if (!this.ready)
            return;
        this.frame_previous = Math.floor(this.frame_actual);
        this.frame_actual = this.frame_previous;
        this.frame_target = Math.max(0,  this.frame_actual - 1);
        this.frame_time = this.frames[this.frame_actual].Timeafter;
        this.playing = 2;
    }

    Restart()
    {
        if (!this.ready)
            return;

        this.frame_previous = 0;
        this.frame_target = this.frame_count - 1;
        this.frame_time = 0;
        this.frame_actual = 0;
        this.lastintframe = 0;

        this.ClearDrawContext();
        
        if (this.loop)
            this.playing = 1;
        else
            this.playing = 0;

        this.Children.forEach(obj => {
            obj.Update(0);
        });
        this.UpdateSlider();
    }

    ChangeRange()
    {
        let old = this.frame_actual;
        this.playing = 0;
        let time = this.rangebar.value * this.frame_totalduration;

        this.frame_time = time
        this.frame_time = Math.max(Math.min(this.frame_time, this.frame_totalduration), 0)

        let frame = this.GetActualFrame(this.frame_time);
        this.frame_actual = this.GetActualFrameID(frame);

        this.Children.forEach(obj => {
            obj.Update(this.frame_actual);
        });
        this.UpdateSlider();
    }

    GetActualFrame(time)
    {
        for (let i = 1; i < this.frame_count; i++) {
            if(this.frames[i].Durationframe >= time)
                return this.frames[i];
            time -= this.frames[i].Durationframe
        }
        return this.frames[this.frame_count - 1];
    }

    GetActualFrameID(frame)
    {
        return Math.max(frame.ID - 1 + Math.min((this.frame_time - frame.Timebefore) / frame.Durationframe, 1), 0);
    }


    Update(delta)
    {
        if (!this.ready)
            return;
        if (this.playing != 0)
        {
            let sens = 0;
            if (this.frame_target > this.frame_previous)
            {   this.frame_time += delta; sens = 1;}
            else if (this.frame_target < this.frame_previous)
            {   this.frame_time -= delta; sens = -1;}
            else
                return this.playing = 0;
            
            this.frame_time = Math.max(Math.min(this.frame_time, this.frame_totalduration), 0)

            let frame = this.GetActualFrame(this.frame_time);
            this.frame_actual = this.GetActualFrameID(frame);

            if ((sens > 0 && this.frame_actual >= this.frame_target) ||
                (sens < 0 && this.frame_actual <= this.frame_target))
            {
                this.frame_actual = this.frame_target;
                
                if (this.playing == 1 && this.frame_target < this.frame_count - 1)
                {
                    this.frame_previous = this.frame_target;
                    this.frame_target += 1;
                }
                else if (this.loop)
                {
                    this.Restart();
                }
                else
                    this.playing = 0;
                
            }

            if (this.lastintframe != Math.floor(this.frame_actual))
            {
                if (sens > 0 && this.frames[this.lastintframe].Clear)
                    this.ClearDrawContext()
                this.lastintframe = Math.floor(this.frame_actual)
            }

            this.Children.forEach(obj => {
                obj.Update(this.frame_actual);
            });
            this.UpdateSlider();
        }
    }

    ClearDrawContext()
    {
        this.DrawContext.clearRect(0,0,this.DrawContext.canvas.width, this.DrawContext.canvas.height);
    }

    UpdateSlider()
    {
        let time = 0;
        for (let i = 0; i <= Math.floor(this.frame_actual); i++) {
            time += this.frames[i].Durationframe
        }
        time += (this.frame_actual % 1) * this.frames[Math.ceil(this.frame_actual)].Durationframe
        this.rangebar.value = time / (this.frame_totalduration * 1.0);
    }

    Draw()
    {
        if (!this.ready)
            return;
        this.ObjtContext.clearRect(0,0,this.ObjtContext.canvas.width, this.ObjtContext.canvas.height);
        this.Context.fillStyle = this.BackGroundColor;
        this.Context.fillRect(0,0,this.ObjtContext.canvas.width, this.ObjtContext.canvas.height);
        
        this.DrawContext.save();
        this.ObjtContext.save()
        this.ObjtContext.translate(this.ObjtContext.canvas.width / 2, this.ObjtContext.canvas.height / 2);
        this.DrawContext.translate(this.ObjtContext.canvas.width / 2, this.ObjtContext.canvas.height / 2);
        this.Children.forEach(obj => {
            obj.MainDraw(this.ObjtContext, this.DrawContext);
        });
        this.DrawContext.restore()
        this.ObjtContext.restore()

        this.Context.save()
        this.Context.drawImage(this.DrawContext.canvas, 0, 0, this.Context.canvas.width, this.Context.canvas.height)
        this.Context.drawImage(this.ObjtContext.canvas, 0, 0, this.Context.canvas.width, this.Context.canvas.height)
        this.Context.restore()
    }
}

class Frame
{
    Durationframe = 0;
    Timebefore = 0;
    ID = 0;
    Clear = false;
    get Timeafter(){ return this.Durationframe + this.Timebefore; }
    constructor(duration, before, id, clear){
        this.Durationframe = duration;
        this.Timebefore = before;
        this.ID = id;
        this.Clear = clear;
    }
}