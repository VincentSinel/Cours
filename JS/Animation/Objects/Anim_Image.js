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
class Anim_Image extends Anim_Object
{
    image = new Image();
    loaded = false;

    constructor(anim, parent, src)
    {
        super(anim, parent)
        this.image.src = src;
        let _this = this;
        this.image.onload = function() {_this.EndLoad()};
        this.Type = "Image"
    }

    EndLoad()
    {
        this.loaded = true
    }


    Draw(Context)
    {
        if (this.loaded)
            Context.drawImage(this.image, 0, 0);
    }

}