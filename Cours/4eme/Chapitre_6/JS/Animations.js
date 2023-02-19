/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{
    CreateFrames()
    {
        this.AddFrame(2.0, true);
        this.AddFrame(2.0);
    }

    CreateObjects()
    {
        let points = [];
        for (let i = 0; i < 4; i++) 
        {
            if (i == 0)
                points.push(new Anim_BreakLine(this,this));
            else
                points.push(new Anim_BreakLine(this,this, points[i - 1]));
            let x = -20 + i % 2 * 40;
            let y = -15 + Math.floor((i + 1) % 4  / 2) * 30
            points[i].QuickAssignKeyFrame(0, {
                "SX": x, 
                "SY": y,
                "LinePartE": 0,
                "LineWidth": 5})
            points[i].QuickAssignKeyFrame(1, {
                "SX": x, 
                "SY": y,
                "LinePartS": 0,
                "LinePartE": 1})
            points[i].QuickAssignKeyFrame(2, {
                "SX": x, 
                "SY": y,
                "LinePartS": 1})
        }
    }
}