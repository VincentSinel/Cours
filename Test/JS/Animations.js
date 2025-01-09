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

				let coef = 40.0;

				let px = cx + coef * 4 - 2.75 * coef;
				let py = cy + 80 - Math.sqrt(8.5) * coef

        let line1 = this.Content.line(cx - coef * 4, cy + 80, cx + coef * 4, cy + 80)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx - coef * 4, y: cy + 80}, "text": "A"})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx + coef * 4, y: cy + 80}, "text": "B"})
        let pointC = new Anim_Point(this)
        pointC.attr({"center": {x: px, y: py}, "text": "C","point-style": {'opacity': 0.0, stroke: "#000"},
        "text-style": {'opacity': 0.0, fill: "#000"}})
				pointC.AddAnimation({"point-style": {'opacity': 1.0},
					"text-style": {'opacity': 1.0}}, 10000, 1000)


        let line2 = this.Content.line(cx - coef * 4, cy + 80, px, py)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)

        let line3 = this.Content.line(cx + coef * 4, cy + 80, px, py)
        line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)

				
        let regle = new Anim_Regle(this)
        regle.obj.rotate(180, 0, 0).scale(2.0, 2.0).translate(250,50)

        let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 200, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx - coef * 4 + 80, y: 65},
                "p2": {x: cx + coef * 4, y: 65}
            }, 0, 1000 )
        compas.AddAnimation({
                        "p1": {x: cx - coef * 4, y: cy + 80},
                        "p2": {x: cx + coef * 4 - 80, y: cy + 80}
                }, 2000, 1000 )
        
        compas.Rotate(-20, 3000, 1000)
        compas.Draw(-30, 4000, 1000)

        compas.AddAnimation({
            "p2": {x: cx + coef * 4, y: 65},
            "p1": {x: cx - coef * 4 + 160, y: 65}
        }, 5000, 1000)
        compas.AddAnimation({
                        "p1": {x: cx + coef * 4, y: cy + 80},
                        "p2": {x: cx - coef * 4 + 160, y: cy + 80}
                }, 7000, 1000 )
        
        compas.Rotate(30, 8000, 1000)
        compas.Draw(45, 9000, 1000)

        compas.AddAnimation({
                "p1": {x: cx + 200, y: cy + 80},
                "p2": {x: cx + 200, y: cy - 50},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 10000, 1000 )
        
    }
}