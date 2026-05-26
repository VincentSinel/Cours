/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

// Animation parallèle à l'equerre
class Parallele_Equerre extends Animation_Data
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