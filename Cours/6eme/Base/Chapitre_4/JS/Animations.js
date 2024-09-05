/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

// Animation perpendiculaire à l'equerre
class Animation1 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-145, cy - 95, cx + 95, cy + 145)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx+100, cy - 150, cx - 120, cy + 70)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 1000, 1000)

        let angle_d = this.Content.path(
            ['M',cx-50,cy,'L',cx-40,cy+10,'L',cx-30,cy,'L',cx-40,cy-10,'Z'].join(' ')
        )
        angle_d.attr({'opacity': 0.0, fill: '#5F5', 'fill-opacity': 0.7, stroke: '#5F5' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        angle_d.back()
        this.AddAnimation(angle_d, {attr: {'opacity': 1.0}}, 3000, 1000)

        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})
        
        let equerre = new Anim_Equerre(this);
        equerre.obj.move(cx + 100, cy)

        this.AddAnimation(equerre.obj, {transform: {'translateX': -150,'translatey': 50,'rotate': -45, 'ox': cx + 100, 'oy': cy}}, 0, 1000)
        this.AddAnimation(equerre.obj, {attr: {'opacity': 0.0},transform: {'translateX': 200,'translatey': 0}}, 2000, 1000)
    }
}

// Animation perpendiculaire au compas
class Animation2 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-145, cy - 95, cx + 95, cy + 145)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx+100, cy - 150, cx - 120, cy + 70)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 6000, 1000)

        let angle_d = this.Content.path(
            ['M',cx-50,cy,'L',cx-40,cy+10,'L',cx-30,cy,'L',cx-40,cy-10,'Z'].join(' ')
        )
        angle_d.attr({'opacity': 0.0, fill: '#5F5', 'fill-opacity': 0.7, stroke: '#5F5' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        angle_d.back()
        this.AddAnimation(angle_d, {attr: {'opacity': 1.0}}, 7000, 1000)

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx + 25, y: cy + 75}, "text": "A", "angle": 90})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx - 80, y: cy - 30}, "text": "B", "angle": 90})
        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})
        
        let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 95, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx - 80, y: cy - 30},
                "p2": {x: cx, y: cy - 50}
            }, 0, 1000 )
        
        compas.Rotate(90, 1000, 1000)
        compas.Draw(45, 2000, 1000)

        compas.AddAnimation({
            "p1": {x: cx + 25, y: cy + 75},
            "p2": {x: cx, y: cy - 50}
        }, 3000, 1000)
        
        compas.Rotate(-60, 4000, 1000)
        compas.Draw(-30, 5000, 1000)

        compas.AddAnimation({
                "p1": {x: cx + 125, y: cy + 75},
                "p2": {x: cx + 100, y: cy - 50},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 6000, 1000 )
    }
}

// Animation parallèle à l'equerre
class Animation3 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-145, cy - 95, cx + 95, cy + 145)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx-95, cy - 145, cx + 145, cy + 95)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 4000, 1000)

        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})
        
        let equerre = new Anim_Equerre(this);
        equerre.obj.move(cx + 100, cy)
        this.AddAnimation(equerre.obj, {transform: {'translateX': -150,'rotate': -45, 'ox': cx + 100, 'oy': cy}}, 0, 1000)
        this.AddAnimation(equerre.obj, {transform: {'translateX': 50, 'translateY': -50}}, 2000, 1000)
        this.AddAnimation(equerre.obj, {attr: {'opacity': 0.0},transform: {'translateX': 200}}, 5000, 1000)
    
        let regle = new Anim_Regle(this);
        regle.obj.rotate(90, 0, 0).translate(50,50)
        this.AddAnimation(regle.obj, {transform: {'translateX': cx - 20,'translateY': cy-200,'rotate': 45, 'ox': 50, 'oy': 50}}, 1000, 1000)
        this.AddAnimation(regle.obj, {attr: {'opacity': 0.0},transform: {'translateX': -100}}, 3000, 1000)
    
    }
}

// Animation parallèle au compas
class Animation4 extends Animation_Data
{
    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-145, cy - 95, cx + 95, cy + 145)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx-95, cy - 145, cx + 145, cy + 95)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 6000, 1000)

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx + 25, y: cy + 75}, "text": "A", "angle": 90})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx - 80, y: cy - 30}, "text": "B", "angle": 90})
        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})
        
        let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 95, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx - 80, y: cy - 30},
                "p2": {x: cx, y: cy - 50}
            }, 0, 1000 )
        compas.AddAnimation({
                "p1": {x: cx + 25, y: cy + 75},
                "p2": {x: cx + 105, y: cy + 55}
            }, 1000, 1000 )
        
        compas.Rotate(-15, 1000, 1000)
        compas.Draw(25, 2000, 1000)

        compas.AddAnimation({
            "p1": {x: cx - 80, y: cy - 30},
            "p2": {x: cx + 25, y: cy + 75}
        }, 3000, 1000)
        compas.AddAnimation({
                "p1": {x: cx, y: cy - 50},
                "p2": {x: cx + 105, y: cy + 55}
            }, 4000, 1000 )
        
        compas.Rotate(-15, 4000, 1000)
        compas.Draw(25, 5000, 1000)

        compas.AddAnimation({
                "p1": {x: cx - 200, y: cy - 50},
                "p2": {x: cx - 95, y: cy + 55},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 6000, 1000 )
    }
}