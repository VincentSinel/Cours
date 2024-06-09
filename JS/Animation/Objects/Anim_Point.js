class Anim_Point
{
    Parent;
    CurrentValue;

    get Content() {
        return this.Parent.Content;
    }

    constructor(parent)
    {
        this.Parent = parent;
        this.Init();
        this.Create();
    }

    Init()
    {
        this.CurrentValue = {
            "center": {x: 0,y: 0},
            "type": 1, // Can be 0 ; 1 ; 2
            "size": 5,
            "distance": 15,
            "angle": -90,
            "text": "M",
        }

        this.Point_Style = {fill: 'none', stroke: '#000' ,'stroke-width': 2 ,linecap: 'round', linejoin: 'round'}
        this.Text_Style = {fill: '#000'}
        this.Text_Font = {family: 'bahnschrift', size: 18}
    }

    Create()
    {
        if (this.CurrentValue["type"] == 0)
            this.Point = this.Content.path(this._Get_Path1(this.CurrentValue))
        else if (this.CurrentValue["type"] == 1)
            this.Point = this.Content.path(this._Get_Path2(this.CurrentValue))
        else if (this.CurrentValue["type"] == 2)
        {
            this.Point = this.Content.circle(this.CurrentValue["size"])
            this.Point.center(this.CurrentValue["center"].x, this.CurrentValue["center"].y)
        }
        this.Point.attr(this.Point_Style)
        
        this.Text = this.Content.text(this.CurrentValue["text"])
        let p = this.CurrentValue["center"];
        p.x += this.CurrentValue["distance"] * Math.cos(this.CurrentValue["angle"] * Math.PI / 180.0)
        p.y += this.CurrentValue["distance"] * Math.sin(this.CurrentValue["angle"] * Math.PI / 180.0)
        this.Text.center(p.x,p.y)
        this.Text.attr(this.Text_Style).font(this.Text_Font)
    }

    _Get_Path1(parameters)
    {
        let p = parameters["center"];
        let size = parameters["size"]/Math.SQRT2;
        return ['M',p.x-size,p.y-size,'L',p.x+size,p.y+size,'M',p.x-size,p.y+size,'L',p.x+size,p.y-size].join(' ');
    }

    _Get_Path2(parameters)
    {
        let p = parameters["center"];
        let size = parameters["size"];
        return ['M',p.x-size,p.y,'L',p.x+size,p.y,'M',p.x,p.y+size,'L',p.x,p.y-size].join(' ');
    }

    attr(parameters)
    {
        for (const key in this.CurrentValue) 
        { parameters[key] = parameters[key] || this.CurrentValue[key] }

        
        if (parameters["type"] != this.CurrentValue["type"])
        {
            this.CurrentValue["type"] = parameters["type"]
            this.Point.remove();
            if (parameters["type"] == 0)
                this.Point = this.Content.path(this._Get_Path1(parameters))
            else if (parameters["type"] == 1)
                this.Point = this.Content.path(this._Get_Path2(parameters))
            else if (parameters["type"] == 2)
            {
                this.Point = this.Content.circle(parameters["size"])
                this.Point.center(parameters["center"].x, parameters["center"].y)
            }
        }

        if (parameters["size"] != this.CurrentValue["size"] ||
        parameters["center"] != this.CurrentValue["center"]
        )
        {
            this.CurrentValue["size"] = parameters["size"]
            if (parameters["type"] == 0)
                this.Point.plot(this._Get_Path1(parameters))
            else if (parameters["type"] == 1)
                this.Point.plot(this._Get_Path2(parameters))
            else if (parameters["type"] == 2)
                this.Point.size(parameters["size"])
        }
        
        if (parameters.hasOwnProperty("point-style"))
        {
            this.Point.attr(parameters["point-style"])
            for (const key in parameters["point-style"]) 
                { this.Point_Style[key] = parameters["point-style"][key] || this.Point_Style[key] }
        }
        if (parameters.hasOwnProperty("text-style"))
        {
            this.Text.attr(parameters["text-style"])
            for (const key in parameters["text-style"]) 
                { this.Text_Style[key] = parameters["text-style"][key] || this.Text_Style[key] }
        }
        if (parameters.hasOwnProperty("text-font"))
        {
            this.Text.font(parameters["text-font"])
            for (const key in parameters["text-font"]) 
                { this.Text_Font[key] = parameters["text-font"][key] || this.Text_Font[key] }
        }
        
        if (parameters["text"] != this.CurrentValue["text"])
        {
            this.CurrentValue["text"] = parameters["text"]
            this.Text.text(parameters["text"])
        }

        
        this.CurrentValue["center"] = parameters["center"]
        this.CurrentValue["distance"] = parameters["distance"]
        let p = parameters["center"];
        if (parameters["type"] == 2)
            this.Point.center(p.x, p.y)
        p.x += parameters["distance"] * Math.cos(parameters["angle"] * Math.PI / 180.0)
        p.y += parameters["distance"] * Math.sin(parameters["angle"] * Math.PI / 180.0)
        this.Text.center(p.x,p.y)
    }

    AddAnimation(parameters, delay, duration, easy = "<>")
    {
        for (const key in this.CurrentValue) 
        { parameters[key] = parameters[key] || this.CurrentValue[key] }

        if (parameters["type"] == 2)
        {
            if (parameters["center"] != this.CurrentValue["center"])
                this.Parent.AddAnimation(this.Point, {attr: {'cx': parameters["center"].x, 'cy': parameters["center"].y}}, delay, duration, easy);
            if (parameters["size"] != this.CurrentValue["size"])
                this.Parent.AddAnimation(this.Point, {attr: {'r': parameters["size"]}}, delay, duration, easy);
        }
        else
        {
            if (parameters["center"] != this.CurrentValue["center"] ||
                parameters["size"] != this.CurrentValue["size"])
            {
                if (parameters["type"] == 0)
                    this.Parent.AddAnimation(this.Point, {plot: this._Get_Path1(parameters)}, delay, duration, easy);
                else
                    this.Parent.AddAnimation(this.Point, {plot: this._Get_Path2(parameters)}, delay, duration, easy);
            }
        }

        if (parameters.hasOwnProperty("point-style"))
            this.Parent.AddAnimation(this.Point, {attr: parameters["point-style"]}, delay, duration, easy);
        if (parameters.hasOwnProperty("text-style"))
            this.Parent.AddAnimation(this.Text, {attr: parameters["text-style"]}, delay, duration, easy);

        if (parameters["center"] != this.CurrentValue["center"] ||
        parameters["distance"] != this.CurrentValue["distance"] ||
        parameters["angle"] != this.CurrentValue["angle"])
        {
            this.CurrentValue["center"] = parameters["center"]
            this.CurrentValue["distance"] = parameters["distance"]
            let p = parameters["center"];
            p.x += parameters["distance"] * Math.cos(parameters["angle"] * Math.PI / 180.0)
            p.y += parameters["distance"] * Math.sin(parameters["angle"] * Math.PI / 180.0)
            this.Parent.AddAnimation(this.Text, {attr: {'cx': p.x, 'cy': p.y}}, delay, duration, easy);
        }
    }
}