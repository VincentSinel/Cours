class Symetrie_Centrale extends Animation_Data
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