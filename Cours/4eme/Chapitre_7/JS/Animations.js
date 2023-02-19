/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{
    CreateFrames()
    {
        this.AddFrame(1.0); //1
        this.AddFrame(1.0); //2
        this.AddFrame(1.0); //3
        this.AddFrame(1.0); //4
        this.AddFrame(1.0); //5
        this.AddFrame(1.0); //6
        this.AddFrame(1.0); //7
        this.AddFrame(1.0); //8
        this.AddFrame(1.0); //9
        this.AddFrame(1.0); //10
    }

    CreateObjects()
    {
        let a = new Anim_Point(this, this);
        a.QuickAssignKeyFrame(0, {
            "X": -80,
            "Type": 1,
            "BorderSize": 2,
            "Text": "O",
            "PosAngle": -135})
        
        let b = new Anim_Point(this, this);
        b.QuickAssignKeyFrame(0, {
            "X": 20,
            "Y": -30,
            "Type": 1,
            "BorderSize": 2,
            "Text": "M",
            "ColorR": 255,
            "PosAngle": 45})

        let c = new Anim_Rapporteur(this, this);
        c.QuickAssignKeyFrame(0, {
            "ZoomX" : 0.3,
            "ZoomY": 0.3,
            "Y": 140,
            "Opacity" : 0
        })
        c.QuickAssignKeyFrame(1, {
            "Y": 120,
            "X": 0,
            "Opacity" : 1,
        })
        c.QuickAssignKeyFrame(2, {
            "X": -80,
            "Y": 0,
            "Angle": 0
        })
        c.QuickAssignKeyFrame(3, {
            "X": -80,
            "Angle": -16.7
        })
        c.QuickAssignKeyFrame(4, {
            "X": -80,
            "Opacity" : 1,
        })
        c.QuickAssignKeyFrame(5, {
            "X": -120,
            "Opacity" : 0,
        })

        let ang = (50 - 16.2) * Math.PI / 180
        let dis = 187
        let d = new Anim_Line(this,this)
        d.QuickAssignKeyFrame(0,
            {
                "Visibility": false,
                "LineSX": -80 + dis*Math.cos(ang),
                "LineSY": dis*Math.sin(ang),
                "LineEX": -80 + dis*Math.cos(ang),
                "LineEY": dis*Math.sin(ang),
                "LineWidth": 0,
                "ColorB": 255
            })
        d.QuickAssignKeyFrame(3,
            {
                "LineSX": -80 + dis*Math.cos(ang),
                "LineSY": dis*Math.sin(ang),
                "LineEX": -80 + dis*Math.cos(ang),
                "LineEY": dis*Math.sin(ang),
                "Visibility": true,
                "LineWidth": 2
            })
        d.QuickAssignKeyFrame(4,
            {
                "LineSX": -80 + dis*Math.cos(ang),
                "LineSY": dis*Math.sin(ang),
                "LineEX": -80 + (dis + 10)*Math.cos(ang),
                "LineEY": (dis + 10)*Math.sin(ang),
                "LineWidth": 2
            })
        
        let e = new Anim_Line(this, this)
        e.QuickAssignKeyFrame(0,
            {
                "Opacity": 0,
                "Visibility": false,
                "LineSX": -80,
                "LineSY": 0,
                "LineEX": -80 + 400*Math.cos(ang),
                "LineEY": 400*Math.sin(ang),
            })
        e.QuickAssignKeyFrame(5,{
            "Visibility": true,
            "Opacity": 0
        })
        e.QuickAssignKeyFrame(6,{
            "Opacity": 1
        })

        let f = new Anim_Compas(this, this)
        f.QuickAssignKeyFrame(0,
            {
                "P1X": -160,
                "P1Y": +80,
                "P2X": -100,
                "P2Y": +100,
                "Position": 0,

            })
        f.QuickAssignKeyFrame(6,
            {
                "P1X": -160,
                "P1Y": +80,
                "P2X": -100,
                "P2Y": +100,
            })
        f.QuickAssignKeyFrame(7,
            {
                "P1X": -80,
                "P1Y": 0,
                "P2X": 20,
                "P2Y": 30,
                "Draw": 1,
                "DAngle": 0,
            })
        f.QuickAssignKeyFrame(8,
            {
                "P1X": -80,
                "P1Y": 0,
                "P2X": 20,
                "P2Y": 30,
                "DAngle": -60,
                "Draw": 0,
                "Opacity": 1
            })
        f.QuickAssignKeyFrame(9,
            {
                "P1X": -120,
                "P1Y": 0,
                "P2X": -20,
                "P2Y": 30,
                "Opacity": 0
            })
        
        let g = new Anim_Point(this, this);
        g.QuickAssignKeyFrame(0, {
            "X": -80 + 104.4*Math.cos(ang),
            "Y": 104.4*Math.sin(ang),
            "Type": 1,
            "BorderSize": 2,
            "Text": "M'",
            "PosAngle": -90,
            "Opacity": 0,
            "ColorR": 255,
            "Visibility": false})
        g.QuickAssignKeyFrame(9, {
            "Opacity": 0,
            "Visibility": true})
        g.QuickAssignKeyFrame(10, {
            "Opacity": 1})
    }
}