class Anim_Object
{
    Parent;
    BaseValue;

    get Content() {
        return this.Parent.Content;
    }


    constructor(parent)
    {
        this.Parent = parent;
        this.Init();
        this.Create(this.BaseValue);
        console.log(this)
    }

    Init()
    {

    }

    Create(parameters)
    {

    }

    attr(parameters)
    {

    }

    AddAnimation(parameters, delay, duration, easy = "<>")
    {

    }
}