document.write('<script src="/JS/Svg.js/svg.min.js" charset="utf-8"></script>')
var Scripts = [
    "Animation_Data.js",
    // "Objects/Anim_Object.js",
    // "Objects/Anim_Image.js",
    "Objects/Anim_Regle.js",
    "Objects/Anim_Equerre.js",
    "Objects/Anim_Rapporteur.js",
    // "Objects/Anim_Rectangle.js",
    // "Objects/Anim_BreakLine.js",
    // "Objects/Anim_Text.js",
    // "Objects/Anim_Line.js",
    "Objects/Anim_Compas.js",
    "Objects/Anim_Point.js",
    "Objects/Anim_Crayon.js"
]
for (let s = 0; s < Scripts.length; s++) 
{
    document.write('<script src="' + "/JS/Animation/" + Scripts[s] + '" charset="utf-8"></script>')
}
document.write('<script src="JS/Animations.js" charset="utf-8"></script>')
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/CSS/Animation.css"
document.head.appendChild(link);
window.onload = () => {CreateAnimationObject()}

class Animation_Gestionnaire
{

    static Animations = {};

    static StartMainLoop()
    {
        window.onresize = function() { Animation_Gestionnaire.ResizeCanvas()}
        window.requestAnimationFrame(Animation_Gestionnaire.MainLoop);
    }

    static MainLoop()
    {
        Animation_Gestionnaire.Update();
        window.requestAnimationFrame(Animation_Gestionnaire.MainLoop);
    }

    static Update()
    {
        Object.values(Animation_Gestionnaire.Animations).forEach(animation => {
            animation.Update();
        });
    }

    static ResizeCanvas()
    {
        Object.values(Animation_Gestionnaire.Animations).forEach(animation => {
            animation.ResizeContent();
        });
    }


    static PlayPause(id)
    { Animation_Gestionnaire.Animations[id].PlayPause()}
    static Restart(id)
    { Animation_Gestionnaire.Animations[id].Restart()}
    static PreviousFrame(id)
    { Animation_Gestionnaire.Animations[id].Frame_Previous()}
    static NextFrame(id)
    { Animation_Gestionnaire.Animations[id].Frame_Next()}
    static ChangeRange(id)
    { Animation_Gestionnaire.Animations[id].ChangeRange()}

}


function CreateAnimationObject()
{
    var divs = Array.from(document.getElementsByClassName("animation"));
    divs.forEach(div => {
        let id = div.id;
        var anim = eval("new " + id + "()");
        anim.Initialise(div);
        Animation_Gestionnaire.Animations[anim.divname] = anim;
    });
    Animation_Gestionnaire.StartMainLoop();
}