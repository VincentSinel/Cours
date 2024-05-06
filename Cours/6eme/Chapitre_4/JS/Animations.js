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
    }

    CreateObjects()
    {
        let centerx = 55;
        let centery = -25;
        let a1 = new Anim_Line(this,this)
        a1.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 200,
                "LineSY": centery + 120,
                "LineEX": centerx + 40,
                "LineEY": centery - 120,
                "LineWidth": 0,
                "ColorB": 255
            })
        
        let a2 = new Anim_Line(this,this)
        a2.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 150,
                "LineSY": centery - 70,
                "LineEX": centerx + 90,
                "LineEY": centery + 170,
                "LineWidth": 0,
                "ColorB": 255,
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(1,
            {
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(2,
            {
                "Opacity": 1,
            })
        
        let a3 = new Anim_Line(this,this)
        a3.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 70,
                "LineSY": centery - 10,
                "LineEX": centerx - 60,
                "LineEY": centery + 0,
                "LineWidth": 0,
                "ColorG": 255,
                "Opacity": 0,
            })
        a3.QuickAssignKeyFrame(2,
            {
                "Opacity": 0,
            })
        a3.QuickAssignKeyFrame(3,
            {
                "Opacity": 1,
            })
        let a4 = new Anim_Line(this,this)
        a4.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 70,
                "LineSY": centery + 10,
                "LineEX": centerx - 60,
                "LineEY": centery + 0,
                "LineWidth": 0,
                "ColorG": 255,
                "Opacity": 0,
            })
        a4.QuickAssignKeyFrame(2,
            {
                "Opacity": 0,
            })
        a4.QuickAssignKeyFrame(3,
            {
                "Opacity": 1,
            })

        let b = new Anim_Point(this, this);
        b.QuickAssignKeyFrame(0, {
            "X": centerx - 30,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "M",
            "ColorR": 255,
            "PosAngle": 45})
    
        let a = new Anim_Equerre(this, this);
        a.QuickAssignKeyFrame(0, {
            "ZoomX" : 0.2,
            "ZoomY": 0.2,
            "X": centerx + 50,
            "Y": centery + 50,
            "Angle": 0})
        a.QuickAssignKeyFrame(1, {
            "X": centerx - 80,
            "Y": centery,
            "Angle": 45})
        a.QuickAssignKeyFrame(2, {
            "X": centerx - 80,
            "Y": centery,
            "Opacity": 1,})
        a.QuickAssignKeyFrame(3, {
            "X": centerx - 45,
            "Y": centery,
            "Opacity": 0,})
    }
}

class Animation2 extends Animation_Data
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
    }

    CreateObjects()
    {
        let centerx = 55;
        let centery = -25;
        let a1 = new Anim_Line(this,this)
        a1.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 200,
                "LineSY": centery + 120,
                "LineEX": centerx + 40,
                "LineEY": centery - 120,
                "LineWidth": 0,
                "ColorB": 255
            })
        
        let a2 = new Anim_Line(this,this)
        a2.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 150,
                "LineSY": centery - 70,
                "LineEX": centerx + 90,
                "LineEY": centery + 170,
                "LineWidth": 0,
                "ColorB": 255,
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(5,
            {
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(6,
            {
                "Opacity": 1,
            })
        
        
        let a3 = new Anim_Line(this,this)
        a3.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 70,
                "LineSY": centery - 10,
                "LineEX": centerx - 60,
                "LineEY": centery + 0,
                "LineWidth": 0,
                "ColorG": 255,
                "Opacity": 0,
            })
        a3.QuickAssignKeyFrame(6,
            {
                "Opacity": 0,
            })
        a3.QuickAssignKeyFrame(7,
            {
                "Opacity": 1,
            })
        let a4 = new Anim_Line(this,this)
        a4.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 70,
                "LineSY": centery + 10,
                "LineEX": centerx - 60,
                "LineEY": centery + 0,
                "LineWidth": 0,
                "ColorG": 255,
                "Opacity": 0,
            })
        a4.QuickAssignKeyFrame(6,
            {
                "Opacity": 0,
            })
        a4.QuickAssignKeyFrame(7,
            {
                "Opacity": 1,
            })

        let b = new Anim_Point(this, this);
        b.QuickAssignKeyFrame(0, {
            "X": centerx - 30,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "M",
            "ColorR": 255,
            "PosAngle": 45})

        let b1 = new Anim_Point(this, this);
        b1.QuickAssignKeyFrame(0, {
            "X": centerx - 130,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "A",
            "ColorR": 255,
            "PosAngle": -45,
            "Opacity": 0})
        b1.QuickAssignKeyFrame(1, {
            "Opacity": 1,})
        let b2 = new Anim_Point(this, this);
        b2.QuickAssignKeyFrame(0, {
            "X": centerx - 10,
            "Y": centery - 70,
            "Type": 1,
            "BorderSize": 2,
            "Text": "B",
            "ColorR": 255,
            "PosAngle": -45,
            "Opacity": 0})
        b2.QuickAssignKeyFrame(1, {
            "Opacity": 1,})

        let f = new Anim_Compas(this, this)
        f.QuickAssignKeyFrame(0,
            {
                "P1X": centerx - 160,
                "P1Y": centery + 80,
                "P2X": centerx - 100,
                "P2Y": centery + 100,
                "Position": 0,

            })
        f.QuickAssignKeyFrame(1,
            {
                "P1X": centerx - 160,
                "P1Y": centery + 80,
                "P2X": centerx - 100,
                "P2Y": centery + 100,
            })
        f.QuickAssignKeyFrame(2,
            {
                "P1X": centerx - 130,
                "P1Y": centery,
                "P2X": centerx - 30,
                "P2Y": centery,
                "Draw": 1,
                "DAngle": 0,
            })
        f.QuickAssignKeyFrame(3,
            {
                "P1X": centerx - 130,
                "P1Y": centery,
                "P2X": centerx - 30,
                "P2Y": centery,
                "DAngle": 100,
                "Draw": 0,
            })
        f.QuickAssignKeyFrame(4,
            {
                "P1X": centerx - 10,
                "P1Y": centery + 120,
                "P2X": centerx - 30,
                "P2Y": centery,
                "Draw": 1,
                "DAngle": 0,
            })
        f.QuickAssignKeyFrame(5,
            {
                "P1X": centerx - 10,
                "P1Y": centery + 120,
                "P2X": centerx - 30,
                "P2Y": centery,
                "Draw": 0,
                "DAngle": -100,
                "Opacity": 1,
            })
        f.QuickAssignKeyFrame(6,
            {
                "Opacity": 0,
            })
    }
}

/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation3 extends Animation_Data
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
    }

    CreateObjects()
    {
        let centerx = 55;
        let centery = -25;
        let a1 = new Anim_Line(this,this)
        a1.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 200,
                "LineSY": centery + 120,
                "LineEX": centerx + 40,
                "LineEY": centery - 120,
                "LineWidth": 0,
                "ColorB": 255
            })
        
        let a2 = new Anim_Line(this,this)
        a2.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 150,
                "LineSY": centery + 170,
                "LineEX": centerx + 90,
                "LineEY": centery - 70,
                "LineWidth": 0,
                "ColorB": 255,
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(5,
            {
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(6,
            {
                "Opacity": 1,
            })

        let b = new Anim_Point(this, this);
        b.QuickAssignKeyFrame(0, {
            "X": centerx - 30,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "M",
            "ColorR": 255,
            "PosAngle": 45})
    
        let a = new Anim_Equerre(this, this);
        a.QuickAssignKeyFrame(0, {
            "ZoomX" : 0.2,
            "ZoomY": 0.2,
            "X": centerx + 50,
            "Y": centery + 50,
            "Angle": 0})
        a.QuickAssignKeyFrame(1, {
            "X": centerx - 80,
            "Y": centery,
            "Angle": 45})
        a.QuickAssignKeyFrame(3, {
            "X": centerx - 80,
            "Y": centery})
        a.QuickAssignKeyFrame(4, {
            "X": centerx - 30,
            "Y": centery + 50})
        a.QuickAssignKeyFrame(6, {
            "X": centerx - 30,
            "Y": centery + 50,
            "Opacity": 1,})
        a.QuickAssignKeyFrame(7, {
            "X": centerx - 5,
            "Y": centery + 75,
            "Opacity": 0,})
        
        
        
        let c = new Anim_Regle(this, this);
        c.QuickAssignKeyFrame(0, {
            "ZoomX" : 0.3,
            "ZoomY": 0.3,
            "X": centerx,
            "Y": centery + 140,
            "Angle": 180,
            "Opacity" : 0
        })
        c.QuickAssignKeyFrame(1, {
            "Y": centery + 140,
            "Angle": 180,
            "Opacity" : 0
        })
        c.QuickAssignKeyFrame(2, {
            "X": centerx,
            "Y": centery + 120,
            "Angle": 180,
            "Opacity" : 1,
        })
        c.QuickAssignKeyFrame(3, {
            "X": centerx + 70,
            "Y": centery + 150,
            "Angle": 180+45,
        })
        c.QuickAssignKeyFrame(4, {
            "X": centerx + 70,
            "Y": centery + 150,
            "Opacity" : 1,
        })
        c.QuickAssignKeyFrame(5, {
            "X": centerx + 45,
            "Y": centery + 175,
            "Opacity" : 0,
        })
    }
}   

class Animation4 extends Animation_Data
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
    }

    CreateObjects()
    {
        let centerx = 55;
        let centery = -25;
        let a1 = new Anim_Line(this,this)
        a1.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 200,
                "LineSY": centery + 120,
                "LineEX": centerx + 40,
                "LineEY": centery - 120,
                "LineWidth": 0,
                "ColorB": 255
            })
        
        let a2 = new Anim_Line(this,this)
        a2.QuickAssignKeyFrame(0,
            {
                "LineSX": centerx - 150,
                "LineSY": centery + 170,
                "LineEX": centerx + 110,
                "LineEY": centery - 90,
                "LineWidth": 0,
                "ColorB": 255,
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(8,
            {
                "Opacity": 0,
            })
        a2.QuickAssignKeyFrame(9,
            {
                "Opacity": 1,
            })

        let b = new Anim_Point(this, this);
        b.QuickAssignKeyFrame(0, {
            "X": centerx - 30,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "M",
            "ColorR": 255,
            "PosAngle": 45})

        let b1 = new Anim_Point(this, this);
        b1.QuickAssignKeyFrame(0, {
            "X": centerx - 130,
            "Y": centery + 50,
            "Type": 1,
            "BorderSize": 2,
            "Text": "A",
            "ColorR": 255,
            "PosAngle": -45,
            "Opacity": 0})
        b1.QuickAssignKeyFrame(1, {
            "Opacity": 1,})
        let b2 = new Anim_Point(this, this);
        b2.QuickAssignKeyFrame(0, {
            "X": centerx - 10,
            "Y": centery - 70,
            "Type": 1,
            "BorderSize": 2,
            "Text": "B",
            "ColorR": 255,
            "PosAngle": -45,
            "Opacity": 0})
        b2.QuickAssignKeyFrame(1, {
            "Opacity": 1,})

        let f = new Anim_Compas(this, this)
        f.QuickAssignKeyFrame(0,
            {
                "P1X": centerx - 160,
                "P1Y": centery + 80,
                "P2X": centerx - 100,
                "P2Y": centery + 100,
                "Position": 0,

            })
        f.QuickAssignKeyFrame(1,
            {
                "P1X": centerx - 160,
                "P1Y": centery + 80,
                "P2X": centerx - 100,
                "P2Y": centery + 100,
            })
        f.QuickAssignKeyFrame(2,
            {
                "P1X": centerx - 130,
                "P1Y": centery,
                "P2X": centerx - 30,
                "P2Y": centery,
                "Draw": 0,
                "DAngle": 0,
            })
        f.QuickAssignKeyFrame(3,
            {
                "P1X": centerx - 10,
                "P1Y": centery + 120,
                "P2X": centerx + 90,
                "P2Y": centery + 120,
                "DAngle": 20,
                "Draw": 1,
            })
        f.QuickAssignKeyFrame(4,
            {
                "P1X": centerx - 10,
                "P1Y": centery + 120,
                "P2X": centerx + 90,
                "P2Y": centery + 120,
                "Draw": 0,
                "DAngle": -20,
            })
        f.QuickAssignKeyFrame(5,
            {
                "P1X": centerx - 130,
                "P1Y": centery,
                "P2X": centerx - 10,
                "P2Y": centery + 120,
                "DAngle": 0,
            })
        f.QuickAssignKeyFrame(6,
            {
                "P1X": centerx - 30,
                "P1Y": centery,
                "P2X": centerx + 90,
                "P2Y": centery + 120,
                "DAngle": -20,
                "Draw": 1,
            })
        f.QuickAssignKeyFrame(7,
            {
                "P1X": centerx - 30,
                "P1Y": centery,
                "P2X": centerx + 90,
                "P2Y": centery + 120,
                "DAngle": 20,
                "Draw": 0,
                "Opacity": 1
            })
        f.QuickAssignKeyFrame(8,
            {
                "Opacity": 0,
            })
    }
}