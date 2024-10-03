/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

// Animation symétrie à l'equerre
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
        this.AddAnimation(angle_d, {attr: {'opacity': 1.0}}, 4000, 1000)

        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})

        let pointM2 = new Anim_Point(this)
        pointM2.attr({"center": {x: cx - 100, y: cy + 50}, "text": "M'", "point-style": {'opacity': 0.0, stroke: "#000"},
			"text-style": {'opacity': 0.0, fill: "#000"}})
        pointM2.AddAnimation({"point-style": {'opacity': 1.0},
                "text-style": {'opacity': 1.0}}, 3000, 1000)
        
        let equerre = new Anim_Equerre(this);
        equerre.obj.move(cx + 100, cy)

        this.AddAnimation(equerre.obj, {transform: {'translateX': -150,'rotate': -45, 'ox': cx + 100, 'oy': cy}}, 0, 1000)
        this.AddAnimation(equerre.obj, {transform: {'translateX': -50,'translateY': 50}}, 2000, 1000)
        this.AddAnimation(equerre.obj, {attr: {'opacity': 0.0},transform: {'translateX': 200}}, 4000, 1000)
    }
}

// Animation symétrie au compas
class Animation2 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-145, cy - 95, cx + 95, cy + 145)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx, cy - 50, cx - 100, cy + 50)
        line2.attr({"stroke-dasharray": "5"})
        line2.stroke({opacity: 0.0, color: '#000','stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 6000, 1000)

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx + 25, y: cy + 75}, "text": "A", "angle": 90})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx - 80, y: cy - 30}, "text": "B", "angle": 90})
        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy - 50}, "text": "M"})

        
        let pointM2 = new Anim_Point(this)
        pointM2.attr({"center": {x: cx - 100, y: cy + 50}, "text": "M'", "point-style": {'opacity': 0.0, stroke: "#000"},
			"text-style": {'opacity': 0.0, fill: "#000"}})
        pointM2.AddAnimation({"point-style": {'opacity': 1.0},
                "text-style": {'opacity': 1.0}}, 6000, 1000)
        
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

// Animation symétrie au compas
class Animation3 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line2 = this.Content.line(cx - 90, cy - 30, cx + 120, cy + 40)
        line2.attr({"stroke-dasharray": "2"})
        line2.stroke({opacity: 0.0, color: '#000','stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 1000, 1000)

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx, y: cy}, "text": "O", "angle": 90})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx - 90, y: cy - 30}, "text": "M", "angle": 90})

        
        let pointM2 = new Anim_Point(this)
        pointM2.attr({"center": {x: cx + 90, y: cy + 30}, "text": "M'", "point-style": {'opacity': 0.0, stroke: "#000"},
			"text-style": {'opacity': 0.0, fill: "#000"}})
        pointM2.AddAnimation({"point-style": {'opacity': 1.0},
                "text-style": {'opacity': 1.0}}, 6000, 1000)
        
        let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 95, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx, y: cy},
                "p2": {x: cx - 90, y: cy - 30}
            }, 2000, 1000 )
        
        compas.Rotate(170, 3000, 1000)
        compas.Draw(20, 4000, 1000)

        compas.AddAnimation({
                "p1": {x: cx, y: cy + 100},
                "p2": {x: cx + 90, y: cy + 70},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 5000, 1000 )
    }
}
// Animation symétrie au compas
class Animation4 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let line1 = this.Content.line(cx-80, cy - 30, cx + 80, cy + 30)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(cx - 45, cy + 120, cx + 45, cy - 120)
        line2.stroke({opacity: 0.0, color: '#F00','stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 5000, 1000)

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx + 80, y: cy + 30}, "text": "B", "angle": 45})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx - 80, y: cy - 30}, "text": "A", "angle": 180})

        
        let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 95, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx - 80, y: cy - 30},
                "p2": {x: cx - 80 + 6*7, y: cy - 30 - 16*7}
            }, 0, 1000 )
        
        // compas.Rotate(90, 1000, 1000)
        compas.Draw(180, 1000, 1000)

        compas.AddAnimation({
            "p1": {x: cx + 80, y: cy + 30},
            "p2": {x: cx + 80 - 6*7, y: cy + 30 + 16*7}
        }, 2000, 1000)
        
        // compas.Rotate(-60, 4000, 1000)
        compas.Draw(180, 3000, 1000)

        compas.AddAnimation({
                "p1": {x: cx + 125, y: cy + 75},
                "p2": {x: cx + 100, y: cy - 50},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 4000, 1000 )
    }
}