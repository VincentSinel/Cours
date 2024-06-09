class Animation_Data
{
    divname = "";
    divcontent = null;
    rangebar = null;
    playing = 0;
    loop = false;
    Children = [];
    BackGroundColor = "white";
    ready = false;

    width = 0;
    height = 0;

    Content = null;

    Maxtime = 0;

    Timeline = null;

    Initialise(div)
    {
        this.divname = div.id;
        this.divcontent = div;
        this.Timeline = new SVG.Timeline();
        this.Timeline.persist(true);
        this.CreateElement();
        this.CreateEvent()
        this.CreateContent()
        this.CreateObjects()
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
        let content = document.createElement("div");
        content.id = this.divname + "_content"
        content.classList.add("animation_content")
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

        animzone.appendChild(content);
        animzone.appendChild(animmenu);
        this.divcontent.appendChild(animzone);
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

    CreateContent()
    {
        this.width = parseInt(this.divcontent.attributes["width"].value) - 2;
        this.height = parseInt(this.divcontent.attributes["height"].value) - 2;
        this.Content = SVG().addTo("#" + this.divname + "_content");
        this.Content.viewbox("0 0 " + this.width.toString() + " " + this.height.toString());
        this.ResizeContent()
    }

    ResizeContent()
    {
        let selectedw = Math.min(this.width, document.body.offsetWidth - 5)
        this.Content.size(selectedw, selectedw / this.width * this.height)
    }



    AddAnimation(element, parameters, delay, duration, ease = '<>')
    {
        element.timeline(this.Timeline);
        var runner = new SVG.Runner(duration, delay);
        runner.element(element)
        if (parameters.hasOwnProperty("attr")){
            runner.attr(parameters.attr);
        }
        if (parameters.hasOwnProperty("plot")){
            runner.plot(parameters.plot);
        }
        if (parameters.hasOwnProperty("transform")) {
            runner.transform(parameters.transform, true);
        }
        runner.ease(ease)
        var self = this;
        runner.after(() => {self.AnimationEnd()})
	    this.Timeline.schedule(runner, delay, 'absolute')
        if (!("id" in element))
            element["id"] = this.MakeId(10);
        if (!(element["id"] in this.Children))
            this.Children[element["id"]] = {target: element, runners: []};
        this.Children[element["id"]].runners.push({
            runner: runner,
            delay: delay,
            duration: duration,
            parameters: parameters,
        })
        this.Maxtime = Math.max(this.Maxtime, delay + duration);
    }

    AnimationEnd()
    {
        if (this.Timeline.time() >= this.Maxtime)
        {
            if (this.loop)
                this.Restart()
            else
            {
                this.playing = 2
                this.UpdateSlider()
            }
        }
    }


    MakeId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }


    CreateObjects()
    {
    }


    PlayPause()
    {
        if (this.playing == 0)
        {
            this.Timeline.play()
            this.playing = 1
        }
        else if (this.playing == 1)
        {
            this.Timeline.pause()
            this.playing = 0
        }
        else if (this.playing == 2)
        {
            this.Restart()
            this.Timeline.play()
            this.playing = 1
        }
    }

    Frame_Next()
    {
        this.Timeline.pause()
        this.playing = 0
        this.Timeline.seek(1000)
        if (this.Timeline.time() > this.Maxtime)
            this.Timeline.time(this.Maxtime)
        this.UpdateSlider()
    }

    Frame_Previous()
    {
        this.Timeline.pause()
        this.playing = 0
        this.Timeline.seek(-1000)
        if (this.Timeline.time() < 0)
            this.Timeline.time(0)
        this.UpdateSlider()
    }

    Restart()
    {
        for (const key in this.Children) 
        {
            const svgEle = this.Children[key];
            this.Timeline.stop()
            for(var i = 0; i < svgEle.runners.length; i++)
            {
                svgEle.runners[i].runner.reset()
                this.Timeline.unschedule(svgEle.runners[i].runner)
                this.Timeline.schedule(svgEle.runners[i].runner, svgEle.runners[i].delay, 'absolute')
            }
        }
        if (this.loop)
        {
            this.Timeline.play()
            this.playing = 1
        }
        else
            this.playing = 0
        this.UpdateSlider()
    }

    ChangeRange()
    {
        this.Timeline.pause()
        this.playing = 0
        let d = this.rangebar.value * this.Maxtime;
        this.Timeline.time(d)
    }


    Update(delta)
    {
        if (this.playing == 1)
            this.UpdateSlider()
    }

    UpdateSlider()
    {
        let d = this.Timeline.time() / this.Maxtime;
        d = Math.max(Math.min(d, 1.0), 0.0)
        this.rangebar.value = d
    }
}