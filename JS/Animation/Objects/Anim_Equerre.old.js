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
class Anim_Equerre extends Anim_Image
{
    constructor(anim, parent)
    {
        super(anim, parent, "/Cours/Images/Equerre.png")
        this.Type = "Equerre"
    }
}