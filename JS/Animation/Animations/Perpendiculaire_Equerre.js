/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

// Animation perpendiculaire à l'equerre
class Perpendiculaire_Equerre extends Animation_Data
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