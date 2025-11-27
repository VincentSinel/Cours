/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

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