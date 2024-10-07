class Animation1 extends Animation_Data
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